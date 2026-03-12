import Link from "next/link";
import { CheckCircle, Package } from "lucide-react";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  return (
    <div>
      <div
       
       
      >
        <CheckCircle />
      </div>

      <div>
        <h1>Order placed!</h1>
        <p>
          Your payment was successful. The seller will be notified and will begin preparing your order.
        </p>
        {session_id && (
          <p>
            Ref: {session_id.slice(0, 24)}...
          </p>
        )}
      </div>

      <Link
        href="/orders"
       
      >
        <Package />
        View My Orders
      </Link>

      <Link
        href="/"
       
      >
        Continue Shopping
      </Link>
    </div>
  );
}
