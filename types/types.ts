import { Models } from "node-appwrite";

export type StockItemType = {
  $id: string;
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

export type UpdatedFields = {
  name?: string;
  sku?: string;
  stock?: number;
  image?: File;
};

export type UserSession = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  userId: string;
  expire: string;
  provider: string;
  providerUid: string;
  providerAccessToken: string;
  providerAccessTokenExpiry: string;
  providerRefreshToken: string;
  ip: string;
  osCode: string;
  osName: string;
  osVersion: string;
  clientType: string;
  clientCode: string;
  clientName: string;
  clientVersion: string;
  clientEngine: string;
  clientEngineVersion: string;
  deviceName: string;
  deviceBrand: string;
  deviceModel: string;
  countryCode: string;
  countryName: string;
  current: boolean;
  factors: string[];
  secret: string;
  mfaUpdatedAt: string;
};
