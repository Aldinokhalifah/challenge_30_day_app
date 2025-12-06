import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    // Routes yang memerlukan autentikasi
    const protectedRoutes = ['/', '/pages/Challenges', '/pages/Home', '/pages/Profile'];
    const isProtectedRoute = protectedRoutes.some(route => 
        pathname === route || pathname.startsWith(route + '/')
    );

    // Jika akses protected route tanpa token, redirect ke login
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/Login", req.url));
    }

    // Jika ada token, cek inaktivitas (30 menit)
    if (token && isProtectedRoute) {
        const lastActivityCookie = req.cookies.get("lastActivity")?.value;
        const now = Date.now();
        const maxInactivity = 30 * 60 * 1000; // 30 menit

        if (lastActivityCookie) {
            const inactiveTime = now - parseInt(lastActivityCookie);
            if (inactiveTime > maxInactivity) {
                // Token expired due to inactivity
                const response = NextResponse.redirect(new URL("/Login", req.url));
                response.cookies.delete("token");
                response.cookies.delete("lastActivity");
                return response;
            }
        }

        // Update lastActivity cookie
        const response = NextResponse.next();
        response.cookies.set("lastActivity", now.toString(), {
            httpOnly: false, // Perlu false agar bisa diakses dari client-side juga
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 // 1 hari
        });
        return response;
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/', '/pages/:path*'], // Melindungi root dan semua route di /pages
};
