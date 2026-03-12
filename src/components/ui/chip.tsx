export type ChipProps = {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export function Chip({
  variant = "primary",
  icon,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <span className="badge" {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}
