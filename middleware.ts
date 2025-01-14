import { NextRequest, NextResponse } from "next/server";
import auth from "./auth";

export async function middleware(request: NextRequest) {
  const user = await auth.getUser();

  if (!user) {
    request.cookies.delete("session");
    const response = NextResponse.redirect(new URL("/login", request.url));
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login|register).*)",
  ],
};
