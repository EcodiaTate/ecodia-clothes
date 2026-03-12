import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth,
      loading,
      icon,
      iconRight,
      active,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        data-variant={variant}
        data-size={size}
        data-full-width={fullWidth || undefined}
        data-active={active || undefined}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            {icon && <span>{icon}</span>}
            {children}
            {iconRight && <span>{iconRight}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
