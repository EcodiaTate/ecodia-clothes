"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import {
  updateProfileSchema,
  legalOnboardingSchema,
  changePasswordSchema,
} from "@/lib/validations/profile";

export type ProfileResult = { error: string } | { success: true; message?: string };

export async function updateProfile(
  _prevState: ProfileResult | null,
  formData: FormData
): Promise<ProfileResult> {
  const parsed = updateProfileSchema.safeParse({
    displayName: formData.get("displayName"),
    bio: formData.get("bio"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: parsed.data.displayName,
      bio: parsed.data.bio,
    })
    .eq("id", user.id);

  if (error) return { error: "Failed to update profile" };
  return { success: true, message: "Profile updated" };
}

export async function updateAvatar(
  formData: FormData
): Promise<ProfileResult> {
  const file = formData.get("avatar") as File | null;
  if (!file || file.size === 0) return { error: "No file provided" };

  if (file.size > 5 * 1024 * 1024) {
    return { error: "File must be under 5MB" };
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    return { error: "File must be JPEG, PNG, WebP, or GIF" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${user.id}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { cacheControl: "3600", upsert: true });

  if (uploadError) return { error: "Failed to upload image" };

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(path);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (updateError) return { error: "Failed to update avatar" };
  return { success: true, message: "Avatar updated" };
}

export async function removeAvatar(): Promise<ProfileResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Get current avatar to find storage path
  const { data: profile } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", user.id)
    .single();

  if (profile?.avatar_url) {
    // Extract path from URL - after /avatars/
    const match = profile.avatar_url.match(/\/avatars\/(.+)/);
    if (match) {
      await supabase.storage.from("avatars").remove([match[1]]);
    }
  }

  const { error } = await supabase
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", user.id);

  if (error) return { error: "Failed to remove avatar" };
  return { success: true, message: "Avatar removed" };
}

export async function acceptLegalOnboarding(
  _prevState: ProfileResult | null,
  formData: FormData
): Promise<ProfileResult> {
  const parsed = legalOnboardingSchema.safeParse({
    role: formData.get("role"),
    over18Confirmed: formData.get("over18Confirmed") === "true",
    tosAccepted: formData.get("tosAccepted") === "true",
    privacyAccepted: formData.get("privacyAccepted") === "true",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const now = new Date().toISOString();
  const { error } = await supabase
    .from("profiles")
    .update({
      role: parsed.data.role,
      over18_confirmed: true,
      tos_version: "v1",
      tos_accepted_at: now,
      privacy_accepted_at: now,
      legal_onboarding_complete: true,
    })
    .eq("id", user.id);

  if (error) return { error: "Failed to complete onboarding" };

  redirect("/");
}

export async function changePassword(
  _prevState: ProfileResult | null,
  formData: FormData
): Promise<ProfileResult> {
  const parsed = changePasswordSchema.safeParse({
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.newPassword,
  });

  if (error) return { error: error.message };
  return { success: true, message: "Password updated" };
}

export async function deleteAccount(): Promise<ProfileResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(user.id);

  if (error) return { error: "Failed to delete account" };

  await supabase.auth.signOut();
  redirect("/login");
}

export async function getPublicProfile(displayName: string) {
  const supabase = await createClient();

  // Case-insensitive lookup by display name
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, role, level, xp_total, eco_balance, streak_days, selected_title_id, bio, created_at")
    .ilike("display_name", displayName)
    .single();

  if (!profile) return null;

  // Fetch earned badges + badge type info separately to avoid join type issues
  const { data: userBadges } = await supabase
    .from("user_badges")
    .select("badge_id, tier, earned_at")
    .eq("user_id", profile.id)
    .order("earned_at", { ascending: false });

  const badgeIds = (userBadges ?? []).map((b) => b.badge_id);
  const badgeTypesMap: Record<string, { name: string; icon: string | null }> = {};
  if (badgeIds.length > 0) {
    const { data: badgeTypes } = await supabase
      .from("badge_types")
      .select("id, name, icon")
      .in("id", badgeIds);
    for (const bt of badgeTypes ?? []) {
      badgeTypesMap[bt.id] = { name: bt.name, icon: bt.icon };
    }
  }

  const badges = (userBadges ?? [])
    .map((ub) => {
      const bt = badgeTypesMap[ub.badge_id];
      if (!bt) return null;
      return {
        id: ub.badge_id,
        name: bt.name,
        icon: bt.icon,
        earned_at: ub.earned_at,
      };
    })
    .filter((b): b is NonNullable<typeof b> => b !== null);

  // Fetch selected title
  let selectedTitle: string | null = null;
  if (profile.selected_title_id) {
    const { data: title } = await supabase
      .from("title_types")
      .select("label")
      .eq("id", profile.selected_title_id)
      .single();
    selectedTitle = title?.label ?? null;
  }

  // Count approved submissions
  const { count: submissionCount } = await supabase
    .from("submissions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", profile.id)
    .eq("state", "approved");

  return {
    display_name: profile.display_name,
    avatar_url: profile.avatar_url,
    role: profile.role,
    level: profile.level ?? 1,
    xp_total: profile.xp_total ?? 0,
    eco_balance: profile.eco_balance ?? 0,
    streak_days: profile.streak_days ?? 0,
    bio: profile.bio,
    created_at: profile.created_at,
    selectedTitle,
    badges,
    submissionCount: submissionCount ?? 0,
  };
}
