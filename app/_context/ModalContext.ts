import { StockItemType } from "@/types/types";
import { createContext, useContext } from "react";

type ModalContext = {
  item: StockItemType;
};

const ModalContext = createContext<ModalContext | null>(null);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be within a Modal");
  }
  return context;
}

export default ModalContext;
