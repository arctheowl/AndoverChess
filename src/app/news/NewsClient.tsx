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

interface FilterState {
  category: 'all' | 'tournament' | 'announcement' | 'result' | 'general';
  author: 'all' | string;
  month: 'all' | string;
  featured: 'all' | 'featured' | 'regular';
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
    content: 'Club member Robert Wilson has published his first chess strategy guide, "Tactical Patterns for Club Players". The book focuses on common tactical motifs that every club player should know, with over 200 carefully selected positions and exercises. Robert will be signing copies at the club this Tuesday evening. The book is available for purchase at a special club member discount.',
    excerpt: 'Club member Robert Wilson releases his first chess strategy guide, focusing on tactical patterns for club players.',
    date: '2024-01-03',
    category: 'general',
    author: 'Robert Wilson'
  },
  {
    id: 5,
    title: 'New Year Rapid Tournament Results',
    content: 'The New Year Rapid Tournament concluded yesterday with some exciting games and close finishes. In the Open section, David Thompson took first place with 4.5/5, while Sarah Mitchell finished second with 4/5. The U1600 section was won by Michael Chen with a perfect 5/5 score. Special congratulations to our junior players who showed great improvement throughout the tournament.',
    excerpt: 'David Thompson wins the Open section while Michael Chen dominates the U1600 section in our New Year Rapid Tournament.',
    date: '2024-01-01',
    category: 'result',
    author: 'Tournament Director'
  },
  {
    id: 6,
    title: 'Club Equipment Upgrade Complete',
    content: 'We are pleased to announce that our club equipment upgrade is now complete. Thanks to generous donations from members and a grant from the local council, we have purchased 20 new tournament-quality chess sets, 15 digital clocks, and 10 demonstration boards. The new equipment will be available for use during club sessions and tournaments.',
    excerpt: 'New tournament-quality chess sets, digital clocks, and demonstration boards are now available at the club.',
    date: '2023-12-28',
    category: 'announcement',
    author: 'Club Secretary'
  },
  {
    id: 7,
    title: 'Christmas Social Event Success',
    content: 'Our annual Christmas social event was a great success, with over 40 members and their families attending. The evening featured a simultaneous exhibition by club champion David Thompson, a chess-themed quiz, and plenty of festive food and drinks. Thank you to everyone who helped organize the event and to all who attended.',
    excerpt: 'Over 40 members enjoyed our annual Christmas social event featuring a simultaneous exhibition and chess quiz.',
    date: '2023-12-20',
    category: 'general',
    author: 'Social Committee'
  },
  {
    id: 8,
    title: 'Junior Team Wins County Championship',
    content: 'Our junior team has won the Hampshire Junior Team Championship for the third consecutive year! The team, consisting of Lisa Johnson, Thomas Brown, and two other junior members, scored 3.5/4 in the final round to secure the title. This is a fantastic achievement and reflects the quality of our junior coaching program.',
    excerpt: 'Andover Chess Club junior team secures their third consecutive Hampshire Junior Team Championship victory.',
    date: '2023-12-15',
    category: 'result',
    author: 'Junior Coordinator',
    featured: true
  }
];

export default function NewsClient() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    author: 'all',
    month: 'all',
    featured: 'all'
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = newsItems.filter(item => {
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const categoryMatch = filters.category === 'all' || item.category === filters.category;
    const authorMatch = filters.author === 'all' || item.author === filters.author;
    const featuredMatch = filters.featured === 'all' || 
                         (filters.featured === 'featured' && item.featured) ||
                         (filters.featured === 'regular' && !item.featured);
    
    const monthMatch = filters.month === 'all' || 
                      new Date(item.date).toLocaleDateString('en-GB', { month: 'long' }) === filters.month;

    return searchMatch && categoryMatch && authorMatch && featuredMatch && monthMatch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tournament':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'announcement':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'result':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'general':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getUniqueAuthors = () => {
    const authors = new Set(newsItems.map(item => item.author));
    return Array.from(authors).sort();
  };

  const getUniqueMonths = () => {
    const months = new Set(newsItems.map(item => 
      new Date(item.date).toLocaleDateString('en-GB', { month: 'long' })
    ));
    return Array.from(months).sort();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Club News</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Stay updated with the latest news, tournament results, and announcements from Andover Chess Club.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search News
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Search by title, content, or author..."
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category"
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="tournament">Tournament</option>
                <option value="announcement">Announcement</option>
                <option value="result">Result</option>
                <option value="general">General</option>
              </select>
            </div>

            {/* Author Filter */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Author
              </label>
              <select
                id="author"
                value={filters.author}
                onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Authors</option>
                {getUniqueAuthors().map(author => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="month" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Month
              </label>
              <select
                id="month"
                value={filters.month}
                onChange={(e) => setFilters(prev => ({ ...prev, month: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Months</option>
                {getUniqueMonths().map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="featured" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <select
                id="featured"
                value={filters.featured}
                onChange={(e) => setFilters(prev => ({ ...prev, featured: e.target.value as any }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Posts</option>
                <option value="featured">Featured</option>
                <option value="regular">Regular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500 dark:text-gray-400">No news articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <article
                  key={item.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                    item.featured ? 'ring-2 ring-emerald-500' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                      {item.featured && (
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {item.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{item.author}</span>
                      <time dateTime={item.date}>
                        {formatDate(item.date)}
                      </time>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
