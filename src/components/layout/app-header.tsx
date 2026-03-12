"use client";

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import type { Profile } from "@/types/domain";

type Props = {
  profile: Profile;
};

export function AppHeader({ profile }: Props) {
  return (
    <header>
      {/* Logo */}
      <Link href="/" aria-label="Thrift.eco home">
        THRIFT<span>.eco</span>
      </Link>

      {/* Right cluster */}
      <div style={{ display: "flex", gap: "var(--spacing-xs)", alignItems: "center" }}>
        {/* Shopping bag */}
        <Link href="/bag" aria-label="Shopping bag">
          <ShoppingBag size={20} strokeWidth={1.75} />
        </Link>

        {/* Avatar / Account */}
        <Link href="/account" aria-label="Account">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.display_name ?? "Account"}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--color-sage)",
              }}
            />
          ) : (
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--color-charcoal-light)",
                border: "2px solid var(--color-border)",
                color: "var(--color-cream)",
              }}
            >
              <User size={15} strokeWidth={1.75} />
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}
