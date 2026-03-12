import { redirect } from "next/navigation";
import { getMyStore, getMyItems, getMyOrders } from "@/lib/actions/clothes";
import { MyStoreClient } from "@/components/domain/clothes/my-store-client";
import { StripeConnectSetup } from "@/components/domain/clothes/stripe-connect-setup";

export default async function MyStorePage() {
  const store = await getMyStore();

  if (!store) {
    redirect("/apply");
  }

  const [items, orders] = await Promise.all([
    getMyItems(),
    getMyOrders("seller"),
  ]);

  return (
    <div>
      {!store.stripe_account_id && (
        <div>
          <StripeConnectSetup stripeAccountId={store.stripe_account_id ?? null} />
        </div>
      )}
      <MyStoreClient store={store} items={items} orders={orders} />
    </div>
  );
}
