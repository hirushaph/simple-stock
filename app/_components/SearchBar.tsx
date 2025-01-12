"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useDebouncedCallback;

  const handleChange = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <input
        type="search"
        name="search"
        id="search"
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search items"
        defaultValue={searchParams.get("search")?.toString()}
        className="w-full px-5 py-2 rounded-xl mt-3 outline-none text-gray-500 focus:shadow-sm transition"
      />
    </div>
  );
}

export default SearchBar;
