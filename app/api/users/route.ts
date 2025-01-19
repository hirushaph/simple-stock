import { createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";

export async function GET(request: Request) {
  const sessionCookie = (await cookies()).get("session");
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "j";

  try {
    if (!query) {
      return Response.json([]);
    }
    const sessionClient = await createSessionClient(sessionCookie?.value);

    if (sessionClient === null) {
      return Response.json("Configuration Error", { status: 500 });
    }

    const { documents, total } = await sessionClient.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USERS_COLLECIION_ID,
      [Query.contains("name", query)]
    );

    return Response.json({ documents, total });
  } catch (error) {
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
