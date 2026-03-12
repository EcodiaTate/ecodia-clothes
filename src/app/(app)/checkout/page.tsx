import { redirect } from "next/navigation";
import { getBagItems, getShippingAddresses } from "@/lib/actions/clothes";
import { CheckoutClient } from "@/components/domain/clothes/checkout-client";

export default async function CheckoutPage() {
  const [bagItems, addresses] = await Promise.all([
    getBagItems(),
    getShippingAddresses(),
  ]);

  if (!bagItems || bagItems.length === 0) {
    redirect("/bag");
  }

  return (
    <div>
      <CheckoutClient bagItems={bagItems} savedAddresses={addresses} />
    </div>
  );
}
