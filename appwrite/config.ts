import { UserSession } from "@/types/types";
import { Account, Client, Databases, Storage } from "node-appwrite";

export type AdminClient = {
  account: Account;
  databases: Databases;
};

const createAdminClient = async (): Promise<AdminClient | null> => {
  const endpoint = process.env.APPWRITE_ENDPOINT;
  const projectId = process.env.APPWRITE_PROJECTID;
  const apiKey = process.env.APPWRITE_APIKEY;

  if (!endpoint || !projectId || !apiKey) {
    console.error("Missing Appwrite configuration");
    return null;
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  return {
    get account(): Account {
      return new Account(client);
    },
    get databases(): Databases {
      return new Databases(client);
    },
  };
};

const createSessionClient = async (session: string | undefined) => {
  if (!session) {
    throw new Error("No session");
  }
  const endpoint = process.env.APPWRITE_ENDPOINT;
  const projectId = process.env.APPWRITE_PROJECTID;

  if (!endpoint || !projectId) {
    console.error("Missing Appwrite configuration");
    return null;
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId);

  if (session) {
    client.setSession(session);
  }

  return {
    get account(): Account {
      return new Account(client);
    },
    get databases(): Databases {
      return new Databases(client);
    },
    get storage(): Storage {
      return new Storage(client);
    },
  };
};

export { createAdminClient, createSessionClient };
