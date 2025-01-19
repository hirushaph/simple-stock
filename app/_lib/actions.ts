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
  console.log("server action runnded");

  console.log(item);
  const sessionCookie = (await cookies()).get("session");

  const sessionClient = await createSessionClient(sessionCookie?.value);

  const borrowed = await sessionClient?.databases.createDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_BORROWED_COLLECTION_ID,
    ID.unique(),
    {
      sku: item.sku,
      userId: user.id,
      quantity,
    }
  );

  //   update item

  const result = await sessionClient?.databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_ITEMS_COLLECTION_ID,
    item.id, // documentId
    {
      stock: item.stock - quantity,
    }
  );

  revalidatePath("/available");

  console.log(result);
}
