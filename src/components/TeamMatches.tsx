'use client';

import { useState } from 'react';
import { teams } from '@/data/teams';

interface TeamMatchesProps {
  teamId?: string;
  showAllTeams?: boolean;
  limit?: number;
}

export default function TeamMatches({ teamId, showAllTeams = false, limit = 5 }: TeamMatchesProps) {
  const [selectedTeam, setSelectedTeam] = useState(teamId || '1');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getUpcomingMatches = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team?.upcomingMatches?.slice(0, limit) || [];
  };

  const getRecentMatches = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team?.recentMatches?.slice(0, limit) || [];
  };

  if (showAllTeams) {
    return (
      <div className="space-y-8">
        {teams.map((team) => (
          <div key={team.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{team.name}</h3>
              <div className={`w-8 h-8 bg-${team.color}-600 rounded-full flex items-center justify-center`}>
                <span className="text-white text-sm font-bold">{team.id === '3' ? 'C' : team.id}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upcoming Matches */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Upcoming Matches</h4>
                {team.upcomingMatches && team.upcomingMatches.length > 0 ? (
                  <div className="space-y-2">
                    {team.upcomingMatches.slice(0, 3).map((match, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            vs {match.opponent}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {formatDate(match.date)} • {match.location}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          match.isHome 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                          {match.isHome ? 'H' : 'A'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-500">No upcoming matches</p>
                )}
              </div>

              {/* Recent Matches */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Recent Matches</h4>
                {team.recentMatches && team.recentMatches.length > 0 ? (
                  <div className="space-y-2">
                    {team.recentMatches.slice(0, 3).map((match, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            vs {match.opponent}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {formatDate(match.date)} • {match.location}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          match.isHome 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                          {match.isHome ? 'H' : 'A'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-500">No recent matches</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const team = teams.find(t => t.id === selectedTeam);
  if (!team) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Team Selector */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Team Matches</h3>
        <div className="flex space-x-2">
          {teams.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTeam(t.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTeam === t.id
                  ? `bg-${t.color}-600 text-white`
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Matches */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Upcoming Matches</h4>
          {team.upcomingMatches && team.upcomingMatches.length > 0 ? (
            <div className="space-y-3">
              {team.upcomingMatches.slice(0, limit).map((match, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatFullDate(match.date)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      match.isHome 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
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
            <p className="text-sm text-gray-500 dark:text-gray-500">No upcoming matches scheduled</p>
          )}
        </div>

        {/* Recent Matches */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Recent Matches</h4>
          {team.recentMatches && team.recentMatches.length > 0 ? (
            <div className="space-y-3">
              {team.recentMatches.slice(0, limit).map((match, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatFullDate(match.date)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      match.isHome 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
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
            <p className="text-sm text-gray-500 dark:text-gray-500">No recent matches available</p>
          )}
        </div>
      </div>
    </div>
  );
}
