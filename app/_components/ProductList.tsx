import { getFilterdStock } from "../_lib/api";
import ProductGrid from "./ProductGrid";

async function ProductList({ query }: { query?: string | string[] }) {
  // const normalizedQuery = Array.isArray(query) ? query[0] : query || "";
  const data = await getFilterdStock(undefined, query);
  // const length = Object.keys(data).length;

  if (data.success === false) {
    return (
      <div className="mt-4 shadow-sm bg-white p-3 text-center">
        Something went wrong!
      </div>
    );
  }
  return data.total !== 0 ? (
    <div
      className={`mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4`}
    >
      <ProductGrid data={data.documents} />
    </div>
  ) : (
    <div className="mt-4 shadow-sm bg-white p-3 text-center">
      No items found
    </div>
  );
}

export default ProductList;
