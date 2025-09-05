'use client';

import { useState } from 'react';
import { teams } from '@/data/teams';
import { getTeamGradientClass, getTeamDarkGradientClass, getTeamColorClasses, getTeamBorderClass, getTeamBgClass, getTeamTextClass } from '@/lib/teamColors';

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Teams</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Meet our competitive chess teams and track their upcoming matches and recent results.
            </p>
          </div>
        </div>
      </section>

      {/* Teams Overview */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Team Overview</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our teams compete across different divisions in the Southampton Chess League
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teams.map((team) => {
              const teamLetter = team.id === '3' ? 'C' : team.id;
              const teamColor = teamLetter === 'A' ? 'A' : teamLetter === 'B' ? 'B' : teamLetter === 'C' ? 'C' : 'A';
              
              return (
                <div 
                  key={team.id} 
                  className={`${getTeamGradientClass(teamColor)} ${getTeamDarkGradientClass(teamColor)} rounded-lg p-6 text-center cursor-pointer transition-transform hover:scale-105 ${
                    selectedTeam === team.id ? 'ring-2 ring-emerald-500' : ''
                  }`}
                  onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                >
                  <div className={`w-16 h-16 bg-${getTeamColorClasses(teamColor, 'secondary')} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white text-2xl font-bold">{teamLetter}</span>
                  </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{team.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{team.division}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Position:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{team.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Record:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{team.record}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Points:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{team.points}/{team.maxPoints}</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                  {team.upcomingMatches.length} upcoming matches
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Details */}
      {selectedTeam && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(() => {
              const team = teams.find(t => t.id === selectedTeam);
              if (!team) return null;
              
              const teamLetter = team.id === '3' ? 'C' : team.id;
              const teamColor = teamLetter === 'A' ? 'A' : teamLetter === 'B' ? 'B' : teamLetter === 'C' ? 'C' : 'A';

              return (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{team.name}</h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400">{team.division}</p>
                    </div>
                    <div className={`w-20 h-20 bg-${getTeamColorClasses(teamColor, 'secondary')} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-3xl font-bold">{teamLetter}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upcoming Matches */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upcoming Matches</h3>
                      {team.upcomingMatches.length > 0 ? (
                        <div className="space-y-4">
                          {team.upcomingMatches.map((match, index) => (
                            <div key={index} className={`border ${getTeamBorderClass(teamColor)} dark:border-${getTeamColorClasses(teamColor, 'secondary')}/70 rounded-lg p-4`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {formatDate(match.date)}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  match.isHome 
                                    ? `${getTeamBgClass(teamColor)} ${getTeamTextClass(teamColor)} dark:bg-${getTeamColorClasses(teamColor, 'secondary')}/20 dark:text-${getTeamColorClasses(teamColor, 'secondary')}-400`
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                                }`}>
                                  {match.isHome ? 'Home' : 'Away'}
                                </span>
                              </div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                vs {match.opponent}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                📍 {match.location}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">No upcoming matches scheduled</p>
                      )}
                    </div>

                    {/* Recent Matches */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Matches</h3>
                      {team.recentMatches.length > 0 ? (
                        <div className="space-y-4">
                          {team.recentMatches.map((match, index) => (
                            <div key={index} className={`border ${getTeamBorderClass(teamColor)} dark:border-${getTeamColorClasses(teamColor, 'secondary')}/70 rounded-lg p-4`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {formatDate(match.date)}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  match.isHome 
                                    ? `${getTeamBgClass(teamColor)} ${getTeamTextClass(teamColor)} dark:bg-${getTeamColorClasses(teamColor, 'secondary')}/20 dark:text-${getTeamColorClasses(teamColor, 'secondary')}-400`
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                                }`}>
                                  {match.isHome ? 'Home' : 'Away'}
                                </span>
                              </div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                vs {match.opponent}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                📍 {match.location}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">No recent matches available</p>
                      )}
                    </div>
                  </div>

                  {/* Team Stats */}
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Season Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{team.played}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Matches Played</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{team.won}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{team.drawn}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Draws</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">{team.lost}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Losses</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}
    </div>
  );
}
