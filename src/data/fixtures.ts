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

export const fixtures: Fixture[] = [
  // Andover B 2024/2025 Season Matches
  {
    "id": "andover-b-2024-10-09",
    "season": "2024-2025",
    "homeTeam": "Basingstoke D",
    "awayTeam": "Andover B",
    "date": "2024-10-09",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "completed",
    "result": "Win",
    "score": "1-3",
    "notes": "Basingstoke D vs Andover B - Basingstoke",
    "location": "Basingstoke Chess Club",
    "address": "Basingstoke Bridge and Chess Club",
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
  {
    "id": "andover-b-2024-10-17",
    "season": "2024-2025",
    "homeTeam": "Southampton University C",
    "awayTeam": "Andover B",
    "date": "2024-10-17",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "completed",
    "result": "Loss",
    "score": "3.5-0.5",
    "notes": "Southampton University C vs Andover B - Southampton",
    "location": "Southampton University",
    "address": "University of Southampton",
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
  {
    "id": "andover-b-2024-10-29",
    "season": "2024-2025",
    "homeTeam": "Andover B",
    "awayTeam": "Winchester B",
    "date": "2024-10-29",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "completed",
    "result": "Draw",
    "score": "2-2",
    "notes": "Andover B vs Winchester B - Andover",
    "location": "Andover Central Club",
    "address": "Clare Ho/East St, Andover SP10 1EP",
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
  {
    "id": "andover-b-2024-11-12",
    "season": "2024-2025",
    "homeTeam": "Chandlers Ford C",
    "awayTeam": "Andover B",
    "date": "2024-11-12",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "completed",
    "result": "Draw",
    "score": "2-2",
    // "notes": "Chandlers Ford C vs Andover B - Chandlers Ford",
    "location": "Chandlers Ford Chess Club",
    "address": "Chandlers Ford Community Centre",
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
  },
  {
    "id": "andover-b-2024-12-10",
    "season": "2024-2025",
    "homeTeam": "Andover B",
    "awayTeam": "Salisbury C",
    "date": "2024-12-10",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "completed",
    "result": "Draw",
    "score": "2-2",
    "notes": "Andover B vs Salisbury C - Andover",
    "location": "Andover Central Club",
    "address": "Clare Ho/East St, Andover SP10 1EP",
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Liam Devlin",
        "awayPlayer": "Michael Pope",
        "homeRating": 1636,
        "awayRating": 1470,
        "result": "1-0",
        // "opening": "Sicilian Defense",
        // "notes": "Home advantage on top board"
      },
      {
        "board": 2,
        "homePlayer": "Gavin Stonham",
        "awayPlayer": "Kevin Huntley",
        "homeRating": 1469,
        "awayRating": 1349,
        "result": "1-0",
        // "opening": "Queen's Gambit Declined",
        // "notes": "Close endgame battle"
      },
      {
        "board": 3,
        "homePlayer": "Nicholas Morris",
        "awayPlayer": "Mark Barret",
        "homeRating": 1473,
        "awayRating": 1299,
        "result": "0-1",
        // "opening": "English Opening",
        // "notes": "Positional understanding"
      },
      {
        "board": 4,
        "homePlayer": "Andrew Dinkele",
        "awayPlayer": "Andre Hopkins",
        "homeRating": 1276,
        "awayRating": 1269,
        "result": "1-0",
        // "opening": "French Defense",
        // "notes": "Evenly matched players"
      }
    ],
    "matchNotes": "Thanks to Salisbury for making the trip down a fair result for some very close games. There was also a friendly game played between: <br /> Andover's Stephen Stoodley 0 - 1 J. Gelder from Salisbury."
  },
  {
    "id": "andover-b-2025-01-09",
    "season": "2024-2025",
    "homeTeam": "Salisbury C",
    "awayTeam": "Andover B",
    "date": "2025-01-09",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "completed",
    "result": "Win",
    "score": "1-3",
    "notes": "Salisbury C vs Andover B - Salisbury",
    "location": "Salisbury Chess Club",
    "address": "Salisbury Community Centre",
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Gaeme Ford",
        "awayPlayer": "Liam Devlin",
        "homeRating": 1550,
        "awayRating": 1635,
        "result": "0-1",
        // "opening": "Ruy Lopez",
        // "notes": "Strong tactical play"
      },
      {
        "board": 2,
        "homePlayer": "Barry Diaper",
        "awayPlayer": "Gavin Stonham",
        "homeRating": 1522,
        "awayRating": 1456,
        "result": "½-½",
        // "opening": "Nimzo-Indian Defense",
        // "notes": "Home team's only victory"
      },
      {
        "board": 3,
        "homePlayer": "Andrei Aron",
        "awayPlayer": "Nicholas Morris",
        "homeRating": 1467,
        "awayRating": 1458,
        "result": "½-½",
        // "opening": "King's Indian Defense",
        // "notes": "Good endgame technique"
      },
      {
        "board": 4,
        "homePlayer": "Josua Hough",
        "awayPlayer": "Graham Payne",
        "homeRating": 1707,
        "awayRating": 1445,
        "result": "0-1",
        // "opening": "Caro-Kann Defense",
        // "notes": "Decisive victory"
      },
      {
        "board": 5,
        "homePlayer": "Oliver Diaper",
        "awayPlayer": "Andrew Dinkele",
        "homeRating": 1315,
        "awayRating": 1445,
        "result": "0-1",
        // "opening": "Caro-Kann Defense",
        // "notes": "Decisive victory"
      }
    ],
    "matchNotes": "An extra graded game was played. - Oliver Diaper 0 Andrew Dinkele 1 Josh Hough played for us on board 4. Josh and Oliver are both new players. Michael Pope - Salisbury"
  },
  {
    "id": "andover-b-2025-02-11",
    "season": "2024-2025",
    "homeTeam": "Andover B",
    "awayTeam": "Southampton University C",
    "date": "2025-02-11",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "completed",
    "result": "Win",
    "score": "2.5-1.5",
    "notes": "Andover B vs Southampton University C - Andover",
    "location": "Andover Central Club",
    "address": "Clare Ho/East St, Andover SP10 1EP",
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Gavin Stonham",
        "awayPlayer": "Ryan Scott",
        "homeRating": 1457,
        "awayRating": 1748,
        "result": "1-0",
        // "opening": "Sicilian Defense",
        // "notes": "Strong university player"
      },
      {
        "board": 2,
        "homePlayer": "Nicholas Morris",
        "awayPlayer": "Austin Sopocko",
        "homeRating": 1460,
        "awayRating": 1616,
        "result": "1-0",
        // "opening": "Queen's Gambit Declined",
        // "notes": "Upset victory"
      },
      {
        "board": 3,
        "homePlayer": "Graham Payne",
        "awayPlayer": "Ben Plummer",
        "homeRating": 1470,
        "awayRating": 1679,
        "result": "0-1",
        // "opening": "English Opening",
        // "notes": "Good tactical play"
      },
      {
        "board": 4,
        "homePlayer": "Josh Prynne",
        "awayPlayer": "Oliver Williamson",
        "homeRating": 1579,
        "awayRating": 1577,
        "result": "½-½",
        // "opening": "French Defense",
        // "notes": "Solid draw"
      }
    ],
    "matchNotes": "Thanks to University for making the trip down. Some really close games on all the boards. The new player on board 4 for Andover is Josh Prynne with an ECF Code 374072K."
  },
  {
    "id": "andover-b-2025-02-18",
    "season": "2024-2025",
    "homeTeam": "Andover B",
    "awayTeam": "Chandlers Ford C",
    "date": "2025-02-18",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "completed",
    "result": "Loss",
    "score": "1-3",
    "notes": "Andover B vs Chandlers Ford C - Andover",
    "location": "Andover Central Club",
    "address": "Clare Ho/East St, Andover SP10 1EP",
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Liam Devlin",
        "awayPlayer": "Peter Eales",
        "homeRating": 1648,
        "awayRating": 1606,
        "result": "0-1",
        // "opening": "Ruy Lopez",
        // "notes": "Close tactical battle"
      },
      {
        "board": 2,
        "homePlayer": "Gavin Stonham",
        "awayPlayer": "Stephen Lineker-Miller",
        "homeRating": 1467,
        "awayRating": 1585,
        "result": "0-1",
        // "opening": "Nimzo-Indian Defense",
        // "notes": "Positional understanding"
      },
      {
        "board": 3,
        "homePlayer": "Josh Prynne",
        "awayPlayer": "Sam Murphy",
        "homeRating": 1689,
        "awayRating": 1526,
        "result": "1-0",
        // "opening": "King's Indian Defense",
        // "notes": "Home team's only victory"
      },
      {
        "board": 4,
        "homePlayer": "Andrew Dinkele",
        "awayPlayer": "Richard Meredith",
        "homeRating": 1294,
        "awayRating": 1468,
        "result": "0-1",
        // "opening": "Caro-Kann Defense",
        // "notes": "Endgame technique"
      }
    ],
    "matchNotes": "New player for Andover onboard 3: Josh Payne. Great contest between the clubs as usual! -  Peter Eales"
  },
  {
    "id": "andover-b-2025-03-19",
    "season": "2024-2025",
    "homeTeam": "Winchester B",
    "awayTeam": "Andover B",
    "date": "2025-03-19",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "completed",
    "result": "Draw",
    "score": "2-2",
    "notes": "Winchester B vs Andover B - Winchester",
    "location": "Winchester Chess Club",
    "address": "Winchester Community Centre",
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Harry Horler",
        "awayPlayer": "Josh Prynne",
        "homeRating": 1699,
        "awayRating": 1689,
        "result": "1-0",
        // "opening": "Sicilian Defense",
        // "notes": "Home advantage on top board"
      },
      {
        "board": 2,
        "homePlayer": "John Schonenberger",
        "awayPlayer": "Gavin Stonham",
        "homeRating": 1510,
        "awayRating": 1467,
        "result": "½-½",
        // "opening": "Queen's Gambit Declined",
        // "notes": "Good counter-attacking play"
      },
      {
        "board": 3,
        "homePlayer": "Oskari Virtanen",
        "awayPlayer": "Nicholas Morris",
        "homeRating": 1502,
        "awayRating": 1473,
        "result": "0-1",
        // "opening": "English Opening",
        // "notes": "Positional understanding"
      },
      {
        "board": 4,
        "homePlayer": "Prabhakar Mohan",
        "awayPlayer": "Graham Payne",
        "homeRating": 1366,
        "awayRating": 1466,
        "result": "½-½",
        // "opening": "French Defense",
        // "notes": "Evenly matched players"
      }
    ],
    // "matchNotes": "Another hard-fought draw for Andover B. The team showed good fighting spirit in the away match."
  },
  {
    "id": "andover-b-2025-04-01",
    "season": "2024-2025",
    "homeTeam": "Andover B",
    "awayTeam": "Basingstoke D",
    "date": "2025-04-01",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "completed",
    "result": "Win",
    "score": "3-1",
    "notes": "Andover B vs Basingstoke D - Andover",
    "location": "Andover Central Club",
    "address": "Clare Ho/East St, Andover SP10 1EP",
    "boardResults": [
      {
        "board": 1,
        "homePlayer": "Josh Prynne",
        "awayPlayer": "Default",
        "homeRating": 1668,
        "awayRating": 0,
        "result": "1-0",
        // "opening": "Ruy Lopez",
        // "notes": "Revenge victory on top board"
      },
      {
        "board": 2,
        "homePlayer": "Nicholas Morris",
        "awayPlayer": "Jia-Arn Yeung",
        "homeRating": 1484,
        "awayRating": 1571,
        "result": "1-0",
        // "opening": "Nimzo-Indian Defense",
        // "notes": "Strong tactical play"
      },
      {
        "board": 3,
        "homePlayer": "Gavin Stonham",
        "awayPlayer": "David Long",
        "homeRating": 1468,
        "awayRating": 1500,
        "result": "1-0",
        // "opening": "King's Indian Defense",
        // "notes": "Good endgame technique"
      },
      {
        "board": 4,
        "homePlayer": "Andrew Dinkele",
        "awayPlayer": "Tony Cross",
        "homeRating": 1294,
        "awayRating": 1471,
        "result": "0-1",
        // "opening": "Caro-Kann Defense",
        // "notes": "Away team's only victory"
      }
    ],
    // "matchNotes": "<p>Andover B finished the season <em>strongly</em> with a convincing 3-1 home victory, completing the <strong>double over Basingstoke D</strong>.</p><p>Season summary:</p><ul><li>Started with a loss but finished with a win</li><li>Showed great improvement throughout the season</li><li>Completed the double over Basingstoke D</li><li>Strong team spirit and determination</li></ul>"
  },
  {
    "id": "internal-1",
    "homeTeam": "2025 Hampshire Rapid Championships",
    "awayTeam": "",
    "season": "2025-2026",
    "date": "2025-09-06",
    "time": "9:30",
    "venue": "away",
    "competition": "Hampshire Rapid Championships",
    "isTournament": true,
    "status": "upcoming",
    "notes": "Public tournament - all members welcome",
    "location": "Barton Peveril 6th Form College",
    "address": "Chestnut Avenue, Eastleigh, SO50 5ZA",
    "moreInfoLink": "https://www.hampshirechess.co.uk/rapidblitz2025/"
  },
  {
    "id": "internal-2",
    "homeTeam": "2025 Hampshire Blitz Championships",
    "awayTeam": "",
    "season": "2025-2026",
    "date": "2025-09-07",
    "time": "9:30",
    "venue": "away",
    "competition": "Hampshire Blitz Championships",
    "isTournament": true,
    "status": "upcoming",
    "notes": "Public tournament - all members welcome",
    "location": "Barton Peveril 6th Form College, ",
    "address": "Chestnut Avenue, Eastleigh, SO50 5ZA",
    "moreInfoLink": "https://www.hampshirechess.co.uk/rapidblitz2025/"
  },
  {
    "id": "internal-3",
    "homeTeam": "Oxford Fide Congress",
    "awayTeam": "",
    "season": "2025-2026",
    "date": "2025-09-20",
    "time": "9:30",
    "venue": "away",
    "competition": "Oxford Fide Congress",
    "isTournament": true,
    "status": "upcoming",
    "notes": "Public tournament - all members welcome",
    "address": "Kennington Village Hall,Kennington Road, Kennington, OX1 5PG",
    "moreInfoLink": "https://congress.org.uk/congress/531/home"
  },
  {
    "id": "internal-4",
    "homeTeam": "8th Swindon Rapidplay",
    "awayTeam": "",
    "season": "2025-2026",
    "date": "2025-10-04",
    "time": "9:30",
    "venue": "away",
    "competition": "8th Swindon Rapidplay",
    "isTournament": true,
    "status": "upcoming",
    "notes": "Public tournament - all members welcome"
  },

  {
    "id": "internal-5",
    "homeTeam": "Hampshire Open Junior FIDE Blitz",
    "awayTeam": "",
    "season": "2025-2026",
    "date": "2025-10-05",
    "time": "9:30",
    "venue": "away",
    "competition": "Hampshire Open Junior FIDE Blitz",
    "isTournament": true,
    "status": "upcoming",
    "notes": "The Hampshire Open Junior Blitz is for all players who are aged less than 18 years on August 31st 2024 regardless of location of residence and / or school.",
    // "location": "Portsmouth Chess Club",
    "address": "Ryde Esplanade Hotel , 16 Esplanade, Ryde PO33 2ED, UK",
    "moreInfoLink": "https://www.eventbrite.co.uk/e/hampshire-open-junior-fide-blitz-2025-tickets-1055001490859"
  },
  {
    "id": "internal-6",
    "homeTeam": "Isle of Wight Rapid & Blitz Championship ",
    "awayTeam": "",
    "season": "2025-2026",
    "date": "2025-10-04",
    "time": "9:30",
    "venue": "away",
    "competition": "Isle of Wight Rapid & Blitz Championship",
    "isTournament": true,
    "status": "upcoming",
    "notes": "Skill levels will range from new players to local champions.",
    // "location": "Portsmouth Chess Club",
    "address": "Badger Farm Community Centre 2 Badger Farm Road Winchester Hampshire",
    "moreInfoLink": "https://www.iowchess.com/event-details/isle-of-wight-rapid-blitz-championship"
  },
  {
    "id": "internal-7",
    "homeTeam": "Castle Chess 28th Fareham Congress",
    "awayTeam": "",
    "season": "2025-2026",
    "date": "2025-10-10",
    "time": "9:30",
    "venue": "away",
    "competition": "Castle Chess 28th Fareham Congress ",
    "isTournament": true,
    "status": "upcoming",
    "notes": "A weekend congress in a family run 3* hotel. Friendly atmosphere with experienced organisers.",
    "location": "Lysses House Hotel",
    "address": "51 High Street Fareham East,Fareham, Hampshire. PO16 7BQ",
    "moreInfoLink": "https://britchess.wufoo.com/cabinet/8602bf11-a3e4-4cc2-89f2-0cb2ccb5beee"
  },
  {
    "id": "internal-8",
    "homeTeam": "Hampshire Chess Congress 2025",
    "awayTeam": "",
    "season": "2025-2026",
    "date": "2025-11-07",
    "time": "9:30",
    "venue": "away",
    "competition": "Hampshire Chess Congress 2025",
    "isTournament": true,
    "status": "upcoming",
    "notes": "All players are welcome to enter this event which offers three tournaments catering to all standards of play. The Open and Major tournaments will be FIDE as well as ECF rated, whilst the Minor will be ECF rated.",
    "location": "Lysses House Hotel",
    "address": "51 High Street Fareham East,Fareham, Hampshire. PO16 7BQ",
    "moreInfoLink": "https://congress.org.uk/congress/618/home"
  },
  {
    "id": "internal-9",
    "homeTeam": "2nd University of Reading Rapidplay ",
    "awayTeam": "",
    "season": "2025-2026",
    "date": "2025-12-06",
    "time": "9:30",
    "venue": "away",
    "competition": "2nd University of Reading Rapidplay ",
    "isTournament": true,
    "status": "upcoming",
    "notes": "A six round ECF rated Swiss Rapidplay taking place on the University of Reading’s Whiteknights Campus open to all players with an ECF Gold membership. Two sections (Open and U1500), both with an entry fee of only £10.",
    "location": "Reading Students' Union",
    "address": "Whiteknights Campus, Reading, RG6 6UR",
    "moreInfoLink": "https://britchess.wufoo.com/cabinet/da8a7215-3e0e-4013-8f29-6a917ded6596"
  },
  {
    "id": "internal-10",
    "homeTeam": "47th Kidlington Chess Congress 2026",
    "awayTeam": "",
    "season": "2025-2026",
    "date": "2026-01-31",
    "time": "9:30",
    "venue": "away",
    "competition": "47th Kidlington Chess Congress 2026",
    "isTournament": true,
    "status": "upcoming",
    "notes": "5 round Standard Play, with 4 sections Open, U2000, U1800, and U1600. 90 min+ 15 sec. All sections ECF rated, Open section also FIDE rated. NOTE we have moved venue.",
    "location": "The Oxford Leonardo Hotel, Godstow Road",
    "address": "Wolvercote, OX2 8AL",
    "moreInfoLink": "https://kidlingtonchess.org.uk/"
  },
  // {
  //   "id": "internal-1",
  //   "homeTeam": "Club Championship",
  //   "awayTeam": "Round 1",
  //   "date": "2025-01-20",
  //   "time": "10:00",
  //   "venue": "home",
  //   "competition": "Internal Tournament",
  //   "status": "upcoming",
  //   "notes": "Internal tournament - all members welcome"
  // },
  // {
  //   "id": "internal-2",
  //   "homeTeam": "Rapid Tournament",
  //   "awayTeam": "Monthly Event",
  //   "date": "2025-01-27",
  //   "time": "14:00",
  //   "venue": "home",
  //   "competition": "Rapid Chess",
  //   "status": "upcoming",
  //   "notes": "Monthly rapid tournament - 15+5 time control"
  // },
  // {
  //   "id": "internal-3",
  //   "homeTeam": "Blitz Tournament",
  //   "awayTeam": "Weekly Event",
  //   "date": "2025-02-03",
  //   "time": "19:30",
  //   "venue": "home",
  //   "competition": "Blitz Chess",
  //   "status": "upcoming",
  //   "notes": "Weekly blitz tournament - 5+0 time control"
  // },
  {
    "id": "ical-1",
    "homeTeam": "Andover B",
    "awayTeam": "Winchester B",
    "season": "2025-2026",
    "date": "2025-09-23",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover B Vs Winchester B - Andover",
    // "location": "Andover Community Centre",
    // "address": "Andover Community Centre, 1 High Street, Andover, SP10 1LJ",
    // "moreInfoLink": "https://andoverchessclub.co.uk/venue"
  },
  {
    "id": "ical-2",
    "homeTeam": "Ringwood A",
    "awayTeam": "Andover A",
    "season": "2025-2026",
    "date": "2025-09-29",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Ringwood A Vs Andover A - Ringwood"
  },
  {
    "id": "ical-3",
    "homeTeam": "Chandlers Ford E",
    "awayTeam": "Andover C",
    "season": "2025-2026",
    "date": "2025-10-07",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Chandlers Ford E Vs Andover C - Chandlers Ford"
  },
  {
    "id": "ical-4",
    "homeTeam": "Andover A",
    "awayTeam": "Basingstoke B",
    "season": "2025-2026",
    "date": "2025-10-21",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover A Vs Basingstoke B - Andover"
  },
  {
    "id": "ical-5",
    "homeTeam": "Andover C",
    "awayTeam": "Basingstoke E",
    "season": "2025-2026",
    "date": "2025-10-28",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover C Vs Basingstoke E - Andover"
  },
  {
    "id": "ical-6",
    "homeTeam": "Southampton A",
    "awayTeam": "Andover A",
    "season": "2025-2026",
    "date": "2025-10-28",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Southampton A Vs Andover A - Southampton"
  },
  {
    "id": "ical-7",
    "homeTeam": "Southampton Univesrity C",
    "awayTeam": "Andover B",
    "season": "2025-2026",
    "date": "2025-10-30",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Southampton Univesrity C Vs Andover B - Southampton Univesrity"
  },
  {
    "id": "ical-8",
    "homeTeam": "Hamble B",
    "awayTeam": "Andover B",
    "season": "2025-2026",
    "date": "2025-11-05",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Hamble B Vs Andover B - Hamble"
  },
  {
    "id": "ical-9",
    "homeTeam": "Andover B",
    "awayTeam": "Basingstoke D",
    "season": "2025-2026",
    "date": "2025-11-11",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover B Vs Basingstoke D - Andover"
  },
  {
    "id": "ical-10",
    "homeTeam": "Southampton C",
    "awayTeam": "Andover C",
    "season": "2025-2026",
    "date": "2025-11-18",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Southampton C Vs Andover C - Southampton"
  },
  {
    "id": "ical-11",
    "homeTeam": "Andover A",
    "awayTeam": "Winchester A",
    "season": "2025-2026",
    "date": "2025-11-18",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover A Vs Winchester A - Andover"
  },
  {
    "id": "ical-12",
    "homeTeam": "Andover B",
    "awayTeam": "Chandlers Ford D",
    "season": "2025-2026",
    "date": "2025-11-25",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover B Vs Chandlers Ford D - Andover"
  },
  {
    "id": "ical-13",
    "homeTeam": "Fareham B",
    "awayTeam": "Andover A",
    "season": "2025-2026",
    "date": "2025-12-02",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Fareham B Vs Andover A - Fareham"
  },
  {
    "id": "ical-14",
    "homeTeam": "Chandlers Ford B",
    "awayTeam": "Andover A",
    "season": "2025-2026",
      "date": "2025-12-09",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Chandlers Ford B Vs Andover A - Chandlers Ford"
  },
  {
    "id": "ical-15",
    "homeTeam": "Andover C",
    "awayTeam": "Salisbury C",
    "season": "2025-2026",
    "date": "2025-12-16",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover C Vs Salisbury C - Andover"
  },
  {
    "id": "ical-16",
    "homeTeam": "Andover B",
    "awayTeam": "Salisbury C",
    "season": "2025-2026",
    "date": "2026-01-13",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover B Vs Salisbury C - Andover"
  },
  {
    "id": "ical-17",
    "homeTeam": "Andover A",
    "awayTeam": "Ringwood A",
    "season": "2025-2026",
    "date": "2026-01-20",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover A Vs Ringwood A - Andover"
  },
  {
    "id": "ical-18",
    "homeTeam": "Winchester B",
    "awayTeam": "Andover B",
    "season": "2025-2026",
    "date": "2026-01-21",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Winchester B Vs Andover B - Winchester"
  },
  {
    "id": "ical-19",
    "homeTeam": "Andover A",
    "awayTeam": "Chandlers Ford B",
    "season": "2025-2026",
    "date": "2026-01-27",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover A Vs Chandlers Ford B - Andover"
  },
  {
    "id": "ical-20",
    "homeTeam": "Basingstoke D",
    "awayTeam": "Andover B",
    "season": "2025-2026",
    "date": "2026-01-28",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Basingstoke D Vs Andover B - Basingstoke"
  },
  {
    "id": "ical-21",
    "homeTeam": "Andover C",
    "awayTeam": "Southampton C",
    "season": "2025-2026",
    "date": "2026-02-10",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover C Vs Southampton C - Andover"
  },
  {
    "id": "ical-22",
    "homeTeam": "Andover B",
    "awayTeam": "Hamble B",
    "season": "2025-2026",
    "date": "2026-02-17",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover B Vs Hamble B - Andover"
  },
  {
    "id": "ical-23",
    "homeTeam": "Winchester A",
    "awayTeam": "Andover A",
    "season": "2025-2026",
    "date": "2026-02-18",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Winchester A Vs Andover A - Winchester"
  },
  {
    "id": "ical-24",
    "homeTeam": "Salisbury C",
    "awayTeam": "Andover C",
    "season": "2025-2026",
    "date": "2026-02-19",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Salisbury C Vs Andover C - Salisbury"
  },
  {
    "id": "ical-25",
    "homeTeam": "Chandlers Ford D",
    "awayTeam": "Andover B",
    "season": "2025-2026",
    "date": "2026-02-24",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Chandlers Ford D Vs Andover B - Chandlers Ford"
  },
  {
    "id": "ical-26",
    "homeTeam": "Basingstoke E",
    "awayTeam": "Andover A",
    "season": "2025-2026",
      "date": "2026-03-04",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Basingstoke E Vs Andover Andover C - Basingstoke"
  },
  {
    "id": "ical-27",
    "homeTeam": "Andover C",
    "awayTeam": "Chandlers Ford E",
    "season": "2025-2026",
      "date": "2026-03-10",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover C Vs Chandlers Ford E - Andover"
  },
  {
    "id": "ical-28",
    "homeTeam": "Basingstoke B",
    "awayTeam": "Andover A",
    "season": "2025-2026",
      "date": "2026-03-11",
    "time": "19:30",
    "venue": "away",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Basingstoke B Vs Andover A - Basingstoke"
  },
  {
    "id": "ical-29",
    "homeTeam": "Andover B",
    "awayTeam": "Southampton Univserity C",
    "season": "2025-2026",
    "date": "2026-03-17",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover B Vs Southampton Univserity C - Andover"
  },
  {
    "id": "ical-30",
    "homeTeam": "Andover A",
    "awayTeam": "Fareham B",
    "season": "2025-2026",
    "date": "2026-03-31",
    "time": "19:30",
    "venue": "home",
    "competition": "Southampton Chess League",
    "isTournament": false,
    "status": "upcoming",
    "notes": "Andover A Vs Fareham B - Andover A"
  }
];

export const getUpcomingFixtures = () => 
  fixtures.filter(fixture => fixture.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const getCompletedFixtures = () => 
  fixtures.filter(fixture => fixture.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getRecentResults = () => 
  getCompletedFixtures().slice(0, 3);
