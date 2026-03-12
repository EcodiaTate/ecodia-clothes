import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth";
import { LogOut, User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  return (
    <div>
      {/* Profile header */}
      <div>
        <Avatar
          src={profile?.avatar_url}
          alt={profile?.display_name ?? "User"}
          size="lg"
          fallback={profile?.display_name ?? "?"}
        />
        <div>
          <h2>
            {profile?.display_name || "User"}
          </h2>
          <p>{user?.email}</p>
        </div>
      </div>

      {/* My store quick link */}
      <div>
        <User />
        <div>
          <p>Ecodia Clothes</p>
          <p>Buy and sell pre-loved fashion</p>
        </div>
      </div>

      {/* Sign out */}
      <form action={signOut}>
        <Button
          variant="tertiary"
          fullWidth
          type="submit"
          icon={<LogOut />}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
