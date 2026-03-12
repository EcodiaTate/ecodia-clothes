"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Store, ShoppingBag, Package, Palette, Recycle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ItemCard } from "./item-card";
import { StoreCard } from "./store-card";
import { useHaptic } from "@/lib/hooks/use-haptics";
import type { StudioDashboard } from "@/lib/actions/clothes";

type Tab = "browse" | "stores";

type Props = {
  initialData: StudioDashboard;
  hasStore: boolean;
  bagCount: number;
};

export function ClothesClient({ initialData, hasStore, bagCount }: Props) {
  const router = useRouter();
  const haptics = useHaptic();
  const [tab, setTab] = useState<Tab>("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  function handleTabChange(newTab: Tab) {
    haptics.impact("light");
    setTab(newTab);
  }

  function handleItemClick(itemId: string) {
    haptics.impact("light");
    router.push(`/item/${itemId}`);
  }

  function handleStoreClick(handle: string) {
    haptics.impact("light");
    router.push(`/store/${handle}`);
  }

  const filteredItems = searchQuery
    ? initialData.featuredItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.category ?? "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    : initialData.featuredItems;

  const filteredStores = searchQuery
    ? initialData.recentStores.filter(
        (store) =>
          (store.handle ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (store.bio ?? "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    : initialData.recentStores;

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: "var(--spacing-lg)" }}>
        {/* Eyebrow line */}
        <div className="hero-eyebrow">
          ♻ Upcycled Marketplace
        </div>

        {/* Editorial display heading */}
        <h1 className="hero-heading">
          SECOND
          <br />
          LIFE
          <span className="hero-heading-accent">FITS.</span>
        </h1>

        <p className="hero-sub">
          Pre-loved. Upcycled. Yours.{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-rust)" }}>
            Every thread has a story.
          </em>
        </p>

        {/* CTA row */}
        <div className="flex gap-md flex-wrap" style={{ marginBottom: "var(--spacing-lg)" }}>
          {hasStore ? (
            <button
              className="button"
              onClick={() => {
                haptics.impact("medium");
                router.push("/my-store");
              }}
            >
              <Store size={16} strokeWidth={1.75} />
              My Store
            </button>
          ) : (
            <button
              className="button"
              onClick={() => {
                haptics.impact("medium");
                router.push("/apply");
              }}
            >
              <Palette size={16} strokeWidth={1.75} />
              Open a Store
            </button>
          )}

          <button
            className="button"
            data-variant="secondary"
            onClick={() => {
              haptics.impact("light");
              router.push("/bag");
            }}
          >
            <ShoppingBag size={16} strokeWidth={1.75} />
            Bag{bagCount > 0 ? ` (${bagCount})` : ""}
          </button>

          <button
            className="button"
            data-variant="tertiary"
            onClick={() => {
              haptics.impact("light");
              router.push("/orders");
            }}
          >
            <Package size={16} strokeWidth={1.75} />
            Orders
          </button>
        </div>

        {/* Divider with recycling mark */}
        <div className="hero-divider">
          <Recycle size={14} style={{ color: "var(--color-sage)", flexShrink: 0 }} strokeWidth={1.75} />
        </div>
      </div>

      {/* ── TABS ─────────────────────────────────────────────────────────── */}
      <div className="tab-bar">
        {(
          [
            { key: "browse" as Tab, label: "Browse", icon: <Search size={14} strokeWidth={1.75} /> },
            { key: "stores" as Tab, label: "Stores", icon: <Store size={14} strokeWidth={1.75} /> },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            className="tab-item"
            data-active={tab === t.key}
            onClick={() => handleTabChange(t.key)}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* ── SEARCH ───────────────────────────────────────────────────────── */}
      <div className="search-wrap">
        <Search size={16} className="search-icon" strokeWidth={1.75} />
        <input
          ref={searchRef}
          type="text"
          className="search-input"
          placeholder={
            tab === "browse" ? "Search items, categories..." : "Search stores..."
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Result count */}
      {searchQuery && (
        <div
          style={{
            fontFamily: "var(--font-family-mono)",
            fontSize: "var(--font-size-xs)",
            color: "var(--color-text-muted)",
            letterSpacing: "0.08em",
            marginBottom: "var(--spacing-lg)",
            marginTop: "calc(var(--spacing-sm) * -1)",
          }}
        >
          {tab === "browse" ? filteredItems.length : filteredStores.length}{" "}
          result{(tab === "browse" ? filteredItems.length : filteredStores.length) !== 1 ? "s" : ""}{" "}
          for &ldquo;{searchQuery}&rdquo;
        </div>
      )}

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {/* Browse tab */}
        {tab === "browse" && (
          <motion.div
            key="browse"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          >
            {filteredItems.length === 0 ? (
              <EmptyState
                icon={<ShoppingBag size={40} strokeWidth={1} />}
                title="No items yet"
                sub={searchQuery ? "Try a different search" : "Be the first to list something"}
              />
            ) : (
              <>
                <div className="section-header">
                  <span className="section-title">Drops</span>
                  <span className="section-count">
                    {filteredItems.length} piece{filteredItems.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-2 animate-stagger">
                  {filteredItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onClick={() => handleItemClick(item.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Stores tab */}
        {tab === "stores" && (
          <motion.div
            key="stores"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          >
            {filteredStores.length === 0 ? (
              <EmptyState
                icon={<Store size={40} strokeWidth={1} />}
                title="No stores yet"
                sub={searchQuery ? "Try a different search" : "Stores appear here after approval"}
              />
            ) : (
              <>
                <div className="section-header">
                  <span className="section-title">Stores</span>
                  <span className="section-count">
                    {filteredStores.length} seller{filteredStores.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 animate-stagger">
                  {filteredStores.map((store) => (
                    <StoreCard
                      key={store.id}
                      store={store}
                      onClick={() => handleStoreClick(store.handle ?? store.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Empty State ──────────────────────────────────────────────────────────── */
function EmptyState({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <div className="empty-state-title">{title}</div>
      <p className="empty-state-sub">{sub}</p>
    </div>
  );
}
