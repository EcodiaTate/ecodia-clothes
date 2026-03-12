import { getStudioDashboard, getMyStore, getMyBag } from "@/lib/actions/clothes";
import { ClothesClient } from "@/components/domain/clothes/clothes-client";

export default async function HomePage() {
  const [dashboard, myStore, bag] = await Promise.all([
    getStudioDashboard(),
    getMyStore(),
    getMyBag(),
  ]);

  return (
    <ClothesClient
      initialData={dashboard}
      hasStore={!!myStore}
      bagCount={bag.length}
    />
  );
}
