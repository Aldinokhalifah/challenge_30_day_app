
import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    console.log(`[Middleware] Checking path: ${pathname}, Token: ${token ? 'exists' : 'missing'}`);

    // PUBLIC ROUTES (tidak perlu login)
    const publicRoutes = [
        '/Login',
        '/Register',
        '/Challenge_public',        
        '/api/auth/login',
        '/api/auth/register',
        '/api/public'
    ];

    // Static files yang harus di-skip
    const staticExtensions = ['.ico', '.png', '.jpg', '.jpeg', '.svg', '.css', '.js', '.woff', '.woff2'];
    const isStaticFile = staticExtensions.some(ext => pathname.endsWith(ext));
    
    if (isStaticFile) {
        return NextResponse.next();
    }

    // Check apakah route public
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );

    if (isPublicRoute) {
        // Jika sudah login dan akses Login/Register → redirect
        if (token && (pathname === '/Login' || pathname === '/Register')) {
            console.log(`[Middleware] Already logged in - redirecting from ${pathname} to /Home`);
            return NextResponse.redirect(new URL("/Home", req.url));
        }

        console.log(`[Middleware] Public route: ${pathname} - allowing access`);
        return NextResponse.next();
    }

    // REDIRECT JIKA SUDAH LOGIN
    // User sudah login tapi akses halaman auth
    if (token && (pathname === '/Login' || pathname === '/Register')) {
        console.log(`[Middleware] Already logged in - redirecting to Home`);
        return NextResponse.redirect(new URL("/Home", req.url));
    }

    // PROTECTED ROUTES (wajib login)
    if (!token) {
        console.log(`[Middleware] No token - redirecting to Login from ${pathname}`);
        const loginUrl = new URL("/Login", req.url);
        loginUrl.searchParams.set('redirect', pathname); // Save intended destination
        return NextResponse.redirect(loginUrl);
    }

    // INACTIVITY TIMEOUT (30 menit)
    const now = Date.now();
    const lastActivity = req.cookies.get("lastActivity")?.value;
    const maxInactivity = 30 * 60 * 1000; // 30 minutes

    if (lastActivity && now - Number(lastActivity) > maxInactivity) {
        console.log(`[Middleware] Session expired (${Math.round((now - Number(lastActivity)) / 1000 / 60)} minutes) - redirecting to Login`);
        const response = NextResponse.redirect(new URL("/Login", req.url));
        response.cookies.delete("token");
        response.cookies.delete("lastActivity");
        return response;
    }

    // UPDATE LAST ACTIVITY
    const response = NextResponse.next();
    response.cookies.set("lastActivity", String(now), {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 // 24 hours
    });

    console.log(`[Middleware] Access granted to ${pathname}`);
    return response;
}

export const config = {
    // Match semua routes kecuali Next.js internals dan static files
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};