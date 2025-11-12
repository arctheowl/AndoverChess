// Simplified fixtures data structure
// This file contains the core fixture information without repeated venue details
// 
// NOTE: Fixtures are now primarily loaded dynamically from LMS via API routes.
// This static data serves as a fallback when dynamic scraping fails or is unavailable.
// The data here may become outdated - dynamic fixtures take precedence.

export interface SimpleFixture {
  id: string;
  season?: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: 'home' | 'away';
  competition: string;
  isTournament: boolean;
  status: 'upcoming' | 'completed' | 'cancelled' | 'postponed';
  result?: string;
  score?: string;
  notes?: string;
  // Venue information will be resolved from clubAddresses.ts
  venueKey?: string; // Key to look up in clubAddresses or tournamentVenues
  moreInfoLink?: string;
  boardResults?: any[]; // Will be imported from the original fixtures
  matchStats?: any; // Will be imported from the original fixtures
  matchNotes?: string;
}

// 2024-2025 Season Completed Matches
// NOTE: League matches are now loaded dynamically from LMS. This array is kept for backward compatibility but is empty.
export const completedFixtures2024_25: SimpleFixture[] = [];

// 2025-2026 Season Upcoming League Matches
// NOTE: League matches are now loaded dynamically from LMS. This array is kept for backward compatibility but is empty.
export const upcomingLeagueMatches2025_26: SimpleFixture[] = [];

// 2025-2026 Season Upcoming Tournaments
// NOTE: Tournaments are manually added here as they are not available in LMS.
export const upcomingTournaments2025_26: SimpleFixture[] = [
  {
    id: "tournament-hampshire-rapid-2025-09-06",
    homeTeam: "2025 Hampshire Rapid Championships",
    awayTeam: "",
    season: "2025-2026",
    date: "2025-09-06",
    time: "9:30",
    venue: "away",
    competition: "Hampshire Rapid Championships",
    isTournament: true,
    status: "upcoming", // Will be automatically set to completed if date is in the past
    notes: "Public tournament - all members welcome",
    venueKey: "barton-peveril",
    moreInfoLink: "https://www.hampshirechess.co.uk/rapidblitz2025/"
  },
  {
    id: "tournament-hampshire-blitz-2025-09-07",
    homeTeam: "2025 Hampshire Blitz Championships",
    awayTeam: "",
    season: "2025-2026",
    date: "2025-09-07",
    time: "9:30",
    venue: "away",
    competition: "Hampshire Blitz Championships",
    isTournament: true,
    status: "upcoming", // Will be automatically set to completed if date is in the past
    notes: "Public tournament - all members welcome",
    venueKey: "barton-peveril",
    moreInfoLink: "https://www.hampshirechess.co.uk/rapidblitz2025/"
  },
  {
    id: "tournament-oxford-fide-2025-09-20",
    homeTeam: "Oxford Fide Congress",
    awayTeam: "",
    season: "2025-2026",
    date: "2025-09-20",
    time: "9:30",
    venue: "away",
    competition: "Oxford Fide Congress",
    isTournament: true,
    status: "upcoming",
    notes: "Public tournament - all members welcome",
    venueKey: "kennington-village-hall",
    moreInfoLink: "https://congress.org.uk/congress/531/home"
  },
  {
    id: "tournament-swindon-rapidplay-2025-10-04",
    homeTeam: "8th Swindon Rapidplay",
    awayTeam: "",
    season: "2025-2026",
    date: "2025-10-04",
    time: "9:30",
    venue: "away",
    competition: "8th Swindon Rapidplay",
    isTournament: true,
    status: "upcoming",
    notes: "Public tournament - all members welcome"
  },
  {
    id: "tournament-hampshire-junior-blitz-2025-10-05",
    homeTeam: "Hampshire Open Junior FIDE Blitz",
    awayTeam: "",
    season: "2025-2026",
    date: "2025-10-05",
    time: "9:30",
    venue: "away",
    competition: "Hampshire Open Junior FIDE Blitz",
    isTournament: true,
    status: "upcoming",
    notes: "The Hampshire Open Junior Blitz is for all players who are aged less than 18 years on August 31st 2024 regardless of location of residence and / or school.",
    venueKey: "ryde-esplanade-hotel",
    moreInfoLink: "https://www.eventbrite.co.uk/e/hampshire-open-junior-fide-blitz-2025-tickets-1055001490859"
  },
  {
    id: "tournament-isle-of-wight-rapid-blitz-2025-10-04",
    homeTeam: "Isle of Wight Rapid & Blitz Championship",
    awayTeam: "",
    season: "2025-2026",
    date: "2025-10-04",
    time: "9:30",
    venue: "away",
    competition: "Isle of Wight Rapid & Blitz Championship",
    isTournament: true,
    status: "upcoming",
    notes: "Skill levels will range from new players to local champions.",
    venueKey: "badger-farm-community-centre",
    moreInfoLink: "https://www.iowchess.com/event-details/isle-of-wight-rapid-blitz-championship"
  },
  {
    id: "tournament-fareham-congress-2025-10-10",
    homeTeam: "Castle Chess 28th Fareham Congress",
    awayTeam: "",
    season: "2025-2026",
    date: "2025-10-10",
    time: "9:30",
    venue: "away",
    competition: "Castle Chess 28th Fareham Congress",
    isTournament: true,
    status: "upcoming",
    notes: "A weekend congress in a family run 3* hotel. Friendly atmosphere with experienced organisers.",
    venueKey: "lysses-house-hotel",
    moreInfoLink: "https://britchess.wufoo.com/cabinet/8602bf11-a3e4-4cc2-89f2-0cb2ccb5beee"
  },
  {
    id: "tournament-hampshire-congress-2025-11-07",
    homeTeam: "Hampshire Chess Congress 2025",
    awayTeam: "",
    season: "2025-2026",
    date: "2025-11-07",
    time: "9:30",
    venue: "away",
    competition: "Hampshire Chess Congress 2025",
    isTournament: true,
    status: "upcoming",
    notes: "All players are welcome to enter this event which offers three tournaments catering to all standards of play. The Open and Major tournaments will be FIDE as well as ECF rated, whilst the Minor will be ECF rated.",
    venueKey: "lysses-house-hotel",
    moreInfoLink: "https://congress.org.uk/congress/618/home"
  },
  {
    id: "tournament-reading-rapidplay-2025-12-06",
    homeTeam: "2nd University of Reading Rapidplay",
    awayTeam: "",
    season: "2025-2026",
    date: "2025-12-06",
    time: "9:30",
    venue: "away",
    competition: "2nd University of Reading Rapidplay",
    isTournament: true,
    status: "upcoming",
    notes: "A six round ECF rated Swiss Rapidplay taking place on the University of Reading's Whiteknights Campus open to all players with an ECF Gold membership. Two sections (Open and U1500), both with an entry fee of only £10.",
    venueKey: "reading-students-union",
    moreInfoLink: "https://britchess.wufoo.com/cabinet/da8a7215-3e0e-4013-8f29-6a917ded6596"
  },
  {
    id: "tournament-kidlington-congress-2026-01-31",
    homeTeam: "47th Kidlington Chess Congress 2026",
    awayTeam: "",
    season: "2025-2026",
    date: "2026-01-31",
    time: "9:30",
    venue: "away",
    competition: "47th Kidlington Chess Congress 2026",
    isTournament: true,
    status: "upcoming",
    notes: "5 round Standard Play, with 4 sections Open, U2000, U1800, and U1600. 90 min+ 15 sec. All sections ECF rated, Open section also FIDE rated. NOTE we have moved venue.",
    venueKey: "oxford-leonardo-hotel",
    moreInfoLink: "https://kidlingtonchess.org.uk/"
  },
   {
    id: "tournament-london-chess-classic-2025-11-26",
    homeTeam: "London Chess Classic 2025",
    awayTeam: "",
    season: "2025-2026",
    date: "2025-11-26",
    time: "9:30",
    venue: "away",
    competition: "London Chess Classic 2025",
    isTournament: true,
    status: "upcoming",
    notes: "The LCC Festival will give players of all standards the opportunity to enjoy many different forms of the game of chess: blitz, rapid, classical.",
    venueKey: "london-chess-classic",
    moreInfoLink: "https://www.londonchessclassic.com/"
  }
];

// Combine all fixtures
export const allSimpleFixtures: SimpleFixture[] = [
  ...completedFixtures2024_25,
  ...upcomingTournaments2025_26,
  ...upcomingLeagueMatches2025_26
];
