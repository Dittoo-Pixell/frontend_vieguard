import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/pesan-seragam",
  "/pesanan-rental-saya",
  "/konsultasi-chat",
  "/profil",
  "/notifikasi",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // In production, enforce strict authentication.
  // In development, allow viewing so the user can inspect all UI pages without a running database.
  if (process.env.NODE_ENV === "production" && isProtected && !token) {
    const redirectUrl = new URL("/masuk", request.url);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
