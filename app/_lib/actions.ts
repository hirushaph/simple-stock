"use server";

import { createSessionClient } from "@/appwrite/config";
import { ItemUser, StockItemType, TransactionType } from "@/types/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

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
      item: item.id,
      employer: user.$id,
      quantity,
      returned: false,
    }
  );

  const updateStock = sessionClient?.databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_ITEMS_COLLECTION_ID!,
    item.id,
    {
      stock: item.stock - quantity,
    }
  );

  // Execute requests
  const [borrowed, updatedItem] = await Promise.all([
    createBorrowedDocument,
    updateStock,
  ]);

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
    } catch (error) {
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

      throw new Error("Transaction Update Failed");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
