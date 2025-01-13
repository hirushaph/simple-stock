"use client";
import { CgSpinner } from "react-icons/cg";

function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={`${className} w-full h-full flex items-center justify-center`}
    >
      <CgSpinner className="animate-spin" size={30} />
    </div>
  );
}

export default Spinner;
