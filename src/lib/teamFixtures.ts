import { fixtures, Fixture } from '@/data/fixtures';
import { teams } from '@/data/teams';

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
export function getTeamFixtures(teamName: string): TeamMatch[] {
  const teamLetter = getTeamLetter(teamName);
  const teamFixtureName = `Andover ${teamLetter}`;
  
  return fixtures
    .filter(fixture => 
      fixture.homeTeam === teamFixtureName || fixture.awayTeam === teamFixtureName
    )
    .map(fixture => ({
      id: fixture.id,
      date: fixture.date,
      time: fixture.time,
      opponent: fixture.homeTeam === teamFixtureName ? fixture.awayTeam : fixture.homeTeam,
      venue: fixture.homeTeam === teamFixtureName ? 'home' : 'away',
      competition: fixture.competition,
      isTournament: fixture.isTournament,
      status: fixture.status,
      result: fixture.result,
      score: fixture.score,
      notes: fixture.notes,
      location: fixture.location,
      address: fixture.address,
      moreInfoLink: fixture.moreInfoLink
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Get fixtures for a specific team dynamically from LMS
 * @param teamName - The team name (e.g., "A Team", "B Team", "C Team")
 * @returns Promise of array of fixtures for the team
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
      return getTeamFixtures(teamName); // Fallback to static
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
  
  // Fallback to static
  return getTeamFixtures(teamName);
}

/**
 * Get upcoming fixtures for a specific team
 * @param teamName - The team name (e.g., "A Team", "B Team", "C Team")
 * @returns Array of upcoming fixtures for the team
 */
export function getUpcomingTeamFixtures(teamName: string): TeamMatch[] {
  return getTeamFixtures(teamName)
    .filter(fixture => fixture.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Get completed fixtures for a specific team
 * @param teamName - The team name (e.g., "A Team", "B Team", "C Team")
 * @returns Array of completed fixtures for the team
 */
export function getCompletedTeamFixtures(teamName: string): TeamMatch[] {
  return getTeamFixtures(teamName)
    .filter(fixture => fixture.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent first
}

/**
 * Get recent results for a specific team (last 5 completed matches)
 * @param teamName - The team name (e.g., "A Team", "B Team", "C Team")
 * @returns Array of recent completed fixtures for the team
 */
export function getRecentTeamResults(teamName: string): TeamMatch[] {
  // First try to get from fixtures data
  const fixtureResults = getCompletedTeamFixtures(teamName).slice(0, 5);
  
  // If we have fixture results, use them
  if (fixtureResults.length > 0) {
    return fixtureResults;
  }
  
  // Otherwise, get from team data (for sample data)
  // const team = teams.find((t: any) => t.name === teamName);
  
  // if (team && team.recentMatches) {
  //   return team.recentMatches
  //     .filter((match: any) => match.result) // Only include matches with results
  //     .slice(0, 5)
  //     .map((match: any) => ({
  //       id: `team-${teamName}-${match.date}`,
  //       date: match.date,
  //       time: '19:00', // Default time for team matches
  //       opponent: match.opponent,
  //       venue: match.isHome ? 'home' : 'away',
  //       competition: 'League Match',
  //       isTournament: false,
  //       status: 'completed' as const,
  //       result: match.result,
  //       location: match.location,
  //       address: undefined,
  //       notes: undefined,
  //       moreInfoLink: undefined
  //     }));
  // }
  
  return [];
}

/**
 * Get next match for a specific team
 * @param teamName - The team name (e.g., "A Team", "B Team", "C Team")
 * @returns The next upcoming fixture or null if none
 */
export function getNextTeamMatch(teamName: string): TeamMatch | null {
  const upcoming = getUpcomingTeamFixtures(teamName);
  return upcoming.length > 0 ? upcoming[0] : null;
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
