import AddUserForm from "@/app/_components/AddUserForm";

function addnew() {
  return (
    <div className="px-4">
      <h1 className="text-xl font-medium">Add user</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <AddUserForm />
      </div>
    </div>
  );
}

export default addnew;
