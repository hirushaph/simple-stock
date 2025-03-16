import { ITEMS_PER_PAGE } from "@/app/_lib/const";
import { createSessionClient } from "@/appwrite/config";
import { StockItemType } from "@/types/types";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";

export async function GET(request: Request) {
  const sessionCookie = (await cookies()).get("session");

  try {
    const adminClient = await createSessionClient(sessionCookie?.value);
    if (adminClient === null) {
      return Response.json("Configuration Error", { status: 500 });
    }
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search");
    const pageNo = Number(searchParams.get("page")) || 1;

    const config: string[] = [];

    if (pageNo) {
      const offset = (pageNo - 1) * ITEMS_PER_PAGE;
      config.push(Query.limit(ITEMS_PER_PAGE));
      config.push(Query.offset(offset));
    }
    if (searchQuery) {
      config.push(Query.contains("name", searchQuery));
    }

    const { documents, total } = await adminClient.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_ITEMS_COLLECTION_ID,
      config
    );

    const filterdDocuments = documents.map(
      ({ name, sku, stock, image, $id }) =>
        ({
          name,
          sku,
          stock,
          image,
          $id,
        } as StockItemType)
    );

    return Response.json({ documents: filterdDocuments, total });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json(
        { error: error.message },
        {
          status: 403,
        }
      );
    } else {
      return Response.json(
        { error: "An unknown error occurred" },
        {
          status: 403,
        }
      );
    }
  }
}
