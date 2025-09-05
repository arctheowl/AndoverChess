export interface Fixture {
  id: string;
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
}

export const fixtures: Fixture[] = [
  {
    "id": "internal-1",
    "homeTeam": "2025 Hampshire Rapid Championships",
    "awayTeam": "",
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
