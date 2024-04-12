import { NextResponse } from "next/server";
import { checkToken } from "./app/utils/useful";

export async function middleware(request) {
  let path = request.nextUrl.pathname;
  let token = request.cookies.get("axetkn")?.value;

  const check = await checkToken(token || "");

  if (!token && path !== "/login" && path !== "/registration" && path !== "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token && path == "/login" && path == "/registration") {
    return NextResponse.next();
  }

  if (token && check?.isValid && (path === "/login" || path === "/registration" || path === "/")) {
    return NextResponse.redirect(new URL("/main/dashboard", request.url));
  }

  if (token && !check?.isValid) {
    request.cookies.delete("axetkn");
    request.cookies.delete("rvktkn");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/registration",
    "/main/dashboard"
  ],
};