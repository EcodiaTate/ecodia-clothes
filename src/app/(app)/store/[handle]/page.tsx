import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStoreByHandle, getStoreReviews } from "@/lib/actions/clothes";
import { StoreDetailClient } from "@/components/domain/clothes/store-detail-client";

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function StoreDetailPage({ params }: Props) {
  const { handle } = await params;
  const store = await getStoreByHandle(handle);

  if (!store) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isOwner = !!user && store.user_id === user.id;

  const reviews = await getStoreReviews(store.id);

  return (
    <div>
      <StoreDetailClient store={store} reviews={reviews} isOwner={isOwner} />
    </div>
  );
}
