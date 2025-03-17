"use client";

import { StockItemType } from "@/types/types";
import Image from "next/image";

function Product({
  item,
  onModalOpen,
  stock,
  children,
  cursor = "pointer",
}: {
  item: StockItemType;
  onModalOpen?: (item: StockItemType) => void;
  stock?: number;
  children?: React.ReactNode;
  cursor?: "default" | "pointer";
}) {
  return (
    <div
      key={item.sku}
      className={`bg-white p-3 rounded-md shadow-sm cursor-${cursor}`}
      {...(onModalOpen && { onClick: () => onModalOpen(item) })}
    >
      <div className="rounded-md overflow-hidden relative aspect-[4/3] ">
        <Image
          src={item.image}
          alt="product image"
          style={{ objectFit: "cover" }}
          fill
          // className="aspect-[4/3]"
        />
      </div>
      <div className="mt-2 flex justify-between items-center">
        <h2 className="text-[16px]">{item.name}</h2>

        <div className=" bg-green-100 text-sm rounded-[50%] w-6 h-6 flex items-center justify-center">
          {stock || item.stock}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Product;
