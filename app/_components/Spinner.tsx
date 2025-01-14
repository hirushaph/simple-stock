"use client";
import { CgSpinner } from "react-icons/cg";

function Spinner({ className, size }: { className?: string; size?: number }) {
  return (
    <div className={`${className} items-center justify-center`}>
      <CgSpinner className="animate-spin" size={size} />
    </div>
  );
}

export default Spinner;
