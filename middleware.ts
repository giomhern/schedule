import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const jwt = require('jsonwebtoken')

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')

    const protectedPaths = ["/admin"]
    const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

    if(isProtectedPath){
        if(!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        try {
            jwt.verify(token.value, process.env.JWT_SECRET)
            return NextResponse.next()
        } catch (error) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*']
}