import { Employer, Item } from "@/types/types";
import { getFilterdStock, getFilterdUsers } from "../_lib/api";
import Actions from "./Actions";
import Pagination from "./Pagination";

async function ManageTable({
  type,
  query,
  params,
}: {
  type: "users" | "products";
  query?: string;
  params: { [key: string]: string | string[] | undefined };
}) {
  let data: { documents?: Employer[] | Item[]; total: number } = {
    documents: [],
    total: 0,
  };

  console.log(params);

  const pageNo = Number(params?.page) || 1;

  if (type === "users") {
    data = (await getFilterdUsers(pageNo, query)) as {
      documents: Employer[];
      total: number;
    };
  } else {
    data = (await getFilterdStock(pageNo, query)) as {
      documents: Item[];
      total: number;
    };
  }

  const isEmpty = !data.documents || data.documents.length === 0;

  return (
    <>
      <table className="w-full bg-white border-collapse mt-4 mb-4">
        <thead className="bg-gray-300">
          {type === "products" ? (
            <tr className="text-sm text-gray-700 text-left">
              <th className="py-2 px-4">ITEM ID</th>
              <th className="py-2 px-4">ITEM NAME</th>
              <th className="py-2 px-4">QTY</th>
              <th className="py-2 px-4">ACTION</th>
            </tr>
          ) : (
            <tr className="text-sm text-gray-700 text-left">
              <th className="py-2 px-4">USER ID</th>
              <th className="py-2 px-4">USER NAME</th>
              <th className="py-2 px-4">ACTION</th>
            </tr>
          )}
        </thead>
        <tbody>
          {isEmpty ? (
            <tr>
              <td
                colSpan={type === "products" ? 4 : 3}
                className="text-center py-4"
              >
                No data found
              </td>
            </tr>
          ) : type === "products" ? (
            data.documents?.map((item) => (
              <tr className="even:bg-gray-100 text-sm" key={item.$id}>
                <td className="px-4 py-3 border-r">{item.sku}</td>
                <td className="px-4 py-3 border-r">{item.name}</td>
                <td className="px-4 py-3 border-r">{item.stock}</td>
                <td className="px-4 py-3 border-r">
                  <Actions item={item} edit={true} type={type} />
                </td>
              </tr>
            ))
          ) : (
            data.documents?.map((item) => (
              <tr className="even:bg-gray-100 text-sm" key={item.$id}>
                <td className="px-4 py-3 border-r">{item.eid}</td>
                <td className="px-4 py-3 border-r">{item.name}</td>
                <td className="px-4 py-3 border-r">
                  <Actions item={item} type={type} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination total={data.total} />
    </>
  );
}

export default ManageTable;
