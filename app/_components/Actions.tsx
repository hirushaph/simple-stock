"use client";

import { StockItemType } from "@/types/types";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { deleteItem } from "../_lib/actions";
import { toast } from "react-toastify";
import Link from "next/link";

function Actions({ item }: { item: StockItemType }) {
  async function handleOnClick() {
    const userConfirmed = confirm(
      `Are you sure you want to delete - ${item.name}`
    );

    if (userConfirmed) {
      const toastId = toast.loading("Deleting Item...");
      try {
        const deleted = await deleteItem(item.$id);
        if (deleted.success) {
          toast.update(toastId, {
            render: "Item deleted",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(toastId, {
            render: deleted.message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.update(toastId, {
            render: "Something went wrong",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }
    }
  }
  return (
    <div>
      <Link href={`/manage/update/${item.sku}`}>
        <button className="bg-blue-500 rounded-md p-[0.3rem] mr-3 ">
          <FiEdit size={14} color="white" />
        </button>
      </Link>
      <button
        className="bg-red-500 rounded-md p-[0.3rem]"
        onClick={handleOnClick}
      >
        <MdDeleteOutline size={14} color="white" />
      </button>
    </div>
  );
}

export default Actions;
