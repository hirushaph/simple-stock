import HistoryFilters from "@/app/_components/HistoryFilters";
import HistoryTable from "@/app/_components/HistoryTable";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  // const pageNumber = Number(params?.page) || 1;
  return (
    <div className="px-4">
      <h1 className="text-xl font-medium">History</h1>
      {/* filters */}
      <HistoryFilters />

      {/* History table */}
      <Suspense fallback={<Spinner />} key={JSON.stringify(params)}>
        <HistoryTable params={params} />
      </Suspense>
    </div>
  );
}

export default page;
