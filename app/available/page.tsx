import { Suspense } from "react";
import ProductList from "../_components/ProductList";
import SearchBar from "../_components/SearchBar";
import Spinner from "../_components/Spinner";

export default function Available() {
  return (
    <div className="px-4">
      <h1 className="text-xl font-medium">Available Items</h1>

      <SearchBar />

      <Suspense fallback={<Spinner />}>
        <ProductList />
      </Suspense>
    </div>
  );
}
