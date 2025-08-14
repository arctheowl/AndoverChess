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

export const clubStats: ClubStats = {
  activeMembers: 50,
  countyChampions: 15,
  yearsOfExcellence: 49,
  tournamentsWon: 100,
  leaguePosition: '2nd',
  teams: 3,
  seasonRecord: 'W3 D1 L1',
  nextMatch: 'Next: Sat',
  nextOpponent: 'vs Portsmouth'
};

export const contactInfo: ContactInfo = {
  address: {
    venue: 'Andover Community Centre',
    street: '123 High Street',
    city: 'Andover',
    postcode: 'SP10 1AA'
  },
  email: 'info@andoverchessclub.co.uk',
  phone: '01234 567890',
  socialMedia: {
    facebook: '#',
    twitter: '#'
  }
};

export const meetingSchedule: MeetingSchedule[] = [
  {
    day: 'M',
    time: '7:00 PM - 10:00 PM',
    type: 'Monday Training',
    description: 'Strategy sessions & practice games',
    status: 'Active',
    color: 'emerald'
  },
  {
    day: 'W',
    time: '7:00 PM - 10:00 PM',
    type: 'Wednesday Matches',
    description: 'League matches & competitive play',
    status: 'Match Day',
    color: 'blue'
  },
  {
    day: 'S',
    time: '10:00 AM - 12:00 PM',
    type: 'Saturday Academy',
    description: 'Junior coaching & beginners welcome',
    status: 'Training',
    color: 'green'
  }
];

export const venueInfo: VenueInfo = {
  name: 'Andover Community Centre',
  address: '123 High Street, Andover, SP10 1AA',
  capacity: '50+ players',
  facilities: ['Tournament hall', 'Analysis room', 'Equipment storage', 'Refreshments'],
  parking: 'Free on-site parking',
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
      description: 'Moved to Andover Community Centre'
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
    number: '15+',
    label: 'County Champions'
  },
  {
    number: '50+',
    label: 'Active Members'
  },
  {
    number: '49',
    label: 'Years of Excellence'
  },
  {
    number: '100+',
    label: 'Tournaments Won'
  }
];
