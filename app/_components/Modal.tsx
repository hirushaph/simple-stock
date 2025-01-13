"use client";
import { StockItemType } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";

type ModalProps = {
  isModalOpen: boolean;
  item?: StockItemType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ item, isModalOpen, setIsModalOpen }: ModalProps) {
  const [isClient, setIsClient] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    setIsClient(true); // Ensure component is rendered on client-side
  }, []);

  useEffect(() => {
    if (isModalOpen && isClient) {
      dialogRef.current?.showModal();
    }
  }, [isModalOpen, isClient]);

  if (!isClient) return null; // Prevent server-side rendering issues

  function onCloseModal() {
    dialogRef.current?.close();
    setIsModalOpen(false);
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="bg-white shadow-md w-[600px] p-3 z-50 backdrop:bg-black/75"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Issue Item</h1>
        <button onClick={() => onCloseModal()}>
          <IoClose size={22} />
        </button>
      </div>
      <div className="mt-4 body grid grid-cols-[1fr_2fr] py-4 gap-3">
        <div className="border rounded-md p-2">
          <img src={item?.image} className="rounded-md" alt="product image" />
          <h2 className="text-sm font-semibold mt-2 text-gray-700 text-center">
            {item?.name}
          </h2>
          <p className="text-sm font-semibold mt-2 text-gray-600 py-1 px-2 rounded-2xl bg-green-100 text-center">
            Stock :{" "}
            <span className="text-green-600 font-semibold">{item?.stock}</span>
          </p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Issued to</h3>
          <input
            className="px-4 py-1 mt-2 border bg-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition text-sm font-normal w-full"
            type="search"
            placeholder="search user"
          />
          <div className="t gap-2 mt-2 bg-green-100 p-2 rounded-md">
            <span className="text-[12px] uppercase text-green-700 font-semibold">
              Selected User
            </span>
            <p className="text-[14px] uppercase text-gray-500">
              ID: <span className="text-gray-700">002</span>
            </p>
            <p className="text-[14px] uppercase text-gray-500">
              Name: <span className="text-gray-700">John Doe</span>
            </p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mt-2">Quantity</h3>
            <input
              className="px-4 py-1 mt-2 border bg-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition text-sm font-normal w-full"
              type="number"
              placeholder="Quantity"
              defaultValue={1}
            />
          </div>
        </div>
      </div>
      <div className="footer flex justify-end items-center gap-4">
        <button className="px-4 py-[6px] bg-red-600 text-white rounded-md">
          Cancel
        </button>
        <button className="px-4 py-[6px] bg-blue-600 text-white rounded-md">
          Issue Item
        </button>
      </div>
    </dialog>,
    document.body
  );
}

export default Modal;
