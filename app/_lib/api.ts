import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { StockItemType } from "@/types/types";

export async function getAvailableStock(): Promise<StockItemType[]> {
  const collectionRef = collection(db, "products");
  const querySnapshot = await getDocs(collectionRef);
  const data: StockItemType[] = querySnapshot.docs.map(
    (doc) => doc.data() as StockItemType
  );
  return data;
}

export async function searchItems(
  searchText: string | string[]
): Promise<StockItemType[]> {
  const productsRef = collection(db, "products");

  const searchQuery = query(productsRef, where("name", "==", searchText));

  const querySnapshot = await getDocs(searchQuery);

  const productsList: StockItemType[] = querySnapshot.docs.map(
    (doc) => doc.data() as StockItemType
  );
  return productsList;
}

export async function getFilterdStock(
  query?: string | string[]
): Promise<StockItemType[]> {
  if (query) {
    console.log("im here");
    const data = await searchItems(query);

    console.log(data);
    return data;
  }

  const data = await getAvailableStock();
  return data;
}
