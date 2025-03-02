"use client";
import Link from "next/link";
import { useState } from "react";
import {
  IoArrowBackCircleOutline,
  IoCaretBackCircleOutline,
} from "react-icons/io5";
import { LuSave } from "react-icons/lu";
import { addNewItem } from "../_lib/actions";

function AddNewForm() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addNewItem(formData);
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
              required
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

              <span>Add Item</span>
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
                src="https://fakeimg.pl/150x150?text=Preview&font=bebas&font_size=30"
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
