import { getCommitteeMembers, getMemberStats } from '@/data/members';

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
              Discover our rich history, meet our dedicated members, and learn about our mission 
              to promote chess in the Andover community.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 1895, Andover Chess Club has been a cornerstone of the local chess 
                  community for nearly 50 years. What started as a small group of enthusiasts 
                  meeting in the local library has grown into one of Hampshire's most respected 
                  chess clubs.
                </p>
                <p>
                  Over the decades, we've seen countless players develop their skills, from 
                  complete beginners to county champions. Our club has produced several strong 
                  players who have gone on to represent Hampshire in regional and national 
                  competitions.
                </p>
                <p>
                  In 2010, we moved to our current home at the Andover Community Centre, 
                  providing us with excellent facilities and a central location that's easily 
                  accessible to all members of the community.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Milestones</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1895</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Club Founded</h4>
                    <p className="text-gray-600 text-sm">First meeting held at Andover Library</p>
                  </div>
                {/* </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1985</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">First County Champion</h4>
                    <p className="text-gray-600 text-sm">Club member wins Hampshire Championship</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2010</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">New Home</h4>
                    <p className="text-gray-600 text-sm">Moved to Andover Community Centre</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2020</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Online Expansion</h4>
                    <p className="text-gray-600 text-sm">Launched online tournaments and training</p>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
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
      </section>

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
