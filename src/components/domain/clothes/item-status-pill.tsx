"use client";

type ItemStatus = "draft" | "active" | "sold" | "archived";

const CONFIG: Record<ItemStatus, { label: string }> = {
  draft: { label: "Draft" },
  active: { label: "Active" },
  sold: { label: "Sold" },
  archived: { label: "Archived" },
};

type Props = {
  status: ItemStatus;
};

export function ItemStatusPill({ status }: Props) {
  const config = CONFIG[status];

  return (
    <span
     
      style={{
        background: `var(--item-${status})`,
        color: `var(--item-${status}-fg)`,
      }}
    >
      {config.label}
    </span>
  );
}
