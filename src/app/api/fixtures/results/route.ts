import { NextRequest, NextResponse } from 'next/server';

type LMSFixture = {
  status: string;
  date: string;
  result?: string;
};
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

    const lmsData = (await lmsResponse.json()) as {
      success: boolean;
      data: LMSFixture[];
    };
    if (!lmsData.success || !Array.isArray(lmsData.data)) {
      throw new Error('Invalid LMS response');
    }

    let results: LMSFixture[] = lmsData.data
      .filter((fixture) => fixture.status === 'completed')
      .sort(
        (a, b) =>
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
      won: results.filter(fixture => normalizeResult(fixture.result) === 'win' || normalizeResult(fixture.result) === 'won').length,
      lost: results.filter(fixture => normalizeResult(fixture.result) === 'loss' || normalizeResult(fixture.result) === 'lost').length,
      drawn: results.filter(fixture => normalizeResult(fixture.result) === 'draw' || normalizeResult(fixture.result) === 'drew').length,
      winRate:
        results.length === 0
          ? 0
          : Math.round(
              (results.filter(fixture => normalizeResult(fixture.result) === 'win' || normalizeResult(fixture.result) === 'won').length /
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
