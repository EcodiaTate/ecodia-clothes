"use client";

import { useState, useTransition } from "react";
import { BarChart2, Package, ShoppingBag, Star, TrendingUp } from "lucide-react";
import { getStoreAnalytics } from "@/lib/actions/clothes";
import { formatPrice } from "@/lib/constants/clothes";
import type { StoreAnalytics, StoreWithStats } from "@/lib/actions/clothes";

type Period = 4 | 12;

type Props = {
  store: StoreWithStats;
  analytics: StoreAnalytics | null;
};

function StatCard({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  accent?: string;
}) {
  return (
    <div
     
     
    >
      <div
       
       
      >
        {icon}
      </div>
      <div>
        <p>{label}</p>
        <p>
          {value}
        </p>
        {sub && <p>{sub}</p>}
      </div>
    </div>
  );
}

function MiniBarChart({ data }: { data: { week: string; revenue: number; orders: number }[] }) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <div>
      <div>
        {data.map((d, i) => {
          const pct = d.revenue / maxRevenue;
          return (
            <div key={i}>
              <div
               
                style={{
                  height: pct > 0 ? Math.max(pct * 80, 4) + "px" : "2px",
                  background: pct > 0 ? "var(--ec-forest-500)" : "var(--surface-subtle)",
                }}
                title={formatPrice(d.revenue) + " / " + d.orders + " orders"}
              />
            </div>
          );
        })}
      </div>
      <div>
        {data.map((d, i) => (
          <div key={i}>
            {i % 3 === 0 && (
              <span>
                {d.week}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StoreAnalyticsClient({ store, analytics: initialAnalytics }: Props) {
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [period, setPeriod] = useState<Period>(12);
  const [isPending, startTransition] = useTransition();

  function handlePeriodChange(newPeriod: Period) {
    setPeriod(newPeriod);
    startTransition(async () => {
      const fresh = await getStoreAnalytics(store.id);
      setAnalytics(fresh);
    });
  }

  if (!analytics) {
    return (
      <div>
        No analytics data available yet. Start selling to see your stats here.
      </div>
    );
  }

  const chartData = period === 4
    ? analytics.revenueByWeek.slice(-4)
    : analytics.revenueByWeek;

  return (
    <div>
      {/* Summary cards */}
      <div>
        <StatCard
          label="Total Revenue"
          value={formatPrice(analytics.totalRevenue)}
          sub={analytics.completedOrders + " completed"}
          icon={<TrendingUp />}
          accent="var(--ec-forest-50)"
        />
        <StatCard
          label="Total Orders"
          value={String(analytics.totalOrders)}
          sub={analytics.cancelledOrders + " cancelled"}
          icon={<ShoppingBag />}
          accent="var(--ec-mint-50)"
        />
        <StatCard
          label="Avg Order Value"
          value={formatPrice(analytics.averageOrderValue)}
          sub="per completed order"
          icon={<BarChart2 />}
          accent="var(--ec-gold-50)"
        />
        {analytics.avgRating !== null ? (
          <StatCard
            label="Rating"
            value={analytics.avgRating.toFixed(1) + " / 5"}
            sub={analytics.reviewCount + " reviews"}
            icon={<Star />}
            accent="var(--ec-gold-50)"
          />
        ) : (
          <StatCard
            label="Active Listings"
            value={String(analytics.activeItems)}
            sub={"of " + analytics.totalItems + " total"}
            icon={<Package />}
            accent="var(--surface-subtle)"
          />
        )}
      </div>

      {/* Revenue by week */}
      <div
       
       
      >
        <div>
          <h2>Revenue by Week</h2>
          <div>
            {([4, 12] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => handlePeriodChange(p)}
               
                style={{
                  background: period === p ? "var(--surface-elevated)" : "transparent",
                  color: period === p ? "var(--text-strong)" : "var(--text-muted)",
                  boxShadow: period === p ? "var(--neo-shadow-sm)" : "none",
                }}
              >
                {p}w
              </button>
            ))}
          </div>
        </div>

        {isPending ? (
          <div>
            <div
             
             
            />
          </div>
        ) : (
          <MiniBarChart data={chartData} />
        )}

        <div>
          <span>Delivered revenue: {formatPrice(analytics.totalRevenue)}</span>
          <span>{analytics.completedOrders} orders</span>
        </div>
      </div>

      {/* Top items */}
      {analytics.topItems.length > 0 && (
        <div
         
         
        >
          <h2>Top Items by Revenue</h2>
          {analytics.topItems.map((item, i) => (
            <div key={item.id}>
              <div
               
                style={{
                  background: i === 0
                    ? "var(--ec-gold-400)"
                    : i === 1
                      ? "var(--ec-gray-300)"
                      : "var(--surface-subtle)",
                  color: i < 2 ? "#1a1a1a" : "var(--text-muted)",
                }}
              >
                {i + 1}
              </div>
              <div>
                <p>{item.title}</p>
                <p>
                  {item.orders} order{item.orders !== 1 ? "s" : ""}
                </p>
              </div>
              <span
               
               
              >
                {formatPrice(item.revenue)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Listings footer */}
      <div
       
       
      >
        <span>Active listings</span>
        <span>{analytics.activeItems} / {analytics.totalItems}</span>
      </div>
    </div>
  );
}
