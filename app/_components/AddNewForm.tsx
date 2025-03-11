"use client";
import Link from "next/link";
import { useState } from "react";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { LuSave } from "react-icons/lu";
import { addNewItem, updateItem } from "../_lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Item } from "@/types/types";

function AddNewForm({
  data,
  update = false,
}: {
  data?: Item;
  update?: boolean;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: data?.name || "",
    sku: data?.sku || "",
    stock: data?.stock || 0,
    image: null,
    preview: data?.image || null,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formItems = new FormData(e.currentTarget);

    const imageFile = formItems.get("image");

    if (!data) return;

    if (formItems.get("name") === data.name) {
      formItems.delete("name");
    }
    if (formItems.get("sku") === data.sku) {
      formItems.delete("sku");
    }
    if (Number(formItems.get("stock")) === data.stock) {
      formItems.delete("stock");
    }
    if (imageFile instanceof File && imageFile.name == "") {
      formItems.delete("image");
    }

    const isEmpty = formItems.entries().next().done;

    if (isEmpty) {
      return toast.error("Nothing changed");
    }

    const toastId = toast.loading(
      `${update ? "Updating item" : "Adding item"}`
    );
    try {
      if (update) {
        // update item
        if (!data) return;
        await updateItem(formItems, data.$id, data.sku);
        toast.update(toastId, {
          render: "Item Updated",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }
      const result = await addNewItem(formItems);
      if (result.success) {
        toast.update(toastId, {
          render: "Item Added",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        router.push("/manage");
      } else {
        toast.update(toastId, {
          render: result.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error: unknown) {
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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Left */}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md outline-none text-gray-500 focus:shadow-sm transition border border-gray-300"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="sku" className="block text-sm font-medium mb-1">
              Sku
            </label>
            <input
              type="text"
              name="sku"
              id="sku"
              required
              value={formData.sku}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md outline-none text-gray-500 focus:shadow-sm transition border border-gray-300"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="stock" className="block text-sm font-medium mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              required
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md outline-none text-gray-500 focus:shadow-sm transition border border-gray-300"
            />
          </div>

          {/* Image Upload with Preview */}
          <div className="mt-4">
            <label htmlFor="image" className="block text-sm font-medium">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              required={!update}
              className="w-full px-4 py-2 rounded-xl outline-none text-gray-500 focus:shadow-sm transition"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="mt-6 flex justify-between">
            <Link href="/manage">
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
              className="bg-green-200 border border-green-300 py-2 gap-1 justify-center items-center rounded-md px-4 flex"
            >
              <LuSave />

              <span>{update ? "Update Item" : "Add Item"}</span>
            </button>
          </div>
        </form>

        {/* Right (Preview) */}
        <div className="mt-4">
          <h2 className="text-md font-medium">Image Preview</h2>
          <div className="mt-2 bg-gray-100 w-40 h-40 rounded-xl overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <img
                src={`${
                  update
                    ? data?.image
                    : "https://fakeimg.pl/150x150?text=Preview&font=bebas&font_size=30"
                }`}
                alt="preview"
                className="w-full h-full object-cover rounded-xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewForm;
