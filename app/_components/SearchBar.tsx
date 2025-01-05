import { useState } from "react";
import { searchItems } from "../_lib/api";
import { StockItemType } from "@/types/types";

type SearchBarProps = {
  setProducts: React.Dispatch<React.SetStateAction<StockItemType[]>>;
};

function SearchBar({ setProducts }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const results = await searchItems(query);
    setProducts(results);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          name="search"
          id="search"
          value={query}
          onChange={handleChange}
          placeholder="Search items"
          className="w-full px-5 py-2 rounded-xl mt-3 outline-none text-gray-500 focus:shadow-sm transition"
        />
      </form>
    </div>
  );
}

export default SearchBar;
