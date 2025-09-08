export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: 'announcement' | 'tournament' | 'achievement' | 'general';
  image?: string;
  tags: string[];
  featured: boolean;
}

export const newsItems: NewsItem[] = [
//   {
//     id: '1',
//     title: 'Club Championship 2024 - Registration Now Open',
//     content: `We are excited to announce that registration for the 2024 Club Championship is now open! This year's tournament will feature both Open and Junior sections, with prizes for the top performers in each category.

// The tournament will run from January 20th to March 15th, with games played on Saturday afternoons. The time control will be 90 minutes + 30 seconds increment per move.

// Key details:
// - Open Section: All members welcome
// - Junior Section: Under 18s only
// - Entry fee: £10 for Open, £5 for Junior
// - Registration deadline: January 15th, 2024

// Please contact James Anderson (Tournament Director) to register or for more information.`,
//     excerpt: 'Registration is now open for our annual Club Championship tournament, featuring both Open and Junior sections.',
//     author: 'James Anderson',
//     publishDate: '2024-01-05',
//     category: 'tournament',
//     tags: ['tournament', 'championship', 'registration'],
//     featured: true
//   },
//   {
//     id: '2',
//     title: 'First Team Secures Impressive Victory Against Southampton',
//     content: `Our First Team continued their excellent form with a convincing 4-2 victory against Southampton Chess Club last Monday. The match was played at our home venue, the Andover Community Centre.

// Standout performances came from:
// - David Thompson (Board 1): Won against a 1900-rated opponent
// - Robert Wilson (Board 2): Secured a crucial draw in a complex position
// - Sarah Mitchell (Board 4): Won her game with a beautiful tactical combination

// This victory moves us into 2nd place in the Hampshire League Division 1 table, just 2 points behind the leaders. Our next match is away to Portsmouth on January 22nd.

// Well done to all the players for their excellent performance!`,
//     excerpt: 'The First Team secured an impressive 4-2 victory against Southampton, moving us into 2nd place in the league.',
//     author: 'Sarah Mitchell',
//     publishDate: '2024-01-09',
//     category: 'achievement',
//     tags: ['first-team', 'victory', 'league'],
//     featured: true
//   },
//   {
//     id: '3',
//     title: 'New Junior Coaching Program Launches',
//     content: `We are delighted to announce the launch of our new Junior Coaching Program, designed specifically for young players aged 8-16. The program will run every Saturday morning from 10:00 AM to 12:00 PM.

// The program includes:
// - Structured lessons covering openings, middlegame strategy, and endgame technique
// - Practice games with other juniors
// - Regular tournaments and competitions
// - Progress tracking and rating development
// - Qualified coaching from our experienced team

// The program is led by Emma Davis (Junior Coordinator) and supported by our qualified coaches. The cost is £20 per month, with discounts available for families with multiple children.

// To register your child, please contact Emma Davis or visit us on any Saturday morning.`,
//     excerpt: 'Our new Junior Coaching Program launches this month, offering structured chess education for young players.',
//     author: 'Emma Davis',
//     publishDate: '2024-01-03',
//     category: 'announcement',
//     tags: ['junior', 'coaching', 'program'],
//     featured: false
//   },
//   {
//     id: '4',
//     title: 'Club AGM - Annual General Meeting 2024',
//     content: `The Annual General Meeting of Andover Chess Club will be held on Monday, February 5th, 2024, at 7:30 PM at the Andover Community Centre.

// Agenda items include:
// - Review of the past year's activities and achievements
// - Financial report and budget for 2024
// - Election of committee members
// - Discussion of proposed changes to club constitution
// - Any other business

// All members are encouraged to attend. If you are unable to attend but wish to vote on any matters, please contact the Secretary to arrange a proxy vote.

// Nominations for committee positions should be submitted to the Secretary by January 25th, 2024.`,
//     excerpt: 'The Annual General Meeting will be held on February 5th, 2024. All members are encouraged to attend.',
//     author: 'Sarah Mitchell',
//     publishDate: '2024-01-02',
//     category: 'announcement',
//     tags: ['agm', 'meeting', 'committee'],
//     featured: false
//   },
//   {
//     id: '5',
//     title: 'Robert Wilson Named Hampshire Coach of the Year',
//     content: `We are proud to announce that our Head Coach, Robert Wilson, has been named Hampshire Coach of the Year for 2023 by the Hampshire Chess Association.

// This prestigious award recognizes Robert's outstanding contribution to chess coaching in Hampshire, including his work with our club's junior program and his role in developing young talent across the county.

// Robert has been with the club for over 20 years and has coached hundreds of players, many of whom have gone on to achieve county and national success. His dedication to teaching and his innovative coaching methods have made a significant impact on chess development in Hampshire.

// Congratulations to Robert on this well-deserved recognition!`,
//     excerpt: 'Our Head Coach Robert Wilson has been named Hampshire Coach of the Year for 2023.',
//     author: 'David Thompson',
//     publishDate: '2023-12-20',
//     category: 'achievement',
//     tags: ['coach', 'award', 'recognition'],
//     featured: true
//   },
//   {
//     id: '6',
//     title: 'Christmas Rapid Tournament Results',
//     content: `Our annual Christmas Rapid Tournament was held on December 16th, with 24 players competing in a festive atmosphere. The tournament was won by Michael Chen with a perfect score of 5/5.

// Final standings:
// 1. Michael Chen - 5/5
// 2. Robert Wilson - 4/5
// 3. David Thompson - 4/5
// 4. James Anderson - 3.5/5
// 5. Sarah Mitchell - 3.5/5

// Special mention goes to our youngest participant, 12-year-old Tom Williams, who scored 2.5/5 and showed great promise for the future.

// Thank you to everyone who participated and made this a wonderful event. We look forward to next year's tournament!`,
//     excerpt: 'Michael Chen won our Christmas Rapid Tournament with a perfect score of 5/5.',
//     author: 'James Anderson',
//     publishDate: '2023-12-18',
//     category: 'tournament',
//     tags: ['rapid', 'tournament', 'christmas'],
//     featured: false
//   }
];

export const getNewsItems = () => newsItems;
export const getFeaturedNews = () => newsItems.filter(item => item.featured);
export const getNewsByCategory = (category: string) => newsItems.filter(item => item.category === category);
export const getNewsById = (id: string) => newsItems.find(item => item.id === id);
export const getRecentNews = (limit: number = 5) => 
  newsItems
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
