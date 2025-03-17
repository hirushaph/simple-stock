import AddNewForm from "@/app/_components/AddNewForm";
import { getItemBySku } from "@/app/_lib/api";
import { redirect } from "next/navigation";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const { document } = await getItemBySku(id);

  if (!document) {
    redirect("/products");
  }

  return (
    <div>
      <AddNewForm data={document} update={true} />
    </div>
  );
}

export default page;
