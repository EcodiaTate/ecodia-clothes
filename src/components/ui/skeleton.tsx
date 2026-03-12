


export type SkeletonProps = {
  variant?: "text" | "circle" | "rect";
  width?: string | number;
  height?: string | number;
  className?: string;
};

export function Skeleton({
  variant = "rect",
  width,
  height,
  className,
}: SkeletonProps) {
  return (
    <div

      style={{
        background: "var(--surface-subtle)",
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}
