declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPWRITE_PROJECTID: string;
      APPWRITE_APIKEY: string;
      APPWRITE_DATABASE_ID: string;
      APPWRITE_ITEMS_COLLECTION_ID: string;
      APPWRITE_ENDPOINT: string;
    }
  }
}
export {};
