import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
    const authCookie = request.cookies.get('Authorization')?.value;

    if (!authCookie) {
        const url = new URL("/", request.url);
        url.searchParams.set('no_auth', 'true');
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/products/:path*", "/categories/:path*", "/product/:path*"],
};

