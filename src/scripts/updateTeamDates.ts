import { promises as fs } from 'fs';
import path from 'path';
import { parseICal, extractTeamMatches, getUpcomingMatchesForTeam, getCompletedMatchesForTeam } from '../lib/icalParser';

interface TeamWithMatches {
  id: string;
  name: string;
  division: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  maxPoints: number;
  record: string;
  description: string;
  color: string;
  upcomingMatches: Array<{
    date: string;
    opponent: string;
    location: string;
    isHome: boolean;
  }>;
  recentMatches: Array<{
    date: string;
    opponent: string;
    location: string;
    isHome: boolean;
  }>;
}

async function updateTeamDates() {
  try {
    // Read the iCal file
    const icalPath = path.join(process.cwd(), 'src/data/Andover Chess Matches.ics');
    const icalContent = await fs.readFile(icalPath, 'utf-8');
    
    // Parse the iCal content
    const parsed = parseICal(icalContent);
    console.log(`Parsed ${parsed.events.length} events from iCal file`);
    
    // Extract team matches
    const matches = extractTeamMatches(parsed.events);
    console.log(`Found ${matches.length} team matches`);
    
    // Group matches by team - get all matches for now
    const teamMatches = {
      A: matches.filter(m => m.team === 'A').slice(0, 5),
      B: matches.filter(m => m.team === 'B').slice(0, 5),
      C: matches.filter(m => m.team === 'C').slice(0, 5)
    };
    
    const recentMatches = {
      A: matches.filter(m => m.team === 'A').slice(-3),
      B: matches.filter(m => m.team === 'B').slice(-3),
      C: matches.filter(m => m.team === 'C').slice(-3)
    };
    
    // Debug: Log some matches to see what we're getting
    console.log('Sample matches:');
    matches.slice(0, 5).forEach(match => {
      console.log(`- ${match.date.toISOString().split('T')[0]}: ${match.homeTeam} vs ${match.awayTeam} (${match.team} team)`);
    });
    
    // Create updated teams data
    const updatedTeams: TeamWithMatches[] = [
      {
        id: '1',
        name: 'A Team',
        division: 'Southampton League Division 2',
        position: 4,
        played: 10,
        won: 3,
        drawn: 3,
        lost: 4,
        points: 9,
        maxPoints: 20,
        record: 'W3 D3 L4',
        description: 'Our premier team competing at the highest level in Southampton chess',
        color: 'emerald',
        upcomingMatches: teamMatches.A.map(match => ({
          date: match.date.toISOString().split('T')[0],
          opponent: match.isHome ? match.awayTeam : match.homeTeam,
          location: match.location,
          isHome: match.isHome
        })),
        recentMatches: recentMatches.A.map(match => ({
          date: match.date.toISOString().split('T')[0],
          opponent: match.isHome ? match.awayTeam : match.homeTeam,
          location: match.location,
          isHome: match.isHome
        }))
      },
      {
        id: '2',
        name: 'B Team',
        division: 'Southampton League Division 4',
        position: 3,
        played: 10,
        won: 4,
        drawn: 4,
        lost: 2,
        points: 12,
        maxPoints: 20,
        record: 'W4 D4 L2',
        description: 'Developing players and providing competitive experience',
        color: 'blue',
        upcomingMatches: teamMatches.B.map(match => ({
          date: match.date.toISOString().split('T')[0],
          opponent: match.isHome ? match.awayTeam : match.homeTeam,
          location: match.location,
          isHome: match.isHome
        })),
        recentMatches: recentMatches.B.map(match => ({
          date: match.date.toISOString().split('T')[0],
          opponent: match.isHome ? match.awayTeam : match.homeTeam,
          location: match.location,
          isHome: match.isHome
        }))
      },
      {
        id: '3',
        name: 'C Team',
        division: 'Southampton League Division 5',
        position: 3,
        played: 10,
        won: 4,
        drawn: 4,
        lost: 2,
        points: 12,
        maxPoints: 20,
        record: 'W4 D4 L2',
        description: 'Talent representing the future of Andover Chess Club',
        color: 'green',
        upcomingMatches: teamMatches.C.map(match => ({
          date: match.date.toISOString().split('T')[0],
          opponent: match.isHome ? match.awayTeam : match.homeTeam,
          location: match.location,
          isHome: match.isHome
        })),
        recentMatches: recentMatches.C.map(match => ({
          date: match.date.toISOString().split('T')[0],
          opponent: match.isHome ? match.awayTeam : match.homeTeam,
          location: match.location,
          isHome: match.isHome
        }))
      }
    ];
    
    // Write the updated teams data
    const teamsPath = path.join(process.cwd(), 'src/data/teams.ts');
    const teamsContent = `export interface Team {
  id: string;
  name: string;
  division: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  maxPoints: number;
  record: string;
  description: string;
  color: string;
  upcomingMatches: Array<{
    date: string;
    opponent: string;
    location: string;
    isHome: boolean;
  }>;
  recentMatches: Array<{
    date: string;
    opponent: string;
    location: string;
    isHome: boolean;
  }>;
}

export const teams: Team[] = ${JSON.stringify(updatedTeams, null, 2)};

export const getTeamById = (id: string) => teams.find(team => team.id === id);

export const getTeamStats = () => ({
  totalTeams: teams.length,
  totalMembers: teams.reduce((sum, team) => sum + team.played * 6, 0), // Estimate 6 players per team
  totalPoints: teams.reduce((sum, team) => sum + team.points, 0),
  totalMaxPoints: teams.reduce((sum, team) => sum + team.maxPoints, 0)
});
`;
    
    await fs.writeFile(teamsPath, teamsContent, 'utf-8');
    
    console.log('Successfully updated teams data with match dates from iCal file');
    console.log('Summary:');
    console.log(`- A Team: ${teamMatches.A.length} upcoming matches, ${recentMatches.A.length} recent matches`);
    console.log(`- B Team: ${teamMatches.B.length} upcoming matches, ${recentMatches.B.length} recent matches`);
    console.log(`- C Team: ${teamMatches.C.length} upcoming matches, ${recentMatches.C.length} recent matches`);
    
  } catch (error) {
    console.error('Error updating team dates:', error);
  }
}

// Run the update if this script is executed directly
if (require.main === module) {
  updateTeamDates();
}

export { updateTeamDates };
