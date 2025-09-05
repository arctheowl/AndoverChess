export interface ClubStats {
  activeMembers: number;
  countyChampions: number;
  yearsOfExcellence: number;
  tournamentsWon: number;
  leaguePosition: string;
  teams: number;
  seasonRecord: string;
  nextMatch: string;
  nextOpponent: string;
}

export interface ContactInfo {
  address: {
    venue: string;
    street: string;
    city: string;
    postcode: string;
  };
  email: string;
  phone: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface MeetingSchedule {
  day: string;
  time: string;
  type: string;
  description: string;
  status: string;
  color: string;
}

export interface VenueInfo {
  name: string;
  address: string;
  capacity: string;
  facilities: string[];
  parking: string;
  accessibility: string;
}

// Import fixtures data for dynamic stats
import { fixtures } from './fixtures';

// Function to get the next upcoming match
const getNextMatch = () => {
  const upcomingFixtures = fixtures
    .filter(fixture => fixture.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  if (upcomingFixtures.length === 0) {
    return { nextMatch: 'No upcoming matches', nextOpponent: '' };
  }
  
  const nextFixture = upcomingFixtures[0];
  const date = new Date(nextFixture.date + 'T00:00:00');
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekday = weekdays[date.getDay()];
  
  // Determine opponent
  let opponent = '';
  if (nextFixture.homeTeam.includes('Andover')) {
    opponent = nextFixture.awayTeam;
  } else if (nextFixture.awayTeam.includes('Andover')) {
    opponent = nextFixture.homeTeam;
  } else {
    // For tournaments or events where Andover isn't explicitly mentioned
    opponent = nextFixture.homeTeam || nextFixture.awayTeam || 'TBA';
  }
  
  return {
    nextMatch: `Next: ${weekday}`,
    nextOpponent: `vs ${opponent}`
  };
};

const nextMatchData = getNextMatch();

export const clubStats: ClubStats = {
  activeMembers: 20,
  countyChampions: 3,
  yearsOfExcellence: 130,
  tournamentsWon: 1000,
  leaguePosition: '2nd',
  teams: 3,
  seasonRecord: 'W3 D1 L1',
  nextMatch: nextMatchData.nextMatch,
  nextOpponent: nextMatchData.nextOpponent
};

// Export function for getting next match info (can be used elsewhere)
export const getNextMatchInfo = () => {
  return getNextMatch();
};

export const contactInfo: ContactInfo = {
  address: {
    venue: 'Andover Central Club',
    street: 'Clare Ho/East St',
    city: 'Andover',
    postcode: 'SP10 1EP'
  },
  email: 'scartridge1@gmail.com',
  phone: '07917897427',
  socialMedia: {
    facebook: '#',
    twitter: '#'
  }
};

export const meetingSchedule: MeetingSchedule[] = [
  {
    day: 'T',
    time: '7:00 PM - 10:00 PM',
    type: 'Tuesday Club Nights',
    description: 'Out regular club night',
    status: 'Active',
    color: 'emerald'
  },
  // {
  //   day: 'W',
  //   time: '7:00 PM - 10:00 PM',
  //   type: 'Wednesday Matches',
  //   description: 'League matches & competitive play',
  //   status: 'Match Day',
  //   color: 'blue'
  // },
  // {
  //   day: 'S',
  //   time: '10:00 AM - 12:00 PM',
  //   type: 'Saturday Academy',
  //   description: 'Junior coaching & beginners welcome',
  //   status: 'Training',
  //   color: 'green'
  // }
];

export const venueInfo: VenueInfo = {
  name: 'Andover Central Club',
  address: 'Andover Community Centre',
  capacity: '30+ players',
  facilities: ['Bar', 'Chess Equipment', 'Refreshments'],
  parking: 'Free car park next to the club',
  accessibility: 'Wheelchair accessible'
};

export const clubHistory = {
  founded: '1895',
  milestones: [
    {
      year: '1895',
      title: 'Club Founded',
      description: 'First meeting held at Andover Library'
    },
    {
      year: '1985',
      title: 'First County Champion',
      description: 'Club member wins Hampshire Championship'
    },
    {
      year: '2010',
      title: 'New Home',
      description: 'Moved to Andover Central Club'
    },
    {
      year: '2020',
      title: 'Online Expansion',
      description: 'Launched online tournaments and training'
    }
  ]
};

export const clubValues = [
  {
    icon: '🎯',
    title: 'Our Mission',
    description: 'To provide a welcoming environment where chess enthusiasts of all ages and skill levels can learn, play, and develop their passion for the game.'
  },
  {
    icon: '🤝',
    title: 'Inclusivity',
    description: 'We welcome players of all backgrounds, ages, and abilities. Our club is built on respect, sportsmanship, and the joy of learning together.'
  },
  {
    icon: '📈',
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from the quality of our coaching to the organization of our tournaments and events.'
  }
];

export const achievements = [
  {
    number: '3',
    label: 'Active League Teams'
  },
  {
    number: '20+',
    label: 'Active Members'
  },
  {
    number: '49',
    label: 'Years of Experience'
  },
  {
    number: '100+',
    label: 'Games Played'
  }
];
