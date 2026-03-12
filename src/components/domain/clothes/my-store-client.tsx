"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart2,
  Package,
  Plus,
  Settings,
  Star,
  ShoppingBag,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { ItemStatusPill } from "./item-status-pill";
import { useHaptic } from "@/lib/hooks/use-haptics";
import { updateStore, deleteItem } from "@/lib/actions/clothes";
import {
  STORE_THEME_CONFIG,
  formatPrice,
} from "@/lib/constants/clothes";
import type { StoreWithStats, OrderWithDetails } from "@/lib/actions/clothes";
import type { StudioItem, StoreTheme } from "@/types/domain";

type Tab = "items" | "orders" | "settings" | "analytics";

type Props = {
  store: StoreWithStats;
  items: StudioItem[];
  orders: OrderWithDetails[];
};

export function MyStoreClient({ store, items: initialItems, orders }: Props) {
  const router = useRouter();
  const haptics = useHaptic();
  const [tab, setTab] = useState<Tab>("items");
  const [items, setItems] = useState(initialItems);
  const [isPending, startTransition] = useTransition();
  const [settingsError, setSettingsError] = useState("");

  const themeConfig = STORE_THEME_CONFIG[store.theme ?? "studio"];

  function handleTabChange(newTab: Tab) {
    haptics.impact("light");
    setTab(newTab);
  }

  function handleDeleteItem(itemId: string) {
    haptics.impact("medium");
    startTransition(async () => {
      const result = await deleteItem(itemId);
      if (!("error" in result)) {
        setItems((prev) => prev.filter((i) => i.id !== itemId));
        haptics.notify("success");
      } else {
        haptics.notify("error");
      }
    });
  }

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSettingsError("");
    haptics.impact("heavy");

    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateStore({
        storeId: store.id,
        bio: form.get("bio") as string,
        theme: form.get("theme") as StoreTheme,
        accepts_pickup: form.get("accepts_pickup") === "on",
        accepts_delivery: form.get("accepts_delivery") === "on",
        delivery_radius_km: parseInt(form.get("delivery_radius_km") as string) || 0,
        handling_time_days: parseInt(form.get("handling_time_days") as string) || 1,
        shipping_policy: form.get("shipping_policy") as string,
        return_policy: form.get("return_policy") as string,
      });

      if ("error" in result) {
        setSettingsError(result.error);
        haptics.notify("error");
      } else {
        haptics.notify("success");
      }
    });
  }

  return (
    <div>
      {/* Store header */}
      <div
       
       
      >
        {store.logo_url ? (
          <img
            src={store.logo_url}
            alt=""
           
           
          />
        ) : (
          <div
           
           
          >
            {(store.handle ?? "S")[0].toUpperCase()}
          </div>
        )}
        <div>
          <h1>@{store.handle}</h1>
          <div>
            <span>
              <Package /> {store.itemCount} items
            </span>
            {store.avgRating !== null && (
              <span>
                <Star />
                {store.avgRating.toFixed(1)} ({store.reviewCount})
              </span>
            )}
          </div>
          {!store.is_approved && (
            <span
             
             
            >
              Pending Approval
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div>
        {(
          [
            { key: "items" as Tab, label: "Items", icon: <Package /> },
            { key: "orders" as Tab, label: "Orders", icon: <ShoppingBag /> },
            { key: "settings" as Tab, label: "Settings", icon: <Settings /> },
            { key: "analytics" as Tab, label: "Analytics", icon: <BarChart2 /> },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            style={tab === t.key ? { background: "var(--surface-elevated)", color: "var(--text-strong)" } : {}}
            onClick={() => handleTabChange(t.key)}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Items Tab ──────────────────────────────────────────────── */}
      {tab === "items" && (
        <div>
          <Button
            variant="primary"
            fullWidth
            icon={<Plus />}
            onClick={() => {
              haptics.impact("medium");
              router.push("/my-store/items/new");
            }}
          >
            List New Item
          </Button>

          {items.length === 0 ? (
            <EmptyState
              icon={<Package />}
              title="No items yet"
              description="List your first item to start selling"
            />
          ) : (
            items.map((item) => {
              const images = Array.isArray(item.images) ? (item.images as string[]) : [];
              const heroImage = images[0] ?? null;
              return (
                <Card key={item.id} padding="md">
                  <div>
                    {heroImage ? (
                      <img
                        src={heroImage}
                        alt={item.title}
                       
                      />
                    ) : (
                      <div
                       
                       
                      />
                    )}
                    <div>
                      <div>
                        <p>{item.title}</p>
                        <ItemStatusPill status={(item.status ?? "draft") as "draft" | "active" | "sold" | "archived"} />
                      </div>
                      <p>
                        {formatPrice(item.price_cents ?? 0)}
                      </p>
                      <p>Stock: {item.stock ?? 0}</p>
                      <div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            haptics.impact("light");
                            router.push(`/item/${item.id}`);
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="tertiary"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* ── Orders Tab ──────────────────────────────────────────────── */}
      {tab === "orders" && (
        <div>
          {orders.length === 0 ? (
            <EmptyState
              icon={<ShoppingBag />}
              title="No orders yet"
              description="Orders will appear here when someone buys from your store"
            />
          ) : (
            orders.map((order) => {
              const orderItem = order.item;
              const images = orderItem && Array.isArray(orderItem.images) ? (orderItem.images as string[]) : [];
              const heroImage = images[0] ?? null;
              return (
                <Card
                  key={order.id}
                  interactive
                  padding="md"
                 
                 
                  onClick={() => {
                    haptics.impact("light");
                    router.push(`/orders/${order.id}`);
                  }}
                >
                  <div>
                    {heroImage ? (
                      <img src={heroImage} alt="" />
                    ) : (
                      <div />
                    )}
                    <div>
                      <p>{orderItem?.title ?? "Item"}</p>
                      <p>
                        {order.buyerProfile?.display_name ?? "Buyer"} · {new Date(order.created_at ?? "").toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                    <span
                     
                      style={{
                        background: `var(--order-${order.status ?? "pending"}-bg)`,
                        color: `var(--order-${order.status ?? "pending"}-fg)`,
                      }}
                    >
                      {(order.status ?? "pending").charAt(0).toUpperCase() + (order.status ?? "pending").slice(1)}
                    </span>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* ── Settings Tab ──────────────────────────────────────────────── */}
      {tab === "settings" && (
        <form onSubmit={handleSaveSettings}>
          {settingsError && (
            <div>
              {settingsError}
            </div>
          )}

          <div>
            <label>Bio</label>
            <textarea
              name="bio"
              defaultValue={store.bio ?? ""}
             
              rows={3}
              maxLength={500}
            />
          </div>

          <div>
            <label>Theme</label>
            <select name="theme" defaultValue={store.theme ?? "studio"}>
              {(Object.entries(STORE_THEME_CONFIG) as [string, { label: string }][]).map(([value, config]) => (
                <option key={value} value={value}>{config.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label>
              <input type="checkbox" name="accepts_pickup" defaultChecked={store.accepts_pickup ?? false} />
              Accepts Pickup
            </label>
            <label>
              <input type="checkbox" name="accepts_delivery" defaultChecked={store.accepts_delivery ?? false} />
              Accepts Delivery
            </label>
          </div>

          <div>
            <div>
              <label>Delivery Radius (km)</label>
              <Input name="delivery_radius_km" type="number" min={0} defaultValue={store.delivery_radius_km ?? 0} />
            </div>
            <div>
              <label>Handling Days</label>
              <Input name="handling_time_days" type="number" min={1} defaultValue={store.handling_time_days ?? 1} />
            </div>
          </div>

          <div>
            <label>Shipping Policy</label>
            <textarea
              name="shipping_policy"
              defaultValue={store.shipping_policy ?? ""}
             
              rows={3}
              maxLength={2000}
            />
          </div>

          <div>
            <label>Return Policy</label>
            <textarea
              name="return_policy"
              defaultValue={store.return_policy ?? ""}
             
              rows={3}
              maxLength={2000}
            />
          </div>

          <Button type="submit" variant="primary" fullWidth loading={isPending}>
            Save Settings
          </Button>
        </form>
      )}

      {/* ── Analytics Tab ──────────────────────────────────────────────── */}
      {tab === "analytics" && (
        <div>
          <p>
            View detailed revenue, order trends, and top-performing items.
          </p>
          <button
            onClick={() => {
              haptics.impact("medium");
              router.push("/my-store/analytics");
            }}
           
          >
            <BarChart2 />
            Open Analytics Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
