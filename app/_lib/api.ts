import { StockItemType } from "@/types/types";

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

  const res = await fetch(endpoint);

  const data = await res.json();

  return data;
}
