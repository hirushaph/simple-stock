"use server";

import { createSessionClient } from "@/appwrite/config";
import { ItemUser, StockItemType, TransactionType } from "@/types/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { AppwriteException, ID } from "node-appwrite";

export async function issueItem(
  item: StockItemType,
  user: ItemUser,
  quantity: number
) {
  console.log("server action run");

  const sessionCookie = (await cookies()).get("session");
  const sessionClient = await createSessionClient(sessionCookie?.value);

  // Prepare requests
  const createBorrowedDocument = sessionClient?.databases.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_BORROWED_COLLECTION_ID!,
    ID.unique(),
    {
      item: item.$id,
      employer: user.$id,
      quantity,
      returned: false,
    }
  );

  const updateStock = sessionClient?.databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_ITEMS_COLLECTION_ID!,
    item.$id,
    {
      stock: item.stock - quantity,
    }
  );

  // Execute requests
  await Promise.all([createBorrowedDocument, updateStock]);

  revalidatePath("/available");
}

// update item recived status
export async function updateItemStatus(transaction: TransactionType) {
  const sessionCookie = (await cookies()).get("session");
  const sessionClient = await createSessionClient(sessionCookie?.value);

  if (!sessionClient) throw new Error("Authentication Failed");

  try {
    // mark item as returned
    const updatedTransaction = await sessionClient.databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_BORROWED_COLLECTION_ID,
      transaction.$id,
      {
        returned: true,
        returnedDate: new Date().toISOString(),
      }
    );

    try {
      // update item quantity
      if (!updatedTransaction) throw new Error("Transaction Update Failed");

      await sessionClient.databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_ITEMS_COLLECTION_ID,
        transaction.item.$id,
        {
          stock: transaction.item.stock + transaction.quantity,
        }
      );

      // If both updates are successful, revalidate the page
      revalidatePath("/history");
    } catch (error: unknown) {
      // Rollback transaction if updates failed
      await sessionClient.databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_BORROWED_COLLECTION_ID,
        transaction.$id,
        {
          returned: false,
          returnedDate: null,
        }
      );

      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

// add new item

export async function addNewItem(formData: FormData) {
  const name = formData.get("name");
  const image = formData.get("image") as File;
  const stock = formData.get("stock");
  const sku = formData.get("sku");

  if (!name || !image || !stock || !sku) {
    throw new Error("All fields required");
  }

  try {
    const sessionCookie = (await cookies()).get("session");
    const sessionClient = await createSessionClient(sessionCookie?.value);

    if (!sessionClient) throw new Error("Authentication Failed");

    // upload image to storage bucket
    const result = await sessionClient?.storage.createFile(
      process.env.APPWRITE_STORAGE_BUCKET,
      ID.unique(),
      image,
      []
    );

    if (!result) throw new Error("Image upload failed");

    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_STORAGE_BUCKET}/files/${result.$id}/view?project=${process.env.APPWRITE_PROJECTID}`;

    // add item to database
    const rr = await sessionClient?.databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ITEMS_COLLECTION_ID!,
      ID.unique(),
      {
        name,
        stock: Number(stock),
        sku,
        image: imageUrl,
      }
    );
    revalidatePath("/products");
    return { success: true, data: rr, message: "Item added" };
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      if (error.code === 409) {
        return {
          success: false,
          message: "Sku already exits, please use different sku",
        };
      }
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "Something went wrong" };
    }
  }
}

export async function deleteItem(id: string, type: string) {
  if (!id) throw new Error("Document id not found");
  console.log(type);

  const colId =
    type === "products"
      ? process.env.APPWRITE_ITEMS_COLLECTION_ID
      : process.env.APPWRITE_USERS_COLLECIION_ID;

  try {
    const sessionCookie = (await cookies()).get("session");
    const sessionClient = await createSessionClient(sessionCookie?.value);

    if (!sessionClient) throw new Error("Authentication Failed");

    await sessionClient.databases.deleteDocument(
      process.env.APPWRITE_DATABASE_ID, // databaseId
      colId, // collectionId
      id // documentId
    );
    revalidatePath("/products");
    return { success: true, message: "Item added" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "Something went wrong" };
    }
  }
}

export async function updateItem(
  updatedFields: FormData,
  id: string,
  sku: string
) {
  if (!updatedFields) throw new Error("Form data not found");

  const imageFile = updatedFields.get("image") as File;

  const sessionCookie = (await cookies()).get("session");
  const sessionClient = await createSessionClient(sessionCookie?.value);

  if (!sessionClient) throw new Error("Authentication Failed");

  // Upload image to appwrite
  let imageUrl = null;
  let dataToUpdate: Record<string, string | number> = {};

  if (imageFile) {
    const imageResult = await sessionClient?.storage.createFile(
      process.env.APPWRITE_STORAGE_BUCKET,
      ID.unique(),
      imageFile,
      []
    );

    if (!imageResult) throw new Error("Image upload failed");

    imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_STORAGE_BUCKET}/files/${imageResult.$id}/view?project=${process.env.APPWRITE_PROJECTID}`;

    updatedFields.delete("image");
    dataToUpdate = { image: imageUrl };
  }

  const formDataObj = Object.fromEntries(updatedFields) as Record<
    string,
    string | number
  >;

  if (formDataObj.stock !== undefined) {
    const stockValue = Number(formDataObj.stock);
    if (!isNaN(stockValue)) {
      formDataObj.stock = stockValue;
    }
  }

  dataToUpdate = { ...dataToUpdate, ...formDataObj };

  const result = await sessionClient.databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_ITEMS_COLLECTION_ID,
    id,
    { ...dataToUpdate }
  );
  revalidatePath(`/products/update/${sku}`);
  revalidatePath(`/products`);
  return result;
}
