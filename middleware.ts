import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.log("No token found. Redirecting to /login.");
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    console.log("Token verified");
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }
}

export const config = {
  matcher: ["/pages/dashboard/:path*"],
};
