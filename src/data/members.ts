export interface Member {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  joinDate: string;
  rating?: number;
  achievements?: string[];
  isCommittee: boolean;
  avatar?: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  description: string;
  achievements: string[];
}

export const members: Member[] = [
  {
    id: '1',
    name: 'David Thompson',
    role: 'Club President',
    email: 'david.thompson@andoverchessclub.co.uk',
    phone: '01234 567890',
    joinDate: '1982-01-15',
    rating: 1850,
    achievements: ['Hampshire Champion 1995', 'Club President 2009-present'],
    isCommittee: true,
    avatar: '👨‍💼'
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    role: 'Secretary',
    email: 'sarah.mitchell@andoverchessclub.co.uk',
    phone: '01234 567891',
    joinDate: '2005-03-20',
    rating: 1650,
    achievements: ['Junior Coordinator 2010-2015', 'Secretary 2015-present'],
    isCommittee: true,
    avatar: '👩‍💼'
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Treasurer',
    email: 'michael.chen@andoverchessclub.co.uk',
    phone: '01234 567892',
    joinDate: '2010-09-10',
    rating: 1750,
    achievements: ['Treasurer 2018-present', 'Tournament Organizer'],
    isCommittee: true,
    avatar: '👨‍💼'
  },
  {
    id: '4',
    name: 'Robert Wilson',
    role: 'Head Coach',
    email: 'robert.wilson@andoverchessclub.co.uk',
    phone: '01234 567893',
    joinDate: '2000-06-15',
    rating: 1950,
    achievements: ['Qualified Chess Coach', 'Hampshire Coach of the Year 2020'],
    isCommittee: true,
    avatar: '👨‍🏫'
  },
  {
    id: '5',
    name: 'James Anderson',
    role: 'Tournament Director',
    email: 'james.anderson@andoverchessclub.co.uk',
    phone: '01234 567894',
    joinDate: '2012-11-05',
    rating: 1700,
    achievements: ['Tournament Director 2019-present', 'League Captain'],
    isCommittee: true,
    avatar: '👨‍💻'
  },
  {
    id: '6',
    name: 'Emma Davis',
    role: 'Junior Coordinator',
    email: 'emma.davis@andoverchessclub.co.uk',
    phone: '01234 567895',
    joinDate: '2015-02-28',
    rating: 1600,
    achievements: ['Junior Coordinator 2020-present', 'Youth Development Award 2022'],
    isCommittee: true,
    avatar: '👩‍🎓'
  },
  {
    id: '7',
    name: 'John Smith',
    role: 'Member',
    joinDate: '2018-04-12',
    rating: 1450,
    isCommittee: false
  },
  {
    id: '8',
    name: 'Lisa Johnson',
    role: 'Member',
    joinDate: '2019-08-20',
    rating: 1350,
    isCommittee: false
  },
  {
    id: '9',
    name: 'Tom Williams',
    role: 'Member',
    joinDate: '2020-01-15',
    rating: 1200,
    isCommittee: false
  },
  {
    id: '10',
    name: 'Maria Garcia',
    role: 'Member',
    joinDate: '2021-03-10',
    rating: 1100,
    isCommittee: false
  }
];

export const committeeMembers: CommitteeMember[] = [
  {
    id: '1',
    name: 'Stuart Knox',
    role: 'Club President',
    email: 'david.thompson@andoverchessclub.co.uk',
    phone: '01234 567890',
    avatar: '👨‍💼',
    description: 'Club member since 1982, David has been president for 15 years and is a former Hampshire champion.',
    achievements: ['Hampshire Champion 1995', 'Club President 2009-present', 'Life Member']
  },
  {
    id: '2',
    name: 'Stephen Cartridge',
    role: 'Secretary',
    email: 'sarah.mitchell@andoverchessclub.co.uk',
    phone: '01234 567891',
    avatar: '👩‍💼',
    description: 'Sarah handles all club administration and has been instrumental in organizing our junior coaching program.',
    achievements: ['Junior Coordinator 2010-2015', 'Secretary 2015-present', 'Administrative Excellence Award']
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Treasurer',
    email: 'michael.chen@andoverchessclub.co.uk',
    phone: '01234 567892',
    avatar: '👨‍💼',
    description: 'Michael manages our finances and has helped secure funding for equipment and tournament prizes.',
    achievements: ['Treasurer 2018-present', 'Tournament Organizer', 'Financial Management Award']
  },
  {
    id: '4',
    name: 'Stephen Cartridge',
    role: 'A Team Captain',
    email: 'robert.wilson@andoverchessclub.co.uk',
    phone: '01234 567893',
    avatar: '👨‍🏫',
    description: 'A qualified chess coach with over 20 years of teaching experience, Robert leads our training sessions.',
    achievements: ['Qualified Chess Coach', 'Hampshire Coach of the Year 2020', '20+ Years Teaching Experience']
  },
  {
    id: '5',
    name: 'Liam Devlin',
    role: 'B Team Captain',
    email: 'james.anderson@andoverchessclub.co.uk',
    phone: '01234 567894',
    avatar: '👨‍💻',
    description: 'James organizes our internal tournaments and manages our league team participation.',
    achievements: ['Tournament Director 2019-present', 'League Captain', 'Tournament Organization Expert']
  },
  {
    id: '6',
    name: 'Will Jackson',
    role: 'C Team Captain',
    email: 'emma.davis@andoverchessclub.co.uk',
    phone: '01234 567895',
    avatar: '👩‍🎓',
    description: 'Emma runs our junior program and ensures young players have opportunities to develop their skills.',
    achievements: ['Junior Coordinator 2020-present', 'Youth Development Award 2022', 'Junior Program Specialist']
  }
];

export const getMembers = () => members;
export const getCommitteeMembers = () => committeeMembers;
export const getRegularMembers = () => members.filter(member => !member.isCommittee);
export const getMemberById = (id: string) => members.find(member => member.id === id);
export const getCommitteeMemberById = (id: string) => committeeMembers.find(member => member.id === id);

export const getMemberStats = () => ({
  totalMembers: members.length,
  committeeMembers: committeeMembers.length,
  regularMembers: members.filter(m => !m.isCommittee).length,
  averageRating: Math.round(members.reduce((sum, m) => sum + (m.rating || 0), 0) / members.filter(m => m.rating).length),
  totalAchievements: members.reduce((sum, m) => sum + (m.achievements?.length || 0), 0)
});
