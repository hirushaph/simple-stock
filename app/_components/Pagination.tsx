"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ITEMS_PER_PAGE, MAX_VISIBLE_PAGES } from "../_lib/const";
import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Pagination({ total }: { total: number }) {
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentPageNo = Number(searchParams.get("page")) || 1;

  const [isPending, startTransition] = useTransition();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const params = new URLSearchParams(searchParams);

      if (page) {
        params.set("page", String(page));
      } else {
        params.delete("page");
      }

      startTransition(() => {
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }
  };

  const getVisiblePages = () => {
    let pages: (number | string)[] = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const half = Math.floor(MAX_VISIBLE_PAGES / 2);
      let start = Math.max(2, currentPageNo - half);
      const end = Math.min(totalPages - 1, currentPageNo + half);

      if (start > 2) pages.push(1, "..."); // Show first page + ellipsis
      else start = 1;

      pages.push(
        ...Array.from({ length: end - start + 1 }, (_, i) => start + i)
      );

      if (end < totalPages - 1)
        pages.push("...", totalPages); // Show last page + ellipsis
      else if (end === totalPages - 1) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex gap-2 items-center">
      {/* Prev Button */}
      <button
        className="bg-white p-1 rounded disabled:opacity-50"
        onClick={() => handlePageChange(currentPageNo - 1)}
        disabled={currentPageNo === 1 || isPending}
      >
        <FiChevronLeft />
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {getVisiblePages().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm rounded ${
                currentPageNo === page
                  ? "bg-blue-200 text-blue-700"
                  : "bg-white"
              } hover:bg-blue-100 transition `}
              disabled={isPending}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 text-gray-500">
              {page}
            </span>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        className="bg-white p-1 rounded disabled:opacity-50"
        onClick={() => handlePageChange(currentPageNo + 1)}
        disabled={currentPageNo === totalPages || isPending}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
