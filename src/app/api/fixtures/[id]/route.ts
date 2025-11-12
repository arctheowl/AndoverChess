import { NextRequest, NextResponse } from 'next/server';
import { fixtures } from '@/data/fixtures';
import * as cheerio from 'cheerio';

interface BoardResult {
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

async function scrapeFixtureDetails(fixtureUrl: string): Promise<{
  boardResults: BoardResult[];
  matchNotes?: string;
} | null> {
  try {
    const response = await fetch(fixtureUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    const html = await response.text();
    const $ = cheerio.load(html);
    
    const boardResults: BoardResult[] = [];
    const table = $('table').first();
    
    table.find('tr').each((index, row) => {
      const cells = $(row).find('td');
      if (cells.length < 4) return;
      
      // Skip header row
      const firstCell = cells.eq(0).text().trim();
      if (firstCell.toLowerCase() === 'board' || firstCell === '') return;
      
      const boardText = cells.eq(0).text().trim();
      const boardMatch = boardText.match(/(\d+)/);
      const board = boardMatch ? parseInt(boardMatch[1]) : index + 1;
      
      // Column order: board, homeRating, homePlayer, result, awayPlayer, awayRating
      const homeRatingText = cells.length > 1 ? cells.eq(1).text().trim() : '';
      const homePlayerText = cells.length > 2 ? cells.eq(2).text().trim() : '';
      const resultText = cells.length > 3 ? cells.eq(3).text().trim() : '';
      const awayPlayerText = cells.length > 4 ? cells.eq(4).text().trim() : '';
      const awayRatingText = cells.length > 5 ? cells.eq(5).text().trim() : '';
      
      // Parse ratings
      const parseRating = (text: string): number | undefined => {
        const match = text.match(/(\d{3,4})/);
        return match ? parseInt(match[1]) : undefined;
      };
      
      const homeRating = parseRating(homeRatingText);
      const awayRating = parseRating(awayRatingText);
      
      // Clean player names
      const cleanName = (name: string): string => {
        return name
          .replace(/\s*\(\d+\)\s*/g, '') // Remove ratings in parentheses
          .replace(/[A-Z]$/, '') // Remove trailing single capital (team marker)
          .trim();
      };
      
      const homePlayer = cleanName(homePlayerText);
      let awayPlayer = cleanName(awayPlayerText);
      
      // Remove leading membership level from away player
      awayPlayer = awayPlayer.replace(/^[A-Z]\s*/, '').trim();
      
      // Parse result
      let parsedResult: '1-0' | '0-1' | '½-½' | 'pending' = 'pending';
      if (/\b1\s*[-–]\s*0\b/.test(resultText)) {
        parsedResult = '1-0';
      } else if (/\b0\s*[-–]\s*1\b/.test(resultText)) {
        parsedResult = '0-1';
      } else if (/½|1\/2/.test(resultText)) {
        parsedResult = '½-½';
      }
      
      if (homePlayer || awayPlayer) {
        boardResults.push({
          board,
          homePlayer,
          awayPlayer,
          homeRating,
          awayRating,
          result: parsedResult,
        });
      }
    });
    
    // Extract match notes
    let matchNotes = '';
    $('p, div').each((index, el) => {
      const text = $(el).text().trim();
      if (text.length > 50 && /match|game/i.test(text)) {
        matchNotes = text;
        return false; // Break
      }
    });
    
    return {
      boardResults,
      matchNotes: matchNotes || undefined,
    };
  } catch (error) {
    console.error('Error scraping fixture details:', error);
    return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const fixtureUrl = searchParams.get('url'); // Optional fixture URL to scrape
    
    // First try to get from static fixtures (for tournaments)
    let fixture = fixtures.find(f => f.id === id);
    
    // If not found in static, try to fetch from LMS
    if (!fixture) {
      try {
        const lmsResponse = await fetch(
          `${request.nextUrl.origin}/api/fixtures/lms`,
          { next: { revalidate: 300 } }
        );
        
        if (lmsResponse.ok) {
          const lmsData = await lmsResponse.json();
          if (lmsData.success && lmsData.data) {
            const lmsFixture = lmsData.data.find((f: any) => f.id === id);
            if (lmsFixture) {
              // Convert LMS fixture to Fixture format
              const year = parseInt(lmsFixture.date.split('-')[0]);
              const season = `${year}-${year + 1}`;
              
              fixture = {
                id: lmsFixture.id,
                season,
                homeTeam: lmsFixture.homeTeam,
                awayTeam: lmsFixture.awayTeam,
                date: lmsFixture.date,
                time: lmsFixture.time,
                venue: lmsFixture.homeTeam.toLowerCase().includes('andover') ? 'home' : 'away',
                competition: lmsFixture.competition || 'Southampton Chess League',
                isTournament: false,
                status: lmsFixture.status || 'upcoming',
                result: lmsFixture.result,
                score: lmsFixture.score,
                notes: lmsFixture.notes,
                moreInfoLink: lmsFixture.fixtureUrl,
              };
              
              // If we have a fixture URL, scrape details
              if (lmsFixture.fixtureUrl) {
                const scrapedDetails = await scrapeFixtureDetails(lmsFixture.fixtureUrl);
                if (scrapedDetails) {
                  fixture = {
                    ...fixture,
                    boardResults: scrapedDetails.boardResults,
                    matchNotes: scrapedDetails.matchNotes,
                  };
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching from LMS:', error);
      }
    } else {
      // If we have a fixture URL for static fixture, try to scrape details
      if (fixtureUrl || fixture.moreInfoLink) {
        const urlToScrape = fixtureUrl || fixture.moreInfoLink;
        if (urlToScrape) {
          const scrapedDetails = await scrapeFixtureDetails(urlToScrape);
          if (scrapedDetails) {
            fixture = {
              ...fixture,
              boardResults: scrapedDetails.boardResults,
              matchNotes: scrapedDetails.matchNotes || fixture.matchNotes,
            };
          }
        }
      }
    }
    
    if (!fixture) {
      return NextResponse.json(
        { success: false, error: 'Fixture not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: fixture
    });
  } catch (error) {
    console.error('Error fetching fixture:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fixture' },
      { status: 500 }
    );
  }
}
