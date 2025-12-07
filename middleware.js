import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    // Halaman publik yang tidak butuh autentikasi
    const publicRoutes = ['/Login', '/Register', '/api/auth/login', '/api/auth/register', '/api/public'];

    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );

    // Boleh lewat kalau public
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Halaman lain wajib token
    if (!token) {
        console.log(`[Middleware] No token - redirecting to Login from ${pathname}`);
        return NextResponse.redirect(new URL("/Login", req.url));
    }

    // Update inactivity cookie 30 menit
    const now = Date.now();
    const lastActivity = req.cookies.get("lastActivity")?.value;
    const maxInactivity = 30 * 60 * 1000;

    if (lastActivity && now - Number(lastActivity) > maxInactivity) {
        const response = NextResponse.redirect(new URL("/Login", req.url));
        response.cookies.delete("token");
        response.cookies.delete("lastActivity");
        return response;
    }

    const response = NextResponse.next();
    response.cookies.set("lastActivity", String(now), {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24
    });

    return response;
}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico|public).*)'],
};
