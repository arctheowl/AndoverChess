'use client';

import { useState } from 'react';
import { useECFUpcomingFixtures, useECFCompletedFixtures } from '@/hooks/useECFFixtures';

interface ECFFixturesDisplayProps {
  clubCode: string;
  org?: string;
  clubName?: string;
}

export default function ECFFixturesDisplay({ 
  clubCode, 
  org = '416', 
  clubName = 'Andover Chess Club' 
}: ECFFixturesDisplayProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  
  const { 
    fixtures: upcomingFixtures, 
    loading: upcomingLoading, 
    error: upcomingError,
    source: upcomingSource 
  } = useECFUpcomingFixtures(clubCode, org);
  
  const { 
    fixtures: completedFixtures, 
    loading: completedLoading, 
    error: completedError,
    source: completedSource 
  } = useECFCompletedFixtures(clubCode, org);

  const loading = upcomingLoading || completedLoading;
  const error = upcomingError || completedError;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2">Loading fixtures from ECF LMS...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <h3 className="text-red-800 dark:text-red-200 font-semibold mb-2">Error Loading Fixtures</h3>
        <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        <p className="text-red-600 dark:text-red-400 text-xs mt-2">
          Club Code: {clubCode} | Organization: {org}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold theme-text-primary">{clubName} Fixtures</h2>
          <p className="text-sm theme-text-muted">
            Data from ECF League Management System
            {upcomingSource && <span className="ml-2">• Source: {upcomingSource}</span>}
          </p>
        </div>
        <div className="text-xs theme-text-muted">
          Club Code: {clubCode} | Org: {org}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'upcoming'
              ? 'bg-white dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Upcoming ({upcomingFixtures.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'completed'
              ? 'bg-white dark:bg-gray-700 text-emerald-800 dark:text-emerald-200 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Results ({completedFixtures.length})
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'upcoming' ? (
          <div>
            {upcomingFixtures.length === 0 ? (
              <div className="text-center py-8">
                <p className="theme-text-secondary">No upcoming fixtures scheduled.</p>
                <p className="text-sm theme-text-muted mt-2">
                  Check back later for new fixtures or contact the club secretary.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingFixtures.map((fixture) => (
                  <div key={fixture.id} className="theme-card p-4 border-l-4 border-emerald-500">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold theme-text-primary">{fixture.homeTeam}</div>
                        <div className="text-sm theme-text-secondary">vs {fixture.awayTeam}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600 capitalize">{fixture.venue}</div>
                        <div className="text-sm theme-text-muted">
                          {new Date(fixture.date).toLocaleDateString('en-GB')}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs theme-text-muted">
                      {fixture.competition} • {fixture.time}
                    </div>
                    {fixture.notes && (
                      <div className="mt-2 text-xs theme-text-muted italic">
                        {fixture.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {completedFixtures.length === 0 ? (
              <div className="text-center py-8">
                <p className="theme-text-secondary">No completed fixtures found.</p>
                <p className="text-sm theme-text-muted mt-2">
                  Results will appear here once matches are completed.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {completedFixtures.map((fixture) => (
                  <div key={fixture.id} className={`theme-card p-4 border-l-4 ${
                    fixture.result === 'won' ? 'border-green-500' : 
                    fixture.result === 'lost' ? 'border-red-500' : 'border-yellow-500'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold theme-text-primary">{fixture.homeTeam}</div>
                        <div className="text-sm theme-text-secondary">vs {fixture.awayTeam}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          fixture.result === 'won' ? 'text-green-600' : 
                          fixture.result === 'lost' ? 'text-red-600' : 'text-yellow-600'
                        }`}>{fixture.score}</div>
                        <div className="text-sm theme-text-muted capitalize">{fixture.result}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs theme-text-muted">
                      {fixture.competition} • {new Date(fixture.date).toLocaleDateString('en-GB')}
                    </div>
                    {fixture.notes && (
                      <div className="mt-2 text-xs theme-text-muted italic">
                        {fixture.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs theme-text-muted">
          Data provided by the English Chess Federation League Management System
        </p>
        <p className="text-xs theme-text-muted mt-1">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}
