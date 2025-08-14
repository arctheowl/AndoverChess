export interface Team {
  id: string;
  name: string;
  division: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  maxPoints: number;
  record: string;
  description: string;
  color: string;
}

export const teams: Team[] = [
  {
    id: '1',
    name: 'First Team',
    division: 'Hampshire League Division 1',
    position: 2,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    points: 7,
    maxPoints: 10,
    record: 'W3 D1 L1',
    description: 'Our premier team competing at the highest level in Hampshire chess',
    color: 'emerald'
  },
  {
    id: '2',
    name: 'Second Team',
    division: 'Hampshire League Division 2',
    position: 4,
    played: 6,
    won: 2,
    drawn: 2,
    lost: 2,
    points: 6,
    maxPoints: 12,
    record: 'W2 D2 L2',
    description: 'Developing players and providing competitive experience',
    color: 'blue'
  },
  {
    id: '3',
    name: 'Junior Team',
    division: 'Hampshire Junior League',
    position: 1,
    played: 4,
    won: 4,
    drawn: 0,
    lost: 0,
    points: 8,
    maxPoints: 8,
    record: 'W4 D0 L0',
    description: 'Young talent representing the future of Andover Chess Club',
    color: 'green'
  }
];

export const getTeamById = (id: string) => teams.find(team => team.id === id);

export const getTeamStats = () => ({
  totalTeams: teams.length,
  totalMembers: teams.reduce((sum, team) => sum + team.played * 6, 0), // Estimate 6 players per team
  totalPoints: teams.reduce((sum, team) => sum + team.points, 0),
  totalMaxPoints: teams.reduce((sum, team) => sum + team.maxPoints, 0)
});
