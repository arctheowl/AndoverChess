import { NextRequest, NextResponse } from 'next/server';

interface ECFFixture {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  competition: string;
  status: 'scheduled' | 'played' | 'cancelled';
  result?: string;
  score?: string;
  notes?: string;
}

interface ECFResponse {
  fixtures?: ECFFixture[];
  error?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const org = searchParams.get('org') || '1'; // Default to org 1 if not provided
    const clubCode = searchParams.get('clubCode');
    const status = searchParams.get('status'); // upcoming, completed, all

    if (!clubCode) {
      return NextResponse.json(
        { success: false, error: 'Club code is required' },
        { status: 400 }
      );
    }

    // Construct the ECF LMS API URL
    const ecfApiUrl = `https://ecflms.org.uk/lms/lmsrest/league/club.json?org=${org}&name=${clubCode}`;

    console.log('Fetching from ECF LMS:', ecfApiUrl);

    // Fetch data from ECF LMS API
    const response = await fetch(ecfApiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'AndoverChessClub/1.0'
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`ECF LMS API responded with status: ${response.status}`);
    }

    const ecfData: ECFResponse = await response.json();

    if (ecfData.error) {
      throw new Error(`ECF LMS API error: ${ecfData.error}`);
    }

    // Transform ECF data to our format
    const transformedFixtures = (ecfData.fixtures || []).map((ecfFixture, index) => ({
      id: ecfFixture.id || `ecf-${index}`,
      homeTeam: ecfFixture.homeTeam || 'Unknown',
      awayTeam: ecfFixture.awayTeam || 'Unknown',
      date: ecfFixture.date,
      time: '19:00', // Default time for chess matches
      venue: ecfFixture.venue === 'home' ? 'home' : 'away',
      competition: ecfFixture.competition || 'Hampshire League',
      status: ecfFixture.status === 'played' ? 'completed' : 
              ecfFixture.status === 'cancelled' ? 'cancelled' : 'upcoming',
      result: ecfFixture.result,
      score: ecfFixture.score,
      notes: ecfFixture.notes
    }));

    // Filter by status if requested
    let filteredFixtures = transformedFixtures;
    if (status && status !== 'all') {
      filteredFixtures = transformedFixtures.filter(fixture => fixture.status === status);
    }

    // Sort fixtures by date
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
      source: 'ECF LMS',
      clubCode,
      org
    });

  } catch (error) {
    console.error('Error fetching from ECF LMS:', error);
    
    // Return a more user-friendly error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        success: false, 
        error: `Failed to fetch fixtures from ECF LMS: ${errorMessage}`,
        source: 'ECF LMS'
      },
      { status: 500 }
    );
  }
}
