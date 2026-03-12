import { redirect } from "next/navigation";
import { ArrowLeft, Palette } from "lucide-react";
import Link from "next/link";
import { getMyStore } from "@/lib/actions/clothes";
import { StoreApplicationForm } from "@/components/domain/clothes/store-application-form";

export default async function ApplyPage() {
  const store = await getMyStore();

  if (store) {
    redirect("/my-store");
  }

  return (
    <div>
      <Link
        href="/"
       
      >
        <ArrowLeft />
        Back to Clothes
      </Link>

      <div>
        <div
         
         
        >
          <Palette />
        </div>
        <h1>Open Your Store</h1>
        <p>
          Sell pre-loved clothes, accessories, and more to the Ecodia Clothes community.
          Applications are reviewed to ensure quality and sustainability alignment.
        </p>
      </div>

      <StoreApplicationForm />
    </div>
  );
}
