import { getTransactions } from "@/app/_lib/api";
import { formatTimestamp } from "@/utils/helpers";

async function page() {
  const { documents, total } = await getTransactions();
  return (
    <div className="px-4">
      <h1 className="text-xl font-medium">History</h1>

      <div>
        <table className="w-full bg-white">
          <thead className="bg-gray-300 ">
            <tr className="text-sm text-gray-700 text-left">
              <th className="py-2 px-4">ITEM ID</th>
              <th>ITEM NAME</th>
              <th>ISSUED TO</th>
              <th>QUANTITY</th>
              <th>ISSUED DATE</th>
              <th>RETURNED DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((transaction) => (
              <tr className="even:bg-gray-100 text-sm" key={transaction.$id}>
                <td className="px-4 py-3">{transaction.item.sku}</td>
                <td>{transaction.item.name}</td>
                <td>{transaction.employer.name}</td>
                <td>{transaction.quantity}</td>
                <td>{formatTimestamp(transaction.$createdAt)}</td>
                <td>{formatTimestamp(transaction.returnedDate)}</td>
                <td>
                  <span className="bg-red-200 rounded-xl px-4 py-1 text-[12px] font-semibold uppercase text-red-600">
                    issued
                  </span>
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
