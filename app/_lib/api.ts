import { Employer, Item, TransactionType } from "@/types/types";
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

export async function getFilterdStock(
  pageNo: number,
  query?: string | string[]
) {
  const baseurl = "http://localhost:3000";
  const params = new URLSearchParams();

  const normalizedQuery = Array.isArray(query) ? query[0] : query || "";

  if (query) params.append("search", normalizedQuery);
  params.append("page", pageNo.toString());

  const endpoint = `${baseurl}/api/products${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const res = await fetchInstance({ url: endpoint, method: "GET" });

  const data = await res.json();

  return { success: true, documents: data.documents, total: data.total };
}

export async function getTransactions(params: {
  [key: string]: string;
}): Promise<{
  documents: TransactionType[];
  total: number;
}> {
  const pageNo = Number(params?.page) || 1;
  const sortDays = params?.sort || "all";
  const fromDate = params?.from;
  const toDate = params?.to;

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

  // sort date range
  if (fromDate && toDate) {
    const from = new Date(fromDate).toISOString();
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999);
    const toDateString = to.toISOString();
    console.log(to);
    options.push(Query.greaterThanEqual("$createdAt", from));
    options.push(Query.lessThanEqual("$createdAt", toDateString));
  }

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

export async function getItemBySku(sku: string) {
  try {
    const sessionCookie = (await cookies()).get("session");

    const sessionClient = await createSessionClient(sessionCookie?.value);

    if (!sessionClient) throw new Error("Session not found");

    const {
      documents,
      total,
    }: {
      documents: Item[];
      total: number;
    } = await sessionClient?.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_ITEMS_COLLECTION_ID,
      [Query.equal("sku", sku)]
    );

    return { success: true, document: documents[0], total };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "Something went wrong" };
    }
  }
}

export async function getFilterdUsers(
  pageNo: number,
  query?: string | string[]
) {
  try {
    console.log(pageNo);
    const sessionCookie = (await cookies()).get("session");

    const sessionClient = await createSessionClient(sessionCookie?.value);

    if (!sessionClient) throw new Error("Session not found");

    const normalizedQuery = Array.isArray(query) ? query[0] : query || "";

    const offset = (pageNo - 1) * ITEMS_PER_PAGE;
    const config = [Query.limit(ITEMS_PER_PAGE), Query.offset(offset)];

    console.log(pageNo);

    if (normalizedQuery) {
      config.push(Query.contains("name", normalizedQuery));
    }

    const {
      documents,
      total,
    }: {
      documents: Employer[];
      total: number;
    } = await sessionClient?.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USERS_COLLECIION_ID,
      config
    );

    return { success: true, documents: documents, total };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "Something went wrong" };
    }
  }
}
