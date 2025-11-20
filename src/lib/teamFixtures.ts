export interface TeamMatch {
  id: string;
  date: string;
  time: string;
  opponent: string;
  venue: string;
  competition: string;
  isTournament: boolean;
  status: 'upcoming' | 'completed' | 'cancelled' | 'postponed';
  result?: string;
  score?: string;
  notes?: string;
  location?: string;
  address?: string;
  moreInfoLink?: string;
}

/**
 * Get team identifier from team name
 * @param teamName - The team name (e.g., "A Team", "B Team", "C Team")
 * @returns The team letter (A, B, C)
 */
export function getTeamLetter(teamName: string): string {
  if (teamName.includes('A Team')) return 'A';
  if (teamName.includes('B Team')) return 'B';
  if (teamName.includes('C Team')) return 'C';
  return 'A'; // Default fallback
}

/**
 * Get fixtures for a specific team (static)
 * @param teamName - The team name (e.g., "A Team", "B Team", "C Team")
 * @returns Array of fixtures for the team
 */
export async function getTeamFixturesDynamic(teamName: string): Promise<TeamMatch[]> {
  const teamLetter = getTeamLetter(teamName);

  try {
    // Use absolute URL for client-side fetching
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/teams/${teamLetter}/fixtures`, {
      cache: 'no-store', // Always fetch fresh data on client
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch fixtures for team ${teamLetter}`);
      return [];
    }
    
    const data = await response.json();
    
    if (data.success && data.data) {
      const teamFixtureName = `Andover ${teamLetter}`;
      return data.data.map((fixture: any) => ({
        id: fixture.id,
        date: fixture.date,
        time: fixture.time,
        opponent: fixture.homeTeam === teamFixtureName 
          ? fixture.awayTeam 
          : fixture.homeTeam,
        venue: fixture.homeTeam === teamFixtureName ? 'home' : 'away',
        competition: fixture.competition || 'Southampton Chess League',
        isTournament: false,
        status: fixture.status || 'upcoming',
        result: fixture.result || undefined,
        score: fixture.score || undefined,
        notes: fixture.notes,
        moreInfoLink: fixture.fixtureUrl,
      }));
    }
  } catch (error) {
    console.error('Error fetching dynamic fixtures:', error);
  }
  
  return [];
}

/**
 * Format date for display
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted date string
 */
export function formatTeamMatchDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format time for display
 * @param timeString - Time string in HH:MM format
 * @returns Formatted time string
 */
export function formatTeamMatchTime(timeString: string): string {
  return timeString;
}
