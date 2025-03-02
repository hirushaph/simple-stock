import ManageTable from "@/app/_components/ManageTable";
import SearchBar from "@/app/_components/SearchBar";
import Link from "next/link";
import { IoMdAddCircle } from "react-icons/io";

function page() {
  return (
    <div className="px-4">
      <h1 className="text-xl font-medium">Manage</h1>

      {/* Search bar and add new button */}
      <div className="flex justify-between items-center gap-4 mt-3">
        <SearchBar className="flex-1" />
        <Link href="/manage/addnew">
          <button className="flex bg-green-200 border border-green-300 py-2 gap-1 justify-center items-center rounded-xl px-4 ">
            <IoMdAddCircle />
            <span>Add New</span>
          </button>
        </Link>
      </div>

      {/* Table */}
      <ManageTable />
    </div>
  );
}

export default page;
