"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      params.set("search", e.target.value);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <input
        type="search"
        name="search"
        id="search"
        onChange={handleChange}
        placeholder="Search items"
        defaultValue={searchParams.get("search")?.toString()}
        className="w-full px-5 py-2 rounded-xl mt-3 outline-none text-gray-500 focus:shadow-sm transition"
      />
    </div>
  );
}

export default SearchBar;
