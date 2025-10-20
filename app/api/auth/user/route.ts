import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('sb-access-token')?.value ||
                  req.cookies.get('supabase-auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, error: { message: 'Not authenticated', source: '/api/auth/user' } },
        { status: 401 }
      );
    }

    const supabase = createServerClient();

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        { ok: false, error: { message: 'User not found', source: '/api/auth/user' } },
        { status: 401 }
      );
    }

    return NextResponse.json({ ok: true, data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to fetch user',
          source: '/api/auth/user',
        },
      },
      { status: 500 }
    );
  }
}
