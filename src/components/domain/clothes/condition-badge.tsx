"use client";

import type { ItemCondition } from "@/types/domain";

type Props = {
  condition: ItemCondition;
  className?: string;
};

const conditionMap: Record<ItemCondition, { label: string; cls: string }> = {
  new:      { label: "NEW",      cls: "tr-condition-new" },
  like_new: { label: "LIKE NEW", cls: "tr-condition-like_new" },
  good:     { label: "GOOD",     cls: "tr-condition-good" },
  fair:     { label: "FAIR",     cls: "tr-condition-fair" },
};

export function ConditionBadge({ condition, className = "" }: Props) {
  const { label, cls } = conditionMap[condition] ?? conditionMap.good;
  return (
    <span>
      {label}
    </span>
  );
}
