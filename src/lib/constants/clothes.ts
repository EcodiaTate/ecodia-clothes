import type {
  ItemCondition,
  StoreTheme,
  OrderStatus,
  FulfilmentType,
} from "@/types/domain";

export const ITEM_CONDITION_CONFIG: Record<
  ItemCondition,
  { label: string; description: string; color: string }
> = {
  new: { label: "New", description: "Brand new, unused", color: "var(--ec-mint-600)" },
  like_new: { label: "Like New", description: "Barely used, excellent condition", color: "var(--ec-mint-500)" },
  good: { label: "Good", description: "Used but well maintained", color: "var(--ec-gold-500)" },
  fair: { label: "Fair", description: "Shows wear, fully functional", color: "var(--ec-gray-500)" },
};

export const STORE_THEME_CONFIG: Record<
  StoreTheme,
  { label: string; accent: string; bg: string }
> = {
  archive: { label: "Archive", accent: "#8b7355", bg: "#f5f0e8" },
  boutique: { label: "Boutique", accent: "#c084a4", bg: "#fdf2f8" },
  studio: { label: "Studio", accent: "var(--ec-forest-600)", bg: "var(--ec-forest-50)" },
  tide: { label: "Tide", accent: "#3b82f6", bg: "#eff6ff" },
  poster: { label: "Poster", accent: "#e74c3c", bg: "#fef2f2" },
  neon: { label: "Neon", accent: "#a855f7", bg: "#faf5ff" },
  grove: { label: "Grove", accent: "var(--ec-mint-600)", bg: "var(--ec-mint-50)" },
  grunge: { label: "Grunge", accent: "#525252", bg: "#f5f5f5" },
};

export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; colorFg: string }
> = {
  pending: { label: "Pending", color: "var(--ec-gold-500)", colorFg: "#3a2a00" },
  paid: { label: "Paid", color: "var(--ec-mint-500)", colorFg: "#1a3a1d" },
  preparing: { label: "Preparing", color: "#3b82f6", colorFg: "#fff" },
  shipped: { label: "Shipped", color: "#a855f7", colorFg: "#fff" },
  delivered: { label: "Delivered", color: "var(--ec-forest-700)", colorFg: "#fff" },
  cancelled: { label: "Cancelled", color: "var(--ec-gray-400)", colorFg: "#fff" },
};

export const FULFILMENT_TYPE_CONFIG: Record<
  FulfilmentType,
  { label: string; description: string }
> = {
  pickup: { label: "Pickup", description: "Buyer collects in person" },
  delivery: { label: "Delivery", description: "Shipped to buyer" },
  both: { label: "Pickup or Delivery", description: "Buyer chooses" },
};

export const ITEM_CATEGORIES = [
  "Clothing",
  "Accessories",
  "Bags",
  "Shoes",
  "Jewellery",
  "Home Decor",
  "Furniture",
  "Art",
  "Electronics",
  "Books",
  "Toys",
  "Kitchen",
  "Garden",
  "Craft Supplies",
  "Other",
] as const;

export const MATERIAL_OPTIONS = [
  "Cotton",
  "Denim",
  "Leather",
  "Wood",
  "Metal",
  "Glass",
  "Ceramic",
  "Plastic (recycled)",
  "Fabric",
  "Paper",
  "Wool",
  "Silk",
  "Bamboo",
  "Cork",
  "Other",
] as const;

export function formatPrice(cents: number, currency = "AUD"): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
