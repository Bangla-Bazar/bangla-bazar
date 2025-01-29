import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = req.cookies.get("token"); // Get token from cookies

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url)); // Redirect if not logged in
    }

    return NextResponse.next(); // Allow access
}

// Apply middleware to protect only `/admin` routes
export const config = {
    matcher: ["/admin/:path*"], // Protects /admin, /admin/add, /admin/edit
};
