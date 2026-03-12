import Link from "next/link";

export type LinkButtonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "alive" | "butter";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  active?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
} & React.ComponentProps<typeof Link>;

export function LinkButton({
  variant = "primary",
  size = "md",
  fullWidth,
  active,
  icon,
  iconRight,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      data-active={active || undefined}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
      {iconRight && <span>{iconRight}</span>}
    </Link>
  );
}
