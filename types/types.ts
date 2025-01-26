import { Models } from "node-appwrite";

export type StockItemType = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  image: string;
};

export type SessionCookie = {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
};

export type ItemUser = {
  name: string;
  eid: number;
  $id: string;
};

export type TransactionType = Models.Document & {
  quantity: number;
  item: Item;
  employer: Employer;
  returned: boolean;
  returnedDate: string;
};

export type Item = Models.Document & {
  name: string;
  sku: string;
  stock: number;
  image: string;
};

export type Employer = Models.Document & {
  name: string;
  eid: string;
};
