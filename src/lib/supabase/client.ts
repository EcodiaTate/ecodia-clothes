import { createBrowserClient } from "@supabase/ssr";
import { useMemo } from "react";
import type { Database } from "@/types/database";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Stable hook for client components
export function useSupabase() {
  // createBrowserClient is internally memoized per URL+key pair
  const supabase = useMemo(() => createClient(), []);
  return { supabase };
}
