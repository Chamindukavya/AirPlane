import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const path = request.nextUrl.pathname;

  // Check if it's an admin path
  const isAdminPath = path === '/Admin';

  // If accessing the admin path and no token or user is not an admin, redirect
  if (isAdminPath) {
    if (!token || token.user_role !== 'admin') {
      return NextResponse.redirect(new URL('/403', request.url));  // Redirect to a '403 Forbidden' page or home
    }
  }

  return NextResponse.next(); // Allow the request if the user is an admin or the path isn't restricted
}

export const config = {
  matcher: ['/Admin'], // Restrict access to the admin page
}
