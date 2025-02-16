import { TransactionType } from "@/types/types";
import Product from "./Product";

type IssuedGridProps = {
  data: {
    documents: TransactionType[];
    total: number;
  };
};

function IssuedGrid({ data: { documents } }: IssuedGridProps) {
  return (
    <>
      {documents.map((item) => (
        <Product
          key={item.$id}
          item={item.item}
          stock={item.quantity}
          cursor="default"
        >
          <div className="bg-blue-100 py-1 px-2 rounded-md flex flex-col mt-2">
            <span className="text-[0.7rem] text-gray-600">Issued to </span>
            <span className="text-[0.9rem] text-gray-700">
              {item.employer.name}
            </span>
          </div>
        </Product>
      ))}
    </>
  );
}

export default IssuedGrid;
