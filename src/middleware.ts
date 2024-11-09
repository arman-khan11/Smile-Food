import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  
  const isPahtName = path ==='/login'||path==='/signup'||path==='/verifyEmail' 
  const token = request.cookies.get("token")?.value
  if (isPahtName && token) {
    return NextResponse.redirect(new URL('/main', request.url))

  }
  if (!isPahtName && !token) {
    return NextResponse.redirect(new URL('/login', request.url))

  }


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/verifyEmail',
    '/main'
  ]
  ,
}