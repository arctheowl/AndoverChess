import { NextRequest, NextResponse } from 'next/server';
import { fixtures as staticFixtures, getUpcomingFixtures, getCompletedFixtures } from '@/data/fixtures';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');
    const source = searchParams.get('source'); // 'lms' or 'static'
    
    // Try to get dynamic fixtures first
    let fixtures = staticFixtures;
    let dataSource = 'static';
    
    if (source !== 'static') {
      try {
        const lmsResponse = await fetch(
          `${request.nextUrl.origin}/api/fixtures/lms`,
          { next: { revalidate: 300 } }
        );
        
        if (lmsResponse.ok) {
          const lmsData = await lmsResponse.json();
          if (lmsData.success && lmsData.data.length > 0) {
            fixtures = lmsData.data;
            dataSource = 'lms';
          }
        }
      } catch (error) {
        console.error('Error fetching LMS fixtures, using static fallback:', error);
      }
    }
    
    // Apply filters
    let filteredFixtures = fixtures;
    
    if (status) {
      filteredFixtures = fixtures.filter(fixture => fixture.status === status);
    }
    
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
      total: fixtures.length,
      source: dataSource,
    });
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fixtures' },
      { status: 500 }
    );
  }
}
