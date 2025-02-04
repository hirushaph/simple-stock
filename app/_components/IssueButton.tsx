"use client";
import { useState } from "react";

function IssueButton({ isRecived }: { isRecived: boolean }) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.checked);
  }
  return (
    <div>
      <div className="flex justify-start items-center gap-2">
        <input
          type="checkbox"
          name="returned"
          checked={isChecked}
          onChange={handleChange}
          id=""
          className=" cursor-pointer"
          //   className="appearance-none w-5 h-5 border-2 border-blue-500 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:ring-2 hover:ring-blue-400 checked:bg-blue-500 checked:border-transparent"
        />
        <span
          className={`${
            !isRecived
              ? "bg-red-200 text-red-600"
              : "bg-green-200 text-green-600"
          } rounded-xl px-4 py-1 text-[12px] font-semibold uppercase `}
        >
          {isRecived ? "Returned" : "Issued"}
        </span>
      </div>
    </div>
  );
}

export default IssueButton;
