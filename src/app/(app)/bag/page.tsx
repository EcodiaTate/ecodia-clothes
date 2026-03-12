import { getMyBag } from "@/lib/actions/clothes";
import { BagClient } from "@/components/domain/clothes/bag-client";

export default async function BagPage() {
  const bag = await getMyBag();

  return (
    <div>
      <BagClient initialItems={bag} />
    </div>
  );
}
