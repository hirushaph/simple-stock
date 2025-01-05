import { Account, Client, Databases } from "appwrite";
const client = new Client();

const projectId = process.env.APPWRITE_PROJECTID;

client.setProject(projectId || "");

export const account = new Account(client);
export const databases = new Databases(client);

export { ID } from "appwrite";
