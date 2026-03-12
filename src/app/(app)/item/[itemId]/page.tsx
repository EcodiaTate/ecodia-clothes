import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getItemById } from "@/lib/actions/clothes";
import { ItemDetailClient } from "@/components/domain/clothes/item-detail-client";

type Props = {
  params: Promise<{ itemId: string }>;
};

export default async function ItemDetailPage({ params }: Props) {
  const { itemId } = await params;
  const item = await getItemById(itemId);

  if (!item) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isOwner = false;
  if (user && item.store) {
    const { data: store } = await supabase
      .from("studio_stores")
      .select("user_id")
      .eq("id", item.store.id)
      .single();

    isOwner = store?.user_id === user.id;
  }

  return (
    <div>
      <ItemDetailClient item={item} isOwner={isOwner} />
    </div>
  );
}
