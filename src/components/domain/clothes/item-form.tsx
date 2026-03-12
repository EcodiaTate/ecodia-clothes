"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useHaptic } from "@/lib/hooks/use-haptics";
import { createItem, updateItem } from "@/lib/actions/clothes";
import {
  ITEM_CATEGORIES,
  ITEM_CONDITION_CONFIG,
  FULFILMENT_TYPE_CONFIG,
  MATERIAL_OPTIONS,
} from "@/lib/constants/clothes";
import type { StudioItem, ItemCondition, FulfilmentType } from "@/types/domain";

type Props = {
  storeId: string;
  item?: StudioItem | null;
  onSaved?: () => void;
};

export function ItemForm({ storeId, item, onSaved }: Props) {
  const haptics = useHaptic();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    item && Array.isArray(item.materials) ? (item.materials as string[]) : []
  );

  const isEditing = !!item;

  function toggleMaterial(mat: string) {
    haptics.impact("light");
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    haptics.impact("heavy");

    const form = new FormData(e.currentTarget);
    const priceDollars = parseFloat(form.get("price") as string);
    const priceCents = Math.round(priceDollars * 100);

    if (priceCents < 100) {
      setError("Price must be at least $1.00");
      return;
    }

    const data = {
      title: form.get("title") as string,
      description: form.get("description") as string,
      price_cents: priceCents,
      stock: parseInt(form.get("stock") as string) || 1,
      category: form.get("category") as string,
      condition: form.get("condition") as ItemCondition,
      color: form.get("color") as string,
      materials: selectedMaterials,
      fulfilment_type: form.get("fulfilment_type") as FulfilmentType,
    };

    startTransition(async () => {
      const result = isEditing
        ? await updateItem({ itemId: item.id, ...data })
        : await createItem({ storeId, ...data });

      if ("error" in result) {
        setError(result.error);
        haptics.notify("error");
      } else {
        haptics.notify("success");
        onSaved?.();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
         
         
        >
          {error}
        </div>
      )}

      <div>
        <label>Title *</label>
        <Input
          name="title"
          defaultValue={item?.title ?? ""}
          placeholder="Vintage denim jacket"
          required
          minLength={2}
          maxLength={120}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          defaultValue={item?.description ?? ""}
          placeholder="Tell the story behind this item..."
         
          rows={3}
          maxLength={2000}
        />
      </div>

      <div>
        <div>
          <label>Price (AUD) *</label>
          <Input
            name="price"
            type="number"
            step="0.01"
            min="1.00"
            defaultValue={item ? ((item.price_cents ?? 0) / 100).toFixed(2) : ""}
            placeholder="25.00"
            required
          />
        </div>
        <div>
          <label>Stock</label>
          <Input
            name="stock"
            type="number"
            min={0}
            defaultValue={item?.stock ?? 1}
          />
        </div>
      </div>

      <div>
        <div>
          <label>Category</label>
          <select
            name="category"
            defaultValue={item?.category ?? ""}
           
          >
            <option value="">Select...</option>
            {ITEM_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Condition</label>
          <select
            name="condition"
            defaultValue={item?.condition ?? "good"}
           
          >
            {(Object.entries(ITEM_CONDITION_CONFIG) as [ItemCondition, typeof ITEM_CONDITION_CONFIG[ItemCondition]][]).map(
              ([value, config]) => (
                <option key={value} value={value}>{config.label}</option>
              )
            )}
          </select>
        </div>
      </div>

      <div>
        <div>
          <label>Colour</label>
          <Input
            name="color"
            defaultValue={item?.color ?? ""}
            placeholder="e.g. Navy blue"
            maxLength={50}
          />
        </div>
        <div>
          <label>Fulfilment</label>
          <select
            name="fulfilment_type"
            defaultValue={item?.fulfilment_type ?? "delivery"}
           
          >
            {(Object.entries(FULFILMENT_TYPE_CONFIG) as [FulfilmentType, typeof FULFILMENT_TYPE_CONFIG[FulfilmentType]][]).map(
              ([value, config]) => (
                <option key={value} value={value}>{config.label}</option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Materials */}
      <div>
        <label>Materials</label>
        <div>
          {MATERIAL_OPTIONS.map((mat) => {
            const selected = selectedMaterials.includes(mat);
            return (
              <button
                key={mat}
                type="button"
                onClick={() => toggleMaterial(mat)}
                style={
                  selected
                    ? { background: "var(--ec-forest-600)", color: "#fff" }
                    : {}
                }
              >
                {mat}
              </button>
            );
          })}
        </div>
      </div>

      <Button type="submit" variant="primary" fullWidth loading={isPending}>
        {isEditing ? "Save Changes" : "List Item"}
      </Button>
    </form>
  );
}
