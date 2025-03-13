import AddNewForm from "@/app/_components/AddNewForm";
import { getItemBySku } from "@/app/_lib/api";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const { document } = await getItemBySku(id);

  return (
    <div>
      <AddNewForm data={document} update={true} />
    </div>
  );
}

export default page;
