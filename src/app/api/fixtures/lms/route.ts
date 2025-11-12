import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const team = searchParams.get('team'); // Optional filter
    
    const teams = team ? [team.toUpperCase()] : ['A', 'B', 'C'];
    
    // Fetch fixtures for all teams in parallel
    const fixturePromises = teams.map(async (teamLetter) => {
      try {
        const response = await fetch(
          `${request.nextUrl.origin}/api/teams/${teamLetter}/fixtures`,
          { next: { revalidate: 300 } }
        );
        
        if (!response.ok) {
          console.error(`Failed to fetch fixtures for team ${teamLetter}: ${response.status}`);
          return [];
        }
        
        const data = await response.json();
        return data.success ? data.data : [];
      } catch (error) {
        console.error(`Error fetching fixtures for team ${teamLetter}:`, error);
        return [];
      }
    });
    
    const allFixtures = (await Promise.all(fixturePromises)).flat();
    
    // Deduplicate fixtures by ID (in case the same fixture appears in multiple team lists)
    const uniqueFixtures = Array.from(
      new Map(allFixtures.map(fixture => [fixture.id, fixture])).values()
    );
    
    // Sort by date
    uniqueFixtures.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    return NextResponse.json({
      success: true,
      data: uniqueFixtures,
      count: uniqueFixtures.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching LMS fixtures:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

