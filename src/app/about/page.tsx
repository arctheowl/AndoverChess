import { getCommitteeMembers, getMemberStats } from '@/data/members';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Andover Chess Club - Our History & Mission",
  description: "Learn about Andover Chess Club's rich history since 1889, our mission to promote chess in Hampshire, and meet our dedicated committee members.",
  keywords: [
    "Andover Chess Club history",
    "chess club Hampshire",
    "chess club committee",
    "chess club mission",
    "Hampshire chess community",
    "chess club since 1889",
    "Hampshire Chess League",
    "Southampton Chess League"
  ],
  openGraph: {
    title: "About Andover Chess Club - Our History & Mission",
    description: "Learn about Andover Chess Club's rich history since 1889, our mission to promote chess in Hampshire, and meet our dedicated committee members.",
    url: "https://andoverchessclub.co.uk/about",
    images: [
      {
        url: "/AndoverChessLogo.png",
        width: 1200,
        height: 630,
        alt: "Andover Chess Club - About Us",
      },
    ],
  },
  twitter: {
    title: "About Andover Chess Club - Our History & Mission",
    description: "Learn about Andover Chess Club's rich history since 1889, our mission to promote chess in Hampshire, and meet our dedicated committee members.",
    images: ["/AndoverChessLogo.png"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const committeeMembers = getCommitteeMembers();
  const memberStats = getMemberStats();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Andover Chess Club</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Discover our rich 130+ year history, meet our dedicated members, and learn about our mission 
              to promote chess in the Andover community.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold theme-text-primary mb-4">Our Rich History</h2>
            <p className="text-lg theme-text-secondary max-w-3xl mx-auto">
              From our founding in 1889 to our current success in the Southampton Chess League, 
              Andover Chess Club has been a cornerstone of Hampshire chess for over 130 years.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="theme-card p-6 shadow-sm">
                <h3 className="text-xl font-semibold theme-text-primary mb-4">The Early Years (1889-1925)</h3>
                <div className="space-y-4 theme-text-secondary">
                  <p>
                    Andover Chess Club was established in September 1889, with the first meeting 
                    announced in the <em>Andover Chronicle</em> at the Institute Library. Our founding 
                    Honorary Secretary was P. Ernest J. Talbot, who would later serve as President 
                    of the Hampshire Chess Association from 1914 to 1925.
                  </p>
                  <p>
                    In our formative years, the club engaged in friendly matches with neighboring 
                    clubs, notably Salisbury. We joined the Hampshire Chess League during the 
                    1889/96 season, participating in the Hampshire Trophy knockout tournament.
                  </p>
                </div>
              </div>

              <div className="theme-card p-6 shadow-sm">
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Golden Era (1922-1923)</h3>
                <div className="space-y-4 theme-text-secondary">
                  <p>
                    The 1922/23 season marked a historic achievement for our club. We won both 
                    the Hampshire Trophy and the Hampshire League, establishing ourselves as one 
                    of the strongest clubs in the county.
                  </p>
                  <p>
                    This success was led by Archibald Snelling Dance, who played board one in 
                    the Hampshire League. Dance represented Hampshire approximately 50 times 
                    between 1921 and 1951 and participated in the first Hampshire Individual 
                    Championship in 1930.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="theme-card p-6 shadow-sm">
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Notable Members</h3>
                <div className="space-y-4 theme-text-secondary">
                  <p>
                    One of our most distinguished members was John Spedan Lewis, founder of the 
                    John Lewis Partnership. Lewis was actively involved in the Hampshire Chess 
                    Association, serving as President from 1952 to 1955, and was a generous 
                    benefactor to both the association and the Southern Counties Chess Union.
                  </p>
                  <p>
                    Throughout our history, we have been home to many strong players who have 
                    contributed significantly to chess in Hampshire and beyond.
                  </p>
                </div>
              </div>

              <div className="theme-card p-6 shadow-sm">
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Modern Success (1993-Present)</h3>
                <div className="space-y-4 theme-text-secondary">
                  <p>
                    In the 1993/94 season, we joined the Southampton Chess League and swiftly 
                    ascended through the divisions. We clinched the Division One title in the 
                    1997/98 season and secured the prestigious Robertson Cup in both the 
                    1998/99 and 2012/13 seasons.
                  </p>
                  <p>
                    Recent successes have been built on the contributions of players like Stuart 
                    Knox, Iain Jamieson, and Terry Gray, who have helped maintain our competitive 
                    edge in Hampshire chess.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold theme-text-primary text-center mb-8">Key Milestones</h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200 dark:bg-emerald-800"></div>
              
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="theme-card p-4 shadow-sm">
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">1889</div>
                      <h4 className="font-semibold theme-text-primary">Club Founded</h4>
                      <p className="theme-text-secondary text-sm">First meeting announced in the Andover Chronicle at Institute Library</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-white text-sm font-bold">1889</span>
                  </div>
                  <div className="w-1/2 pl-8"></div>
                </div>

                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-white text-sm font-bold">1889</span>
                  </div>
                  <div className="w-1/2 pl-8">
                    <div className="theme-card p-4 shadow-sm">
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">1889/96</div>
                      <h4 className="font-semibold theme-text-primary">Hampshire League Entry</h4>
                      <p className="theme-text-secondary text-sm">Joined Hampshire Chess League and Hampshire Trophy</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="theme-card p-4 shadow-sm">
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">1922/23</div>
                      <h4 className="font-semibold theme-text-primary">Historic Double</h4>
                      <p className="theme-text-secondary text-sm">Won both Hampshire Trophy and Hampshire League</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-white text-sm font-bold">1923</span>
                  </div>
                  <div className="w-1/2 pl-8"></div>
                </div>

                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-white text-sm font-bold">1993</span>
                  </div>
                  <div className="w-1/2 pl-8">
                    <div className="theme-card p-4 shadow-sm">
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">1993/94</div>
                      <h4 className="font-semibold theme-text-primary">Southampton League</h4>
                      <p className="theme-text-secondary text-sm">Joined Southampton Chess League</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="theme-card p-4 shadow-sm">
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">1997/98</div>
                      <h4 className="font-semibold theme-text-primary">Division One Champions</h4>
                      <p className="theme-text-secondary text-sm">Won Southampton League Division One title</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-white text-sm font-bold">1998</span>
                  </div>
                  <div className="w-1/2 pl-8"></div>
                </div>

                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-white text-sm font-bold">2013</span>
                  </div>
                  <div className="w-1/2 pl-8">
                    <div className="theme-card p-4 shadow-sm">
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">2012/13</div>
                      <h4 className="font-semibold theme-text-primary">Robertson Cup</h4>
                      <p className="theme-text-secondary text-sm">Second Robertson Cup victory</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      {/* <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold theme-text-primary mb-4">Our Mission & Values</h2>
            <p className="text-lg theme-text-secondary max-w-2xl mx-auto">
              We're committed to promoting chess as a sport, art, and educational tool in our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="theme-card p-6 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-800 dark:text-emerald-300 text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold theme-text-primary mb-3">Our Mission</h3>
              <p className="theme-text-secondary">
                To provide a welcoming environment where chess enthusiasts of all ages and skill 
                levels can learn, play, and develop their passion for the game.
              </p>
            </div>

            <div className="theme-card p-6 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-800 dark:text-emerald-300 text-xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold theme-text-primary mb-3">Inclusivity</h3>
              <p className="theme-text-secondary">
                We welcome players of all backgrounds, ages, and abilities. Our club is built 
                on respect, sportsmanship, and the joy of learning together.
              </p>
            </div>

            <div className="theme-card p-6 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-800 dark:text-emerald-300 text-xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold theme-text-primary mb-3">Excellence</h3>
              <p className="theme-text-secondary">
                We strive for excellence in everything we do, from the quality of our coaching 
                to the organization of our tournaments and events.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Committee Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold theme-text-primary mb-4">Club Committee</h2>
            <p className="text-lg theme-text-secondary max-w-2xl mx-auto">
              Meet the dedicated volunteers who keep our club running smoothly.
            </p>
          </div>

          {/* First two committee members side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {committeeMembers.slice(0, 2).map((member) => (
              <div key={member.id} className="text-center">
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-emerald-800 dark:text-emerald-300 text-2xl">{member.avatar}</span>
                </div>
                <h3 className="text-xl font-semibold theme-text-primary mb-1">{member.name}</h3>
                <p className="text-emerald-800 dark:text-emerald-300 font-medium mb-2">{member.role}</p>
                <p className="theme-text-secondary text-sm mb-3">
                  {member.description}
                </p>
                {/* {member.achievements && member.achievements.length > 0 && (
                  <div className="text-xs text-gray-500">
                    <div className="font-medium mb-1">Key Achievements:</div>
                    <div className="space-y-1">
                      {member.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="text-gray-600">• {achievement}</div>
                      ))}
                      {member.achievements.length > 2 && (
                        <div className="text-gray-500">+{member.achievements.length - 2} more</div>
                      )}
                    </div>
                  </div>
                )} */}
              </div>
            ))}
          </div>

          {/* Remaining committee members in 3-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {committeeMembers.slice(2).map((member) => (
              <div key={member.id} className="text-center">
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-emerald-800 dark:text-emerald-300 text-2xl">{member.avatar}</span>
                </div>
                <h3 className="text-xl font-semibold theme-text-primary mb-1">{member.name}</h3>
                <p className="text-emerald-800 dark:text-emerald-300 font-medium mb-2">{member.role}</p>
                <p className="theme-text-secondary text-sm mb-3">
                  {member.description}
                </p>
                {/* {member.achievements && member.achievements.length > 0 && (
                  <div className="text-xs text-gray-500">
                    <div className="font-medium mb-1">Key Achievements:</div>
                    <div className="space-y-1">
                      {member.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="text-gray-600">• {achievement}</div>
                      ))}
                      {member.achievements.length > 2 && (
                        <div className="text-gray-500">+{member.achievements.length - 2} more</div>
                      )}
                    </div>
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      {/* <section className="py-16 bg-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Club Achievements</h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              We're proud of our members' accomplishments and the club's contributions to chess in Hampshire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{memberStats.totalMembers}</div>
              <p className="text-emerald-100">Active Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{memberStats.committeeMembers}</div>
              <p className="text-emerald-100">Committee Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{memberStats.averageRating}</div>
              <p className="text-emerald-100">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{memberStats.totalAchievements}</div>
              <p className="text-emerald-100">Total Achievements</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
