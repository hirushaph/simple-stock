export type StockItemType = {
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
  id: number;
};
