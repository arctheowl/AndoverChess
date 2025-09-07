export interface BoardResult {
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

export interface MatchStats {
  totalBoards: number;
  season: string;
  homeScore: number;
  awayScore: number;
  decisiveGames: number;
  draws: number;
  averageRating: {
    home: number;
    away: number;
  };
}

export interface Fixture {
  id: string;
  season?: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: 'home' | 'away';
  competition: string;
  isTournament: boolean;
  status: 'upcoming' | 'completed' | 'cancelled';
  result?: string;
  score?: string;
  notes?: string;
  location?: string;
  address?: string;
  moreInfoLink?: string;
  boardResults?: BoardResult[];
  matchStats?: MatchStats;
  matchNotes?: string;
}

// Utility function to calculate average rating from board results
export const calculateAverageRating = (boardResults: BoardResult[]): { home: number; away: number } => {
  if (!boardResults || boardResults.length === 0) {
    return { home: 0, away: 0 };
  }

  const homeRatings = boardResults
    .map(board => board.homeRating)
    .filter(rating => rating !== undefined) as number[];
  
  const awayRatings = boardResults
    .map(board => board.awayRating)
    .filter(rating => rating !== undefined) as number[];

  const homeAverage = homeRatings.length > 0 
    ? Math.round(homeRatings.reduce((sum, rating) => sum + rating, 0) / homeRatings.length)
    : 0;
  
  const awayAverage = awayRatings.length > 0 
    ? Math.round(awayRatings.reduce((sum, rating) => sum + rating, 0) / awayRatings.length)
    : 0;

  return { home: homeAverage, away: awayAverage };
};

// Utility function to calculate match statistics from board results
export const calculateMatchStats = (boardResults: BoardResult[]): MatchStats => {
  if (!boardResults || boardResults.length === 0) {
    return {
      totalBoards: 0,
      season: '',
      homeScore: 0,
      awayScore: 0,
      decisiveGames: 0,
      draws: 0,
      averageRating: { home: 0, away: 0 }
    };
  }

  const totalBoards = boardResults.length;
  let homeScore = 0;
  let awayScore = 0;
  let decisiveGames = 0;
  let draws = 0;

  boardResults.forEach(board => {
    // Calculate scores
    switch (board.result) {
      case '1-0':
        homeScore += 1;
        decisiveGames++;
        break;
      case '0-1':
        awayScore += 1;
        decisiveGames++;
        break;
      case '½-½':
        homeScore += 0.5;
        awayScore += 0.5;
        draws++;
        break;
    }
  });

  // Calculate average rating
  const averageRating = calculateAverageRating(boardResults);

  return {
    totalBoards,
    season: '',
    homeScore,
    awayScore,
    decisiveGames,
    draws,
    averageRating
  };
};


// Helper function to get match statistics for a fixture (calculates if not present)
export const getMatchStats = (fixture: Fixture): MatchStats | null => {
  if (!fixture.boardResults || fixture.boardResults.length === 0) {
    return null;
  }
  
  // Return existing stats if available, otherwise calculate them
  return fixture.matchStats || calculateMatchStats(fixture.boardResults);
};

// Helper function to get a fixture with calculated stats
export const getFixtureWithStats = (fixture: Fixture): Fixture => {
  if (fixture.boardResults && fixture.boardResults.length > 0 && !fixture.matchStats) {
    return {
      ...fixture,
      matchStats: calculateMatchStats(fixture.boardResults)
    };
  }
  return fixture;
};

// Import the new structured data
import { allSimpleFixtures, SimpleFixture } from './fixturesData';
import { getClubInfo, getTournamentVenue } from './clubAddresses';

// Board results and match details for completed fixtures
const boardResultsData: Record<string, { boardResults: BoardResult[]; matchNotes?: string }> = {
  "andover-b-2024-10-09": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Owen Ford",
        "awayPlayer": "Liam Devlin",
        "homeRating": 1631,
        "awayRating": 1616,
        "result": "0-1",
        // "opening": "Sicilian Defense",
        // "notes": "Strong tactical play from Andover"
      },
      {
        "board": 2,
        "homePlayer": "Michael Andrews",
        "awayPlayer": "Gavin Stonham",
        "homeRating": 1432,
        "awayRating": 1494,
        "result": "1-0",
        // "opening": "Queen's Gambit Declined",
        // "notes": "Good endgame technique"
      },
      {
        "board": 3,
        "homePlayer": "Philip J Ware",
        "awayPlayer": "Nicholas Morris",
        "homeRating": 1479,
        "awayRating": 1443,
        "result": "0-1",
        // "opening": "English Opening",
        // "notes": "Home team's only victory"
      },
      {
        "board": 4,
        "homePlayer": "Adam Mathews",
        "awayPlayer": "Graham Payne",
        "homeRating": 1375,
        "awayRating": 1436,
        "result": "0-1",
        // "opening": "French Defense",
        // "notes": "Decisive victory for Andover"
      }
    ],
    "matchNotes": `We also had 3 other rated games between the clubs, those being: 
    <br />
    <br />
    Andover vs Basingtoke 
    <br />
     Andrew Dinkele 0-1 Shwetal Bhatt
     <br />
     Ariya Maskell (ME050807) 0-1 Jia-Arn Yeung 
     <br />
     Jaiya Maskell (ME050806) 0-1 Josh A 
     <br />
     <br />
     Thank you very much to Basingstoke gracious hosts as always, some very close competitive games tonight. If I got any of the Basingstoke player names wrong apologies and happy to be corrected.`
  },
  "andover-b-2024-10-17": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Austin Sopocko",
        "awayPlayer": "Kevin Steele",
        "homeRating": 1538,
        "awayRating": 1787,
        "result": "½-½",
        // "opening": "Ruy Lopez",
        // "notes": "Strong university player"
      },
      {
        "board": 2,
        "homePlayer": "Tyan Scott",
        "awayPlayer": "Liam Devlin",
        "homeRating": 1670,
        "awayRating": 1616,
        "result": "1-0",
        // "opening": "Nimzo-Indian Defense",
        // "notes": "Tactical complications"
      },
      {
        "board": 3,
        "homePlayer": "Ben Plummer",
        "awayPlayer": "Nicholas Morris",
        "homeRating": 1630,
        "awayRating": 1443,
        "result": "1-0",
        // "opening": "King's Indian Defense",
        // "notes": "Positional understanding"
      },
      {
        "board": 4,
        "homePlayer": "Abdullah Arafat",
        "awayPlayer": "Andrew Dinkele",
        "homeRating": 1380,
        "awayRating": 1294,
        "result": "1-0",
        // "opening": "Caro-Kann Defense",
        // "notes": "Andover's only half point"
      }
    ],
    "matchNotes": "Thanks to Andover for coming down to the University for some good games. The ratings for boards 1-3 for Southampton University are all provisional."
  },
  "andover-b-2024-10-29": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Liam Devlin",
        "awayPlayer": "Simon Lawrence",
        "homeRating": 1616,
        "awayRating": 1626,
        "result": "1-0",
        // "opening": "Sicilian Defense",
        // "notes": "Home advantage paid off"
      },
      {
        "board": 2,
        "homePlayer": "Gavin Stonham",
        "awayPlayer": "Michael White",
        "homeRating": 1494,
        "awayRating": 1618,
        "result": "0-1",
        // "opening": "Queen's Gambit Declined",
        // "notes": "Close tactical battle"
      },
      {
        "board": 3,
        "homePlayer": "Nicholas Morris",
        "awayPlayer": "Bracken Dawson",
        "homeRating": 1443,
        "awayRating": 1467,
        "result": "1-0",
        // "opening": "English Opening",
        // "notes": "Solid positional play"
      },
      {
        "board": 4,
        "homePlayer": "Graham Payne",
        "awayPlayer": "Rick Holmes",
        "homeRating": 1436,
        "awayRating": 1357,
        "result": "0-1",
        // "opening": "French Defense",
        // "notes": "Endgame technique decided"
      }
    ],
    "matchNotes": "Thanks to Winchester for making the trip over. All the games were decisive and interesting. An enjoyable night of tough games."
  },
  "andover-b-2024-11-12": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Alikhan Menseitov",
        "awayPlayer": "Liam Devlin",
        "homeRating": 1704,
        "awayRating": 1616,
        "result": "0-1",
        // "opening": "Ruy Lopez",
        // "notes": "Strong opening preparation"
      },
      {
        "board": 2,
        "homePlayer": "Peter Eales",
        "awayPlayer": "Gavin Stonham",
        "homeRating": 1581,
        "awayRating": 1482,
        "result": "1-0",
        // "opening": "Nimzo-Indian Defense",
        // "notes": "Good counter-attacking play"
      },
      {
        "board": 3,
        "homePlayer": "Sam Murphy",
        "awayPlayer": "Nicholas Morris",
        "homeRating": 1558,
        "awayRating": 1450,
        "result": "0-1",
        // "opening": "King's Indian Defense",
        // "notes": "Tactical complications"
      },
      {
        "board": 4,
        "homePlayer": "Richard Meredith",
        "awayPlayer": "Andrew Dinkele",
        "homeRating": 1489,
        "awayRating": 1281,
        "result": "1-0",
        // "opening": "Caro-Kann Defense",
        // "notes": "Solid defensive play"
      },
      {
        "board": 5,
        "homePlayer": "Isaac Yip",
        "awayPlayer": "Graham Payne",
        "homeRating": 1528,
        "awayRating": 1435,
        "result": "0-1",
        // "opening": "Caro-Kann Defense",
        // "notes": "Solid defensive play"
      }
    ],
    "matchNotes": "A very close match that ended in a 2-2 draw, although Graham Payne (Andover) beat Isaac Yip (CF) on the fifth board in a rated game that will be entered on to LMS by Graham Stuart. we look forward to the return match at Andover in February."
  }
};

// Function to determine fixture status based on date
const getFixtureStatus = (fixture: SimpleFixture): 'upcoming' | 'completed' | 'cancelled' => {
  // If status is explicitly set to cancelled, keep it
  if (fixture.status === 'cancelled') {
    return 'cancelled';
  }
  
  // If status is explicitly set to completed, keep it
  if (fixture.status === 'completed') {
    return 'completed';
  }
  
  // For all other cases, check the date
  const fixtureDate = new Date(fixture.date);
  const today = new Date();
  
  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  fixtureDate.setHours(0, 0, 0, 0);
  
  // If fixture date is in the past, mark as completed
  if (fixtureDate < today) {
    return 'completed';
  }
  
  // Otherwise, it's upcoming
  return 'upcoming';
};

// Function to convert SimpleFixture to full Fixture with venue details
const convertToFullFixture = (simpleFixture: SimpleFixture): Fixture => {
  const fixture: Fixture = {
    id: simpleFixture.id,
    season: simpleFixture.season,
    homeTeam: simpleFixture.homeTeam,
    awayTeam: simpleFixture.awayTeam,
    date: simpleFixture.date,
    time: simpleFixture.time,
    venue: simpleFixture.venue,
    competition: simpleFixture.competition,
    isTournament: simpleFixture.isTournament,
    status: getFixtureStatus(simpleFixture), // Use automatic status calculation
    result: simpleFixture.result,
    score: simpleFixture.score,
    notes: simpleFixture.notes,
    moreInfoLink: simpleFixture.moreInfoLink,
    boardResults: simpleFixture.boardResults,
    matchStats: simpleFixture.matchStats,
    matchNotes: simpleFixture.matchNotes
  };

  // Add venue information based on venueKey or team names
  if (simpleFixture.venueKey) {
    // Try tournament venues first, then club addresses
    const tournamentVenue = getTournamentVenue(simpleFixture.venueKey);
    const clubInfo = getClubInfo(simpleFixture.venueKey);
    
    if (tournamentVenue) {
      fixture.location = tournamentVenue.location;
      fixture.address = tournamentVenue.address;
    } else if (clubInfo) {
      fixture.location = clubInfo.location;
      fixture.address = clubInfo.address;
    }
  } else {
    // Fallback to team name lookup
    const homeClubInfo = getClubInfo(simpleFixture.homeTeam);
    const awayClubInfo = getClubInfo(simpleFixture.awayTeam);
    
    if (simpleFixture.venue === 'home' && homeClubInfo) {
      fixture.location = homeClubInfo.location;
      fixture.address = homeClubInfo.address;
    } else if (simpleFixture.venue === 'away' && awayClubInfo) {
      fixture.location = awayClubInfo.location;
      fixture.address = awayClubInfo.address;
    }
  }

  // Add board results and match notes if available
  const boardData = boardResultsData[simpleFixture.id];
  if (boardData) {
    fixture.boardResults = boardData.boardResults;
    if (boardData.matchNotes) {
      fixture.matchNotes = boardData.matchNotes;
    }
  }

  return fixture;
};

// Generate the full fixtures array from the simplified data
export const fixtures: Fixture[] = allSimpleFixtures.map(convertToFullFixture);

export const getUpcomingFixtures = () => 
  fixtures.filter(fixture => !fixture.isTournament).filter(fixture => fixture.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const getCompletedFixtures = () => 
  fixtures.filter(fixture => fixture.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getRecentResults = () => 
  getCompletedFixtures().filter(fixture => !fixture.isTournament).slice(0, 3);

