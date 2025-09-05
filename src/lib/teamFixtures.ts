import { fixtures, Fixture } from '@/data/fixtures';

export interface TeamMatch {
  id: string;
  date: string;
  time: string;
  opponent: string;
  venue: string;
  competition: string;
  isTournament: boolean;
  status: 'upcoming' | 'completed' | 'cancelled';
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
 * Get fixtures for a specific team
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
  return getCompletedTeamFixtures(teamName).slice(0, 5);
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
