

export type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      
    >
      <div
       
        style={{
          color: "var(--text-subtle)",
          border: "var(--neo-border-thin) solid var(--border)",
          boxShadow: "var(--neo-shadow-sm)",
          background: "var(--surface-base)",
        }}
      >
        {icon}
      </div>
      <h3>{title}</h3>
      {description && (
        <p>{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
