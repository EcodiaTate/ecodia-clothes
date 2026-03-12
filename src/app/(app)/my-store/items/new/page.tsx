import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getMyStore } from "@/lib/actions/clothes";
import { ItemForm } from "@/components/domain/clothes/item-form";

export default async function NewItemPage() {
  const store = await getMyStore();

  if (!store) {
    redirect("/apply");
  }

  return (
    <div>
      <Link
        href="/my-store"
       
      >
        <ArrowLeft />
        Back to My Store
      </Link>

      <h1>List New Item</h1>

      <ItemForm storeId={store.id} />
    </div>
  );
}
