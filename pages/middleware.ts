import { NextRequest, NextResponse } from 'next/server';


export function middleware(req: NextRequest) {
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';  // Provide a default version

  const currentVersion = req.cookies.get('app_version')?.value;

  if (currentVersion !== appVersion) {
    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.cookies.set('app_version', appVersion, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false,
    });

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
