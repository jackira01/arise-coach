import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
    const { nextUrl, auth: session } = req

    if (nextUrl.pathname.startsWith('/cuenta')) {
        if (!session) {
            return NextResponse.redirect(new URL('/login', nextUrl))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/cuenta/:path*'],
}
