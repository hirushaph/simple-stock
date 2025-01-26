import { StockItemType, TransactionType } from "@/types/types";
import fetchInstance from "./fetchInstance";
import { DATABASE_ID, ITEM_COLLECTION_ID } from "./const";
import { databases } from "./appwrite";
import { cookies } from "next/headers";
import { createSessionClient } from "@/appwrite/config";
import { Models } from "node-appwrite";

// export async function getAvailableStock(): Promise<StockItemType[]> {
//   const result = await databases.listDocuments(
//     DATABASE_ID,
//     ITEM_COLLECTION_ID,
//     []
//   );

//   const filteredData = result.documents.map(
//     ({ name, sku, stock, image }) =>
//       ({
//         name,
//         sku,
//         stock,
//         image,
//       } as StockItemType)
//   );

//   return filteredData;
// }

// export async function searchItems(
//   searchText: string | string[]
// ): Promise<StockItemType[]> {
//   const result = await databases.listDocuments(
//     DATABASE_ID,
//     ITEM_COLLECTION_ID,
//     [Query.contains("name", searchText)]
//   );

//   const filteredData = result.documents.map(
//     ({ name, sku, stock, image }) =>
//       ({
//         name,
//         sku,
//         stock,
//         image,
//       } as StockItemType)
//   );

//   return filteredData;
// }

type ProductApiResults = {
  documents: StockItemType[];
  total: number;
};

export async function getFilterdStock(
  query?: string | string[]
): Promise<ProductApiResults> {
  const baseurl = "http://localhost:3000";
  const endpoint = query
    ? `${baseurl}/api/products?search=${query}`
    : `${baseurl}/api/products`;

  const res = await fetchInstance({ url: endpoint, method: "GET" });

  const data = await res.json();

  return data;
}

export async function getTransactions(): Promise<{
  documents: TransactionType[];
  total: number;
}> {
  const sessionCookie = (await cookies()).get("session");

  const sessionClient = await createSessionClient(sessionCookie?.value);

  if (!sessionClient) throw new Error("Session not found");

  const {
    documents,
    total,
  }: {
    documents: TransactionType[];
    total: number;
  } = await sessionClient?.databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_BORROWED_COLLECTION_ID
  );

  return { documents, total };
}
