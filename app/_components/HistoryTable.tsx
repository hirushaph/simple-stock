import { formatTimestamp } from "@/utils/helpers";
import IssueButton from "./IssueButton";
import { getTransactions } from "../_lib/api";

import Pagination from "./Pagination";

async function HistoryTable({ params }: { params: { [key: string]: string } }) {
  const { documents, total } = await getTransactions(params);

  const isEmpty = !documents || documents.length === 0;

  return (
    <>
      <div className="mb-3 mt-2">
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
            {isEmpty ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No data found
                </td>
              </tr>
            ) : (
              documents.map((transaction) => (
                <tr className="even:bg-gray-100 text-sm" key={transaction.$id}>
                  <td className="px-4 py-3 border-r">{transaction.item.sku}</td>
                  <td className="px-4 py-3 border-r">
                    {transaction.item.name}
                  </td>
                  <td className="px-4 py-3 border-r">
                    {transaction.employer.name}
                  </td>
                  <td className="px-4 py-3 border-r">{transaction.quantity}</td>
                  <td className="px-4 py-3 border-r">
                    {formatTimestamp(transaction.$createdAt)}
                  </td>
                  <td className="px-4 py-3 border-r">
                    {formatTimestamp(transaction.returnedDate)}
                  </td>
                  <td className="px-4">
                    <IssueButton transaction={transaction} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination total={total} />
    </>
  );
}

export default HistoryTable;
