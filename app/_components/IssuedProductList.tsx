import { getIssuedItems } from "../_lib/api";
import IssuedGrid from "./IssuedGrid";

async function IssuedProductList() {
  const data = await getIssuedItems();
  return (
    <div
      className={`mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4`}
    >
      <IssuedGrid data={data} />
    </div>
  );
}

export default IssuedProductList;
