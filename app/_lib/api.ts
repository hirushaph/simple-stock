import { StockItemType } from "@/types/types";
import { databases } from "./appwrite";
import { DATABASE_ID, ITEM_COLLECTION_ID } from "./const";
import { Query } from "appwrite";

export async function getAvailableStock(): Promise<StockItemType[]> {
  const result = await databases.listDocuments(
    DATABASE_ID,
    ITEM_COLLECTION_ID,
    []
  );

  const filteredData = result.documents.map(
    ({ name, sku, stock, image }) =>
      ({
        name,
        sku,
        stock,
        image,
      } as StockItemType)
  );

  return filteredData;
}

export async function searchItems(
  searchText: string | string[]
): Promise<StockItemType[]> {
  const result = await databases.listDocuments(
    DATABASE_ID,
    ITEM_COLLECTION_ID,
    [Query.contains("name", searchText)]
  );

  const filteredData = result.documents.map(
    ({ name, sku, stock, image }) =>
      ({
        name,
        sku,
        stock,
        image,
      } as StockItemType)
  );

  return filteredData;
}

export async function getFilterdStock(
  query?: string | string[]
): Promise<StockItemType[]> {
  if (query) {
    const data = await searchItems(query);
    return data;
  }

  const data = await getAvailableStock();
  return data;
}
