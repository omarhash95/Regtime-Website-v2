import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('sb-access-token')?.value ||
                  req.cookies.get('supabase-auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, error: { message: 'Not authenticated', source: '/api/dashboard/metrics' } },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        { ok: false, error: { message: 'Unauthorized', source: '/api/dashboard/metrics' } },
        { status: 401 }
      );
    }

    const metrics = {
      activeProjects: 12,
      propertiesAnalyzed: 48,
      complianceChecks: 156,
      teamMembers: 6,
    };

    return NextResponse.json({ ok: true, data: metrics }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to fetch metrics',
          source: '/api/dashboard/metrics',
          details: error,
        },
      },
      { status: 500 }
    );
  }
}
