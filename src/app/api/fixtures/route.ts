import { NextRequest, NextResponse } from 'next/server';
import { fixtures, getUpcomingFixtures, getCompletedFixtures } from '@/data/fixtures';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    let filteredFixtures = fixtures;

    // Filter by status if provided
    if (status) {
      filteredFixtures = fixtures.filter(fixture => fixture.status === status);
    }

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum)) {
        filteredFixtures = filteredFixtures.slice(0, limitNum);
      }
    }

    // Sort by date (upcoming first, then completed by most recent)
    filteredFixtures.sort((a, b) => {
      if (a.status === 'upcoming' && b.status !== 'upcoming') return -1;
      if (a.status !== 'upcoming' && b.status === 'upcoming') return 1;
      if (a.status === 'upcoming' && b.status === 'upcoming') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return NextResponse.json({
      success: true,
      data: filteredFixtures,
      count: filteredFixtures.length,
      total: fixtures.length
    });
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fixtures' },
      { status: 500 }
    );
  }
}
