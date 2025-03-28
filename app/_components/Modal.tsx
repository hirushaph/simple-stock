"use client";
import { ItemUser, StockItemType } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "./Spinner";
import { issueItem } from "../_lib/actions";
import { toast } from "react-toastify";
import Image from "next/image";

type ModalProps = {
  isModalOpen: boolean;
  item?: StockItemType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ item, isModalOpen, setIsModalOpen }: ModalProps) {
  const [isClient, setIsClient] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<ItemUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ItemUser | undefined>(
    undefined
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number | "">(1);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setIsClient(true); // Ensure component is rendered on client-side
  }, []);

  useEffect(() => {
    if (isModalOpen && isClient) {
      dialogRef.current?.showModal();
    }
  }, [isModalOpen, isClient]);

  useEffect(() => {
    if (!isModalOpen) return;

    const fetchUsers = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        setIsLoading(true);
        const res = await fetch(`/api/users?query=${searchTerm}`, {
          signal: abortController.signal,
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        const data = (await res.json()) as { documents: ItemUser[] };
        setSearchResults(data.documents);
        setIsLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.log("Request canceled");
          } else {
          }
        } else {
        }
      }
    };

    fetchUsers();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [isModalOpen, searchTerm]);

  if (!isClient) return null; // Prevent server-side rendering issues

  function onCloseModal() {
    dialogRef.current?.close();
    setIsModalOpen(false);
    setSearchTerm("");
    setSearchResults([]);
    setSelectedUser(undefined);
  }

  function handleUserSelect(user: ItemUser) {
    setSelectedUser(user);
    setSearchResults([]);
  }

  function handleQuanityChange(quantity: string) {
    if (!item) return;
    if (quantity === "") {
      setSelectedQuantity(quantity);
      return;
    }

    const numericQuantity = Number(quantity);
    if (item.stock >= numericQuantity && numericQuantity >= 1) {
      setSelectedQuantity(numericQuantity);
    }
  }

  async function handleIssueItem(
    item?: StockItemType,
    selectedUser?: ItemUser,
    selectedQuantity?: number | ""
  ) {
    try {
      if (!item || !selectedUser || !selectedQuantity) return;
      setIsButtonLoading(true);

      await toast.promise(issueItem(item, selectedUser, selectedQuantity), {
        pending: "Issuing item...",
        success: "Item issued",
        error: "Update failed",
      });

      setIsButtonLoading(false);
      onCloseModal();
    } catch (error: unknown) {
      setIsButtonLoading(false);
      if (error instanceof Error) {
        toast.error("Something went wrong");
      }
    }
  }

  return createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black"
          />
          <motion.dialog
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            ref={dialogRef}
            className="bg-white shadow-md w-[600px] p-4 rounded-md z-50 fixed inset-0 m-auto"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Issue Item</h1>
              <button onClick={onCloseModal}>
                <IoClose size={22} />
              </button>
            </div>
            <div className="mt-4 body grid grid-cols-[1fr_2fr] py-4 gap-3">
              <div className="border rounded-md p-2">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4/3",
                  }}
                >
                  <Image
                    src={item?.image || "https://via.placeholder.com/150"}
                    className="rounded-md"
                    alt="product image"
                    fill
                    objectFit="cover"
                  />
                </div>

                <h2 className="text-sm font-semibold mt-2 text-gray-700 text-center">
                  {item?.name}
                </h2>
                <p
                  className={`${
                    item?.stock === 0 ? "bg-red-100" : ""
                  } text-sm font-semibold mt-2 text-gray-600 py-1 px-2 rounded-2xl bg-green-100 text-center`}
                >
                  {item?.stock === 0 ? "Out of Stock" : "Stock : "}
                  <span
                    className={`${
                      item?.stock === 0 ? "text-red-600" : ""
                    } text-green-600 font-semibold`}
                  >
                    {item?.stock === 0 ? "" : item?.stock}
                  </span>
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-sm text-gray-500">Issued to </h3>
                  {isLoading && <Spinner className=" inline-block" size={18} />}
                </div>
                <div className="relative">
                  <input
                    className="px-4 py-1 mt-2 border bg-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition text-sm font-normal w-full"
                    type="search"
                    placeholder="search user"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                  />
                  {searchResults?.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-1 rounded-md bg-white max-h-40 overflow-y-auto z-10 shadow-lg border-2 border-gray-400">
                      {searchResults.map((user) => (
                        <li
                          key={user.eid}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleUserSelect(user)}
                        >
                          {user.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div
                  className={` ${
                    selectedUser ? "bg-green-100" : "bg-red-100"
                  } gap-2 mt-2  p-2 rounded-md`}
                >
                  <span
                    className={`text-[12px] uppercase ${
                      selectedUser ? "text-green-700" : "text-red-700"
                    } font-semibold`}
                  >
                    {selectedUser ? "Selected User" : "Please Search Username"}
                  </span>
                  <p className="text-[14px] uppercase text-gray-500">
                    ID:{" "}
                    <span className="text-gray-700">{selectedUser?.eid}</span>
                  </p>
                  <p className="text-[14px] uppercase text-gray-500">
                    Name:{" "}
                    <span className="text-gray-700">{selectedUser?.name}</span>
                  </p>
                </div>

                {/* Quantity */}

                <div>
                  <h3 className="text-sm text-gray-500 mt-2">Quantity</h3>
                  <input
                    className="px-4 py-1 mt-2 border bg-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition text-sm font-normal w-full"
                    type="number"
                    placeholder="Quantity"
                    value={selectedQuantity}
                    onChange={(e) => handleQuanityChange(e.target.value)}
                    disabled={item?.stock === 0}
                  />
                </div>
              </div>
            </div>
            <div className="footer flex justify-end items-center gap-4 mt-4">
              <Button onClick={onCloseModal} variant="cancel">
                Cansal
              </Button>
              <Button
                onClick={() =>
                  handleIssueItem(item, selectedUser, selectedQuantity)
                }
                variant="success"
                disabled={isButtonLoading || item?.stock === 0}
              >
                Issue Item
              </Button>
            </div>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
