import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that strictly require the user to be logged in
const protectedRoutes = [
  "/pesan-seragam",
  "/pesanan-rental-saya",
  "/konsultasi-chat",
  "/profil",
  "/notifikasi",
];

// Auth routes that should redirect to home if already logged in
const authRoutes = [
  "/masuk",
  "/daftar",
  "/lupa-password",
  "/konfirmasi-kode",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuth = authRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If user is not logged in and tries to access protected pages, redirect to /masuk
  if (isProtected && !token) {
    const redirectUrl = new URL("/masuk", request.url);
    redirectUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is already logged in and tries to access login/register, redirect to home
  if (isAuth && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
