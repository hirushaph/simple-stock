import IssueButton from "@/app/_components/IssueButton";
import Pagination from "@/app/_components/Pagination";
import { getTransactions } from "@/app/_lib/api";
import { formatTimestamp } from "@/utils/helpers";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const pageNumber = Number(params?.page) || 1;
  const { documents, total } = await getTransactions(pageNumber);
  return (
    <div className="px-4">
      <h1 className="text-xl font-medium">History</h1>

      <div className="mb-3">
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
                <td className="px-4 py-3 border-r">
                  {formatTimestamp(transaction.returnedDate)}
                </td>
                <td className="px-4">
                  <IssueButton isRecived={transaction.returned} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination total={total} />
    </div>
  );
}

export default page;
