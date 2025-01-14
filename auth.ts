import { cookies } from "next/headers";
import {
  AdminClient,
  createAdminClient,
  createSessionClient,
} from "./appwrite/config";

import { SessionCookie } from "./types/types";
import { Models } from "node-appwrite";
import { redirect } from "next/navigation";

type Auth = {
  user: Models.User<Models.Preferences> | null;
  sessionCookie?: SessionCookie;
  getUser: () => Promise<Models.User<Models.Preferences> | undefined>;
  createSession: (formData: FormData) => Promise<void>;
};

const auth: Auth = {
  user: null,
  sessionCookie: undefined,

  getUser: async () => {
    auth.sessionCookie = (await cookies()).get("session");

    try {
      const sessionClient = await createSessionClient(
        auth.sessionCookie?.value
      );

      if (sessionClient === null) {
        throw new Error("Authentication Failed");
      }

      auth.user = await sessionClient.account.get();
      return auth.user;
    } catch (error) {
      auth.user = null;
      auth.sessionCookie = undefined;
    }
  },

  createSession: async (formData: FormData) => {
    "use server";
    const data = Object.fromEntries(formData);
    const { email, password } = data as { email: string; password: string };

    const adminClient: AdminClient | null = await createAdminClient();

    const session = await adminClient?.account.createEmailPasswordSession(
      email,
      password
    );

    if (session) {
      (await cookies()).set("session", session.secret, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        expires: new Date(session.expire),
        path: "/",
      });

      redirect("/");
    }
  },
};

export default auth;
