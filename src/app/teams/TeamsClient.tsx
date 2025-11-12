'use client';

import { useState, useRef, useEffect } from 'react';
import { teams } from '@/data/teams';
import { getTeamGradientClass, getTeamDarkGradientClass, getTeamColorClasses, getTeamBorderClass, getTeamBgClass, getTeamTextClass } from '@/lib/teamColors';
import { formatTeamMatchDate, formatTeamMatchTime, getTeamFixturesDynamic, TeamMatch } from '@/lib/teamFixtures';
import Link from 'next/link';
import TeamFormDisplay from '@/components/TeamFormDisplay';

interface TeamStats {
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

export default function TeamsClient() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [teamStats, setTeamStats] = useState<Record<string, TeamStats>>({});
  const [loadingStats, setLoadingStats] = useState(true);
  const [teamFixtures, setTeamFixtures] = useState<Record<string, TeamMatch[]>>({});
  const [loadingFixtures, setLoadingFixtures] = useState<Record<string, boolean>>({});
  const teamDetailsRef = useRef<HTMLDivElement>(null);
  const fetchedTeamsRef = useRef<Set<string>>(new Set());

  // Fetch team statistics on component mount
  useEffect(() => {
    async function fetchTeamStats() {
      try {
        const response = await fetch('/api/teams/stats');
        const data = await response.json();
        
        if (data.success && data.stats) {
          setTeamStats(data.stats);
        }
      } catch (error) {
        console.error('Error fetching team stats:', error);
      } finally {
        setLoadingStats(false);
      }
    }

    fetchTeamStats();
  }, []);

  // Fetch fixtures for all teams on mount
  useEffect(() => {
    async function fetchAllTeamFixtures() {
      const fetchPromises = teams.map(async (team) => {
        // Skip if already fetched
        if (fetchedTeamsRef.current.has(team.name)) return;
        
        fetchedTeamsRef.current.add(team.name);
        setLoadingFixtures(prev => ({ ...prev, [team.name]: true }));
        
        try {
          const fixtures = await getTeamFixturesDynamic(team.name);
          setTeamFixtures(prev => ({ ...prev, [team.name]: fixtures }));
        } catch (error) {
          console.error(`Error fetching fixtures for ${team.name}:`, error);
          fetchedTeamsRef.current.delete(team.name); // Remove on error so it can retry
        } finally {
          setLoadingFixtures(prev => ({ ...prev, [team.name]: false }));
        }
      });
      
      await Promise.all(fetchPromises);
    }
    
    fetchAllTeamFixtures();
  }, []); // Run once on mount

  // Fetch fixtures when a team is selected
  useEffect(() => {
    if (!selectedTeam) return;
    
    const team = teams.find(t => t.id === selectedTeam);
    if (!team) return;
    
    // Check if we already have fixtures for this team
    if (teamFixtures[team.name]) return;
    
    // Set loading state
    setLoadingFixtures(prev => ({ ...prev, [team.name]: true }));
    
    // Fetch dynamic fixtures
    getTeamFixturesDynamic(team.name)
      .then(fixtures => {
        setTeamFixtures(prev => ({ ...prev, [team.name]: fixtures }));
      })
      .catch(error => {
        console.error('Error fetching team fixtures:', error);
      })
      .finally(() => {
        setLoadingFixtures(prev => ({ ...prev, [team.name]: false }));
      });
  }, [selectedTeam, teamFixtures]);

  // Helper to get team stats (fallback to static data if not loaded)
  const getTeamWithStats = (teamName: string) => {
    const dynamicStats = teamStats[teamName];
    const staticTeam = teams.find(t => t.name === teamName);
    
    if (!staticTeam) return null;
    
    if (dynamicStats) {
      return {
        ...staticTeam,
        position: dynamicStats.position,
        played: dynamicStats.played,
        won: dynamicStats.won,
        drawn: dynamicStats.drawn,
        lost: dynamicStats.lost,
        points: dynamicStats.points,
        record: `W${dynamicStats.won} D${dynamicStats.drawn} L${dynamicStats.lost}`,
      };
    }
    
    return staticTeam;
  };

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

  const handleTeamSelection = (teamId: string) => {
    const newSelectedTeam = selectedTeam === teamId ? null : teamId;
    setSelectedTeam(newSelectedTeam);
    
    // If selecting a team (not deselecting), scroll to team details
    if (newSelectedTeam && teamDetailsRef.current) {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setTimeout(() => {
          teamDetailsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }, 150); // Slightly longer delay to ensure smooth rendering
      });
    }
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
              const teamWithStats = getTeamWithStats(team.name) || team;
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
                <div 
                  key={team.id} 
                  className={`rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg  ${
                    teamColor === 'A' ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-600/20 ' : 
                    teamColor === 'B' ? 'bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-600/20' : 
                    teamColor === 'C' ? 'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-600/20' : 
                    'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-600/20'
                  } ${
                    selectedTeam === team.id ? 'ring-2 ring-emerald-500 shadow-lg' : ''
                  }`}
                  onClick={() => handleTeamSelection(team.id)}
                  title="Click to view team details"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    teamColor === 'A' ? 'bg-emerald-600 ' : 
                    teamColor === 'B' ? 'bg-sky-600' : 
                    teamColor === 'C' ? 'bg-violet-600' : 'bg-emerald-600'
                  }`}>
                    <span className="text-white text-2xl font-bold">{teamLetter}</span>
                  </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{team.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{team.division}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Position:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {loadingStats ? '...' : teamWithStats.position}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Record:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {loadingStats ? '...' : teamWithStats.record}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Points:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {loadingStats ? '...' : `${teamWithStats.points}/${teamWithStats.maxPoints}`}
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                  {(() => {
                    const fixtures = teamFixtures[team.name] || [];
                    const upcoming = fixtures.filter(f => f.status === 'upcoming' || f.status === 'postponed').length;
                    return loadingFixtures[team.name] ? '...' : `${upcoming} upcoming matches`;
                  })()}
                </div>
                
                {/* Recent Form Display */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <TeamFormDisplay 
                    teamName={team.name} 
                    fixtures={teamFixtures[team.name]} 
                    loading={loadingFixtures[team.name]}
                  />
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Details */}
      {selectedTeam && (
        <section ref={teamDetailsRef} className="py-16 bg-gray-50 dark:bg-gray-900 animate-fadeIn">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(() => {
              const team = teams.find(t => t.id === selectedTeam);
              if (!team) return null;
              
              const teamWithStats = getTeamWithStats(team.name) || team;
              
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
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{team.name}</h2>
                      <Link
                        href={team.divisionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
                      >
                        Visit Division
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    </div>
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                      teamColor === 'A' ? 'bg-emerald-600' : 
                      teamColor === 'B' ? 'bg-sky-600' : 
                      teamColor === 'C' ? 'bg-violet-600' : 'bg-emerald-600'
                    }`}>
                      <span className="text-white text-3xl font-bold">{teamLetter}</span>
                    </div>
                  </div>

                  {/* Team Stats */}
                  <div className="mt-8 py-8 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Season Statistics</h3>
                    {loadingStats ? (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                        <p className="mt-2">Loading statistics...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{teamWithStats.played}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Matches Played</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{teamWithStats.won}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Wins</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{teamWithStats.drawn}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Draws</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{teamWithStats.lost}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Losses</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Recent Matches */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Matches</h3>
                      {(() => {
                        const fixtures = teamFixtures[team.name] || [];
                        const recentMatches = fixtures
                          .filter(match => match.status === 'completed')
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .slice(0, 5);
                        
                        if (loadingFixtures[team.name]) {
                          return (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                              <p className="mt-2">Loading matches...</p>
                            </div>
                          );
                        }
                        
                        return recentMatches.length > 0 ? (
                          <div className="space-y-4">
                            {recentMatches.map((match) => (
                              <div key={match.id} className={`border rounded-lg p-4 ${
                                teamColor === 'A' ? 'border-emerald-200 dark:border-emerald-600/70' : 
                                teamColor === 'B' ? 'border-sky-200 dark:border-sky-600/70' : 
                                teamColor === 'C' ? 'border-violet-200 dark:border-violet-600/70' : 'border-emerald-200 dark:border-emerald-600/70'
                              }`}>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {formatTeamMatchDate(match.date)}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    match.result === 'Win' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                    match.result === 'Loss' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  }`}>
                                    {match.result || 'TBD'}
                                  </span>
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">
                                  <div className="font-medium">{match.opponent}</div>
                                  <div className="text-sm">
                                    {match.venue === 'home' ? '🏠 Home' : '✈️ Away'} • {match.competition}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <p>No recent matches available</p>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Upcoming Matches */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upcoming Matches</h3>
                      {(() => {
                        const fixtures = teamFixtures[team.name] || [];
                        const upcomingMatches = fixtures
                          .filter(match => match.status === 'upcoming' || match.status === 'postponed')
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                          .slice(0, 5);
                        
                        if (loadingFixtures[team.name]) {
                          return (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                              <p className="mt-2">Loading matches...</p>
                            </div>
                          );
                        }
                        
                        return upcomingMatches.length > 0 ? (
                          <div className="space-y-4">
                            {upcomingMatches.map((match) => (
                              <div key={match.id} className={`border rounded-lg p-4 ${
                                teamColor === 'A' ? 'border-emerald-200 dark:border-emerald-600/70' : 
                                teamColor === 'B' ? 'border-sky-200 dark:border-sky-600/70' : 
                                teamColor === 'C' ? 'border-violet-200 dark:border-violet-600/70' : 'border-emerald-200 dark:border-emerald-600/70'
                              }`}>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {formatTeamMatchDate(match.date)}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    match.status === 'postponed' 
                                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                  }`}>
                                    {match.status === 'postponed' ? 'Postponed' : formatTeamMatchTime(match.time)}
                                  </span>
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">
                                  <div className="font-medium">{match.opponent}</div>
                                  <div className="text-sm">
                                    {match.venue === 'home' ? '🏠 Home' : '✈️ Away'} • {match.competition}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <p>No upcoming matches scheduled</p>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Team Description */}
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About {team.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {team.description}
                    </p>
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
