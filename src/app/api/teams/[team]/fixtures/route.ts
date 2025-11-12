import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const TEAM_FIXTURE_URLS = {
  'A': 'https://lms.englishchess.org.uk/lms/team/24452/fixtures',
  'B': 'https://lms.englishchess.org.uk/lms/team/24464/fixtures',
  'C': 'https://lms.englishchess.org.uk/lms/team/24510/fixtures',
};

interface ScrapedFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  result: string;
  score: string;
  status: string;
  fixtureUrl: string;
  competition: string;
}

function parseLMSDate(dateStr: string): string {
  // Parse "Mon 29 Sep 25" to "2025-09-29"
  const parts = dateStr.trim().split(' ');
  if (parts.length < 3) return '';
  
  const day = parts[1].padStart(2, '0');
  const month = parts[2];
  const year = parts[3] || '25';
  
  const monthMap: Record<string, string> = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  };
  
  const monthNum = monthMap[month] || '01';
  const fullYear = year.length === 2 ? `20${year}` : year;
  
  return `${fullYear}-${monthNum}-${day}`;
}

function parseLMSTime(timeStr: string): string {
  // Extract time from link text like "19:30"
  const match = timeStr.match(/(\d{1,2}:\d{2})/);
  return match ? match[1] : '19:30';
}

function hasResult(result: string): boolean {
  const normalized = result.trim();
  return normalized !== '' && normalized !== '0-0' && normalized !== '0 - 0';
}

function normalizeScoreText(raw: string): string {
  let s = (raw || '').trim();
  // Replace various dashes with '-'
  s = s.replace(/[–—]/g, '-');
  // Remove spaces around hyphen, keep unicode half
  s = s.replace(/\s*-\s*/g, '-');
  // Collapse multiple spaces
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function scoreToResult(score: string, homeTeam: string, awayTeam: string): string {
  if (!score) return '';
  
  const normalized = normalizeScoreText(score);
  const parts = normalized.split('-');
  if (parts.length !== 2) return '';
  
  const toNum = (p: string): number => {
    p = p.trim().replace('½', '.5');
    return parseFloat(p) || 0;
  };
  
  const homeScore = toNum(parts[0]);
  const awayScore = toNum(parts[1]);
  
  if (Math.abs(homeScore - awayScore) < 0.01) {
    return 'Draw';
  }
  
  // Determine if Andover won based on which team they are
  const andoverIsHome = homeTeam.toLowerCase().includes('andover');
  const andoverWon = andoverIsHome ? homeScore > awayScore : awayScore > homeScore;
  
  return andoverWon ? 'Win' : 'Loss';
}

async function scrapeTeamFixtures(teamLetter: 'A' | 'B' | 'C'): Promise<ScrapedFixture[]> {
  const url = TEAM_FIXTURE_URLS[teamLetter];
  if (!url) {
    throw new Error(`No fixture URL for team ${teamLetter}`);
  }

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch fixtures: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  
  const fixtures: ScrapedFixture[] = [];
  const table = $('table').first();
  
  // Determine competition from page context
  const breadcrumb = $('.breadcrumb').text() || '';
  const competition = breadcrumb.includes('Div 2') 
    ? 'Southampton Chess League Division 2'
    : breadcrumb.includes('Div 4')
    ? 'Southampton Chess League Division 4'
    : breadcrumb.includes('Div 5')
    ? 'Southampton Chess League Division 5'
    : 'Southampton Chess League';
  
  table.find('tr').each((index, row) => {
    const cells = $(row).find('td');
    if (cells.length < 6) return;
    
    // Skip header row
    const firstCell = cells.eq(0).text().trim();
    if (firstCell === 'Home Team' || firstCell === 'Result') return;
    
    const homeTeam = cells.eq(0).find('a').text().trim() || cells.eq(0).text().trim();
    const resultCell = cells.eq(1);
    const resultLink = resultCell.find('a');
    const result = resultLink.text().trim() || resultCell.text().trim();
    const fixtureUrl = resultLink.attr('href') 
      ? `https://lms.englishchess.org.uk${resultLink.attr('href')}`
      : '';
    const awayTeam = cells.eq(2).find('a').text().trim() || cells.eq(2).text().trim();
    const date = parseLMSDate(cells.eq(3).text().trim());
    const time = parseLMSTime(cells.eq(4).text().trim());
    const statusText = cells.eq(5).text().trim();
    
    // Determine status
    let status: 'upcoming' | 'completed' | 'postponed' | 'cancelled' = 'upcoming';
    if (hasResult(result)) {
      status = 'completed';
    } else if (statusText.toLowerCase().includes('postponed')) {
      status = 'postponed';
    } else if (statusText.toLowerCase().includes('cancelled')) {
      status = 'cancelled';
    }
    
    // Generate ID from teams and date
    const extractTeamLetter = (teamName: string): string => {
      const match = teamName.match(/andover\s+([A-Z])\b/i);
      return match ? match[1].toLowerCase() : 'a';
    };
    
    const teamLetter = extractTeamLetter(homeTeam) || extractTeamLetter(awayTeam) || 'a';
    const dateId = date.replace(/-/g, '');
    const id = `andover-${teamLetter}-${dateId}`;
    
    fixtures.push({
      id,
      homeTeam,
      awayTeam,
      date,
      time,
      result: hasResult(result) ? scoreToResult(result, homeTeam, awayTeam) : '',
      score: hasResult(result) ? normalizeScoreText(result) : '',
      status: status as 'upcoming' | 'completed' | 'postponed' | 'cancelled',
      fixtureUrl,
      competition,
    });
  });
  
  return fixtures;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ team: string }> }
) {
  try {
    const { team } = await params;
    const teamLetter = team.toUpperCase() as 'A' | 'B' | 'C';
    
    if (!['A', 'B', 'C'].includes(teamLetter)) {
      return NextResponse.json(
        { success: false, error: 'Invalid team. Must be A, B, or C' },
        { status: 400 }
      );
    }
    
    const fixtures = await scrapeTeamFixtures(teamLetter);
    
    return NextResponse.json({
      success: true,
      data: fixtures,
      count: fixtures.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching team fixtures:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

