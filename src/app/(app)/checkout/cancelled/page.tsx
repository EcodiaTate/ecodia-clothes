import Link from "next/link";
import { ArrowLeft, XCircle } from "lucide-react";

export default function CheckoutCancelledPage() {
  return (
    <div>
      <div
       
       
      >
        <XCircle />
      </div>

      <div>
        <h1>Payment Cancelled</h1>
        <p>
          No payment was taken. Your bag is still saved and ready when you are.
        </p>
      </div>

      <Link
        href="/checkout"
       
      >
        Try Again
      </Link>

      <Link
        href="/bag"
       
      >
        <ArrowLeft />
        Back to Bag
      </Link>
    </div>
  );
}
