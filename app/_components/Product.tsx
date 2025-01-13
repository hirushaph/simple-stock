"use client";

import { StockItemType } from "@/types/types";

function Product({
  item,
  onModalOpen,
}: {
  item: StockItemType;
  onModalOpen: (item: StockItemType) => void;
}) {
  return (
    <div
      key={item.sku}
      className="bg-white p-3 rounded-md shadow-sm cursor-pointer"
      onClick={() => onModalOpen(item)}
    >
      <div className="rounded-md overflow-hidden relative aspect-[4/3] ">
        <img
          src={item.image}
          alt="product image"
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
  );
}

export default Product;
