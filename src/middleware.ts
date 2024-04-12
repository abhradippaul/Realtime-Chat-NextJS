import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
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
  //   if(isPublicPath && !toke)
  return NextResponse.redirect(new URL("/", request.url));
  // else {
  //     return NextResponse.redirect(new URL('/login', request.url))
  // }
  // next-auth.session-token
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/dashboard/add"],
};
