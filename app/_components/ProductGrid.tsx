"use client";

import { StockItemType } from "@/types/types";
import Product from "./Product";
import { useState } from "react";
import Modal from "./Modal";

function ProductGrid({ data }: { data: StockItemType[] }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<StockItemType | undefined>(
    undefined
  );

  function handleModalOpen(item: StockItemType) {
    setIsModalOpen(true);
    setCurrentItem(item);
  }

  return (
    <>
      <Modal
        item={currentItem}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      {data.map((item) => (
        <Product key={item.sku} item={item} onModalOpen={handleModalOpen} />
      ))}
    </>
  );
}

export default ProductGrid;
