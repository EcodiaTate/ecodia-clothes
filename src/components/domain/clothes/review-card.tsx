"use client";

import { Star } from "lucide-react";
import type { StudioReview } from "@/types/domain";

type ReviewWithReviewer = StudioReview & {
  reviewer: { display_name: string | null; avatar_url: string | null } | null;
};

type Props = {
  review: ReviewWithReviewer;
};

export function ReviewCard({ review }: Props) {
  return (
    <div>
      <div>
        {review.reviewer?.avatar_url ? (
          <img
            src={review.reviewer.avatar_url}
            alt=""
           
          />
        ) : (
          <div
           
           
          >
            {(review.reviewer?.display_name ?? "?")[0].toUpperCase()}
          </div>
        )}

        <div>
          <p>
            {review.reviewer?.display_name ?? "Anonymous"}
          </p>
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
               
                style={{
                  color: i < review.rating ? "var(--ec-gold-500)" : "var(--ec-gray-300)",
                  fill: i < review.rating ? "var(--ec-gold-500)" : "transparent",
                }}
              />
            ))}
          </div>
        </div>

        <span>
          {new Date(review.created_at ?? "").toLocaleDateString("en-AU", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>

      {review.body && (
        <p>{review.body}</p>
      )}
    </div>
  );
}
