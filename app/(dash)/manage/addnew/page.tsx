import AddNewForm from "@/app/_components/AddNewForm";

function page() {
  return (
    <div className="px-4">
      <h1 className="text-xl font-medium">Add New Item</h1>

      {/* Form container */}
      <AddNewForm />
    </div>
  );
}

export default page;
