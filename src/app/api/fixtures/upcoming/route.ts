import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
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

    let upcomingFixtures = lmsData.data.filter(
      (fixture: { status: string }) => fixture.status === 'upcoming'
    );

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum)) {
        upcomingFixtures = upcomingFixtures.slice(0, limitNum);
      }
    }

    upcomingFixtures.sort((a: { date: string }, b: { date: string }) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return NextResponse.json({
      success: true,
      data: upcomingFixtures,
      count: upcomingFixtures.length,
      source: 'lms',
    });
  } catch (error) {
    console.error('Error fetching upcoming fixtures:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch upcoming fixtures from LMS' },
      { status: 500 }
    );
  }
}
