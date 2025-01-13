import { getFilterdStock } from "../_lib/api";
import Product from "./Product";
import ProductGrid from "./ProductGrid";

async function ProductList({ query }: { query?: string | string[] }) {
  const data = await getFilterdStock(query);
  // const length = Object.keys(data).length;

  return (
    <div
      className={`mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4`}
    >
      <ProductGrid data={data} />
    </div>
  );
}

export default ProductList;
