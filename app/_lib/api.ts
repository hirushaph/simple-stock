import { StockItemType, TransactionType } from "@/types/types";
import fetchInstance from "./fetchInstance";
import { ITEMS_PER_PAGE } from "./const";

import { cookies } from "next/headers";
import { createSessionClient } from "@/appwrite/config";
import { Query } from "node-appwrite";

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

export async function getTransactions(params: {
  [key: string]: string;
}): Promise<{
  documents: TransactionType[];
  total: number;
}> {
  const pageNo = Number(params?.page) || 1;
  const sortDays = params?.sort || "all";

  const sessionCookie = (await cookies()).get("session");

  const sessionClient = await createSessionClient(sessionCookie?.value);

  if (!sessionClient) throw new Error("Session not found");

  // calculate offset
  const offset = (pageNo - 1) * ITEMS_PER_PAGE;

  // setup filters
  const options = [
    Query.limit(ITEMS_PER_PAGE),
    Query.offset(offset),
    Query.orderDesc("$createdAt"),
  ];

  // sort "today"
  if (sortDays === "today") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfDay = today.toISOString();

    today.setHours(23, 59, 59, 999);
    const endOfDay = today.toISOString();

    options.push(Query.greaterThanEqual("$createdAt", startOfDay));
    options.push(Query.lessThan("$createdAt", endOfDay));
  }

  // sort "7days"
  if (sortDays === "7days") {
    const now = new Date();
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999); // End of current day

    // Get timestamp of 7 days ago
    const startOfLast7Days = new Date(now);
    startOfLast7Days.setDate(startOfLast7Days.getDate() - 7);
    startOfLast7Days.setHours(0, 0, 0, 0); // Start of 7 days ago

    const startOfLast7DaysISO = startOfLast7Days.toISOString();
    const endOfTodayISO = endOfToday.toISOString();

    options.push(Query.greaterThanEqual("$createdAt", startOfLast7DaysISO));
    options.push(Query.lessThan("$createdAt", endOfTodayISO));
  }
  const {
    documents,
    total,
  }: {
    documents: TransactionType[];
    total: number;
  } = await sessionClient?.databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_BORROWED_COLLECTION_ID,
    options
  );
  return { documents, total };
}

export async function getIssuedItems() {
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
    process.env.APPWRITE_BORROWED_COLLECTION_ID,
    [Query.orderDesc("$createdAt"), Query.equal("returned", false)]
  );

  return { documents, total };
}
