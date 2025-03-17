import ManageTable from "@/app/_components/ManageTable";
import SearchBar from "@/app/_components/SearchBar";
import Spinner from "@/app/_components/Spinner";
import Link from "next/link";
import { Suspense } from "react";
import { IoMdAddCircle } from "react-icons/io";

type UsersPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function page({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  const query = Array.isArray(params.search)
    ? params.search.join(",")
    : params.search || "";
  return (
    <div className="px-4">
      <h1 className="text-xl font-medium mb-2">Manage Users</h1>

      {/* Search bar and add new button */}
      <div className="flex justify-between items-center gap-4 mt-3">
        <Suspense fallback={<Spinner size={28} />}>
          <SearchBar className="flex-1" />
        </Suspense>

        <Link href="/users/addnew">
          <button className="flex bg-green-200 border border-green-300 py-2 gap-1 justify-center items-center rounded-xl px-4 ">
            <IoMdAddCircle />
            <span>Add New</span>
          </button>
        </Link>
      </div>

      {/* Table */}
      <Suspense
        fallback={<Spinner className="mt-8 flex" size={28} />}
        key={query}
      >
        <ManageTable type="users" query={query} params={params} />
      </Suspense>
    </div>
  );
}

export default page;
