import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const homeUrl = new URL('/', req.nextUrl)

  if (token) {
    if (
      req.nextUrl.pathname === '/signin' ||
      req.nextUrl.pathname === '/signup'
    ) {
      return NextResponse.redirect(homeUrl)
    }
  }

  if (!token) {
    if (req.nextUrl.pathname.includes('dashboard')) {
      return NextResponse.redirect(homeUrl)
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
