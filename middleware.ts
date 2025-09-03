import { NextRequest, NextResponse } from 'next/server'
import { auth } from './app/lib/auth'

// Routes that bypass authentication
const publicRoutes = ['/auth/login', '/auth/callback']

const protectedAPIRoutes = [
  '/api/users/[chapterId]/get-users-list',
  '/api/users/[chapterId]/[userId]/update-user',
  '/api/users/[chapterId]/[userId]/delete-user',
  '/api/settings/[chapterId]'
]

export async function middleware(req: NextRequest) {
  const { nextUrl } = req

  // Skip middleware for static files and Next.js internals only
  if (
    nextUrl.pathname.startsWith('/_next') ||
    nextUrl.pathname.includes('.') ||
    nextUrl.pathname.startsWith('/icon') ||
    nextUrl.pathname.startsWith('/api/placeholder') ||
    nextUrl.pathname.match(/^\/api\/user\/[^\/]+$/)
  ) {
    return NextResponse.next()
  }

  const session = await auth()
  const isLoggedIn = !!session?.user

  // Set up request headers
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-pathname', nextUrl.pathname)
  if (session?.user) {
    const userData = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role,
      isAdmin: session.user.isAdmin,
      isSuperUser: session.user.isSuperUser
    }
    requestHeaders.set('x-user', JSON.stringify(userData))
  }

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthAPIRoute = nextUrl.pathname.startsWith('/api/auth')

  // Helper function to check if path matches any protected route pattern
  const isProtectedAPIRoute =
    protectedAPIRoutes.some((route) => {
      // Convert route pattern to regex (replace [param] with wildcard)
      const pattern = route.replace(/\[[\w-]+\]/g, '[^/]+')
      const regex = new RegExp(`^${pattern}$`)
      return regex.test(nextUrl.pathname)
    }) && !isAuthAPIRoute

  const isProtectedPageRoute = nextUrl.pathname.startsWith('/member') || nextUrl.pathname.startsWith('/admin')

  // Handle page route redirects for logged in users
  if (isLoggedIn && isPublicRoute) {
    // Only redirect from login page, not from custom callback
    if (nextUrl.pathname === '/auth/login') {
      const role = session.user.role
      const isAdmin = session.user.isAdmin
      const isSuperUser = session.user.isSuperUser

      if (role === 'admin' || isAdmin || isSuperUser) {
        return NextResponse.redirect(new URL('/admin/bridge', nextUrl))
      }

      return NextResponse.redirect(new URL('/member/bridge', nextUrl))
    }

    // Let custom callback handle its own routing
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  }

  // Protect API routes - require authentication
  if (isProtectedAPIRoute && !isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Protect page routes - redirect to login
  if (isProtectedPageRoute && !isLoggedIn) {
    const loginUrl = new URL('/auth/login', nextUrl)
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Continue with headers for all routes
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|icon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
}
