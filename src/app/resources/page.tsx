'use client';

import Link from 'next/link';

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "ECF Resources",
      description: "Resources from the English Chess Federation",
      resources: [
        {
          name: "ECF Rating List",
          description: "View all players in the English Chess Federation",
          url: "https://rating.englishchess.org.uk/players/list",
          icon: "♟️",
          features: ["Free", "Players", "Ratings"]
        },
          {
          name: "English Chess Federation",
          description: "Official governing body for chess in England",
          url: "https://www.englishchess.org.uk",
          icon: "🏆",
          features: ["Tournament Calendar", "Grading", "News"]
        },
        {
          name: "Joining the ECF",
          description: "How to join the English Chess Federation",
          url: "https://www.englishchess.org.uk/join-us/",
          icon: "👑",
          features: ["Joining", "Membership"]
        }
      ]
    },
    {
      title: "Tournaments & Events",
      description: "Find local and international chess tournaments",
      resources: [
        {
          name: "ECF Calendar",
          description: "View all events in the English Chess Federation",
          url: "https://www.englishchess.org.uk/events/",
          icon: "🏰",
          features: ["Events", "Tournament Calendar"]
        },
        {
          name: "Hampshire Chess Association",
          description: "Local chess association for Hampshire players",
          url: "https://www.hampshirechess.org.uk",
          icon: "🏛️",
          features: ["Local Events", "County Chess"]
        },
         {
          name: "Southampton League",
          description: "View all events in the Southampton Chess League",
          url: "https://lms.englishchess.org.uk/lms/organisation/415",
          icon: "🌍",
          features: ["Events", "Calendar", "League Information",]
        },
        // {
        //   name: "FIDE",
        //   description: "World Chess Federation - international tournaments and ratings",
        //   url: "https://www.fide.com",
        //   icon: "🌍",
        //   features: ["World Rankings", "International Events", "Rules"]
        // }
      ]
    },
    // {
    //   title: "Online Chess Platforms",
    //   description: "Play chess online against players from around the world",
    //   resources: [
    //     {
    //       name: "Chess.com",
    //       description: "The world's largest chess platform with millions of players",
    //       url: "https://www.chess.com",
    //       icon: "♟️",
    //       features: ["Free & Premium", "Puzzles", "Lessons", "Tournaments"]
    //     },
    //     {
    //       name: "Lichess",
    //       description: "Free, open-source chess platform with no ads",
    //       url: "https://lichess.org",
    //       icon: "🏰",
    //       features: ["Completely Free", "Analysis Tools", "Puzzles", "Studies"]
    //     },
    //     {
    //       name: "Chess24",
    //       description: "Premium chess platform with live commentary and master classes",
    //       url: "https://chess24.com",
    //       icon: "👑",
    //       features: ["Live Events", "Master Classes", "Premium Content"]
    //     }
    //   ]
    // },
    {
      title: "Learning & Training",
      description: "Improve your chess skills with these educational resources",
      resources: [
        {
          name: "Chess.com Lessons",
          description: "Comprehensive chess lessons for all skill levels",
          url: "https://www.chess.com/lessons",
          icon: "📚",
          features: ["Beginner to Advanced", "Interactive", "Video Content"]
        },
        {
          name: "ChessBase",
          description: "Professional chess database and analysis software",
          url: "https://www.chessbase.com",
          icon: "💾",
          features: ["Game Database", "Analysis", "Professional Tools"]
        },
        // {
        //   name: "Chess Tempo",
        //   description: "Tactical puzzles and training exercises",
        //   url: "https://www.chesstempo.com",
        //   icon: "🧩",
        //   features: ["Tactics Training", "Endgame Practice", "Rating System"]
        // },
        {
          name: "Chessable",
          description: "Interactive chess courses and books",
          url: "https://www.chessable.com",
          icon: "📖",
          features: ["Interactive Books", "Spaced Repetition", "Video Lessons"]
        }
      ]
    },
    
    // {
    //   title: "Chess Software & Tools",
    //   description: "Software and tools to enhance your chess experience",
    //   resources: [
    //     {
    //       name: "Stockfish",
    //       description: "Open-source chess engine for analysis",
    //       url: "https://stockfishchess.org",
    //       icon: "🤖",
    //       features: ["Free Engine", "Strong Analysis", "Open Source"]
    //     },
    //     {
    //       name: "Arena Chess GUI",
    //       description: "Chess graphical user interface for playing and analysis",
    //       url: "https://www.playwitharena.com",
    //       icon: "🖥️",
    //       features: ["Multiple Engines", "Tournament Mode", "Free"]
    //     },
    //     {
    //       name: "ChessBase Reader",
    //       description: "Free software for viewing chess games and databases",
    //       url: "https://www.chessbase.com/en/product/chessbase-reader",
    //       icon: "📊",
    //       features: ["Game Viewer", "Database Access", "Free"]
    //     }
    //   ]
    // },
    // {
    //   title: "Chess News & Media",
    //   description: "Stay updated with the latest chess news and content",
    //   resources: [
    //     {
    //       name: "Chess.com News",
    //       description: "Latest chess news, games, and analysis",
    //       url: "https://www.chess.com/news",
    //       icon: "📰",
    //       features: ["Daily News", "Game Analysis", "Player Interviews"]
    //     },
    //     {
    //       name: "ChessBase News",
    //       description: "Professional chess news and analysis",
    //       url: "https://en.chessbase.com",
    //       icon: "📺",
    //       features: ["Professional Analysis", "Tournament Reports", "Historical Games"]
    //     },
    //     {
    //       name: "The Chess Mind",
    //       description: "Chess blog with commentary and analysis",
    //       url: "https://thechessmind.net",
    //       icon: "🧠",
    //       features: ["Blog Posts", "Game Analysis", "Commentary"]
    //     }
    //   ]
    // },
    // {
    //   title: "Mobile Apps",
    //   description: "Chess apps for your smartphone or tablet",
    //   resources: [
    //     {
    //       name: "Chess.com Mobile",
    //       description: "Play chess on the go with the official Chess.com app",
    //       url: "https://www.chess.com/mobile",
    //       icon: "📱",
    //       features: ["iOS & Android", "Offline Play", "Puzzles"]
    //     },
    //     {
    //       name: "Lichess Mobile",
    //       description: "Free chess app with no ads or premium features",
    //       url: "https://lichess.org/mobile",
    //       icon: "📲",
    //       features: ["Completely Free", "Offline Analysis", "Puzzles"]
    //     },
    //     {
    //       name: "Chess Tactics Pro",
    //       description: "Tactical training app for improving your game",
    //       url: "https://apps.apple.com/app/chess-tactics-pro/id301341350",
    //       icon: "🎯",
    //       features: ["Tactics Training", "Progress Tracking", "Offline Mode"]
    //     }
    //   ]
    // }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Chess Resources</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Discover learning tools and resources to improve your game 
              and connect with the global chess community.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {resourceCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{category.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="text-3xl">{resource.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {resource.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            {resource.description}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {resource.features.map((feature, featureIndex) => (
                            <span 
                              key={featureIndex}
                              className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
                      >
                        Visit Website
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quick Tips for Getting Started</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              New to chess or looking to improve? Here are some quick tips to help you get the most out of these resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-800 dark:text-emerald-300 text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Start with Tactics</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Solve puzzles daily to improve your tactical vision and pattern recognition.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-800 dark:text-emerald-300 text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Study Endgames</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Learn basic endgames first - they're easier to master and will win you many games.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-800 dark:text-emerald-300 text-2xl">♟️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Play Regularly</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Play games regularly, but focus on quality over quantity. Analyze your games afterward.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-800 dark:text-emerald-300 text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Join Communities</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Connect with other players, join clubs, and participate in tournaments for motivation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-800 dark:bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Chess?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join Andover Chess Club and put these resources to use in a supportive community environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white dark:bg-gray-800 text-emerald-800 dark:text-emerald-200 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Join Our Club
            </Link>
            <Link
              href="/fixtures"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-emerald-800 dark:hover:bg-gray-800 dark:hover:text-emerald-200 transition-all transform hover:scale-105"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
