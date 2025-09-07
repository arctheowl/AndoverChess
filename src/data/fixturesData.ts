// Simplified fixtures data structure
// This file contains the core fixture information without repeated venue details

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
  status: 'upcoming' | 'completed' | 'cancelled';
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
export const completedFixtures2024_25: SimpleFixture[] = [
  {
    id: "andover-b-2024-10-09",
    season: "2024-2025",
    homeTeam: "Basingstoke D",
    awayTeam: "Andover B",
    date: "2024-10-09",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming", // Will be automatically set to completed if date is in the past
    result: "Win",
    score: "1-3",
    notes: "Basingstoke D vs Andover B - Basingstoke",
    venueKey: "basingstoke"
  },
  {
    id: "andover-b-2024-10-17",
    season: "2024-2025",
    homeTeam: "Southampton University C",
    awayTeam: "Andover B",
    date: "2024-10-17",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming", // Will be automatically set to completed if date is in the past
    result: "Loss",
    score: "3.5-0.5",
    notes: "Southampton University C vs Andover B - Southampton",
    venueKey: "southampton-university"
  },
  {
    id: "andover-b-2024-10-29",
    season: "2024-2025",
    homeTeam: "Andover B",
    awayTeam: "Winchester B",
    date: "2024-10-29",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming", // Will be automatically set to completed if date is in the past
    result: "Draw",
    score: "2-2",
    notes: "Andover B vs Winchester B - Andover",
    venueKey: "andover"
  },
  {
    id: "andover-b-2024-11-12",
    season: "2024-2025",
    homeTeam: "Chandlers Ford C",
    awayTeam: "Andover B",
    date: "2024-11-12",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming", // Will be automatically set to completed if date is in the past
    result: "Draw",
    score: "2-2",
    venueKey: "chandlers-ford"
  },
  {
    id: "andover-b-2024-12-10",
    season: "2024-2025",
    homeTeam: "Andover B",
    awayTeam: "Salisbury C",
    date: "2024-12-10",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming", // Will be automatically set to completed if date is in the past
    result: "Draw",
    score: "2-2",
    notes: "Andover B vs Salisbury C - Andover",
    venueKey: "andover"
  },
  {
    id: "andover-b-2025-01-09",
    season: "2024-2025",
    homeTeam: "Salisbury C",
    awayTeam: "Andover B",
    date: "2025-01-09",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming", // Will be automatically set to completed if date is in the past
    result: "Win",
    score: "1-3",
    notes: "Salisbury C vs Andover B - Salisbury",
    venueKey: "salisbury"
  },
  {
    id: "andover-b-2025-02-11",
    season: "2024-2025",
    homeTeam: "Andover B",
    awayTeam: "Southampton University C",
    date: "2025-02-11",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming", // Will be automatically set to completed if date is in the past
    result: "Win",
    score: "2.5-1.5",
    notes: "Andover B vs Southampton University C - Andover",
    venueKey: "andover"
  },
  {
    id: "andover-b-2025-02-18",
    season: "2024-2025",
    homeTeam: "Andover B",
    awayTeam: "Chandlers Ford C",
    date: "2025-02-18",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming", // Will be automatically set to completed if date is in the past
    result: "Loss",
    score: "1-3",
    notes: "Andover B vs Chandlers Ford C - Andover",
    venueKey: "andover"
  },
  {
    id: "andover-b-2025-03-19",
    season: "2024-2025",
    homeTeam: "Winchester B",
    awayTeam: "Andover B",
    date: "2025-03-19",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming", // Will be automatically set to completed if date is in the past
    result: "Draw",
    score: "2-2",
    notes: "Winchester B vs Andover B - Winchester",
    venueKey: "winchester"
  },
  {
    id: "andover-b-2025-04-01",
    season: "2024-2025",
    homeTeam: "Andover B",
    awayTeam: "Basingstoke D",
    date: "2025-04-01",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming", // Will be automatically set to completed if date is in the past
    result: "Win",
    score: "3-1",
    notes: "Andover B vs Basingstoke D - Andover",
    venueKey: "andover"
  }
];

// 2025-2026 Season Upcoming Tournaments
export const upcomingTournaments2025_26: SimpleFixture[] = [
  {
    id: "internal-1",
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
    id: "internal-2",
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
    id: "internal-3",
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
    id: "internal-4",
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
    id: "internal-5",
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
    id: "internal-6",
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
    id: "internal-7",
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
    id: "internal-8",
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
    id: "internal-9",
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
    id: "internal-10",
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
  }
];

// 2025-2026 Season Upcoming League Matches
export const upcomingLeagueMatches2025_26: SimpleFixture[] = [
  {
    id: "ical-1",
    homeTeam: "Andover B",
    awayTeam: "Winchester B",
    season: "2025-2026",
    date: "2025-09-23",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover B Vs Winchester B - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-2",
    homeTeam: "Ringwood A",
    awayTeam: "Andover A",
    season: "2025-2026",
    date: "2025-09-29",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Ringwood A Vs Andover A - Ringwood",
    venueKey: "ringwood"
  },
  {
    id: "ical-3",
    homeTeam: "Chandlers Ford E",
    awayTeam: "Andover C",
    season: "2025-2026",
    date: "2025-10-07",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Chandlers Ford E Vs Andover C - Chandlers Ford",
    venueKey: "chandlers-ford"
  },
  {
    id: "ical-4",
    homeTeam: "Andover A",
    awayTeam: "Basingstoke B",
    season: "2025-2026",
    date: "2025-10-21",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover A Vs Basingstoke B - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-5",
    homeTeam: "Andover C",
    awayTeam: "Basingstoke E",
    season: "2025-2026",
    date: "2025-10-28",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover C Vs Basingstoke E - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-6",
    homeTeam: "Southampton A",
    awayTeam: "Andover A",
    season: "2025-2026",
    date: "2025-10-28",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Southampton A Vs Andover A - Southampton",
    venueKey: "southampton"
  },
  {
    id: "ical-7",
    homeTeam: "Southampton Univesrity C",
    awayTeam: "Andover B",
    season: "2025-2026",
    date: "2025-10-30",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Southampton Univesrity C Vs Andover B - Southampton Univesrity",
    venueKey: "southampton-university"
  },
  {
    id: "ical-8",
    homeTeam: "Hamble B",
    awayTeam: "Andover B",
    season: "2025-2026",
    date: "2025-11-05",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Hamble B Vs Andover B - Hamble",
    venueKey: "hamble"
  },
  {
    id: "ical-9",
    homeTeam: "Andover B",
    awayTeam: "Basingstoke D",
    season: "2025-2026",
    date: "2025-11-11",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover B Vs Basingstoke D - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-10",
    homeTeam: "Southampton C",
    awayTeam: "Andover C",
    season: "2025-2026",
    date: "2025-11-18",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Southampton C Vs Andover C - Southampton",
    venueKey: "southampton"
  },
  {
    id: "ical-11",
    homeTeam: "Andover A",
    awayTeam: "Winchester A",
    season: "2025-2026",
    date: "2025-11-18",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover A Vs Winchester A - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-12",
    homeTeam: "Andover B",
    awayTeam: "Chandlers Ford D",
    season: "2025-2026",
    date: "2025-11-25",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover B Vs Chandlers Ford D - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-13",
    homeTeam: "Fareham B",
    awayTeam: "Andover A",
    season: "2025-2026",
    date: "2025-12-02",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Fareham B Vs Andover A - Fareham",
    venueKey: "fareham"
  },
  {
    id: "ical-14",
    homeTeam: "Chandlers Ford B",
    awayTeam: "Andover A",
    season: "2025-2026",
    date: "2025-12-09",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Chandlers Ford B Vs Andover A - Chandlers Ford",
    venueKey: "chandlers-ford"
  },
  {
    id: "ical-15",
    homeTeam: "Andover C",
    awayTeam: "Salisbury C",
    season: "2025-2026",
    date: "2025-12-16",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover C Vs Salisbury C - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-16",
    homeTeam: "Andover B",
    awayTeam: "Salisbury C",
    season: "2025-2026",
    date: "2026-01-13",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover B Vs Salisbury C - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-17",
    homeTeam: "Andover A",
    awayTeam: "Ringwood A",
    season: "2025-2026",
    date: "2026-01-20",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover A Vs Ringwood A - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-18",
    homeTeam: "Winchester B",
    awayTeam: "Andover B",
    season: "2025-2026",
    date: "2026-01-21",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Winchester B Vs Andover B - Winchester",
    venueKey: "winchester"
  },
  {
    id: "ical-19",
    homeTeam: "Andover A",
    awayTeam: "Chandlers Ford B",
    season: "2025-2026",
    date: "2026-01-27",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover A Vs Chandlers Ford B - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-20",
    homeTeam: "Basingstoke D",
    awayTeam: "Andover B",
    season: "2025-2026",
    date: "2026-01-28",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Basingstoke D Vs Andover B - Basingstoke",
    venueKey: "basingstoke"
  },
  {
    id: "ical-21",
    homeTeam: "Andover C",
    awayTeam: "Southampton C",
    season: "2025-2026",
    date: "2026-02-10",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover C Vs Southampton C - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-22",
    homeTeam: "Andover B",
    awayTeam: "Hamble B",
    season: "2025-2026",
    date: "2026-02-17",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover B Vs Hamble B - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-23",
    homeTeam: "Winchester A",
    awayTeam: "Andover A",
    season: "2025-2026",
    date: "2026-02-18",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Winchester A Vs Andover A - Winchester",
    venueKey: "winchester"
  },
  {
    id: "ical-24",
    homeTeam: "Salisbury C",
    awayTeam: "Andover C",
    season: "2025-2026",
    date: "2026-02-19",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Salisbury C Vs Andover C - Salisbury",
    venueKey: "salisbury"
  },
  {
    id: "ical-25",
    homeTeam: "Chandlers Ford D",
    awayTeam: "Andover B",
    season: "2025-2026",
    date: "2026-02-24",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Chandlers Ford D Vs Andover B - Chandlers Ford",
    venueKey: "chandlers-ford"
  },
  {
    id: "ical-26",
    homeTeam: "Basingstoke E",
    awayTeam: "Andover A",
    season: "2025-2026",
    date: "2026-03-04",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Basingstoke E Vs Andover Andover C - Basingstoke",
    venueKey: "basingstoke"
  },
  {
    id: "ical-27",
    homeTeam: "Andover C",
    awayTeam: "Chandlers Ford E",
    season: "2025-2026",
    date: "2026-03-10",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover C Vs Chandlers Ford E - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-28",
    homeTeam: "Basingstoke B",
    awayTeam: "Andover A",
    season: "2025-2026",
    date: "2026-03-11",
    time: "19:30",
    venue: "away",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Basingstoke B Vs Andover A - Basingstoke",
    venueKey: "basingstoke"
  },
  {
    id: "ical-29",
    homeTeam: "Andover B",
    awayTeam: "Southampton Univserity C",
    season: "2025-2026",
    date: "2026-03-17",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover B Vs Southampton Univserity C - Andover",
    venueKey: "andover"
  },
  {
    id: "ical-30",
    homeTeam: "Andover A",
    awayTeam: "Fareham B",
    season: "2025-2026",
    date: "2026-03-31",
    time: "19:30",
    venue: "home",
    competition: "Southampton Chess League",
    isTournament: false,
    status: "upcoming",
    notes: "Andover A Vs Fareham B - Andover A",
    venueKey: "andover"
  }
];

// Combine all fixtures
export const allSimpleFixtures: SimpleFixture[] = [
  ...completedFixtures2024_25,
  ...upcomingTournaments2025_26,
  ...upcomingLeagueMatches2025_26
];
