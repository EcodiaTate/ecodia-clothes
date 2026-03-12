import { forwardRef } from "react";

export type CardProps = {
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
} & React.HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ interactive, padding = "none", className, ...props }, ref) => {
    const classes = [
      "card",
      interactive && "card-interactive",
      padding !== "none" && `card-padding-${padding}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
