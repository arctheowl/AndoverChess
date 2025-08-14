'use client';

import { useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  category: 'tournament' | 'announcement' | 'result' | 'general';
  author: string;
  featured?: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Club Championship 2024 - Registration Now Open',
    content: 'We are pleased to announce that registration for the 2024 Club Championship is now open. This year\'s tournament will feature both rapid and classical time controls, with separate sections for different rating levels. The tournament will run from February through April, with games played on Wednesday evenings. Prizes will be awarded to the top three finishers in each section. Please contact James Anderson for registration details.',
    excerpt: 'Registration is now open for our annual club championship tournament, featuring multiple sections and time controls.',
    date: '2024-01-10',
    category: 'tournament',
    author: 'James Anderson',
    featured: true
  },
  {
    id: 2,
    title: 'Victory Against Southampton in League Match',
    content: 'Our team secured an impressive 4-2 victory against Southampton Chess Club in last night\'s Hampshire League Division 1 match. David Thompson led the way with a brilliant win on board 1, while Sarah Mitchell and Michael Chen also secured full points. The team now sits in second place in the league table with three matches remaining.',
    excerpt: 'Andover Chess Club defeats Southampton 4-2 in a crucial league match, moving into second place.',
    date: '2024-01-08',
    category: 'result',
    author: 'Sarah Mitchell'
  },
  {
    id: 3,
    title: 'New Junior Coaching Program Launches',
    content: 'We are excited to announce the launch of our new junior coaching program, starting this Saturday. The program will be led by Emma Davis and will include structured lessons, practice games, and regular tournaments. Sessions will run from 10:00 AM to 12:00 PM every Saturday morning. The program is open to players aged 8-16 of all skill levels. Equipment will be provided.',
    excerpt: 'A new comprehensive junior coaching program begins this Saturday, offering structured lessons and practice for young players.',
    date: '2024-01-05',
    category: 'announcement',
    author: 'Emma Davis'
  },
  {
    id: 4,
    title: 'Robert Wilson Publishes Chess Strategy Guide',
    content: 'Club member and head coach Robert Wilson has published his first book, "Strategic Thinking in Chess: A Practical Guide for Club Players." The book covers essential strategic concepts and includes 50 annotated games from his own practice. Copies are available for purchase at the club for £15, with all proceeds going to club funds.',
    excerpt: 'Head coach Robert Wilson releases his first chess book, covering strategic concepts for club players.',
    date: '2024-01-03',
    category: 'general',
    author: 'David Thompson'
  },
  {
    id: 5,
    title: 'New Year Rapid Tournament Results',
    content: 'The annual New Year Rapid Tournament was a great success, with 24 players competing in a 6-round Swiss tournament. David Thompson emerged as the winner with 5.5/6 points, followed by Michael Chen in second place with 5/6. The tournament featured some exciting games and was enjoyed by all participants. Special thanks to James Anderson for organizing the event.',
    excerpt: 'David Thompson wins the New Year Rapid Tournament with an impressive 5.5/6 score.',
    date: '2024-01-02',
    category: 'result',
    author: 'James Anderson'
  },
  {
    id: 6,
    title: 'Club Equipment Upgrade Complete',
    content: 'We are pleased to announce that our club equipment upgrade is now complete. Thanks to generous donations from members and a grant from the local council, we have purchased 20 new tournament-quality chess sets, 10 digital clocks, and 5 demonstration boards. The new equipment will be used for all club sessions and tournaments.',
    excerpt: 'Club completes equipment upgrade with new tournament-quality sets, clocks, and demonstration boards.',
    date: '2023-12-28',
    category: 'announcement',
    author: 'Michael Chen'
  },
  {
    id: 7,
    title: 'Christmas Social Event Success',
    content: 'Our annual Christmas social event was a wonderful evening of chess, food, and fellowship. Over 30 members attended, including several new faces. The evening featured simultaneous exhibitions, blitz tournaments, and a festive buffet. Special thanks to all who contributed to making this event such a success.',
    excerpt: 'Annual Christmas social event brings together 30+ members for an evening of chess and celebration.',
    date: '2023-12-20',
    category: 'general',
    author: 'Sarah Mitchell'
  },
  {
    id: 8,
    title: 'Junior Team Wins County Championship',
    content: 'Our junior team has won the Hampshire Junior Team Championship for the third consecutive year! The team, consisting of Lisa Johnson, Thomas Brown, and two other junior members, scored 3.5/4 in the final round to secure the title. This is a fantastic achievement and reflects the quality of our junior coaching program.',
    excerpt: 'Andover junior team secures third consecutive Hampshire Junior Team Championship victory.',
    date: '2023-12-15',
    category: 'result',
    author: 'Emma Davis'
  }
];

export default function NewsPage() {
  const [filter, setFilter] = useState<'all' | 'tournament' | 'announcement' | 'result' | 'general'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = newsItems.filter(item => {
    const categoryMatch = filter === 'all' || item.category === filter;
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tournament':
        return 'bg-purple-100 text-purple-800';
      case 'announcement':
        return 'bg-blue-100 text-blue-800';
      case 'result':
        return 'bg-green-100 text-green-800';
      case 'general':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Club News</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Stay up to date with the latest news, tournament results, and announcements 
              from the Andover Chess Club.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All News
              </button>
              <button
                onClick={() => setFilter('tournament')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'tournament'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tournaments
              </button>
              <button
                onClick={() => setFilter('announcement')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'announcement'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Announcements
              </button>
              <button
                onClick={() => setFilter('result')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'result'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Results
              </button>
              <button
                onClick={() => setFilter('general')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'general'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                General
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured News</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-8 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {item.author}</span>
                    <button className="text-emerald-800 hover:text-emerald-600 font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest News</h2>
          
          {regularNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news found matching your filters.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {regularNews.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {item.author}</span>
                    <button className="text-emerald-800 hover:text-emerald-600 font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest news, tournament updates, 
            and club announcements directly to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button className="bg-white text-emerald-800 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-emerald-200 mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
