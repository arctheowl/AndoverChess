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
  upcomingMatches: Array<{
    date: string;
    opponent: string;
    location: string;
    isHome: boolean;
  }>;
  recentMatches: Array<{
    date: string;
    opponent: string;
    location: string;
    isHome: boolean;
  }>;
}

export const teams: Team[] = [
  {
    "id": "1",
    "name": "A Team",
    "division": "Southampton League Division 2",
    "position": 4,
    "played": 10,
    "won": 3,
    "drawn": 3,
    "lost": 4,
    "points": 9,
    "maxPoints": 20,
    "record": "W3 D3 L4",
    "description": "Our premier team competing at the highest level in Southampton chess",
    "color": "emerald",
    "upcomingMatches": [
      {
        "date": "2025-09-29",
        "opponent": "Ringwood A",
        "location": "Ringwood",
        "isHome": false
      },
      {
        "date": "2025-10-21",
        "opponent": "Basingstoke B",
        "location": "Andover",
        "isHome": true
      },
      {
        "date": "2025-10-28",
        "opponent": "Southampton A",
        "location": "Southampton",
        "isHome": false
      },
      {
        "date": "2025-11-18",
        "opponent": "Winchester A",
        "location": "Andover",
        "isHome": true
      },
      {
        "date": "2025-12-02",
        "opponent": "Fareham B",
        "location": "Fareham",
        "isHome": false
      }
    ],
    "recentMatches": [
      {
        "date": "2026-03-04",
        "opponent": "Basingstoke E",
        "location": "Basingstoke",
        "isHome": false
      },
      {
        "date": "2026-03-11",
        "opponent": "Basingstoke B",
        "location": "Basingstoke",
        "isHome": false
      },
      {
        "date": "2026-03-31",
        "opponent": "Fareham B",
        "location": "Andover A",
        "isHome": true
      }
    ]
  },
  {
    "id": "2",
    "name": "B Team",
    "division": "Southampton League Division 4",
    "position": 3,
    "played": 10,
    "won": 4,
    "drawn": 4,
    "lost": 2,
    "points": 12,
    "maxPoints": 20,
    "record": "W4 D4 L2",
    "description": "Developing players and providing competitive experience",
    "color": "blue",
    "upcomingMatches": [
      {
        "date": "2025-09-23",
        "opponent": "Winchester B",
        "location": "Andover",
        "isHome": true
      },
      {
        "date": "2025-10-30",
        "opponent": "Southampton Univesrity C",
        "location": "Southampton Univesrity",
        "isHome": false
      },
      {
        "date": "2025-11-05",
        "opponent": "Hanble B",
        "location": "Hanble",
        "isHome": false
      },
      {
        "date": "2025-11-11",
        "opponent": "Basingstoke D",
        "location": "Andover",
        "isHome": true
      },
      {
        "date": "2025-11-25",
        "opponent": "Chandlers Ford D",
        "location": "Andover",
        "isHome": true
      }
    ],
    "recentMatches": [
      {
        "date": "2026-02-17",
        "opponent": "Hamble B",
        "location": "Andover",
        "isHome": true
      },
      {
        "date": "2026-02-24",
        "opponent": "Chandlers Ford D",
        "location": "Chandlers Ford",
        "isHome": false
      },
      {
        "date": "2026-03-17",
        "opponent": "Southampton Univserity C",
        "location": "Andover",
        "isHome": true
      }
    ]
  },
  {
    "id": "3",
    "name": "C Team",
    "division": "Southampton League Division 5",
    "position": 3,
    "played": 10,
    "won": 4,
    "drawn": 4,
    "lost": 2,
    "points": 12,
    "maxPoints": 20,
    "record": "W4 D4 L2",
    "description": "Talent representing the future of Andover Chess Club",
    "color": "green",
    "upcomingMatches": [
      {
        "date": "2025-10-07",
        "opponent": "Chandlers Ford E",
        "location": "Chandlers Ford",
        "isHome": false
      },
      {
        "date": "2025-10-28",
        "opponent": "Basingstoke E",
        "location": "Andover",
        "isHome": true
      },
      {
        "date": "2025-11-18",
        "opponent": "Southampton C",
        "location": "Southampton",
        "isHome": false
      },
      {
        "date": "2025-12-16",
        "opponent": "Salisbury C",
        "location": "Andover",
        "isHome": true
      },
      {
        "date": "2026-02-10",
        "opponent": "Southampton C",
        "location": "Andover",
        "isHome": true
      }
    ],
    "recentMatches": [
      {
        "date": "2026-02-10",
        "opponent": "Southampton C",
        "location": "Andover",
        "isHome": true
      },
      {
        "date": "2026-02-19",
        "opponent": "Salisbury C",
        "location": "Salisbury",
        "isHome": false
      },
      {
        "date": "2026-03-10",
        "opponent": "Chandlers Ford E",
        "location": "Andover",
        "isHome": true
      }
    ]
  }
];

export const getTeamById = (id: string) => teams.find(team => team.id === id);

export const getTeamStats = () => ({
  totalTeams: teams.length,
  totalMembers: teams.reduce((sum, team) => sum + team.played * 6, 0), // Estimate 6 players per team
  totalPoints: teams.reduce((sum, team) => sum + team.points, 0),
  totalMaxPoints: teams.reduce((sum, team) => sum + team.maxPoints, 0)
});
