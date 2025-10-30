import { scrapeAndoverFixtures, findNewResults, ScrapedFixtureData } from './lmsScraper';
import { allSimpleFixtures, SimpleFixture } from '../data/fixturesData';
import { BoardResult } from '../data/fixtures';

export interface UpdateResult {
  newFixtures: SimpleFixture[];
  newBoardResults: { [key: string]: { boardResults: BoardResult[] } };
  summary: {
    totalScraped: number;
    newResults: number;
    fixturesWithDetails: number;
  };
}

/**
 * Converts LMS fixture to SimpleFixture format
 */
function convertToSimpleFixture(scraped: ScrapedFixtureData): SimpleFixture {
  const { fixture } = scraped;
  
  // Determine venue for Andover
  const isHome = fixture.homeTeam.toLowerCase().includes('andover');
  const venue: 'home' | 'away' = isHome ? 'home' : 'away';
  
  // Determine competition from event name
  let competition = 'Southampton Chess League';
  if (fixture.event.includes('Div 2')) {
    competition = 'Southampton Chess League Division 2';
  } else if (fixture.event.includes('Div 4')) {
    competition = 'Southampton Chess League Division 4';
  } else if (fixture.event.includes('Div 5')) {
    competition = 'Southampton Chess League Division 5';
  } else if (fixture.event.includes('Rob Cup')) {
    competition = 'Southampton Chess League Rob Cup';
  } else if (fixture.event.includes('Clarke Cup')) {
    competition = 'Southampton Chess League Clarke Cup';
  }

  // Determine result and score
  let result: string | undefined;
  let score: string | undefined;
  
  if (fixture.result && fixture.result !== '0-0' && fixture.result !== '0 - 0') {
    const resultParts = fixture.result.split(' - ');
    if (resultParts.length === 2) {
      const homeScore = parseFloat(resultParts[0].trim());
      const awayScore = parseFloat(resultParts[1].trim());
      
      if (!isNaN(homeScore) && !isNaN(awayScore)) {
        score = fixture.result;
        
        if (isHome) {
          if (homeScore > awayScore) {
            result = 'Win';
          } else if (homeScore < awayScore) {
            result = 'Loss';
          } else {
            result = 'Draw';
          }
        } else {
          if (awayScore > homeScore) {
            result = 'Win';
          } else if (awayScore < homeScore) {
            result = 'Loss';
          } else {
            result = 'Draw';
          }
        }
      }
    }
  }

  // Generate fixture ID
  const teamSuffix = isHome ? 'home' : 'away';
  const opponent = isHome ? fixture.awayTeam : fixture.homeTeam;
  const opponentSlug = opponent.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const id = `andover-${teamSuffix}-${fixture.date.replace(/-/g, '')}-${opponentSlug}`;

  return {
    id,
    season: '2024-2025', // Default season
    homeTeam: fixture.homeTeam,
    awayTeam: fixture.awayTeam,
    date: fixture.date,
    time: fixture.time,
    venue,
    competition,
    isTournament: false,
    status: 'completed',
    result,
    score,
    notes: `${fixture.event} - ${isHome ? 'Andover' : opponent}`,
    venueKey: isHome ? 'andover' : undefined
  };
}

/**
 * Converts LMS board results to BoardResult format
 */
function convertToBoardResults(scraped: ScrapedFixtureData): BoardResult[] {
  if (!scraped.matchDetails?.boardResults) {
    return [];
  }

  return scraped.matchDetails.boardResults.map(lmsBoard => ({
    board: lmsBoard.board,
    homePlayer: lmsBoard.homePlayer,
    awayPlayer: lmsBoard.awayPlayer,
    homeRating: lmsBoard.homeRating,
    awayRating: lmsBoard.awayRating,
    result: lmsBoard.result,
    gameLength: lmsBoard.gameLength,
    opening: lmsBoard.opening,
    notes: lmsBoard.notes
  }));
}

/**
 * Updates fixtures from LMS
 */
export async function updateFromLMS(): Promise<UpdateResult> {
  try {
    console.log('Starting LMS update...');
    
    // Scrape fixtures from LMS
    const scrapedData = await scrapeAndoverFixtures();
    console.log(`Scraped ${scrapedData.length} fixtures from LMS`);

    // Find new results
    const existingFixtures = allSimpleFixtures.map(f => ({
      homeTeam: f.homeTeam,
      awayTeam: f.awayTeam,
      date: f.date,
      status: f.status,
      result: f.result
    }));

    const newResults = findNewResults(scrapedData, existingFixtures);
    console.log(`Found ${newResults.length} new results`);

    // Convert to SimpleFixture format
    const newFixtures: SimpleFixture[] = [];
    const newBoardResults: { [key: string]: { boardResults: BoardResult[] } } = {};

    for (const scraped of newResults) {
      const simpleFixture = convertToSimpleFixture(scraped);
      newFixtures.push(simpleFixture);

      // Add board results if available
      if (scraped.matchDetails?.boardResults && scraped.matchDetails.boardResults.length > 0) {
        const boardResults = convertToBoardResults(scraped);
        newBoardResults[simpleFixture.id] = {
          boardResults
        };
      }
    }

    const summary = {
      totalScraped: scrapedData.length,
      newResults: newResults.length,
      fixturesWithDetails: Object.keys(newBoardResults).length
    };

    return {
      newFixtures,
      newBoardResults,
      summary
    };

  } catch (error) {
    console.error('Error updating from LMS:', error);
    throw error;
  }
}
