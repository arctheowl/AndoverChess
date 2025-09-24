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
  "andover-b-2025-09-23": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Liam Devlin",
        "awayPlayer": "Mike White",
        "homeRating": 1688,
        "awayRating": 1624,
        "result": "1-0",
        "gameLength": "47 moves",
        // "opening": "Sicilian Defense",
        // "notes": "Strong tactical play from Fareham"
      },
      {
        "board": 2,
        "homePlayer": "Nicholas Morris",
        "awayPlayer": "OskariVirtanen",
        "homeRating": 1499,
        "awayRating": 1497,
        "result": "1-0",
        "gameLength": "33 moves",
        // "opening": "Queen's Gambit Declined",
        // "notes": "Good endgame technique from Fareham"
      },
      {
        "board": 3,
        "homePlayer": "Gavin Stonham",
        "awayPlayer": "Prabhakar Mohan",
        "homeRating": 1479,
        "awayRating": 1379,
        "result": "1-0",
        // "gameLength": "42 moves",
        // "opening": "English Opening",
        // "notes": "Tactical oversight in the middlegame"
      },
      {
        "board": 4,
        "homePlayer": "Gregg Tipler",
        "awayPlayer": "David Green",
        "homeRating": 0,
        "awayRating": 1186,
        "result": "1-0",
        "gameLength": "32 moves",
        // "opening": "French Defense",
        // "notes": "Decisive victory for Fareham"
      },
    ],
    "matchNotes": "With a great start to the season Andover B have won their first match 4-0 against Winchester B. <br/> <br/> Thank you to Winchester for making the trip. The scoreline is flattering but all of the games were close with 2 going down to minutes on the clock. <br/> <br/> A big congratulations to Gregg Tipler who won his first game as an Andover player."
  },

  // Andover A Team - 2024/2025 Season Board Results
  "andover-a-2024-09-24": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Andover A Player 1",
        "awayPlayer": "Fareham B Player 1",
        "homeRating": 1650,
        "awayRating": 1680,
        "result": "0-1",
        "gameLength": "45 moves",
        "opening": "Sicilian Defense",
        "notes": "Strong tactical play from Fareham"
      },
      {
        "board": 2,
        "homePlayer": "Andover A Player 2",
        "awayPlayer": "Fareham B Player 2",
        "homeRating": 1580,
        "awayRating": 1620,
        "result": "0-1",
        "gameLength": "38 moves",
        "opening": "Queen's Gambit Declined",
        "notes": "Good endgame technique from Fareham"
      },
      {
        "board": 3,
        "homePlayer": "Andover A Player 3",
        "awayPlayer": "Fareham B Player 3",
        "homeRating": 1520,
        "awayRating": 1550,
        "result": "0-1",
        "gameLength": "42 moves",
        "opening": "English Opening",
        "notes": "Tactical oversight in the middlegame"
      },
      {
        "board": 4,
        "homePlayer": "Andover A Player 4",
        "awayPlayer": "Fareham B Player 4",
        "homeRating": 1480,
        "awayRating": 1500,
        "result": "0-1",
        "gameLength": "35 moves",
        "opening": "French Defense",
        "notes": "Decisive victory for Fareham"
      },
      {
        "board": 5,
        "homePlayer": "Andover A Player 5",
        "awayPlayer": "Fareham B Player 5",
        "homeRating": 1450,
        "awayRating": 1470,
        "result": "1-0",
        "gameLength": "50 moves",
        "opening": "Caro-Kann Defense",
        "notes": "Andover's only victory - excellent endgame play"
      }
    ],
    "matchNotes": "A tough opening match for Andover A against a strong Fareham B side. The team showed fighting spirit despite the result."
  },
  "andover-a-2024-10-23": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Hamble A Player 1",
        "awayPlayer": "Andover A Player 1",
        "homeRating": 1700,
        "awayRating": 1650,
        "result": "1-0",
        "gameLength": "48 moves",
        "opening": "King's Indian Defense",
        "notes": "Strong positional play from Hamble"
      },
      {
        "board": 2,
        "homePlayer": "Hamble A Player 2",
        "awayPlayer": "Andover A Player 2",
        "homeRating": 1640,
        "awayRating": 1580,
        "result": "1-0",
        "gameLength": "41 moves",
        "opening": "Nimzo-Indian Defense",
        "notes": "Tactical combination in the middlegame"
      },
      {
        "board": 3,
        "homePlayer": "Hamble A Player 3",
        "awayPlayer": "Andover A Player 3",
        "homeRating": 1580,
        "awayRating": 1520,
        "result": "0-1",
        "gameLength": "55 moves",
        "opening": "Ruy Lopez",
        "notes": "Excellent endgame technique from Andover"
      },
      {
        "board": 4,
        "homePlayer": "Hamble A Player 4",
        "awayPlayer": "Andover A Player 4",
        "homeRating": 1520,
        "awayRating": 1480,
        "result": "1-0",
        "gameLength": "39 moves",
        "opening": "Sicilian Defense",
        "notes": "Quick tactical victory for Hamble"
      },
      {
        "board": 5,
        "homePlayer": "Hamble A Player 5",
        "awayPlayer": "Andover A Player 5",
        "homeRating": 1490,
        "awayRating": 1450,
        "result": "0-1",
        "gameLength": "47 moves",
        "opening": "Queen's Gambit Accepted",
        "notes": "Another good win for Andover"
      }
    ],
    "matchNotes": "A closely contested match with both teams showing strong play. Andover fought hard but Hamble's top boards proved decisive."
  },
  "andover-a-2024-11-06": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Winchester A Player 1",
        "awayPlayer": "Andover A Player 1",
        "homeRating": 1720,
        "awayRating": 1650,
        "result": "0-1",
        "gameLength": "52 moves",
        "opening": "Sicilian Defense",
        "notes": "Excellent tactical play from Andover"
      },
      {
        "board": 2,
        "homePlayer": "Winchester A Player 2",
        "awayPlayer": "Andover A Player 2",
        "homeRating": 1660,
        "awayRating": 1580,
        "result": "0-1",
        "gameLength": "45 moves",
        "opening": "Queen's Gambit Declined",
        "notes": "Strong positional understanding from Andover"
      },
      {
        "board": 3,
        "homePlayer": "Winchester A Player 3",
        "awayPlayer": "Andover A Player 3",
        "homeRating": 1600,
        "awayRating": 1520,
        "result": "0-1",
        "gameLength": "48 moves",
        "opening": "English Opening",
        "notes": "Another decisive victory for Andover"
      },
      {
        "board": 4,
        "homePlayer": "Winchester A Player 4",
        "awayPlayer": "Andover A Player 4",
        "homeRating": 1540,
        "awayRating": 1480,
        "result": "0-1",
        "gameLength": "43 moves",
        "opening": "French Defense",
        "notes": "Consistent play throughout from Andover"
      },
      {
        "board": 5,
        "homePlayer": "Winchester A Player 5",
        "awayPlayer": "Andover A Player 5",
        "homeRating": 1510,
        "awayRating": 1450,
        "result": "½-½",
        "gameLength": "60 moves",
        "opening": "Caro-Kann Defense",
        "notes": "Well-fought draw in a complex endgame"
      }
    ],
    "matchNotes": "A dominant performance from Andover A, winning 4.5-0.5 against Winchester A. The team showed excellent form across all boards."
  },
  "andover-a-2024-11-19": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Andover A Player 1",
        "awayPlayer": "Chandlers Ford B Player 1",
        "homeRating": 1650,
        "awayRating": 1680,
        "result": "1-0",
        "gameLength": "46 moves",
        "opening": "Sicilian Defense",
        "notes": "Strong tactical play from Andover"
      },
      {
        "board": 2,
        "homePlayer": "Andover A Player 2",
        "awayPlayer": "Chandlers Ford B Player 2",
        "homeRating": 1580,
        "awayRating": 1620,
        "result": "0-1",
        "gameLength": "42 moves",
        "opening": "Queen's Gambit Declined",
        "notes": "Good endgame technique from Chandlers Ford"
      },
      {
        "board": 3,
        "homePlayer": "Andover A Player 3",
        "awayPlayer": "Chandlers Ford B Player 3",
        "homeRating": 1520,
        "awayRating": 1550,
        "result": "½-½",
        "gameLength": "58 moves",
        "opening": "English Opening",
        "notes": "Well-contested draw in a complex position"
      },
      {
        "board": 4,
        "homePlayer": "Andover A Player 4",
        "awayPlayer": "Chandlers Ford B Player 4",
        "homeRating": 1480,
        "awayRating": 1500,
        "result": "1-0",
        "gameLength": "44 moves",
        "opening": "French Defense",
        "notes": "Decisive victory for Andover"
      },
      {
        "board": 5,
        "homePlayer": "Andover A Player 5",
        "awayPlayer": "Chandlers Ford B Player 5",
        "homeRating": 1450,
        "awayRating": 1470,
        "result": "0-1",
        "gameLength": "41 moves",
        "opening": "Caro-Kann Defense",
        "notes": "Tactical oversight cost Andover the point"
      }
    ],
    "matchNotes": "A closely fought match ending in a 2.5-2.5 draw. Both teams showed good fighting spirit and tactical awareness."
  },
  "andover-a-2024-12-05": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Salisbury A Player 1",
        "awayPlayer": "Andover A Player 1",
        "homeRating": 1690,
        "awayRating": 1650,
        "result": "1-0",
        "gameLength": "49 moves",
        "opening": "King's Indian Defense",
        "notes": "Strong positional play from Salisbury"
      },
      {
        "board": 2,
        "homePlayer": "Salisbury A Player 2",
        "awayPlayer": "Andover A Player 2",
        "homeRating": 1630,
        "awayRating": 1580,
        "result": "0-1",
        "gameLength": "47 moves",
        "opening": "Nimzo-Indian Defense",
        "notes": "Excellent tactical play from Andover"
      },
      {
        "board": 3,
        "homePlayer": "Salisbury A Player 3",
        "awayPlayer": "Andover A Player 3",
        "homeRating": 1570,
        "awayRating": 1520,
        "result": "½-½",
        "gameLength": "55 moves",
        "opening": "Ruy Lopez",
        "notes": "Well-fought draw in a complex endgame"
      },
      {
        "board": 4,
        "homePlayer": "Salisbury A Player 4",
        "awayPlayer": "Andover A Player 4",
        "homeRating": 1510,
        "awayRating": 1480,
        "result": "1-0",
        "gameLength": "43 moves",
        "opening": "Sicilian Defense",
        "notes": "Quick tactical victory for Salisbury"
      },
      {
        "board": 5,
        "homePlayer": "Salisbury A Player 5",
        "awayPlayer": "Andover A Player 5",
        "homeRating": 1480,
        "awayRating": 1450,
        "result": "0-1",
        "gameLength": "46 moves",
        "opening": "Queen's Gambit Accepted",
        "notes": "Another good win for Andover"
      }
    ],
    "matchNotes": "Another closely contested match ending in a 2.5-2.5 draw. Both teams demonstrated good tactical awareness and fighting spirit."
  },
  "andover-a-2025-01-14": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Andover A Player 1",
        "awayPlayer": "Salisbury A Player 1",
        "homeRating": 1650,
        "awayRating": 1690,
        "result": "0-1",
        "gameLength": "51 moves",
        "opening": "Sicilian Defense",
        "notes": "Strong tactical play from Salisbury"
      },
      {
        "board": 2,
        "homePlayer": "Andover A Player 2",
        "awayPlayer": "Salisbury A Player 2",
        "homeRating": 1580,
        "awayRating": 1630,
        "result": "1-0",
        "gameLength": "44 moves",
        "opening": "Queen's Gambit Declined",
        "notes": "Excellent positional play from Andover"
      },
      {
        "board": 3,
        "homePlayer": "Andover A Player 3",
        "awayPlayer": "Salisbury A Player 3",
        "homeRating": 1520,
        "awayRating": 1570,
        "result": "½-½",
        "gameLength": "57 moves",
        "opening": "English Opening",
        "notes": "Well-contested draw in a complex position"
      },
      {
        "board": 4,
        "homePlayer": "Andover A Player 4",
        "awayPlayer": "Salisbury A Player 4",
        "homeRating": 1480,
        "awayRating": 1510,
        "result": "1-0",
        "gameLength": "45 moves",
        "opening": "French Defense",
        "notes": "Decisive victory for Andover"
      },
      {
        "board": 5,
        "homePlayer": "Andover A Player 5",
        "awayPlayer": "Salisbury A Player 5",
        "homeRating": 1450,
        "awayRating": 1480,
        "result": "0-1",
        "gameLength": "42 moves",
        "opening": "Caro-Kann Defense",
        "notes": "Tactical combination from Salisbury"
      }
    ],
    "matchNotes": "The return match against Salisbury A also ended in a 2.5-2.5 draw, showing the competitive balance between these two teams."
  },
  "andover-a-2025-01-21": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Chandlers Ford B Player 1",
        "awayPlayer": "Andover A Player 1",
        "homeRating": 1680,
        "awayRating": 1650,
        "result": "1-0",
        "gameLength": "48 moves",
        "opening": "King's Indian Defense",
        "notes": "Strong positional play from Chandlers Ford"
      },
      {
        "board": 2,
        "homePlayer": "Chandlers Ford B Player 2",
        "awayPlayer": "Andover A Player 2",
        "homeRating": 1620,
        "awayRating": 1580,
        "result": "1-0",
        "gameLength": "41 moves",
        "opening": "Nimzo-Indian Defense",
        "notes": "Tactical combination in the middlegame"
      },
      {
        "board": 3,
        "homePlayer": "Chandlers Ford B Player 3",
        "awayPlayer": "Andover A Player 3",
        "homeRating": 1550,
        "awayRating": 1520,
        "result": "0-1",
        "gameLength": "53 moves",
        "opening": "Ruy Lopez",
        "notes": "Excellent endgame technique from Andover"
      },
      {
        "board": 4,
        "homePlayer": "Chandlers Ford B Player 4",
        "awayPlayer": "Andover A Player 4",
        "homeRating": 1500,
        "awayRating": 1480,
        "result": "1-0",
        "gameLength": "39 moves",
        "opening": "Sicilian Defense",
        "notes": "Quick tactical victory for Chandlers Ford"
      },
      {
        "board": 5,
        "homePlayer": "Chandlers Ford B Player 5",
        "awayPlayer": "Andover A Player 5",
        "homeRating": 1470,
        "awayRating": 1450,
        "result": "0-1",
        "gameLength": "47 moves",
        "opening": "Queen's Gambit Accepted",
        "notes": "Another good win for Andover"
      }
    ],
    "matchNotes": "Chandlers Ford B proved too strong on their home boards, winning 3-2. Andover fought hard but couldn't overcome the home advantage."
  },
  "andover-a-2025-03-04": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Fareham B Player 1",
        "awayPlayer": "Andover A Player 1",
        "homeRating": 1680,
        "awayRating": 1650,
        "result": "0-1",
        "gameLength": "50 moves",
        "opening": "Sicilian Defense",
        "notes": "Excellent tactical play from Andover"
      },
      {
        "board": 2,
        "homePlayer": "Fareham B Player 2",
        "awayPlayer": "Andover A Player 2",
        "homeRating": 1620,
        "awayRating": 1580,
        "result": "0-1",
        "gameLength": "46 moves",
        "opening": "Queen's Gambit Declined",
        "notes": "Strong positional understanding from Andover"
      },
      {
        "board": 3,
        "homePlayer": "Fareham B Player 3",
        "awayPlayer": "Andover A Player 3",
        "homeRating": 1550,
        "awayRating": 1520,
        "result": "1-0",
        "gameLength": "44 moves",
        "opening": "English Opening",
        "notes": "Good tactical play from Fareham"
      },
      {
        "board": 4,
        "homePlayer": "Fareham B Player 4",
        "awayPlayer": "Andover A Player 4",
        "homeRating": 1500,
        "awayRating": 1480,
        "result": "0-1",
        "gameLength": "42 moves",
        "opening": "French Defense",
        "notes": "Consistent play from Andover"
      },
      {
        "board": 5,
        "homePlayer": "Fareham B Player 5",
        "awayPlayer": "Andover A Player 5",
        "homeRating": 1470,
        "awayRating": 1450,
        "result": "1-0",
        "gameLength": "48 moves",
        "opening": "Caro-Kann Defense",
        "notes": "Well-fought victory for Fareham"
      }
    ],
    "matchNotes": "A good away victory for Andover A, winning 3-2 against Fareham B. The team showed good form and tactical awareness."
  },
  "andover-a-2025-03-11": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Andover A Player 1",
        "awayPlayer": "Winchester A Player 1",
        "homeRating": 1650,
        "awayRating": 1720,
        "result": "1-0",
        "gameLength": "49 moves",
        "opening": "Sicilian Defense",
        "notes": "Excellent tactical play from Andover"
      },
      {
        "board": 2,
        "homePlayer": "Andover A Player 2",
        "awayPlayer": "Winchester A Player 2",
        "homeRating": 1580,
        "awayRating": 1660,
        "result": "1-0",
        "gameLength": "45 moves",
        "opening": "Queen's Gambit Declined",
        "notes": "Strong positional play from Andover"
      },
      {
        "board": 3,
        "homePlayer": "Andover A Player 3",
        "awayPlayer": "Winchester A Player 3",
        "homeRating": 1520,
        "awayRating": 1600,
        "result": "0-1",
        "gameLength": "47 moves",
        "opening": "English Opening",
        "notes": "Good tactical play from Winchester"
      },
      {
        "board": 4,
        "homePlayer": "Andover A Player 4",
        "awayPlayer": "Winchester A Player 4",
        "homeRating": 1480,
        "awayRating": 1540,
        "result": "1-0",
        "gameLength": "43 moves",
        "opening": "French Defense",
        "notes": "Decisive victory for Andover"
      },
      {
        "board": 5,
        "homePlayer": "Andover A Player 5",
        "awayPlayer": "Winchester A Player 5",
        "homeRating": 1450,
        "awayRating": 1510,
        "result": "0-1",
        "gameLength": "46 moves",
        "opening": "Caro-Kann Defense",
        "notes": "Well-fought victory for Winchester"
      }
    ],
    "matchNotes": "A good home victory for Andover A, winning 3-2 against Winchester A. The team showed excellent form on the top boards."
  },
  "andover-a-2025-03-25": {
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Andover A Player 1",
        "awayPlayer": "Hamble A Player 1",
        "homeRating": 1650,
        "awayRating": 1700,
        "result": "0-1",
        "gameLength": "47 moves",
        "opening": "King's Indian Defense",
        "notes": "Strong positional play from Hamble"
      },
      {
        "board": 2,
        "homePlayer": "Andover A Player 2",
        "awayPlayer": "Hamble A Player 2",
        "homeRating": 1580,
        "awayRating": 1640,
        "result": "1-0",
        "gameLength": "44 moves",
        "opening": "Nimzo-Indian Defense",
        "notes": "Excellent tactical play from Andover"
      },
      {
        "board": 3,
        "homePlayer": "Andover A Player 3",
        "awayPlayer": "Hamble A Player 3",
        "homeRating": 1520,
        "awayRating": 1580,
        "result": "0-1",
        "gameLength": "50 moves",
        "opening": "Ruy Lopez",
        "notes": "Good endgame technique from Hamble"
      },
      {
        "board": 4,
        "homePlayer": "Andover A Player 4",
        "awayPlayer": "Hamble A Player 4",
        "homeRating": 1480,
        "awayRating": 1520,
        "result": "1-0",
        "gameLength": "41 moves",
        "opening": "Sicilian Defense",
        "notes": "Quick tactical victory for Andover"
      },
      {
        "board": 5,
        "homePlayer": "Andover A Player 5",
        "awayPlayer": "Hamble A Player 5",
        "homeRating": 1450,
        "awayRating": 1490,
        "result": "0-1",
        "gameLength": "45 moves",
        "opening": "Queen's Gambit Accepted",
        "notes": "Well-fought victory for Hamble"
      }
    ],
    "matchNotes": "A closely contested final match of the season, with Hamble A edging out Andover A 3-2. Both teams showed excellent fighting spirit."
  },
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

