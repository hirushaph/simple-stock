import { SessionCookie } from "@/types/types";
import { getFilterdStock } from "../_lib/api";
import ProductGrid from "./ProductGrid";

async function ProductList({
  query,
  sessionCookie,
}: {
  query?: string | string[];
  sessionCookie?: SessionCookie;
}) {
  const data = await getFilterdStock(query, sessionCookie);
  // const length = Object.keys(data).length;

  return (
    <div
      className={`mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4`}
    >
      <ProductGrid data={data.documents} />
    </div>
  );
}

export default ProductList;
