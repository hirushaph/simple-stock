import Image from "next/image";
import { getAvailableStock } from "../_lib/api";

async function ProductList() {
  const data = await getAvailableStock();
  return (
    <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
      {data.map((item) => (
        <div key={item.sku} className="bg-white p-3 rounded-md shadow-sm">
          <div className="rounded-md overflow-hidden relative aspect-[4/3] ">
            <Image
              src={item.image}
              alt="hehe"
              fill
              style={{ objectFit: "cover" }}
              className="aspect-[4/3]"
            />
          </div>
          <div className="mt-2 flex justify-between items-center">
            <h2 className="text-[16px]">{item.name}</h2>
            <div className=" bg-green-100 text-sm rounded-[50%] w-6 h-6 flex items-center justify-center">
              {item.stock}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
