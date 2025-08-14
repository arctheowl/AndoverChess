import { NextRequest, NextResponse } from 'next/server';
import { getUpcomingFixtures } from '@/data/fixtures';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    let upcomingFixtures = getUpcomingFixtures();

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum)) {
        upcomingFixtures = upcomingFixtures.slice(0, limitNum);
      }
    }

    return NextResponse.json({
      success: true,
      data: upcomingFixtures,
      count: upcomingFixtures.length
    });
  } catch (error) {
    console.error('Error fetching upcoming fixtures:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch upcoming fixtures' },
      { status: 500 }
    );
  }
}
