import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

// League table URLs for each team
const TEAM_URLS = {
  'A Team': 'https://lms.englishchess.org.uk/lms/event/8398/table',
  'B Team': 'https://lms.englishchess.org.uk/lms/event/8400/table',
  'C Team': 'https://lms.englishchess.org.uk/lms/event/8401/table',
};

const LEAGUE_TEAM_NAMES = {
  'A Team': 'Andover A',
  'B Team': 'Andover B',
  'C Team': 'Andover C',
};

interface TeamStats {
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

async function scrapeLeagueTable(url: string, teamName: string): Promise<TeamStats | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Find the league table
    const table = $('table').first();
    if (table.length === 0) {
      console.error(`Could not find table on ${url}`);
      return null;
    }

    // Find all rows (skip header)
    const rows = table.find('tr');
    let position = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows.eq(i);
      const cells = row.find('td');
      
      if (cells.length < 8) {
        continue;
      }

      // Check if this is a header row
      const firstCell = cells.eq(0).text().trim();
      if (firstCell.toLowerCase() === 'team' || firstCell.toLowerCase() === 'play') {
        continue;
      }

      position++;

      // Get team name from first cell (may be in a link)
      const teamCell = cells.eq(0);
      const teamLink = teamCell.find('a');
      const rowTeamName = teamLink.length > 0 
        ? teamLink.text().trim() 
        : teamCell.text().trim();

      // Check if this is the Andover team we're looking for
      if (teamName.toLowerCase() === rowTeamName.toLowerCase() || 
          rowTeamName.toLowerCase().includes(teamName.toLowerCase())) {
        try {
          const played = parseInt(cells.eq(1).text().trim()) || 0;
          const won = parseInt(cells.eq(2).text().trim()) || 0;
          const drawn = parseInt(cells.eq(3).text().trim()) || 0;
          const lost = parseInt(cells.eq(4).text().trim()) || 0;
          
          // Points column (column 7, index 7)
          let pointsText = cells.eq(7).text().trim();
          // Remove bold markers if present
          pointsText = pointsText.replace(/\*\*/g, '').trim();
          const points = parseInt(pointsText) || 0;

          return {
            position,
            played,
            won,
            drawn,
            lost,
            points,
          };
        } catch (error) {
          console.error(`Error parsing row data for ${teamName}:`, error);
          return null;
        }
      }
    }

    console.error(`Could not find ${teamName} in league table`);
    return null;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const stats: Record<string, TeamStats> = {};

    // Scrape stats for each team in parallel
    const promises = Object.entries(TEAM_URLS).map(async ([teamName, url]) => {
      const leagueName = LEAGUE_TEAM_NAMES[teamName as keyof typeof LEAGUE_TEAM_NAMES];
      const teamStats = await scrapeLeagueTable(url, leagueName);
      if (teamStats) {
        stats[teamName] = teamStats;
      }
    });

    await Promise.all(promises);

    return NextResponse.json({
      success: true,
      stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching team stats:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

