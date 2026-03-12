"use server";

import { createClient } from "@/lib/supabase/server";
import {
  applyForStoreSchema,
  updateStoreSchema,
  createItemSchema,
  updateItemSchema,
  updateOrderStatusSchema,
  addToBagSchema,
  submitReviewSchema,
  sendMessageSchema,
} from "@/lib/validations/clothes";
import type {
  StudioStore,
  StudioItem,
  StudioOrder,
  StudioReview,
  StudioMessage,
  StudioBagItem,
  ShippingAddress,
} from "@/types/domain";

export type ActionResult = { error: string } | { success: true; message?: string };

// ---------------------------------------------------------------------------
// Aggregated types
// ---------------------------------------------------------------------------

export type StoreWithStats = StudioStore & {
  itemCount: number;
  avgRating: number | null;
  reviewCount: number;
};

export type ItemWithStore = StudioItem & {
  store: Pick<StudioStore, "id" | "handle" | "logo_url" | "theme"> | null;
};

export type OrderWithDetails = StudioOrder & {
  item: Pick<StudioItem, "id" | "title" | "images" | "price_cents"> | null;
  store: Pick<StudioStore, "id" | "handle"> | null;
  buyerProfile: { id: string; display_name: string | null; avatar_url: string | null } | null;
  sellerProfile: { id: string; display_name: string | null; avatar_url: string | null } | null;
};

export type BagItemWithDetail = StudioBagItem & {
  item: (StudioItem & {
    store: Pick<StudioStore, "id" | "handle"> | null;
  }) | null;
};

export type StudioDashboard = {
  featuredItems: ItemWithStore[];
  recentStores: StoreWithStats[];
};

// ---------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------

export async function getStudioDashboard(): Promise<StudioDashboard> {
  const [items, stores] = await Promise.all([
    getFeaturedItems(),
    getRecentStores(),
  ]);

  return { featuredItems: items, recentStores: stores };
}

export async function getFeaturedItems(): Promise<ItemWithStore[]> {
  const supabase = await createClient();

  const { data } = await (supabase
    .from("studio_items")
    .select("*, store:store_id(id, handle, logo_url, theme)") as any)
    .eq("status", "active")
    .gt("stock", 0)
    .order("created_at", { ascending: false })
    .limit(20);

  if (!data) return [];

  return (data as unknown as (StudioItem & { store: unknown })[]).map((item) => ({
    ...item,
    store: Array.isArray(item.store) ? (item.store[0] ?? null) : (item.store ?? null),
  })) as ItemWithStore[];
}

export async function getRecentStores(): Promise<StoreWithStats[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("studio_stores")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(20);

  if (!data) return [];

  return await Promise.all(
    (data as StudioStore[]).map(async (store) => {
      const { count: itemCount } = await supabase
        .from("studio_items")
        .select("*", { count: "exact", head: true })
        .eq("store_id", store.id)
        .eq("status", "active");

      const { data: reviews } = await supabase
        .from("studio_reviews")
        .select("rating")
        .eq("store_id", store.id);

      const reviewCount = reviews?.length ?? 0;
      const avgRating = reviewCount > 0
        ? (reviews as StudioReview[]).reduce((sum, r) => sum + r.rating, 0) / reviewCount
        : null;

      return {
        ...store,
        itemCount: itemCount ?? 0,
        avgRating,
        reviewCount,
      };
    })
  );
}

export async function getItemById(itemId: string): Promise<ItemWithStore | null> {
  const supabase = await createClient();

  const { data } = await (supabase
    .from("studio_items")
    .select("*, store:store_id(id, handle, logo_url, theme)") as any)
    .eq("id", itemId)
    .single();

  if (!data) return null;

  const item = data as unknown as StudioItem & { store: unknown };
  return {
    ...item,
    store: Array.isArray(item.store) ? (item.store[0] ?? null) : (item.store ?? null),
  } as ItemWithStore;
}

export async function getStoreByHandle(handle: string): Promise<(StoreWithStats & { items: StudioItem[] }) | null> {
  const supabase = await createClient();

  const { data: store } = await supabase
    .from("studio_stores")
    .select("*")
    .eq("handle", handle)
    .single();

  if (!store) return null;

  const { data: items } = await supabase
    .from("studio_items")
    .select("*")
    .eq("store_id", store.id)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  const { data: reviews } = await supabase
    .from("studio_reviews")
    .select("rating")
    .eq("store_id", store.id);

  const reviewCount = reviews?.length ?? 0;
  const avgRating = reviewCount > 0
    ? (reviews as StudioReview[]).reduce((sum, r) => sum + r.rating, 0) / reviewCount
    : null;

  return {
    ...(store as StudioStore),
    itemCount: items?.length ?? 0,
    avgRating,
    reviewCount,
    items: (items ?? []) as StudioItem[],
  };
}

// ---------------------------------------------------------------------------
// Store Management
// ---------------------------------------------------------------------------

export async function getMyStore(): Promise<StoreWithStats | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: store } = await supabase
    .from("studio_stores")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!store) return null;

  const { count: itemCount } = await supabase
    .from("studio_items")
    .select("*", { count: "exact", head: true })
    .eq("store_id", store.id);

  const { data: reviews } = await supabase
    .from("studio_reviews")
    .select("rating")
    .eq("store_id", store.id);

  const reviewCount = reviews?.length ?? 0;
  const avgRating = reviewCount > 0
    ? (reviews as StudioReview[]).reduce((sum, r) => sum + r.rating, 0) / reviewCount
    : null;

  return {
    ...(store as StudioStore),
    itemCount: itemCount ?? 0,
    avgRating,
    reviewCount,
  };
}

export async function applyForStore(
  data: Parameters<typeof applyForStoreSchema.safeParse>[0]
): Promise<ActionResult> {
  const parsed = applyForStoreSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: existing } = await supabase
    .from("studio_stores")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) return { error: "You already have a store" };

  const { error } = await supabase.from("studio_stores").insert({
    user_id: user.id,
    handle: parsed.data.handle,
    bio: parsed.data.bio ?? "",
    application_text: parsed.data.application_text,
    applied_at: new Date().toISOString(),
  });

  if (error) {
    if (error.code === "23505") return { error: "That handle is already taken" };
    return { error: "Failed to submit application" };
  }

  return { success: true, message: "Application submitted for review" };
}

export async function updateStore(
  data: Parameters<typeof updateStoreSchema.safeParse>[0]
): Promise<ActionResult> {
  const parsed = updateStoreSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { storeId, ...updates } = parsed.data;

  const cleanUpdates: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) cleanUpdates[key] = value;
  }

  if (Object.keys(cleanUpdates).length === 0) return { success: true };

  const { error } = await supabase
    .from("studio_stores")
    .update(cleanUpdates)
    .eq("id", storeId)
    .eq("user_id", user.id);

  if (error) {
    if (error.code === "23505") return { error: "That handle is already taken" };
    return { error: "Failed to update store" };
  }

  return { success: true, message: "Store updated" };
}

// ---------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------

export async function getMyItems(): Promise<StudioItem[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: store } = await supabase
    .from("studio_stores")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!store) return [];

  const { data: items } = await supabase
    .from("studio_items")
    .select("*")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  return (items ?? []) as StudioItem[];
}

export async function createItem(
  data: Parameters<typeof createItemSchema.safeParse>[0]
): Promise<ActionResult & { itemId?: string }> {
  const parsed = createItemSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  // Verify store ownership
  const { data: store } = await supabase
    .from("studio_stores")
    .select("id, is_approved")
    .eq("id", parsed.data.storeId)
    .eq("user_id", user.id)
    .single();

  if (!store) return { error: "Store not found" };
  if (!store.is_approved) return { error: "Store must be approved before listing items" };

  const { data: item, error } = await supabase
    .from("studio_items")
    .insert({
      store_id: parsed.data.storeId,
      title: parsed.data.title,
      description: parsed.data.description ?? "",
      price_cents: parsed.data.price_cents,
      stock: parsed.data.stock,
      status: "active",
      category: parsed.data.category ?? null,
      condition: parsed.data.condition,
      color: parsed.data.color ?? null,
      materials: parsed.data.materials ?? [],
      tags: parsed.data.tags ?? [],
      provenance_tags: parsed.data.provenance_tags ?? [],
      safety_flags: parsed.data.safety_flags ?? [],
      fulfilment_type: parsed.data.fulfilment_type,
      images: parsed.data.images ?? [],
    })
    .select("id")
    .single();

  if (error) return { error: "Failed to create item" };
  return { success: true, message: "Item listed", itemId: item.id };
}

export async function updateItem(
  data: Parameters<typeof updateItemSchema.safeParse>[0]
): Promise<ActionResult> {
  const parsed = updateItemSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { itemId, ...updates } = parsed.data;
  const cleanUpdates: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) cleanUpdates[key] = value;
  }

  if (Object.keys(cleanUpdates).length === 0) return { success: true };

  // Verify ownership via store
  const { data: item } = await supabase
    .from("studio_items")
    .select("store_id")
    .eq("id", itemId)
    .single();

  if (!item) return { error: "Item not found" };

  const { data: store } = await supabase
    .from("studio_stores")
    .select("id")
    .eq("id", item.store_id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!store) return { error: "Not authorised" };

  const { error } = await supabase
    .from("studio_items")
    .update(cleanUpdates)
    .eq("id", itemId);

  if (error) return { error: "Failed to update item" };
  return { success: true, message: "Item updated" };
}

export async function deleteItem(itemId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  // Verify ownership via store
  const { data: item } = await supabase
    .from("studio_items")
    .select("store_id")
    .eq("id", itemId)
    .single();

  if (!item) return { error: "Item not found" };

  const { data: store } = await supabase
    .from("studio_stores")
    .select("id")
    .eq("id", item.store_id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!store) return { error: "Not authorised" };

  const { error } = await supabase
    .from("studio_items")
    .delete()
    .eq("id", itemId);

  if (error) return { error: "Failed to delete item" };
  return { success: true, message: "Item deleted" };
}

// ---------------------------------------------------------------------------
// Bag
// ---------------------------------------------------------------------------

export async function getMyBag(): Promise<BagItemWithDetail[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await (supabase
    .from("studio_bag_items")
    .select("*, item:item_id(*, store:store_id(id, handle))") as any)
    .eq("user_id", user.id);

  if (!data) return [];

  return (data as unknown as (StudioBagItem & { item: unknown })[]).map((b) => ({
    ...b,
    item: Array.isArray(b.item) ? (b.item[0] ?? null) : (b.item ?? null),
  })) as BagItemWithDetail[];
}

export async function addToBag(
  data: Parameters<typeof addToBagSchema.safeParse>[0]
): Promise<ActionResult> {
  const parsed = addToBagSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("studio_bag_items").insert({
    user_id: user.id,
    item_id: parsed.data.itemId,
  });

  if (error) {
    if (error.code === "23505") return { error: "Item already in bag" };
    return { error: "Failed to add to bag" };
  }

  return { success: true, message: "Added to bag" };
}

export async function removeFromBag(itemId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("studio_bag_items")
    .delete()
    .eq("user_id", user.id)
    .eq("item_id", itemId);

  if (error) return { error: "Failed to remove from bag" };
  return { success: true, message: "Removed from bag" };
}

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

export async function getMyOrders(
  role: "buyer" | "seller"
): Promise<OrderWithDetails[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const filterCol = role === "buyer" ? "buyer_id" : "seller_id";

  const { data } = await (supabase
    .from("studio_orders")
    .select(
      "*, item:item_id(id, title, images, price_cents), store:store_id(id, handle), buyerProfile:buyer_id(id, display_name, avatar_url), sellerProfile:seller_id(id, display_name, avatar_url)"
    ) as any)
    .eq(filterCol, user.id)
    .order("created_at", { ascending: false });

  if (!data) return [];

  return (data as unknown as (StudioOrder & { item: unknown; store: unknown; buyerProfile: unknown; sellerProfile: unknown })[]).map((o) => ({
    ...o,
    item: Array.isArray(o.item) ? (o.item[0] ?? null) : (o.item ?? null),
    store: Array.isArray(o.store) ? (o.store[0] ?? null) : (o.store ?? null),
    buyerProfile: Array.isArray(o.buyerProfile) ? (o.buyerProfile[0] ?? null) : (o.buyerProfile ?? null),
    sellerProfile: Array.isArray(o.sellerProfile) ? (o.sellerProfile[0] ?? null) : (o.sellerProfile ?? null),
  })) as OrderWithDetails[];
}

export async function updateOrderStatus(
  data: Parameters<typeof updateOrderStatusSchema.safeParse>[0]
): Promise<ActionResult> {
  const parsed = updateOrderStatusSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();

  const updates: Record<string, unknown> = { status: parsed.data.status };
  if (parsed.data.tracking_number) updates.tracking_number = parsed.data.tracking_number;
  if (parsed.data.tracking_url) updates.tracking_url = parsed.data.tracking_url;

  const { error } = await supabase
    .from("studio_orders")
    .update(updates)
    .eq("id", parsed.data.orderId);

  if (error) return { error: "Failed to update order" };
  return { success: true, message: `Order marked as ${parsed.data.status}` };
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export async function getStoreReviews(storeId: string): Promise<(StudioReview & { reviewer: { display_name: string | null; avatar_url: string | null } | null })[]> {
  const supabase = await createClient();

  const { data } = await (supabase
    .from("studio_reviews")
    .select("*, reviewer:reviewer_id(display_name, avatar_url)") as any)
    .eq("store_id", storeId)
    .order("created_at", { ascending: false });

  if (!data) return [];

  return (data as unknown as (StudioReview & { reviewer: unknown })[]).map((r) => ({
    ...r,
    reviewer: Array.isArray(r.reviewer) ? (r.reviewer[0] ?? null) : (r.reviewer ?? null),
  })) as (StudioReview & { reviewer: { display_name: string | null; avatar_url: string | null } | null })[];
}

export async function submitReview(
  data: Parameters<typeof submitReviewSchema.safeParse>[0]
): Promise<ActionResult> {
  const parsed = submitReviewSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("studio_reviews").insert({
    order_id: parsed.data.orderId,
    reviewer_id: user.id,
    store_id: parsed.data.storeId,
    rating: parsed.data.rating,
    body: parsed.data.body ?? "",
  });

  if (error) {
    if (error.code === "23505") return { error: "You already reviewed this order" };
    return { error: "Failed to submit review" };
  }

  return { success: true, message: "Review submitted" };
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

export async function getOrderMessages(orderId: string): Promise<(StudioMessage & { sender: { display_name: string | null; avatar_url: string | null } | null })[]> {
  const supabase = await createClient();

  const { data } = await (supabase
    .from("studio_messages")
    .select("*, sender:sender_id(display_name, avatar_url)") as any)
    .eq("order_id", orderId)
    .order("created_at", { ascending: true });

  if (!data) return [];

  return (data as unknown as (StudioMessage & { sender: unknown })[]).map((m) => ({
    ...m,
    sender: Array.isArray(m.sender) ? (m.sender[0] ?? null) : (m.sender ?? null),
  })) as (StudioMessage & { sender: { display_name: string | null; avatar_url: string | null } | null })[];
}

export async function sendMessage(
  data: Parameters<typeof sendMessageSchema.safeParse>[0]
): Promise<ActionResult> {
  const parsed = sendMessageSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("studio_messages").insert({
    order_id: parsed.data.orderId,
    sender_id: user.id,
    body: parsed.data.body,
  });

  if (error) return { error: "Failed to send message" };
  return { success: true, message: "Message sent" };
}

// ---------------------------------------------------------------------------
// Shipping Addresses
// ---------------------------------------------------------------------------

export async function getMyAddresses(): Promise<ShippingAddress[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("shipping_addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false });

  return (data ?? []) as ShippingAddress[];
}

export type CheckoutResult = { url: string } | { error: string };

export async function getBagItems(): Promise<BagItemWithDetail[]> {
  return getMyBag();
}

export async function getShippingAddresses(): Promise<ShippingAddress[]> {
  return getMyAddresses();
}

export async function saveShippingAddress(input: {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postcode: string;
  country?: string;
  label?: string;
  setDefault?: boolean;
}): Promise<ActionResult & { address?: ShippingAddress }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  if (!input.line1?.trim()) return { error: "Address line 1 is required" };
  if (!input.city?.trim()) return { error: "City is required" };
  if (!input.state?.trim()) return { error: "State is required" };
  if (!input.postcode?.trim()) return { error: "Postcode is required" };

  const payload = {
    user_id: user.id,
    line1: input.line1.trim(),
    line2: input.line2?.trim() ?? null,
    city: input.city.trim(),
    state: input.state.trim(),
    postcode: input.postcode.trim(),
    country: input.country?.trim() ?? "AU",
    label: input.label?.trim() ?? null,
    is_default: input.setDefault ?? false,
  };

  if (payload.is_default) {
    await supabase
      .from("shipping_addresses")
      .update({ is_default: false })
      .eq("user_id", user.id);
  }

  const { data, error } = await supabase
    .from("shipping_addresses")
    .insert(payload)
    .select()
    .single();

  if (error) return { error: "Failed to save address" };
  return { success: true, message: "Address saved", address: data as ShippingAddress };
}

export async function createCheckoutSession(input: {
  bagItemIds: string[];
  shippingAddressId?: string;
}): Promise<CheckoutResult> {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { error: "Not authenticated" };

  if (!input.bagItemIds.length) return { error: "No items selected" };

  const { data: bagItems } = await supabase
    .from("studio_bag_items")
    .select("id, item_id")
    .eq("user_id", user.id)
    .in("id", input.bagItemIds);

  if (!bagItems || bagItems.length !== input.bagItemIds.length) {
    return { error: "Some items could not be found in your bag" };
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) return { error: "Session expired" };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const successUrl = appUrl + "/checkout/success?session_id={CHECKOUT_SESSION_ID}";
  const cancelUrl = appUrl + "/checkout/cancelled";

  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "") + "/functions/v1/checkout",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bagItemIds: input.bagItemIds,
          shippingAddressId: input.shippingAddressId ?? null,
          successUrl,
          cancelUrl,
        }),
      }
    );

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      return { error: (body as { error?: string }).error ?? "Checkout failed" };
    }

    const body = await response.json() as { url?: string; error?: string };
    if (!body.url) return { error: body.error ?? "No checkout URL returned" };
    return { url: body.url };
  } catch {
    return { error: "Network error" };
  }
}

export async function createOrdersFromBag(
  bagItemIds: string[],
  shippingAddressId?: string
): Promise<ActionResult & { orderIds?: string[] }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  if (!bagItemIds.length) return { error: "No items provided" };

  const { data: bagRows } = await (supabase
    .from("studio_bag_items")
    .select("id, item_id, item:item_id(id, price_cents, store_id, store:store_id(id, user_id))")
    .eq("user_id", user.id)
    .in("id", bagItemIds) as any);

  if (!bagRows || bagRows.length === 0) return { error: "No matching bag items found" };

  let shippingSnapshot: Record<string, unknown> | null = null;
  if (shippingAddressId) {
    const { data: addr } = await supabase
      .from("shipping_addresses")
      .select("*")
      .eq("id", shippingAddressId)
      .eq("user_id", user.id)
      .single();
    if (addr) shippingSnapshot = addr as unknown as Record<string, unknown>;
  }

  type BagRowItem = {
    id: string;
    price_cents: number;
    store_id: string;
    store: { id: string; user_id: string } | { id: string; user_id: string }[] | null;
  };

  const orderInserts: {
    item_id: string;
    store_id: string;
    buyer_id: string;
    seller_id: string;
    amount_cents: number;
    status: "pending";
    shipping_address: Record<string, unknown> | null;
  }[] = [];

  for (const row of bagRows as unknown as (StudioBagItem & { item: BagRowItem | BagRowItem[] | null })[]) {
    const itemData = row.item ? (Array.isArray(row.item) ? row.item[0] : row.item) : null;
    if (!itemData) continue;
    const storeData = itemData.store ? (Array.isArray(itemData.store) ? itemData.store[0] : itemData.store) : null;
    if (!storeData) continue;
    orderInserts.push({
      item_id: itemData.id,
      store_id: itemData.store_id,
      buyer_id: user.id,
      seller_id: storeData.user_id,
      amount_cents: itemData.price_cents,
      status: "pending",
      shipping_address: shippingSnapshot,
    });
  }

  if (!orderInserts.length) return { error: "Could not construct orders" };

  const { data: orders, error: ordersError } = await supabase
    .from("studio_orders")
    .insert(orderInserts)
    .select("id");

  if (ordersError || !orders) return { error: "Failed to create orders" };

  await supabase
    .from("studio_bag_items")
    .delete()
    .eq("user_id", user.id)
    .in("id", bagItemIds);

  return {
    success: true,
    message: "Orders created",
    orderIds: (orders as { id: string }[]).map((o) => o.id),
  };
}

export type StoreAnalytics = {
  totalRevenue: number;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  averageOrderValue: number;
  totalItems: number;
  activeItems: number;
  avgRating: number | null;
  reviewCount: number;
  revenueByWeek: { week: string; revenue: number; orders: number }[];
  topItems: { id: string; title: string; revenue: number; orders: number }[];
};

export async function getStoreAnalytics(
  storeId: string
): Promise<StoreAnalytics | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: store } = await supabase
    .from("studio_stores")
    .select("id")
    .eq("id", storeId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (!store) return null;

  const { data: orders } = await supabase
    .from("studio_orders")
    .select("id, status, amount_cents, created_at, item_id")
    .eq("store_id", storeId)
    .order("created_at", { ascending: false });

  const allOrders = (orders ?? []) as {
    id: string; status: string | null; amount_cents: number; created_at: string | null; item_id: string;
  }[];

  const completedOrders = allOrders.filter((o) => o.status === "delivered").length;
  const cancelledOrders = allOrders.filter((o) => o.status === "cancelled").length;
  const totalRevenue = allOrders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (o.amount_cents ?? 0), 0);
  const totalOrders = allOrders.length;
  const averageOrderValue = completedOrders > 0 ? Math.round(totalRevenue / completedOrders) : 0;

  const { data: itemsData } = await supabase
    .from("studio_items")
    .select("id, status")
    .eq("store_id", storeId);
  const allItems = (itemsData ?? []) as { id: string; status: string | null }[];
  const totalItems = allItems.length;
  const activeItems = allItems.filter((i) => i.status === "active").length;

  const { data: reviewsData } = await supabase
    .from("studio_reviews")
    .select("rating")
    .eq("store_id", storeId);
  const reviews = (reviewsData ?? []) as { rating: number }[];
  const reviewCount = reviews.length;
  const avgRating = reviewCount > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
    : null;

  const now = new Date();
  const revenueByWeek: { week: string; revenue: number; orders: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - i * 7 - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    const weekOrders = allOrders.filter((o) => {
      if (!o.created_at) return false;
      const d = new Date(o.created_at);
      return d >= weekStart && d < weekEnd;
    });
    const weekLabel = weekStart.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
    revenueByWeek.push({
      week: weekLabel,
      revenue: weekOrders
        .filter((o) => o.status === "delivered")
        .reduce((sum, o) => sum + (o.amount_cents ?? 0), 0),
      orders: weekOrders.length,
    });
  }

  const itemRevMap: Record<string, { revenue: number; orders: number }> = {};
  for (const o of allOrders) {
    if (!itemRevMap[o.item_id]) itemRevMap[o.item_id] = { revenue: 0, orders: 0 };
    itemRevMap[o.item_id].orders += 1;
    if (o.status === "delivered") itemRevMap[o.item_id].revenue += o.amount_cents ?? 0;
  }
  const topItemIds = Object.entries(itemRevMap)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5)
    .map(([id]) => id);

  let topItems: { id: string; title: string; revenue: number; orders: number }[] = [];
  if (topItemIds.length > 0) {
    const { data: topItemsData } = await supabase
      .from("studio_items")
      .select("id, title")
      .in("id", topItemIds);
    topItems = ((topItemsData ?? []) as { id: string; title: string }[])
      .map((item) => ({
        id: item.id,
        title: item.title,
        revenue: itemRevMap[item.id]?.revenue ?? 0,
        orders: itemRevMap[item.id]?.orders ?? 0,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  }

  return {
    totalRevenue, totalOrders, completedOrders, cancelledOrders,
    averageOrderValue, totalItems, activeItems, avgRating, reviewCount,
    revenueByWeek, topItems,
  };
}

// ---------------------------------------------------------------------------
// Stripe Connect
// ---------------------------------------------------------------------------

export async function createStripeConnectLink(): Promise<{ url: string } | { error: string }> {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { error: "Not authenticated" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/stripe-connect`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ action: "create_account_link" }),
    }
  );
  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) return { error: (data.error as string) ?? "Failed to create Stripe link" };
  return { url: data.url as string };
}

export async function getStripeConnectDashboardLink(): Promise<{ url: string } | { error: string }> {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { error: "Not authenticated" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/stripe-connect`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ action: "login_link" }),
    }
  );
  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) return { error: (data.error as string) ?? "Failed to get dashboard link" };
  return { url: data.url as string };
}
