import { getFilterdStock } from "../_lib/api";
import Actions from "./Actions";

async function ManageTable() {
  const { documents, total } = await getFilterdStock();
  return (
    <table className="w-full bg-white border-collapse mt-4">
      <thead className="bg-gray-300">
        <tr className="text-sm text-gray-700 text-left">
          <th className="py-2 px-4">ITEM ID</th>
          <th className="py-2 px-4">ITEM NAME</th>
          <th className="py-2 px-4">QTY</th>
          <th className="py-2 px-4">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((item) => (
          <tr className="even:bg-gray-100 text-sm" key={item.$id}>
            <td className="px-4 py-3 border-r">{item.sku}</td>
            <td className="px-4 py-3 border-r">{item.name}</td>
            <td className="px-4 py-3 border-r">{item.stock}</td>
            <td className="px-4 py-3 border-r">
              <Actions item={item} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ManageTable;
