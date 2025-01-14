import { createAdminClient } from "@/appwrite/config";
import { StockItemType } from "@/types/types";
import { Query } from "node-appwrite";

export async function GET(request: Request) {
  const adminClient = await createAdminClient();
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("search");

  if (adminClient === null) {
    return Response.json("Configuration Error", { status: 500 });
  }

  const config = searchQuery ? [Query.contains("name", searchQuery)] : [];

  const { documents, total } = await adminClient.databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_ITEMS_COLLECTION_ID,
    config
  );

  const filterdDocuments = documents.map(
    ({ name, sku, stock, image }) =>
      ({
        name,
        sku,
        stock,
        image,
      } as StockItemType)
  );

  return Response.json({ documents: filterdDocuments, total });
}
