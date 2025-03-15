"use client";
import Link from "next/link";
import { useState } from "react";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { LuSave } from "react-icons/lu";
import { toast } from "react-toastify";
import { addUser } from "../_lib/actions";
import { useRouter } from "next/navigation";

function AddUserForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const isEmpty = formData.entries().next().done;

    if (isEmpty) {
      return toast.error("Please fill in the form");
    }
    setLoading(true);
    const toastId = toast.loading(`Adding user...`);
    try {
      const data = await addUser(formData);
      if (data.success) {
        toast.update(toastId, {
          render: "User Added",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        router.push("/users");
      } else {
        toast.update(toastId, {
          render: data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.update(toastId, {
          render: error.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-4 py-2 rounded-md outline-none text-gray-500 focus:shadow-sm transition border border-gray-300"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="uid" className="block text-sm font-medium mb-1">
          User ID
        </label>
        <input
          type="text"
          name="uid"
          required
          className="w-full px-4 py-2 rounded-md outline-none text-gray-500 focus:shadow-sm transition border border-gray-300"
        />
      </div>

      <div className="mt-6 flex justify-between">
        <Link href="/users">
          <button
            type="button"
            className="bg-blue-200 border border-blue-300 py-2 gap-1 justify-center items-center rounded-md px-4 flex"
          >
            <IoCaretBackCircleOutline />

            <span>Back</span>
          </button>
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-200 border border-green-300 py-2 gap-1 justify-center items-center rounded-md px-4 flex disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300 transition"
        >
          <LuSave />

          <span>Add user</span>
        </button>
      </div>
    </form>
  );
}

export default AddUserForm;
