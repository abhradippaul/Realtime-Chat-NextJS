import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";
  const token = request.cookies?.get("next-auth.session-token")?.value || "";
  if (isPublicPath && !token) {
    return NextResponse.next();
  }
  if (!isPublicPath && token) {
    return NextResponse.next();
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/login", "/dashboard", "/dashboard/add", "/dashboard/requests"],
};
