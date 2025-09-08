'use client';

import Link from 'next/link';

export default function ResourcesClient() {
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
          url: "https://www.englishchess.org.uk/",
          icon: "🏛️",
          features: ["Official", "Governing Body", "England"]
        },
        {
          name: "ECF Membership",
          description: "How to join the English Chess Federation",
          url: "https://www.englishchess.org.uk/join-us/",
          icon: "👥",
          features: ["Membership", "Benefits", "Registration"]
        }
      ]
    },
    {
      title: "Tournaments & Events",
      description: "Find local and international chess tournaments",
      resources: [
        {
          name: "ECF Events Calendar",
          description: "View all events in the English Chess Federation",
          url: "https://www.englishchess.org.uk/events/",
          icon: "📅",
          features: ["Events", "Calendar", "Tournaments"]
        },
        {
          name: "Hampshire Chess Association",
          description: "Local chess association for Hampshire players",
          url: "https://www.hampshirechess.co.uk/",
          icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
          features: ["Local", "Hampshire", "Association"]
        },
        {
          name: "Southampton Chess League",
          description: "View all events in the Southampton Chess League",
          url: "https://lms.englishchess.org.uk/lms/organisation/415",
          icon: "🏆",
          features: ["League", "Southampton", "Competitions"]
        }
        // {
        //   name: "FIDE Events",
        //   description: "World Chess Federation - international tournaments and ratings",
        //   url: "https://www.fide.com/",
        //   icon: "🌍",
        //   features: ["International", "FIDE", "World"]
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
    //       url: "https://www.chess.com/",
    //       icon: "♟️",
    //       features: ["Online Play", "Puzzles", "Lessons"]
    //     },
    //     {
    //       name: "Lichess",
    //       description: "Free, open-source chess platform with no ads",
    //       url: "https://lichess.org/",
    //       icon: "🆓",
    //       features: ["Free", "Open Source", "No Ads"]
    //     },
    //     {
    //       name: "Chess24",
    //       description: "Premium chess platform with live commentary and master classes",
    //       url: "https://chess24.com/",
    //       icon: "🎓",
    //       features: ["Premium", "Commentary", "Master Classes"]
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
          features: ["Lessons", "All Levels", "Interactive"]
        },
        {
          name: "ChessBase",
          description: "Professional chess database and analysis software",
          url: "https://www.chessbase.com/",
          icon: "💾",
          features: ["Database", "Analysis", "Professional"]
        },
        // {
        //   name: "Chess Tempo",
        //   description: "Tactical puzzles and training exercises",
        //   url: "https://www.chesstempo.com/",
        //   icon: "🧩",
        //   features: ["Puzzles", "Tactics", "Training"]
        // },
        {
          name: "Chessable",
          description: "Interactive chess courses and books",
          url: "https://www.chessable.com/",
          icon: "📖",
          features: ["Courses", "Books", "Interactive"]
        }
      ]
    }
    // {
    //   title: "Chess Software & Tools",
    //   description: "Software and tools to enhance your chess experience",
    //   resources: [
    //     {
    //       name: "Stockfish",
    //       description: "Open-source chess engine for analysis",
    //       url: "https://stockfishchess.org/",
    //       icon: "🤖",
    //       features: ["Engine", "Analysis", "Open Source"]
    //     },
    //     {
    //       name: "Arena Chess GUI",
    //       description: "Chess graphical user interface for playing and analysis",
    //       url: "http://www.playwitharena.com/",
    //       icon: "🖥️",
    //       features: ["GUI", "Playing", "Analysis"]
    //     },
    //     {
    //       name: "SCID vs PC",
    //       description: "Free software for viewing chess games and databases",
    //       url: "http://scidvspc.sourceforge.net/",
    //       icon: "📊",
    //       features: ["Database", "Viewer", "Free"]
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
    //       features: ["News", "Games", "Analysis"]
    //     },
    //     {
    //       name: "ChessBase News",
    //       description: "Professional chess news and analysis",
    //       url: "https://en.chessbase.com/",
    //       icon: "📺",
    //       features: ["Professional", "News", "Analysis"]
    //     },
    //     {
    //       name: "The Chess Mind",
    //       description: "Chess blog with commentary and analysis",
    //       url: "https://thechessmind.net/",
    //       icon: "💭",
    //       features: ["Blog", "Commentary", "Analysis"]
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
    //       features: ["Mobile", "Play", "Official"]
    //     },
    //     {
    //       name: "Lichess Mobile",
    //       description: "Free chess app with no ads or premium features",
    //       url: "https://lichess.org/mobile",
    //       icon: "🆓",
    //       features: ["Free", "No Ads", "Mobile"]
    //     },
    //     {
    //       name: "Chess Tactics Pro",
    //       description: "Tactical training app for improving your game",
    //       url: "https://apps.apple.com/app/chess-tactics-pro/id284635384",
    //       icon: "🧩",
    //       features: ["Tactics", "Training", "Mobile"]
    //     }
    //   ]
    // }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Chess Resources</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Discover valuable resources, learning materials, and useful links to enhance your chess journey.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Categories */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {resourceCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{category.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    {category.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.resources.map((resource, resourceIndex) => (
                      <div
                        key={resourceIndex}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex items-center mb-4">
                          <span className="text-3xl mr-3">{resource.icon}</span>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {resource.name}
                            </h3>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                          {resource.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {resource.features.map((feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
                        >
                          Visit Resource
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Need More Resources?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            If you're looking for specific chess resources or have suggestions for additional links, 
            please don't hesitate to contact us. We're always happy to help fellow chess enthusiasts 
            find the tools they need to improve their game.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Us
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
