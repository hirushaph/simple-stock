"use client";

import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant: "success" | "cancel" | "danger" | "done";
  disabled?: boolean;
}

function Button({ onClick, children, variant, disabled }: ButtonProps) {
  const baseClasses =
    "px-4 py-[6px] uppercase text-[14px] font-semibold rounded-md transition-colors duration-200";
  const variantClasses = {
    success:
      "bg-blue-100 border-blue-200 text-blue-600 hover:bg-blue-200 hover:border-blue-300 hover:text-blue-700",
    cancel:
      "bg-red-100 border-red-200 text-red-600 hover:bg-red-200 hover:border-red-300 hover:text-red-700",
    danger:
      "bg-yellow-100 border-yellow-200 text-yellow-600 hover:bg-yellow-200 hover:border-yellow-300 hover:text-yellow-700",
    done: "bg-green-100 border-green-200 text-green-600 hover:bg-green-200 hover:border-green-300 hover:text-green-700",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
