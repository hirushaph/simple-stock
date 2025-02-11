"use client";
import { TransactionType } from "@/types/types";
import { useState } from "react";
import { updateItemStatus } from "../_lib/actions";
import { toast } from "react-toastify";

function IssueButton({ transaction }: { transaction: TransactionType }) {
  const [isChecked, setIsChecked] = useState<boolean>(!!transaction.returned);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    try {
      setIsChecked(checked);
      setIsLoading(true);
      await toast.promise(updateItemStatus(transaction), {
        pending: "Updating status...",
        success: "Item Updated",
        error: "Update Failed",
      });
      setIsLoading(false);
    } catch (error) {
      setIsChecked((state) => !state);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-start items-center gap-2">
        <input
          type="checkbox"
          name="returned"
          checked={isChecked}
          onChange={handleChange}
          className="cursor-pointer disabled:cursor-not-allowed"
          disabled={isChecked}
        />
        <span
          className={` ${
            isLoading
              ? "bg-gray-200 text-gray-600"
              : `${
                  !isChecked
                    ? "bg-red-200 text-red-600"
                    : "bg-green-200 text-green-600"
                }`
          } rounded-xl px-4 py-1 text-[12px] font-semibold uppercase `}
        >
          {isLoading ? "Updating" : `${isChecked ? "Returned" : "Issued"}`}
        </span>
      </div>
    </div>
  );
}

export default IssueButton;
