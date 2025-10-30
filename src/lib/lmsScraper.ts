import * as cheerio from 'cheerio';

export interface LMSFixture {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  result: string;
  event: string;
  organisation: string;
  status: string;
  fixtureUrl?: string;
}

export interface LMSBoardResult {
  board: number;
  homePlayer: string;
  awayPlayer: string;
  homeRating?: number;
  awayRating?: number;
  result: '1-0' | '0-1' | '½-½' | 'pending';
  gameLength?: string;
  opening?: string;
  notes?: string;
}

export interface LMSMatchDetails {
  fixtureUrl: string;
  boardResults: LMSBoardResult[];
  matchNotes?: string;
}

export interface ScrapedFixtureData {
  fixture: LMSFixture;
  matchDetails?: LMSMatchDetails;
}

const ANDOVER_CLUB_URL = 'https://lms.englishchess.org.uk/lms/organisation/416';
const LMS_BASE_URL = 'https://lms.englishchess.org.uk';

/**
 * Normalizes team names for consistent matching
 */
function normalizeTeamName(name: string): string {
  return name.trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .toLowerCase();
}

/**
 * Parses date from LMS format (e.g., "Tue 23 Sep 25") to YYYY-MM-DD
 */
function parseLMSDate(dateStr: string): string {
  if (!dateStr || dateStr.trim() === '') {
    return '';
  }

  try {
    // Handle format like "Tue 23 Sep 25"
    const parts = dateStr.trim().split(' ');
    if (parts.length >= 3) {
      const day = parts[1].padStart(2, '0');
      const month = parts[2];
      const year = parts[3] || '25'; // Default to 2025 if year not provided
      
      // Convert month name to number
      const monthMap: { [key: string]: string } = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
      };
      
      const monthNum = monthMap[month] || '01';
      const fullYear = year.length === 2 ? `20${year}` : year;
      
      return `${fullYear}-${monthNum}-${day}`;
    }
  } catch (error) {
    console.warn(`Failed to parse date: ${dateStr}`, error);
  }
  
  return '';
}

/**
 * Parses time from LMS format (e.g., "19:30") to HH:MM
 */
function parseLMSTime(timeStr: string): string {
  if (!timeStr || timeStr.trim() === '') {
    return '19:30'; // Default time
  }
  
  // Extract time from link text like "19:30"
  const timeMatch = timeStr.match(/(\d{1,2}:\d{2})/);
  return timeMatch ? timeMatch[1] : '19:30';
}

/**
 * Determines if a fixture has a result (not "0-0" or empty)
 */
function hasResult(result: string): boolean {
  const normalizedResult = result.trim();
  return normalizedResult !== '' && normalizedResult !== '0-0' && normalizedResult !== '0 - 0';
}

/**
 * Fetches and parses the Andover Club fixtures page
 */
export async function fetchAndoverFixtures(): Promise<LMSFixture[]> {
  try {
    console.log('Fetching Andover Club fixtures from LMS...');
    const response = await fetch(ANDOVER_CLUB_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const fixtures: LMSFixture[] = [];

    // Find the fixtures table
    $('table tr').each((index, element) => {
      const $row = $(element);
      const cells = $row.find('td');
      
      if (cells.length >= 7) {
        const homeTeam = $(cells[0]).text().trim();
        const result = $(cells[1]).text().trim();
        const awayTeam = $(cells[2]).text().trim();
        const date = $(cells[3]).text().trim();
        const time = $(cells[4]).text().trim();
        const event = $(cells[5]).text().trim();
        const organisation = $(cells[6]).text().trim();
        const status = $(cells[7]).text().trim();

        // Extract fixture URL if available
        const resultLink = $(cells[1]).find('a').attr('href');
        const fixtureUrl = resultLink ? `${LMS_BASE_URL}${resultLink}` : undefined;

        // Only include fixtures that involve Andover teams
        if (homeTeam.toLowerCase().includes('andover') || awayTeam.toLowerCase().includes('andover')) {
          fixtures.push({
            homeTeam,
            awayTeam,
            date: parseLMSDate(date),
            time: parseLMSTime(time),
            result,
            event,
            organisation,
            status,
            fixtureUrl
          });
        }
      }
    });

    console.log(`Found ${fixtures.length} Andover fixtures`);
    return fixtures;

  } catch (error) {
    console.error('Error fetching Andover fixtures:', error);
    throw error;
  }
}

/**
 * Fetches detailed match information from a fixture URL
 */
export async function fetchMatchDetails(fixtureUrl: string): Promise<LMSMatchDetails | null> {
  try {
    console.log(`Fetching match details from: ${fixtureUrl}`);
    const response = await fetch(fixtureUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const boardResults: LMSBoardResult[] = [];
    let matchNotes = '';

    // Look for board results table
    $('table tr').each((index, element) => {
      const $row = $(element);
      const cells = $row.find('td');
      
      if (cells.length >= 4) {
        const boardText = $(cells[0]).text().trim();
        const homePlayer = $(cells[1]).text().trim();
        const awayPlayer = $(cells[2]).text().trim();
        const result = $(cells[3]).text().trim();

        // Extract board number
        const boardMatch = boardText.match(/(\d+)/);
        const board = boardMatch ? parseInt(boardMatch[1]) : index + 1;

        // Parse result
        let parsedResult: '1-0' | '0-1' | '½-½' | 'pending' = 'pending';
        if (result.includes('1-0')) {
          parsedResult = '1-0';
        } else if (result.includes('0-1')) {
          parsedResult = '0-1';
        } else if (result.includes('½-½') || result.includes('1/2-1/2')) {
          parsedResult = '½-½';
        }

        // Extract ratings if available (look for numbers in parentheses)
        const homeRatingMatch = homePlayer.match(/\((\d+)\)/);
        const awayRatingMatch = awayPlayer.match(/\((\d+)\)/);
        
        const homeRating = homeRatingMatch ? parseInt(homeRatingMatch[1]) : undefined;
        const awayRating = awayRatingMatch ? parseInt(awayRatingMatch[1]) : undefined;

        // Clean player names (remove ratings)
        const cleanHomePlayer = homePlayer.replace(/\s*\(\d+\)\s*$/, '').trim();
        const cleanAwayPlayer = awayPlayer.replace(/\s*\(\d+\)\s*$/, '').trim();

        if (cleanHomePlayer && cleanAwayPlayer) {
          boardResults.push({
            board,
            homePlayer: cleanHomePlayer,
            awayPlayer: cleanAwayPlayer,
            homeRating,
            awayRating,
            result: parsedResult
          });
        }
      }
    });

    // Look for match notes or comments
    $('p, div').each((index, element) => {
      const text = $(element).text().trim();
      if (text.length > 50 && (text.toLowerCase().includes('match') || text.toLowerCase().includes('game'))) {
        matchNotes = text;
      }
    });

    return {
      fixtureUrl,
      boardResults,
      matchNotes: matchNotes || undefined
    };

  } catch (error) {
    console.error(`Error fetching match details from ${fixtureUrl}:`, error);
    return null;
  }
}

/**
 * Scrapes all Andover fixtures and their details
 */
export async function scrapeAndoverFixtures(): Promise<ScrapedFixtureData[]> {
  try {
    const fixtures = await fetchAndoverFixtures();
    const scrapedData: ScrapedFixtureData[] = [];

    for (const fixture of fixtures) {
      const scrapedFixture: ScrapedFixtureData = { fixture };

      // Only fetch match details if there's a result
      if (hasResult(fixture.result) && fixture.fixtureUrl) {
        const matchDetails = await fetchMatchDetails(fixture.fixtureUrl);
        if (matchDetails) {
          scrapedFixture.matchDetails = matchDetails;
        }
      }

      scrapedData.push(scrapedFixture);
    }

    return scrapedData;

  } catch (error) {
    console.error('Error scraping Andover fixtures:', error);
    throw error;
  }
}

/**
 * Matches scraped fixtures against existing fixtures data
 */
export function findNewResults(
  scrapedData: ScrapedFixtureData[],
  existingFixtures: Array<{ homeTeam: string; awayTeam: string; date: string; status: string; result?: string }>
): ScrapedFixtureData[] {
  const newResults: ScrapedFixtureData[] = [];

  for (const scraped of scrapedData) {
    const { fixture } = scraped;
    
    // Skip if no result
    if (!hasResult(fixture.result)) {
      continue;
    }

    // Find matching existing fixture
    const existingMatch = existingFixtures.find(existing => {
      const scrapedHome = normalizeTeamName(fixture.homeTeam);
      const scrapedAway = normalizeTeamName(fixture.awayTeam);
      const existingHome = normalizeTeamName(existing.homeTeam);
      const existingAway = normalizeTeamName(existing.awayTeam);
      
      return (scrapedHome === existingHome && scrapedAway === existingAway && 
              fixture.date === existing.date) ||
             (scrapedHome === existingAway && scrapedAway === existingHome && 
              fixture.date === existing.date);
    });

    // If no match found, or existing fixture has no result, this is new
    if (!existingMatch || !existingMatch.result || existingMatch.result.trim() === '') {
      newResults.push(scraped);
    }
  }

  return newResults;
}
