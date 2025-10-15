import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('sb-access-token')?.value ||
                  req.cookies.get('supabase-auth-token')?.value;

    if (!token) {
      const redirectUrl = new URL('/auth/login', req.url);
      redirectUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        const redirectUrl = new URL('/auth/login', req.url);
        redirectUrl.searchParams.set('redirectedFrom', pathname);
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      const redirectUrl = new URL('/auth/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
