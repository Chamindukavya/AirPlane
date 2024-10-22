import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const path = request.nextUrl.pathname;

  const isAdminPath = path === '/Admin' || path === '/adminOnly' 
                                || path === '/adminOnly/addFlightSchedule' 
                                || path === '/adminOnly/addAircraft' 
                                || path === '/adminOnly/addairport'
                                || path === '/adminOnly/addFlight'
                                || path === '/adminOnly/addFlightSchedule';

 
  if (isAdminPath) {
    if (!token || token.role_name !== 'admin') {
      return NextResponse.redirect(new URL('/403', request.url)); 
    }
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: [
    '/Admin',
    '/adminOnly' ,
    '/adminOnly/addFlightSchedule',
  
  ], 
}
