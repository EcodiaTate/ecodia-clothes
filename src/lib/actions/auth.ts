"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
} from "@/lib/validations/auth";

// Standardised return type for auth actions used with useActionState
export type AuthResult = { error: string } | { success: true; message?: string };

export async function login(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    // Deliberately vague - don't reveal whether the email exists
    return { error: "Invalid email or password" };
  }

  redirect("/");
}

export async function signup(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const raw = {
    displayName: formData.get("displayName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = signupSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const headerStore = await headers();
  const origin = headerStore.get("origin") ?? "";

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        display_name:
          parsed.data.displayName || parsed.data.email.split("@")[0],
      },
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "An account with this email already exists" };
    }
    return { error: "Unable to create account. Please try again." };
  }

  // Don't redirect - user must confirm email first
  return {
    success: true,
    message: "Check your email for a confirmation link",
  };
}

export async function forgotPassword(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const raw = { email: formData.get("email") as string };

  const parsed = forgotPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const headerStore = await headers();
  const origin = headerStore.get("origin") ?? "";

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${origin}/api/auth/callback?next=/update-password`,
  });

  // Always return the same message regardless of whether email exists
  return {
    success: true,
    message:
      "If an account with that email exists, you'll receive a reset link",
  };
}

export async function updatePassword(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const raw = {
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const parsed = updatePasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { error: "Unable to update password. Please try again." };
  }

  redirect("/login?message=password-updated");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
