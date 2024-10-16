import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret"; // Use a fallback secret

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify the token
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next(); // Allow access to the protected route
  } catch (error) {
    console.error("Invalid token:", error);

    // Redirect to login if token is invalid
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Middleware configuration to protect dashboard route
export const config = {
  matcher: ["/dashboard/:path*"], // Protects all dashboard-related routes
};
