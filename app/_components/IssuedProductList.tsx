import { getIssuedItems } from "../_lib/api";
import IssuedGrid from "./IssuedGrid";

async function IssuedProductList() {
  const data = await getIssuedItems();

  if (data.success === false) {
    return (
      <div className="mt-4 shadow-sm bg-white p-3 text-center">
        Something went wrong!
      </div>
    );
  }

  return data.total !== 0 && data.documents ? (
    <div
      className={`mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4`}
    >
      <IssuedGrid data={data.documents} />
    </div>
  ) : (
    <div className="mt-4 shadow-sm bg-white p-3 text-center">
      No items found
    </div>
  );
}

export default IssuedProductList;
