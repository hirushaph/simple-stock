"use client";
import { StockItemType } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  isModalOpen: boolean;
  item?: StockItemType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ item, isModalOpen, setIsModalOpen }: ModalProps) {
  const [isClient, setIsClient] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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
      setIsLoading(true);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const res = await fetch(`/api/users?query=${searchTerm}`, {
          signal: abortController.signal,
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();
        setSearchResults(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.log("Request canceled");
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } finally {
        setIsLoading(false);
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
    setSelectedUser(null);
  }

  function handleUserSelect(user) {
    setSelectedUser(user);
    setSearchResults([]);
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
                <img
                  src={item?.image}
                  className="rounded-md"
                  alt="product image"
                />
                <h2 className="text-sm font-semibold mt-2 text-gray-700 text-center">
                  {item?.name}
                </h2>
                <p className="text-sm font-semibold mt-2 text-gray-600 py-1 px-2 rounded-2xl bg-green-100 text-center">
                  Stock :{" "}
                  <span className="text-green-600 font-semibold">
                    {item?.stock}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Issued to</h3>
                <div className="relative">
                  <input
                    className="px-4 py-1 mt-2 border bg-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition text-sm font-normal w-full"
                    type="search"
                    placeholder="search user"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                  />
                  {searchResults.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-1 border rounded-md bg-white max-h-40 overflow-y-auto z-10">
                      {searchResults.map((user) => (
                        <li
                          key={user.id}
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
                    <span className="text-gray-700">{selectedUser?.id}</span>
                  </p>
                  <p className="text-[14px] uppercase text-gray-500">
                    Name:{" "}
                    <span className="text-gray-700">{selectedUser?.name}</span>
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
            <div className="footer flex justify-end items-center gap-4 mt-4">
              <Button onClick={onCloseModal} variant="cancel">
                Cansal
              </Button>
              <Button onClick={onCloseModal} variant="success">
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
