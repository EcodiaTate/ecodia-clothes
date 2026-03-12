import { z } from "zod";

// ── Store ─────────────────────────────────────────────────────────────────

export const applyForStoreSchema = z.object({
  handle: z
    .string()
    .min(3, "Handle must be at least 3 characters")
    .max(30, "Handle must be 30 characters or fewer")
    .regex(/^[a-z0-9_-]+$/, "Handle can only contain lowercase letters, numbers, hyphens, and underscores")
    .trim(),
  bio: z.string().max(500, "Bio must be 500 characters or fewer").trim().optional().default(""),
  application_text: z
    .string()
    .min(20, "Tell us a bit about what you plan to sell (at least 20 characters)")
    .max(2000)
    .trim(),
});

export type ApplyForStoreInput = z.infer<typeof applyForStoreSchema>;

export const updateStoreSchema = z.object({
  storeId: z.string().uuid("Invalid store"),
  handle: z.string().min(3).max(30).regex(/^[a-z0-9_-]+$/).trim().optional(),
  bio: z.string().max(500).trim().optional(),
  theme: z.enum(["archive", "boutique", "studio", "tide", "poster", "neon", "grove", "grunge"]).optional(),
  accepts_pickup: z.boolean().optional(),
  accepts_delivery: z.boolean().optional(),
  delivery_radius_km: z.number().int().min(0).optional(),
  handling_time_days: z.number().int().min(1).optional(),
  shipping_policy: z.string().max(2000).trim().optional(),
  return_policy: z.string().max(2000).trim().optional(),
  free_shipping_threshold_cents: z.number().int().min(0).optional(),
});

export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;

// ── Item ──────────────────────────────────────────────────────────────────

export const createItemSchema = z.object({
  storeId: z.string().uuid("Invalid store"),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(120, "Title must be 120 characters or fewer")
    .trim(),
  description: z.string().max(2000, "Description must be 2000 characters or fewer").trim().optional().default(""),
  price_cents: z.number().int().min(100, "Price must be at least $1.00"),
  stock: z.number().int().min(0).default(1),
  category: z.string().optional(),
  condition: z.enum(["new", "like_new", "good", "fair"]).default("good"),
  color: z.string().max(50).optional(),
  materials: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  provenance_tags: z.array(z.string()).optional().default([]),
  safety_flags: z.array(z.string()).optional().default([]),
  fulfilment_type: z.enum(["pickup", "delivery", "both"]).default("delivery"),
  images: z.array(z.string()).optional().default([]),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;

export const updateItemSchema = z.object({
  itemId: z.string().uuid("Invalid item"),
  title: z.string().min(2).max(120).trim().optional(),
  description: z.string().max(2000).trim().optional(),
  price_cents: z.number().int().min(100).optional(),
  stock: z.number().int().min(0).optional(),
  status: z.enum(["draft", "active", "sold", "archived"]).optional(),
  category: z.string().optional(),
  condition: z.enum(["new", "like_new", "good", "fair"]).optional(),
  color: z.string().max(50).optional(),
  materials: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  fulfilment_type: z.enum(["pickup", "delivery", "both"]).optional(),
  images: z.array(z.string()).optional(),
});

export type UpdateItemInput = z.infer<typeof updateItemSchema>;

// ── Order ─────────────────────────────────────────────────────────────────

export const updateOrderStatusSchema = z.object({
  orderId: z.string().uuid("Invalid order"),
  status: z.enum(["preparing", "shipped", "delivered", "cancelled"]),
  tracking_number: z.string().max(100).optional(),
  tracking_url: z.string().url().optional().or(z.literal("")),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;

// ── Bag ───────────────────────────────────────────────────────────────────

export const addToBagSchema = z.object({
  itemId: z.string().uuid("Invalid item"),
});

export type AddToBagInput = z.infer<typeof addToBagSchema>;

// ── Review ────────────────────────────────────────────────────────────────

export const submitReviewSchema = z.object({
  orderId: z.string().uuid("Invalid order"),
  storeId: z.string().uuid("Invalid store"),
  rating: z.number().int().min(1, "Rating is required").max(5),
  body: z.string().max(1000, "Review must be 1000 characters or fewer").trim().optional().default(""),
});

export type SubmitReviewInput = z.infer<typeof submitReviewSchema>;

// ── Messages ──────────────────────────────────────────────────────────────

export const sendMessageSchema = z.object({
  orderId: z.string().uuid("Invalid order"),
  body: z
    .string()
    .min(1, "Message cannot be empty")
    .max(2000, "Message must be 2000 characters or fewer")
    .trim(),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
