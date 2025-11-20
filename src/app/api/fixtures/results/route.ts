import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const recent = searchParams.get('recent');

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

    let results = lmsData.data
      .filter((fixture: { status: string }) => fixture.status === 'completed')
      .sort(
        (a: { date: string }, b: { date: string }) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    // If recent parameter is provided, get only recent results
    if (recent === 'true') {
      results = results.slice(0, 3);
    }

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum)) {
        results = results.slice(0, limitNum);
      }
    }

    // Calculate summary statistics
    const normalizeResult = (result?: string) => result?.toLowerCase() || '';
    const summary = {
      total: results.length,
      won: results.filter(f => normalizeResult(f.result) === 'win' || normalizeResult(f.result) === 'won').length,
      lost: results.filter(f => normalizeResult(f.result) === 'loss' || normalizeResult(f.result) === 'lost').length,
      drawn: results.filter(f => normalizeResult(f.result) === 'draw' || normalizeResult(f.result) === 'drew').length,
      winRate:
        results.length === 0
          ? 0
          : Math.round(
              (results.filter(f => normalizeResult(f.result) === 'win' || normalizeResult(f.result) === 'won').length /
                results.length) *
                100
            ),
    };

    return NextResponse.json({
      success: true,
      data: results,
      summary,
      count: results.length,
      source: 'lms',
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results from LMS' },
      { status: 500 }
    );
  }
}
