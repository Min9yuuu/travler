import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/session';

interface Routes {
  [key: string]: boolean;
}

const publicUrl: Routes = {
  '/': true,
  '/login': true,
  '/signup': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicUrl[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
