import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    const lmsResponse = await fetch(
      `${request.nextUrl.origin}/api/fixtures/lms`,
      { next: { revalidate: 300 } }
    );

    if (!lmsResponse.ok) {
      throw new Error(`Failed to fetch LMS fixtures: ${lmsResponse.status}`);
    }

    const lmsData = await lmsResponse.json();
    if (!lmsData.success || !Array.isArray(lmsData.data)) {
      throw new Error('Invalid LMS response');
    }

    let fixtures = lmsData.data;

    // Apply filters
    if (status) {
      fixtures = fixtures.filter((fixture: { status: string }) => fixture.status === status);
    }

    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum)) {
        fixtures = fixtures.slice(0, limitNum);
      }
    }

    // Sort by date (upcoming first, then completed by most recent)
    fixtures.sort((a: { status: string; date: string }, b: { status: string; date: string }) => {
      if (a.status === 'upcoming' && b.status !== 'upcoming') return -1;
      if (a.status !== 'upcoming' && b.status === 'upcoming') return 1;
      if (a.status === 'upcoming' && b.status === 'upcoming') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return NextResponse.json({
      success: true,
      data: fixtures,
      count: fixtures.length,
      total: lmsData.data.length,
      source: 'lms',
    });
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fixtures from LMS' },
      { status: 500 }
    );
  }
}
