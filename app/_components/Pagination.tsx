"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ITEMS_PER_PAGE } from "../_lib/const";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Pagination({ total }: { total: number }) {
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const params = new URLSearchParams(searchParams);

      if (page) {
        params.set("page", String(page));
      } else {
        params.delete("page");
      }

      replace(`${pathname}?${params.toString()}`);
    }
  };
  return (
    <div>
      {/* Prev btn */}
      <button className="bg-white">
        <FiChevronLeft />
      </button>
      {/* Pages */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm rounded ${
                currentPage === page ? "bg-blue-200 text-blue-700" : "bg-white"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
      {/* Next btn */}
      <button className="bg-white">
        <FiChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
