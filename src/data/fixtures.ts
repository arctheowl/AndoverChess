export interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: 'home' | 'away';
  competition: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  result?: string;
  score?: string;
  notes?: string;
}

export const fixtures: Fixture[] = [
  // Upcoming Fixtures
  {
    id: '1',
    homeTeam: 'Portsmouth Chess Club',
    awayTeam: 'Andover Chess Club',
    date: '2024-01-22',
    time: '19:00',
    venue: 'away',
    competition: 'Hampshire League',
    status: 'upcoming',
    notes: 'Division 1 match'
  },
  {
    id: '2',
    homeTeam: 'Club Championship',
    awayTeam: 'Round 1',
    date: '2024-01-20',
    time: '10:00',
    venue: 'home',
    competition: 'Internal Tournament',
    status: 'upcoming',
    notes: 'Internal tournament - all members welcome'
  },
  {
    id: '3',
    homeTeam: 'Rapid Tournament',
    awayTeam: 'Monthly Event',
    date: '2024-01-27',
    time: '14:00',
    venue: 'home',
    competition: 'Rapid Chess',
    status: 'upcoming',
    notes: 'Monthly rapid tournament - 15+5 time control'
  },
  {
    id: '4',
    homeTeam: 'Andover Chess Club',
    awayTeam: 'Winchester Chess Club',
    date: '2024-02-05',
    time: '19:00',
    venue: 'home',
    competition: 'Hampshire League',
    status: 'upcoming',
    notes: 'Division 1 match'
  },
  {
    id: '5',
    homeTeam: 'Basingstoke Chess Club',
    awayTeam: 'Andover Chess Club',
    date: '2024-02-12',
    time: '19:00',
    venue: 'away',
    competition: 'Hampshire League',
    status: 'upcoming',
    notes: 'Division 1 match'
  },

  // Completed Fixtures
  {
    id: '6',
    homeTeam: 'Andover Chess Club',
    awayTeam: 'Southampton Chess Club',
    date: '2024-01-08',
    time: '19:00',
    venue: 'home',
    competition: 'Hampshire League',
    status: 'completed',
    result: 'won',
    score: '4-2',
    notes: 'Division 1 match - excellent performance from all players'
  },
  {
    id: '7',
    homeTeam: 'Winchester Chess Club',
    awayTeam: 'Andover Chess Club',
    date: '2023-12-15',
    time: '19:00',
    venue: 'away',
    competition: 'Hampshire League',
    status: 'completed',
    result: 'lost',
    score: '3.5-2.5',
    notes: 'Division 1 match - close match, well fought'
  },
  {
    id: '8',
    homeTeam: 'Andover Chess Club',
    awayTeam: 'Basingstoke Chess Club',
    date: '2023-12-01',
    time: '19:00',
    venue: 'home',
    competition: 'Hampshire League',
    status: 'completed',
    result: 'won',
    score: '5-1',
    notes: 'Division 1 match - dominant performance'
  },
  {
    id: '9',
    homeTeam: 'Portsmouth Chess Club',
    awayTeam: 'Andover Chess Club',
    date: '2023-11-17',
    time: '19:00',
    venue: 'away',
    competition: 'Hampshire League',
    status: 'completed',
    result: 'won',
    score: '3.5-2.5',
    notes: 'Division 1 match - hard-fought victory'
  },
  {
    id: '10',
    homeTeam: 'Andover Chess Club',
    awayTeam: 'Southampton Chess Club',
    date: '2023-11-03',
    time: '19:00',
    venue: 'home',
    competition: 'Hampshire League',
    status: 'completed',
    result: 'drew',
    score: '3-3',
    notes: 'Division 1 match - evenly matched teams'
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
