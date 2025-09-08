'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { clubStats, achievements, venueInfo, meetingSchedule, contactInfo } from '@/data/clubInfo';
import { getRecentResults, getUpcomingFixtures, fixtures } from '@/data/fixtures';
import { teams } from '@/data/teams';
import { getTeamGradientClass, getTeamDarkGradientClass, getTeamColorClasses, getTeamBorderClass } from '@/lib/teamColors';
import SEOStructuredData from '@/components/SEOStructuredData';
import TeamFormDisplay from '@/components/TeamFormDisplay';

export default function Home() {
  const { theme } = useTheme();
  const recentResults = getRecentResults();
  const upcomingFixtures = getUpcomingFixtures();
  
  // Get next 3 upcoming events
  const next3Events = fixtures
    .filter(fixture => fixture.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Utility function to format dates consistently
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const weekday = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    
    return `${weekday}, ${day} ${month}`;
  };
  
  return (
    <div className="min-h-screen">
      <SEOStructuredData />
      {/* Hero Section with Dynamic Background */}
      <section className="relative theme-gradient text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
           
                <div className="w-52 h-52 bg-white dark:bg-gray-800 flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-2xl rounded-full">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <Image
                      src="/AndoverChessLogo.png"
                      alt="Andover Chess Club Logo"
                      fill
                      className="object-contain logo-transition dark:opacity-0 rounded-full"
                    />
                    <Image
                      src="/AndoverChessLogoDark.png"
                      alt="Andover Chess Club Logo"
                      fill
                      className="object-contain logo-transition opacity-0 dark:opacity-100 rounded-full"
                    />
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Andover
                  <span className="block text-emerald-200">Chess Club</span>
                </h1>
                <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-2xl mx-auto lg:mx-0">
                  Andover's Premier Chess Club • Since 1889
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/fixtures"
                    className="bg-white dark:bg-gray-800 text-emerald-800 dark:text-emerald-200 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    View Fixtures
                  </Link>
                  <Link
                    href="/contact"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-emerald-800 dark:hover:bg-gray-800 dark:hover:text-emerald-200 transition-all transform hover:scale-105"
                  >
                    Join The Club
                  </Link>
                </div>
         
            </div>
            
            {/* Club Information */}
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Club Information</h3>
              <div className="space-y-6">
                {/* Club Nights */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-emerald-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-lg font-semibold text-emerald-200">Club Nights</span>
                  </div>
                  <p className="text-emerald-100 text-sm">{meetingSchedule[0].time}</p>
                  <p className="text-emerald-100 text-sm">{meetingSchedule[0].type}</p>
                </div>

                
                {/* Venue */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-emerald-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-lg font-semibold text-emerald-200">Location</span>
                  </div>
                  <p className="text-emerald-100 text-sm">{venueInfo.name}</p>
                  <p className="text-emerald-100 text-sm">{venueInfo.address}</p>
                </div>

                {/* Next Match */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-emerald-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-lg font-semibold text-emerald-200">Next Match</span>
                  </div>
                  <p className="text-emerald-100 text-sm">{clubStats.nextOpponent}</p>
                  <p className="text-emerald-100 text-sm">{clubStats.nextMatch}</p>
                </div>


                {/* Contact */}
                {/* <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-emerald-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-lg font-semibold text-emerald-200">Contact</span>
                  </div>
                  <p className="text-emerald-100 text-sm">{contactInfo.phone}</p>
                  <p className="text-emerald-100 text-sm">{contactInfo.email}</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-gray-900 dark:bg-gray-950 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-400">{clubStats.activeMembers}+</div>
              <p className="text-sm text-gray-300">Active Members</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{clubStats.teams}</div>
              <p className="text-sm text-gray-300">League Teams</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{clubStats.yearsOfExcellence}</div>
              <p className="text-sm text-gray-300">Years Established</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{clubStats.leaguePosition}</div>
              <p className="text-sm text-gray-300">League Position</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Results & Upcoming Matches */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Recent Results */}
            <div>
              <h2 className="text-3xl font-bold theme-text-primary mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Recent Results
              </h2>
              <div className="space-y-4">
                {recentResults.map((fixture) =>  (
                  <div key={fixture.id} className={`theme-card p-4 border-l-4 ${
                    fixture.result === 'Win' ? 'border-green-500' : 
                    fixture.result === 'Loss' ? 'border-red-500' : 'border-yellow-500'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold theme-text-primary">{fixture.homeTeam}</div>
                        <div className="text-sm theme-text-secondary">vs {fixture.awayTeam}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          fixture.result === 'Win' ? 'text-green-600' : 
                          fixture.result === 'Loss' ? 'text-red-600' : 'text-yellow-600'
                        }`}>{fixture.score}</div>
                        <div className="text-sm theme-text-muted capitalize">{fixture.result}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs theme-text-muted">{fixture.competition} • {new Date(fixture.date).toLocaleDateString('en-GB')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Matches */}
            <div>
              <h2 className="text-3xl font-bold theme-text-primary mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                Upcoming Matches
              </h2>
              <div className="space-y-4">
                {upcomingFixtures.slice(0, 3).map((fixture) => (
                  <div key={fixture.id} className="theme-card p-4 border-l-4 border-emerald-500">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold theme-text-primary">{fixture.homeTeam}</div>
                        <div className="text-sm theme-text-secondary">vs {fixture.awayTeam}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600 capitalize">{fixture.venue}</div>
                        <div className="text-sm theme-text-muted">{new Date(fixture.date).toLocaleDateString('en-GB')}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs theme-text-muted">{fixture.competition} • {fixture.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold theme-text-primary mb-4">Our Teams</h2>
            <p className="text-lg theme-text-secondary max-w-2xl mx-auto">
              Competing at the highest levels in Hampshire chess leagues and tournaments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teams.map((team) => {
               let teamLetter = ""
              switch (team.id) {
                case '1':
                  teamLetter = 'A';
                  break;
                case '2':
                  teamLetter = 'B';
                  break;
                case '3':
                  teamLetter = 'C';
                  break;
                default:
                  teamLetter = 'A';
                  break;
              }
              const teamColor = teamLetter === 'A' ? 'A' : teamLetter === 'B' ? 'B' : teamLetter === 'C' ? 'C' : 'A';
              
              return (
                <div key={team.id} className={`${getTeamGradientClass(teamColor)} ${getTeamDarkGradientClass(teamColor)} rounded-lg p-6 text-center border-2 ${getTeamBorderClass(teamColor)} dark:border-${getTeamColorClasses(teamColor, 'secondary')}/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                  <div className={`w-16 h-16 bg-${getTeamColorClasses(teamColor, 'secondary')} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white text-2xl font-bold">{teamLetter}</span>
                  </div>
                <h3 className="text-xl font-bold theme-text-primary mb-2">{team.name}</h3>
                <p className="theme-text-secondary mb-4">{team.division}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="theme-text-secondary">Position:</span>
                    <span className="font-semibold theme-text-primary">{team.position}{team.position === 1 ? 'st' : team.position === 2 ? 'nd' : team.position === 3 ? 'rd' : 'th'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="theme-text-secondary">Record:</span>
                    <span className="font-semibold theme-text-primary">{team.record}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="theme-text-secondary">Points:</span>
                    <span className="font-semibold theme-text-primary">{team.points}/{team.maxPoints}</span>
                  </div>
                </div>
                 <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <TeamFormDisplay teamName={team.name} />
                </div>
                
                {/* Next Match */}
                {team.upcomingMatches && team.upcomingMatches.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs theme-text-muted mb-1">Next Match</div>
                    <div className="text-sm font-medium theme-text-primary">
                      vs {team.upcomingMatches[0].opponent}
                    </div>
                    <div className="text-xs theme-text-secondary">
                      {new Date(team.upcomingMatches[0].date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short'
                      })} • {team.upcomingMatches[0].isHome ? 'Home' : 'Away'}
                    </div>
                  </div>
                )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meeting Times Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold theme-text-primary mb-6">Upcoming Events</h2>
              <div className="space-y-6">
                {next3Events.map((event, index) => (
                  <div key={event.id} className="flex items-center space-x-4 theme-card p-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold theme-text-primary">
                        {event.homeTeam} {event.awayTeam ? 'vs' : ''} {event.awayTeam}
                      </h3>
                      <p className="theme-text-secondary">
                        {formatEventDate(event.date)} • {event.time}
                      </p>
                      <p className="text-sm theme-text-muted">
                        {event.competition} • {event.venue === 'home' ? 'Home' : 'Away'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs px-2 py-1 rounded-full">
                        {event.isTournament ? 'Tournament' : 'League'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link 
                  href="/fixtures" 
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  View All Fixtures
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="theme-card p-8">
              <h3 className="text-2xl font-bold theme-text-primary mb-6">Home Ground</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold theme-text-primary mb-2">{venueInfo.name}</h4>
                  <p className="theme-text-secondary">{venueInfo.address}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium theme-text-primary mb-1">Club Nights</h5>
                    <p className="theme-text-secondary">Tuesday 7:00 PM - 10:00 PM</p>
                  </div>
                  <div>
                    <h5 className="font-medium theme-text-primary mb-1">Capacity</h5>
                    <p className="theme-text-secondary">{venueInfo.capacity}</p>
                  </div>
                  <div>
                    <h5 className="font-medium theme-text-primary mb-1">Parking</h5>
                    <p className="theme-text-secondary">{venueInfo.parking}</p>
                  </div>
                  <div>
                    <h5 className="font-medium theme-text-primary mb-1">Accessibility</h5>
                    <p className="theme-text-secondary">{venueInfo.accessibility}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="bg-emerald-800 dark:bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-semibold"
                  >
                    Get Directions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 theme-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Join the Andover Chess Club</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Become part of Andover&apos;s most successful chess club. Whether you&apos;re a beginner 
            or a master, there&apos;s a place for you in our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white dark:bg-gray-800 text-emerald-800 dark:text-emerald-200 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Join Now
            </Link>
            <Link
              href="/fixtures"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-emerald-800 dark:hover:bg-gray-800 dark:hover:text-emerald-200 transition-all transform hover:scale-105"
            >
              View Fixtures
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
