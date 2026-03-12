"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/domain";

type ProfileContextValue = {
  profile: Profile;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  isAdmin: boolean;
  hasCap: (cap: string) => boolean;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({
  children,
  initialProfile,
}: {
  children: React.ReactNode;
  initialProfile: Profile;
}) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseRef = useRef(createClient());

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabaseRef.current
        .from("profiles")
        .select("*")
        .eq("id", profile.id)
        .single();

      if (fetchError) throw fetchError;
      if (data) setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh profile");
    } finally {
      setLoading(false);
    }
  }, [profile.id]);

  // Supabase Realtime subscription for live profile updates
  useEffect(() => {
    const supabase = supabaseRef.current;
    const channel = supabase
      .channel(`profile:${profile.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${profile.id}`,
        },
        (payload) => {
          setProfile((prev) => ({ ...prev, ...payload.new } as Profile));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile.id]);

  const isAdmin = profile.is_admin === true;

  const hasCap = useCallback(
    (cap: string): boolean => {
      if (isAdmin) return true;
      const caps = profile.caps as Record<string, boolean> | null;
      return caps?.[cap] === true;
    },
    [profile.caps, isAdmin]
  );

  return (
    <ProfileContext.Provider
      value={{ profile, loading, error, refresh, isAdmin, hasCap }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return ctx;
}
