import { promises as fs } from 'fs';
import path from 'path';
import { parseICal, extractTeamMatches } from '../lib/icalParser';

interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: 'home' | 'away';
  competition: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  result?: string;
  score?: string;
  notes?: string;
}

async function updateFixtures() {
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
    
    // Convert matches to fixtures format
    const fixtures: Fixture[] = matches.map((match, index) => {
      const date = match.date.toISOString().split('T')[0];
      const time = match.date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      
      // Determine if it's a home or away match for Andover
      const isHome = match.isHome;
      const venue = isHome ? 'home' : 'away';
      
      // Determine competition from division
      let competition = 'Southampton Chess League';
      if (match.division.includes('Div 2')) {
        competition = 'SCL Division 2';
      } else if (match.division.includes('Div 4')) {
        competition = 'SCL Division 4';
      } else if (match.division.includes('Div 5')) {
        competition = 'SCL Division 5';
      } else if (match.division.includes('Rob Cup')) {
        competition = 'SCL Rob Cup';
      }
      
      // Determine status based on date
      const now = new Date();
      const matchDate = match.date;
      const status = matchDate < now ? 'completed' : 'upcoming';
      
      return {
        id: `ical-${index + 1}`,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        date,
        time,
        venue,
        competition,
        status,
        notes: `${match.division} - ${match.location}`
      };
    });
    
    // Add some additional fixtures for variety
    const additionalFixtures: Fixture[] = [
      {
        id: 'internal-1',
        homeTeam: 'Club Championship',
        awayTeam: 'Round 1',
        date: '2025-01-20',
        time: '10:00',
        venue: 'home',
        competition: 'Internal Tournament',
        status: 'upcoming',
        notes: 'Internal tournament - all members welcome'
      },
      {
        id: 'internal-2',
        homeTeam: 'Rapid Tournament',
        awayTeam: 'Monthly Event',
        date: '2025-01-27',
        time: '14:00',
        venue: 'home',
        competition: 'Rapid Chess',
        status: 'upcoming',
        notes: 'Monthly rapid tournament - 15+5 time control'
      },
      {
        id: 'internal-3',
        homeTeam: 'Blitz Tournament',
        awayTeam: 'Weekly Event',
        date: '2025-02-03',
        time: '19:30',
        venue: 'home',
        competition: 'Blitz Chess',
        status: 'upcoming',
        notes: 'Weekly blitz tournament - 5+0 time control'
      }
    ];
    
    // Combine all fixtures
    const allFixtures = [...fixtures, ...additionalFixtures];
    
    // Sort fixtures by date
    allFixtures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Write the updated fixtures data
    const fixturesPath = path.join(process.cwd(), 'src/data/fixtures.ts');
    const fixturesContent = `export interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: 'home' | 'away';
  competition: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  result?: string;
  score?: string;
  notes?: string;
}

export const fixtures: Fixture[] = ${JSON.stringify(allFixtures, null, 2)};

export const getUpcomingFixtures = () => 
  fixtures.filter(fixture => fixture.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const getCompletedFixtures = () => 
  fixtures.filter(fixture => fixture.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getRecentResults = () => 
  getCompletedFixtures().slice(0, 3);
`;
    
    await fs.writeFile(fixturesPath, fixturesContent, 'utf-8');
    
    console.log('Successfully updated fixtures data with events from iCal file');
    console.log('Summary:');
    console.log(`- Total fixtures: ${allFixtures.length}`);
    console.log(`- Upcoming fixtures: ${allFixtures.filter(f => f.status === 'upcoming').length}`);
    console.log(`- Completed fixtures: ${allFixtures.filter(f => f.status === 'completed').length}`);
    console.log(`- Internal tournaments: ${additionalFixtures.length}`);
    
    // Show some sample fixtures
    console.log('\nSample upcoming fixtures:');
    allFixtures
      .filter(f => f.status === 'upcoming')
      .slice(0, 5)
      .forEach(fixture => {
        console.log(`- ${fixture.date} ${fixture.time}: ${fixture.homeTeam} vs ${fixture.awayTeam} (${fixture.competition})`);
      });
    
  } catch (error) {
    console.error('Error updating fixtures:', error);
  }
}

// Run the update if this script is executed directly
if (require.main === module) {
  updateFixtures();
}

export { updateFixtures };
