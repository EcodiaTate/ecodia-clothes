"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  MessageCircle,
  Star,
  Truck,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusPill } from "./order-status-pill";
import { MessageThread } from "./message-thread";
import { StarRating } from "./star-rating";
import { useHaptic } from "@/lib/hooks/use-haptics";
import { updateOrderStatus, submitReview } from "@/lib/actions/clothes";
import { formatPrice, ORDER_STATUS_CONFIG } from "@/lib/constants/clothes";
import type { OrderWithDetails } from "@/lib/actions/clothes";
import type { StudioMessage, StudioReview, OrderStatus } from "@/types/domain";

type MessageWithSender = StudioMessage & {
  sender: { display_name: string | null; avatar_url: string | null } | null;
};

type ReviewWithReviewer = StudioReview & {
  reviewer: { display_name: string | null; avatar_url: string | null } | null;
};

type Tab = "details" | "messages" | "review";

type Props = {
  order: OrderWithDetails;
  messages: MessageWithSender[];
  existingReview: ReviewWithReviewer | null;
  currentUserId: string;
  role: "buyer" | "seller";
};

export function OrderDetailClient({
  order,
  messages,
  existingReview,
  currentUserId,
  role,
}: Props) {
  const router = useRouter();
  const haptics = useHaptic();
  const [tab, setTab] = useState<Tab>("details");
  const [currentStatus, setCurrentStatus] = useState(order.status ?? "pending");
  const [isPending, startTransition] = useTransition();
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewBody, setReviewBody] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(!!existingReview);

  const item = order.item;
  const images = item && Array.isArray(item.images) ? (item.images as string[]) : [];
  const heroImage = images[0] ?? null;

  function handleStatusUpdate(newStatus: OrderStatus) {
    haptics.impact("heavy");
    startTransition(async () => {
      const result = await updateOrderStatus({
        orderId: order.id,
        status: newStatus,
      });
      if (!("error" in result)) {
        setCurrentStatus(newStatus);
        haptics.notify("success");
      } else {
        haptics.notify("error");
      }
    });
  }

  function handleSubmitReview() {
    if (reviewRating === 0) return;
    haptics.impact("heavy");

    startTransition(async () => {
      const result = await submitReview({
        orderId: order.id,
        storeId: order.store?.id ?? "",
        rating: reviewRating,
        body: reviewBody,
      });
      if (!("error" in result)) {
        setReviewSubmitted(true);
        haptics.notify("success");
      } else {
        haptics.notify("error");
      }
    });
  }

  const sellerNextStatuses: Record<string, OrderStatus[]> = {
    pending: [],
    paid: ["preparing"],
    preparing: ["shipped"],
    shipped: ["delivered"],
    delivered: [],
    cancelled: [],
  };

  return (
    <div>
      {/* Back */}
      <button
        onClick={() => {
          haptics.impact("light");
          router.back();
        }}
       
      >
        <ArrowLeft />
        Back
      </button>

      {/* Order header */}
      <div>
        {heroImage ? (
          <img src={heroImage} alt="" />
        ) : (
          <div>
            <Package />
          </div>
        )}
        <div>
          <h1>{item?.title ?? "Order"}</h1>
          <p>
            {formatPrice(order.amount_cents ?? item?.price_cents ?? 0)}
          </p>
          <div>
            <OrderStatusPill status={currentStatus as OrderStatus} size="md" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div>
        {(
          [
            { key: "details" as Tab, label: "Details", icon: <Package /> },
            { key: "messages" as Tab, label: "Messages", icon: <MessageCircle /> },
            ...(role === "buyer" ? [{ key: "review" as Tab, label: "Review", icon: <Star /> }] : []),
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            style={tab === t.key ? { background: "var(--surface-elevated)", color: "var(--text-strong)" } : {}}
            onClick={() => {
              haptics.impact("light");
              setTab(t.key);
            }}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Details Tab ──────────────────────────────────────────── */}
      {tab === "details" && (
        <div>
          {/* Timeline */}
          <Card padding="md">
            <h3>Order Timeline</h3>
            <div>
              {(Object.keys(ORDER_STATUS_CONFIG) as OrderStatus[]).map((status) => {
                const config = ORDER_STATUS_CONFIG[status];
                const isActive = status === currentStatus;
                const isPast =
                  Object.keys(ORDER_STATUS_CONFIG).indexOf(status) <=
                  Object.keys(ORDER_STATUS_CONFIG).indexOf(currentStatus);

                return (
                  <div key={status}>
                    <div
                     
                      style={{
                        background: isPast ? config.color : "var(--ec-gray-200)",
                        boxShadow: isActive ? `0 0 0 4px ${config.color}33` : undefined,
                      }}
                    />
                    <span
                     
                    >
                      {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Tracking */}
          {order.tracking_number && (
            <Card padding="md">
              <h3>
                <Truck />
                Tracking
              </h3>
              <p>{order.tracking_number}</p>
              {order.tracking_url && (
                <a
                  href={order.tracking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                 
                 
                >
                  Track Shipment <ExternalLink />
                </a>
              )}
            </Card>
          )}

          {/* Seller actions */}
          {role === "seller" && (sellerNextStatuses[currentStatus] ?? []).length > 0 && (
            <div>
              <h3>Update Status</h3>
              <div>
                {(sellerNextStatuses[currentStatus] ?? []).map((nextStatus) => (
                  <Button
                    key={nextStatus}
                    variant="primary"
                    size="sm"
                    loading={isPending}
                    onClick={() => handleStatusUpdate(nextStatus)}
                  >
                    Mark as {ORDER_STATUS_CONFIG[nextStatus].label}
                  </Button>
                ))}
                {currentStatus !== "cancelled" && currentStatus !== "delivered" && (
                  <Button
                    variant="danger"
                    size="sm"
                    loading={isPending}
                    onClick={() => handleStatusUpdate("cancelled")}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Participants */}
          <Card padding="md">
            <div>
              {order.buyerProfile && (
                <div>
                  {order.buyerProfile.avatar_url && (
                    <img src={order.buyerProfile.avatar_url} alt="" />
                  )}
                  <div>
                    <p>Buyer</p>
                    <p>{order.buyerProfile.display_name ?? "Unknown"}</p>
                  </div>
                </div>
              )}
              {order.sellerProfile && (
                <div>
                  {order.sellerProfile.avatar_url && (
                    <img src={order.sellerProfile.avatar_url} alt="" />
                  )}
                  <div>
                    <p>Seller</p>
                    <p>{order.sellerProfile.display_name ?? "Unknown"}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* ── Messages Tab ──────────────────────────────────────────── */}
      {tab === "messages" && (
        <div>
          <MessageThread
            orderId={order.id}
            messages={messages}
            currentUserId={currentUserId}
          />
        </div>
      )}

      {/* ── Review Tab ──────────────────────────────────────────── */}
      {tab === "review" && role === "buyer" && (
        <Card padding="md">
          {reviewSubmitted ? (
            <div>
              <Star />
              <p>
                {existingReview ? `You rated this ${existingReview.rating}/5` : "Review submitted!"}
              </p>
            </div>
          ) : (
            <div>
              <h3>Leave a Review</h3>
              <StarRating value={reviewRating} onChange={setReviewRating} />
              <textarea
                value={reviewBody}
                onChange={(e) => setReviewBody(e.target.value)}
                placeholder="Tell others about your experience..."
               
                rows={3}
                maxLength={1000}
              />
              <Button
                variant="primary"
                fullWidth
                loading={isPending}
                onClick={handleSubmitReview}
                disabled={reviewRating === 0}
              >
                Submit Review
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
