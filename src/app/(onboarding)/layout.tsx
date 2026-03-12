import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // If user already completed onboarding, send them to browse
  const { data: profile } = await supabase
    .from("profiles")
    .select("legal_onboarding_complete")
    .eq("id", user.id)
    .single();

  if (profile?.legal_onboarding_complete) {
    redirect("/");
  }

  return (
    <div
     
     
    >
      <div>
        {/* Branding */}
        <div>
          <h1>ecodia clothes</h1>
          <p>
            Let&apos;s get you set up
          </p>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
