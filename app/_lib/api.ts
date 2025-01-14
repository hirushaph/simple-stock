import { SessionCookie, StockItemType } from "@/types/types";
import fetchInstance from "./fetchInstance";

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
