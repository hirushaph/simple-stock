"use server";

import { createSessionClient } from "@/appwrite/config";
import { ItemUser, StockItemType } from "@/types/types";
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
