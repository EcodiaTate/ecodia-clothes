

const sizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
} as const;

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export type AvatarProps = {
  src?: string | null;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
};

export function Avatar({
  src,
  alt,
  size = "md",
  fallback,
  className,
}: AvatarProps) {
  const px = sizes[size];
  const initials = fallback || getInitials(alt || "?");
  const fontSize = px < 32 ? "0.625rem" : px < 48 ? "0.75rem" : "1rem";

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={px}
        height={px}

       
      />
    );
  }

  return (
    <div
      
      style={{
        width: px,
        height: px,
        fontSize,
        background: "var(--ec-mint-100)",
        color: "var(--ec-forest-800)",
      }}
      role="img"
      aria-label={alt}
    >
      {initials}
    </div>
  );
}
