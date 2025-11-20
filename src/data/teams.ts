export interface Team {
  id: string;
  name: string;
  division: string;
  divisionLink: string;
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
    result?: string;
  }>;
}

export const teams: Team[] = [
  {
    "id": "1",
    "name": "A Team",
    "division": "Southampton League Division 2",
    "divisionLink": "https://lms.englishchess.org.uk/lms/event/8398/view",
    "position": 6,
    "played": 1,
    "won": 1,
    "drawn": 0,
    "lost": 1,
    "points": 0,
    "maxPoints": 20,
    "record": "W0 D0 L1",
    "description": "Our premier team competing at the higher Southampton chess leagues",
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
        "date": "2025-03-25",
        "opponent": "Hamble A",
        "location": "Andover",
        "isHome": true,
        "result": "Loss"
      },
      {
        "date": "2025-03-11",
        "opponent": "Winchester A",
        "location": "Andover",
        "isHome": true,
        "result": "Win"
      },
      {
        "date": "2025-03-04",
        "opponent": "Fareham B",
        "location": "Fareham",
        "isHome": false,
        "result": "Win"
      },
      {
        "date": "2025-01-21",
        "opponent": "Chandlers Ford B",
        "location": "Chandlers Ford",
        "isHome": false,
        "result": "Loss"
      },
      {
        "date": "2025-01-14",
        "opponent": "Salisbury A",
        "location": "Andover",
        "isHome": true,
        "result": "Draw"
      }
    ]
  },
  {
    "id": "2",
    "name": "B Team",
    "division": "Southampton League Division 4",
    "divisionLink": "https://lms.englishchess.org.uk/lms/event/8400/view",
    "position": 2,
    "played": 1,
    "won": 1,
    "drawn": 0,
    "lost": 0,
    "points": 2,
    "maxPoints": 20,
    "record": "W1 D0 L0",
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
        "opponent": "Hamble B",
        "location": "Hamble",
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
        "date": "2024-12-14",
        "opponent": "Hamble B",
        "location": "Andover",
        "isHome": true,
        "result": "Win"
      },
      {
        "date": "2024-12-07",
        "opponent": "Chandlers Ford D",
        "location": "Chandlers Ford",
        "isHome": false,
        "result": "Loss"
      },
      {
        "date": "2024-11-30",
        "opponent": "Southampton University C",
        "location": "Andover",
        "isHome": true,
        "result": "Draw"
      },
      {
        "date": "2024-11-23",
        "opponent": "Basingstoke D",
        "location": "Basingstoke",
        "isHome": false,
        "result": "Win"
      },
      {
        "date": "2024-11-16",
        "opponent": "Winchester B",
        "location": "Andover",
        "isHome": true,
        "result": "Loss"
      }
    ]
  },
  {
    "id": "3",
    "name": "C Team",
    "division": "Southampton League Division 5",
    "divisionLink": "https://lms.englishchess.org.uk/lms/event/8401/view",
    "position": 1,
    "played": 2,
    "won": 2,
    "drawn": 0,
    "lost": 0,
    "points": 4,
    "maxPoints": 20,
    "record": "W2 D0 L0",
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
        "date": "2024-12-13",
        "opponent": "Southampton C",
        "location": "Andover",
        "isHome": true,
        "result": "Win"
      },
      {
        "date": "2024-12-06",
        "opponent": "Salisbury C",
        "location": "Salisbury",
        "isHome": false,
        "result": "Win"
      },
      {
        "date": "2024-11-29",
        "opponent": "Chandlers Ford E",
        "location": "Andover",
        "isHome": true,
        "result": "Loss"
      },
      {
        "date": "2024-11-22",
        "opponent": "Basingstoke E",
        "location": "Basingstoke",
        "isHome": false,
        "result": "Draw"
      },
      {
        "date": "2024-11-15",
        "opponent": "Southampton C",
        "location": "Southampton",
        "isHome": false,
        "result": "Win"
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
