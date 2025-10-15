import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('sb-access-token')?.value ||
                  req.cookies.get('supabase-auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, error: { message: 'Not authenticated', source: '/api/properties/search-bbl' } },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { ok: false, error: { message: 'Unauthorized', source: '/api/properties/search-bbl' } },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { bbl } = body;

    if (!bbl) {
      return NextResponse.json(
        { ok: false, error: { message: 'BBL is required', source: '/api/properties/search-bbl' } },
        { status: 400 }
      );
    }

    const mockProperty = {
      bbl,
      address: '123 Main Street, Brooklyn, NY 11201',
      borough: 'Brooklyn',
      block: '123',
      lot: '1',
      zipCode: '11201',
      ownerName: 'Sample Owner LLC',
      lotArea: 10000,
      buildingClass: 'R4',
      yearBuilt: 2010,
      zoningDistrict: 'R6',
      far: 2.0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ ok: true, data: mockProperty }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to search property',
          source: '/api/properties/search-bbl',
          details: error,
        },
      },
      { status: 500 }
    );
  }
}
