import { Employer, Item } from "@/types/types";
import { getFilterdStock, getFilterdUsers } from "../_lib/api";
import Actions from "./Actions";

async function ManageTable({
  type,
  query,
}: {
  type: "users" | "products";
  query?: string;
}) {
  let data: { documents?: Employer[] | Item[] } = { documents: [] };

  if (type === "users") {
    data = (await getFilterdUsers(query)) as { documents: Employer[] };
  } else {
    data = (await getFilterdStock(query)) as { documents: Item[] };
  }

  const isEmpty = !data.documents || data.documents.length === 0;

  console.log(isEmpty);

  return (
    <table className="w-full bg-white border-collapse mt-4">
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
  );
}

export default ManageTable;
