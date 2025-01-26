import { getTransactions } from "@/app/_lib/api";
import { formatTimestamp } from "@/utils/helpers";

async function page() {
  const { documents, total } = await getTransactions();
  return (
    <div className="px-4">
      <h1 className="text-xl font-medium">History</h1>

      <div>
        <table className="w-full bg-white border-collapse">
          <thead className="bg-gray-300">
            <tr className="text-sm text-gray-700 text-left">
              <th className="py-2 px-4">ITEM ID</th>
              <th className="py-2 px-4">ITEM NAME</th>
              <th className="py-2 px-4">ISSUED TO</th>
              <th className="py-2 px-4">QTY</th>
              <th className="py-2 px-4">ISSUED DATE</th>
              <th className="py-2 px-4">RETURNED DATE</th>
              <th className="py-2 px-4">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((transaction) => (
              <tr className="even:bg-gray-100 text-sm" key={transaction.$id}>
                <td className="px-4 py-3 border-r">{transaction.item.sku}</td>
                <td className="px-4 py-3 border-r">{transaction.item.name}</td>
                <td className="px-4 py-3 border-r">
                  {transaction.employer.name}
                </td>
                <td className="px-4 py-3 border-r">{transaction.quantity}</td>
                <td className="px-4 py-3 border-r">
                  {formatTimestamp(transaction.$createdAt)}
                </td>
                <td className="border-r">
                  {formatTimestamp(transaction.returnedDate)}
                </td>
                <td>
                  <div className="flex justify-center items-center gap-2">
                    <input type="checkbox" name="returned" id="" />
                    <span className="bg-red-200 rounded-xl px-4 py-1 text-[12px] font-semibold uppercase text-red-600">
                      issued
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
