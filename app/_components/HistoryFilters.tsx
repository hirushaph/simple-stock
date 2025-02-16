"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DatePicker } from "./DatePicker";

function HistoryFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedFilter = searchParams.get("sort");

  console.log(selectedFilter);

  function handleSortingChange(sorting: string) {
    const params = new URLSearchParams(searchParams);

    if (sorting) {
      params.set("sort", String(sorting));
    } else {
      params.delete("sort");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex justify-between items-center mt-3">
      {/* Left filters */}
      <div>
        <button
          className={` text-[0.8rem]  py-1 px-2 rounded-sm hover:bg-blue-200 transition  ${
            selectedFilter === "today" ? "bg-blue-200" : "bg-white"
          } `}
          onClick={() => handleSortingChange("today")}
        >
          Today
        </button>
        <button
          className={` text-[0.8rem]  py-1 px-2 rounded-sm hover:bg-blue-200 transition  ${
            selectedFilter === "7days" ? "bg-blue-200" : "bg-white"
          } `}
          onClick={() => handleSortingChange("7days")}
        >
          Last 7 days
        </button>
      </div>

      {/* Right Filters */}

      <div>
        <DatePicker />
      </div>
    </div>
  );
}

export default HistoryFilters;
