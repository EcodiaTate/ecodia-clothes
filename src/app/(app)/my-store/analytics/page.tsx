import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getMyStore, getStoreAnalytics } from "@/lib/actions/clothes";
import { StoreAnalyticsClient } from "@/components/domain/clothes/store-analytics-client";

export default async function StoreAnalyticsPage() {
  const store = await getMyStore();
  if (!store) redirect("/apply");

  const analytics = await getStoreAnalytics(store.id);

  return (
    <div>
      <Link
        href="/my-store"
       
      >
        <ArrowLeft />
        Back to My Store
      </Link>

      <h1>Store Analytics</h1>
      <p>
        @{store.handle} &middot; Revenue is counted for delivered orders only
      </p>

      <StoreAnalyticsClient store={store} analytics={analytics} />
    </div>
  );
}
