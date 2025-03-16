import AddNewForm from "@/app/_components/AddNewForm";

async function page() {
  return (
    <div className="px-4">
      <h1 className="text-xl font-medium mb-2">Add New Item</h1>

      {/* Form container */}
      <AddNewForm />
    </div>
  );
}

export default page;
