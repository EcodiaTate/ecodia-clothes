"use client";

import { useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";


type AlertVariant = "success" | "error" | "warning" | "info";

const variantConfig: Record<
  AlertVariant,
  { icon: React.ComponentType<{ className?: string }>; bg: string; fg: string; border: string }
> = {
  success: {
    icon: CheckCircle,
    bg: "var(--ec-mint-50)",
    fg: "var(--ec-forest-800)",
    border: "var(--ec-mint-200)",
  },
  error: {
    icon: XCircle,
    bg: "var(--ec-danger-subtle)",
    fg: "var(--ec-danger-dark)",
    border: "var(--ec-danger-border)",
  },
  warning: {
    icon: AlertTriangle,
    bg: "var(--ec-gold-50)",
    fg: "var(--ec-gold-800)",
    border: "var(--ec-gold-200)",
  },
  info: {
    icon: Info,
    bg: "var(--surface-subtle)",
    fg: "var(--text-base)",
    border: "var(--border)",
  },
};

export type AlertProps = {
  variant?: AlertVariant;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
};

export function Alert({
  variant = "info",
  children,
  dismissible,
  onDismiss,
  className,
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  const config = variantConfig[variant];
  const Icon = config.icon;

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div
      style={{
        borderRadius: "var(--ec-r-md)",
        background: config.bg,
        color: config.fg,
        border: `var(--neo-border-thin) solid ${config.border}`,
        boxShadow: "var(--neo-shadow-sm)",
      }}
      role="alert"
    >
      <Icon />
      <div>{children}</div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
        >
          <X />
        </button>
      )}
    </div>
  );
}
