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
  // {
  //   id: 1,
  //   title: 'Club Championship 2024 - Registration Now Open',
  //   content: 'We are pleased to announce that registration for the 2024 Club Championship is now open. This year\'s tournament will feature both rapid and classical time controls, with separate sections for different rating levels. The tournament will run from February through April, with games played on Wednesday evenings. Prizes will be awarded to the top three finishers in each section. Please contact James Anderson for registration details.',
  //   excerpt: 'Registration is now open for our annual club championship tournament, featuring multiple sections and time controls.',
  //   date: '2024-01-10',
  //   category: 'tournament',
  //   author: 'James Anderson',
  //   featured: true
  // },
  // {
  //   id: 2,
  //   title: 'Victory Against Southampton in League Match',
  //   content: 'Our team secured an impressive 4-2 victory against Southampton Chess Club in last night\'s Hampshire League Division 1 match. David Thompson led the way with a brilliant win on board 1, while Sarah Mitchell and Michael Chen also secured full points. The team now sits in second place in the league table with three matches remaining.',
  //   excerpt: 'Andover Chess Club defeats Southampton 4-2 in a crucial league match, moving into second place.',
  //   date: '2024-01-08',
  //   category: 'result',
  //   author: 'Sarah Mitchell'
  // },
  // {
  //   id: 3,
  //   title: 'New Junior Coaching Program Launches',
  //   content: 'We are excited to announce the launch of our new junior coaching program, starting this Saturday. The program will be led by Emma Davis and will include structured lessons, practice games, and regular tournaments. Sessions will run from 10:00 AM to 12:00 PM every Saturday morning. The program is open to players aged 8-16 of all skill levels. Equipment will be provided.',
  //   excerpt: 'A new comprehensive junior coaching program begins this Saturday, offering structured lessons and practice for young players.',
  //   date: '2024-01-05',
  //   category: 'announcement',
  //   author: 'Emma Davis'
  // },
  // {
  //   id: 4,
  //   title: 'Robert Wilson Publishes Chess Strategy Guide',
  //   content: 'Club member and head coach Robert Wilson has published his first book, "Strategic Thinking in Chess: A Practical Guide for Club Players." The book covers essential strategic concepts and includes 50 annotated games from his own practice. Copies are available for purchase at the club for £15, with all proceeds going to club funds.',
  //   excerpt: 'Head coach Robert Wilson releases his first chess book, covering strategic concepts for club players.',
  //   date: '2024-01-03',
  //   category: 'general',
  //   author: 'David Thompson'
  // },
  // {
  //   id: 5,
  //   title: 'New Year Rapid Tournament Results',
  //   content: 'The annual New Year Rapid Tournament was a great success, with 24 players competing in a 6-round Swiss tournament. David Thompson emerged as the winner with 5.5/6 points, followed by Michael Chen in second place with 5/6. The tournament featured some exciting games and was enjoyed by all participants. Special thanks to James Anderson for organizing the event.',
  //   excerpt: 'David Thompson wins the New Year Rapid Tournament with an impressive 5.5/6 score.',
  //   date: '2024-01-02',
  //   category: 'result',
  //   author: 'James Anderson'
  // },
  // {
  //   id: 6,
  //   title: 'Club Equipment Upgrade Complete',
  //   content: 'We are pleased to announce that our club equipment upgrade is now complete. Thanks to generous donations from members and a grant from the local council, we have purchased 20 new tournament-quality chess sets, 10 digital clocks, and 5 demonstration boards. The new equipment will be used for all club sessions and tournaments.',
  //   excerpt: 'Club completes equipment upgrade with new tournament-quality sets, clocks, and demonstration boards.',
  //   date: '2023-12-28',
  //   category: 'announcement',
  //   author: 'Michael Chen'
  // },
  // {
  //   id: 7,
  //   title: 'Christmas Social Event Success',
  //   content: 'Our annual Christmas social event was a wonderful evening of chess, food, and fellowship. Over 30 members attended, including several new faces. The evening featured simultaneous exhibitions, blitz tournaments, and a festive buffet. Special thanks to all who contributed to making this event such a success.',
  //   excerpt: 'Annual Christmas social event brings together 30+ members for an evening of chess and celebration.',
  //   date: '2023-12-20',
  //   category: 'general',
  //   author: 'Sarah Mitchell'
  // },
  // {
  //   id: 8,
  //   title: 'Junior Team Wins County Championship',
  //   content: 'Our junior team has won the Hampshire Junior Team Championship for the third consecutive year! The team, consisting of Lisa Johnson, Thomas Brown, and two other junior members, scored 3.5/4 in the final round to secure the title. This is a fantastic achievement and reflects the quality of our junior coaching program.',
  //   excerpt: 'Andover junior team secures third consecutive Hampshire Junior Team Championship victory.',
  //   date: '2023-12-15',
  //   category: 'result',
  //   author: 'Emma Davis'
  // }
];

export default function NewsPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    author: 'all',
    month: 'all',
    featured: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique authors for filter dropdown
  const authors = Array.from(new Set(newsItems.map(item => item.author))).sort();
  
  // Get unique months for filter dropdown
  const months = Array.from(new Set(newsItems.map(item => {
    const date = new Date(item.date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }))).sort().reverse();

  const filteredNews = newsItems.filter(item => {
    // Category filter
    const categoryMatch = filters.category === 'all' || item.category === filters.category;
    
    // Author filter
    const authorMatch = filters.author === 'all' || item.author === filters.author;
    
    // Month filter
    const itemMonth = `${new Date(item.date).getFullYear()}-${String(new Date(item.date).getMonth() + 1).padStart(2, '0')}`;
    const monthMatch = filters.month === 'all' || itemMonth === filters.month;
    
    // Featured filter
    const featuredMatch = filters.featured === 'all' || 
                         (filters.featured === 'featured' && item.featured) ||
                         (filters.featured === 'regular' && !item.featured);
    
    // Search filter
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && authorMatch && monthMatch && featuredMatch && searchMatch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: 'all',
      author: 'all',
      month: 'all',
      featured: 'all'
    });
    setSearchTerm('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.author !== 'all') count++;
    if (filters.month !== 'all') count++;
    if (filters.featured !== 'all') count++;
    if (searchTerm) count++;
    return count;
  };

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

      {/* Advanced Filters Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Toggle and Summary */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredNews.length} of {newsItems.length} articles
                {getActiveFiltersCount() > 0 && (
                  <span className="ml-2 text-emerald-600 dark:text-emerald-400">
                    ({getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? 's' : ''} applied)
                  </span>
                )}
              </div>
              {getActiveFiltersCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V3z" />
              </svg>
              <span className="font-medium">
                {showFilters ? 'Hide Filters' : 'Filter News'}
              </span>
            </button>
          </div>

          {/* Filter Controls */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                  >
                    <option value="all">All Categories</option>
                    <option value="tournament">Tournaments</option>
                    <option value="announcement">Announcements</option>
                    <option value="result">Results</option>
                    <option value="general">General</option>
                  </select>
                </div>

                {/* Author Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Author
                  </label>
                  <select
                    value={filters.author}
                    onChange={(e) => updateFilter('author', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                  >
                    <option value="all">All Authors</option>
                    {authors.map(author => (
                      <option key={author} value={author}>{author}</option>
                    ))}
                  </select>
                </div>

                {/* Month Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Month
                  </label>
                  <select
                    value={filters.month}
                    onChange={(e) => updateFilter('month', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                  >
                    <option value="all">All Months</option>
                    {months.map(month => {
                      const date = new Date(month + '-01');
                      const monthName = date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
                      return (
                        <option key={month} value={month}>
                          {monthName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Featured Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    value={filters.featured}
                    onChange={(e) => updateFilter('featured', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                  >
                    <option value="all">All Articles</option>
                    <option value="featured">Featured Only</option>
                    <option value="regular">Regular Only</option>
                  </select>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Articles
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title, content, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* News Articles */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {getActiveFiltersCount() > 0 ? 'Filtered News' : 'Latest News'}
          </h2>
          
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-600">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No articles found matching your filters.</p>
              <button
                onClick={clearAllFilters}
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
              >
                Clear all filters to see all articles
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredNews.map((item) => (
                <div key={item.id} className={`rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${
                  item.featured 
                    ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-700' 
                    : 'bg-white dark:bg-gray-700'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    {item.featured && (
                      <span className="px-2 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(item.date)}</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    item.featured 
                      ? 'text-emerald-900 dark:text-emerald-100' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`mb-4 ${
                    item.featured 
                      ? 'text-emerald-700 dark:text-emerald-300' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">By {item.author}</span>
                    <button className={`font-medium transition-colors ${
                      item.featured 
                        ? 'text-emerald-800 hover:text-emerald-600 dark:text-emerald-200 dark:hover:text-emerald-100' 
                        : 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300'
                    }`}>
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
