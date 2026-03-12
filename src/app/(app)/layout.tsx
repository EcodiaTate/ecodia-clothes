import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileProvider } from "@/lib/hooks/use-profile";
import { ToastProvider } from "@/components/ui/toast";
import { AppHeader } from "@/components/layout/app-header";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  if (!profile.legal_onboarding_complete) {
    redirect("/onboarding");
  }

  return (
    <ProfileProvider initialProfile={profile}>
      <ToastProvider>
        <div className="app-shell">
          <AppHeader profile={profile} />
          <main>
            {children}
          </main>
        </div>
      </ToastProvider>
    </ProfileProvider>
  );
}
