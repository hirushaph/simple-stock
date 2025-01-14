import { cookies } from "next/headers";

type FetchInstance = {
  url: string;
  method: string;
};

const fetchInstance = async ({ url, method }: FetchInstance) => {
  const sessionCookie = (await cookies()).get("session");
  const headers = {
    headers: {
      Cookie: `session=${sessionCookie?.value}`,
    },
  };
  return fetch(url, { method, ...headers });
};

export default fetchInstance;
