import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  function handleChange() {}
  return (
    <div>
      <input
        type="search"
        name="search"
        id="search"
        onChange={handleChange}
        placeholder="Search items"
        className="w-full px-5 py-2 rounded-xl mt-3 outline-none text-gray-500 focus:shadow-sm transition"
      />
    </div>
  );
}

export default SearchBar;
