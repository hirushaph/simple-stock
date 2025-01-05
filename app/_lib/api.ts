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

export async function searchItems(query: string): Promise<StockItemType[]> {
  const productsRef = collection(db, "products");

  const searchQuery = query(productsRef, where("name", "<=", query));

  const querySnapshot = await getDocs(searchQuery);

  const productsList: StockItemType[] = querySnapshot.docs.map(
    (doc) => doc.data() as StockItemType
  );
  return productsList;
}
