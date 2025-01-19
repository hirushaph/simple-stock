"use client";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bounce, toast } from "react-toastify";

import Button from "./Button";
import Spinner from "./Spinner";
import { issueItem } from "../_lib/actions";
import { ItemUser, StockItemType } from "@/types/types";

type ModalProps = {
  isModalOpen: boolean;
  item?: StockItemType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ item, isModalOpen, setIsModalOpen }: ModalProps) {
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<ItemUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ItemUser | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (isModalOpen && isClient) {
      dialogRef.current?.showModal();
    }
  }, [isModalOpen, isClient]);

  useEffect(() => {
    if (!isModalOpen || !searchTerm) return;

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
          throw new Error(res.statusText);
        }

        const data = (await res.json()) as { documents: ItemUser[] };
        setUsers(data.documents);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          toast.error("Failed to fetch users");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    return () => abortControllerRef.current?.abort();
  }, [searchTerm, isModalOpen]);

  const onCloseModal = () => {
    dialogRef.current?.close();
    setIsModalOpen(false);
    resetModalState();
  };

  const resetModalState = () => {
    setSearchTerm("");
    setUsers([]);
    setSelectedUser(null);
    setSelectedQuantity(1);
  };

  const handleUserSelect = (user: ItemUser) => {
    setSelectedUser(user);
    setUsers([]);
  };

  const handleIssueItem = async () => {
    if (!item || !selectedUser) {
      toast.error("Please select an item and user");
      return;
    }

    try {
      setIsButtonLoading(true);
      await issueItem(item, selectedUser, selectedQuantity);
      toast.success("Item issued successfully", { transition: Bounce });
      onCloseModal();
    } catch (error: any) {
      toast.error(error.message || "Failed to issue item");
    } finally {
      setIsButtonLoading(false);
    }
  };

  if (!isClient) return null;

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
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md w-[600px] p-4 rounded-md z-50 fixed inset-0 m-auto"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Issue Item</h1>
              <button onClick={onCloseModal}>
                <IoClose size={22} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_2fr] py-4 gap-3">
              <div className="border rounded-md p-2">
                <img
                  src={item?.image}
                  className="rounded-md"
                  alt="product image"
                />
                <h2 className="text-sm font-semibold mt-2 text-gray-700 text-center">
                  {item?.name}
                </h2>
                <p className="text-sm font-semibold mt-2 text-gray-600 py-1 px-2 rounded-2xl bg-green-100 text-center">
                  Stock: <span className="text-green-600">{item?.stock}</span>
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-sm text-gray-500">Issued to</h3>
                  {isLoading && <Spinner size={18} />}
                </div>

                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search user"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-1 mt-2 border bg-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />

                  {users.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-1 rounded-md bg-white max-h-40 overflow-y-auto z-10 shadow-lg border">
                      {users.map((user) => (
                        <li
                          key={user.eid}
                          onClick={() => handleUserSelect(user)}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                        >
                          {user.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div
                  className={`${
                    selectedUser ? "bg-green-100" : "bg-red-100"
                  } gap-2 mt-2 p-2 rounded-md`}
                >
                  <span
                    className={`text-xs uppercase font-semibold ${
                      selectedUser ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {selectedUser ? "Selected User" : "Please Search Username"}
                  </span>

                  <div>
                    <p className="text-sm text-gray-500">
                      ID:{" "}
                      <span className="text-gray-700">{selectedUser?.eid}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Name:{" "}
                      <span className="text-gray-700">
                        {selectedUser?.name}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm text-gray-500">Quantity</h3>
                  <input
                    type="number"
                    value={selectedQuantity}
                    onChange={(e) =>
                      setSelectedQuantity(Number(e.target.value))
                    }
                    className="w-full px-4 py-1 mt-2 border bg-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
              </div>
            </div>

            <footer className="flex justify-end gap-4 mt-4">
              <Button onClick={onCloseModal} variant="cancel">
                Cancel
              </Button>
              <Button
                onClick={handleIssueItem}
                variant="success"
                disabled={isButtonLoading}
              >
                {isButtonLoading ? "Processing..." : "Issue Item"}
              </Button>
            </footer>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
