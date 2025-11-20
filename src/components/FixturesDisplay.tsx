'use client';

import { useUpcomingFixtures, useRecentResults } from '@/hooks/useFixtures';

const SkeletonCard = () => (
  <div className="theme-card p-4 border-l-4 border-gray-200 dark:border-gray-700 animate-pulse" role="status" aria-live="polite">
    <div className="flex justify-between items-center gap-6">
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="text-right space-y-2">
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
    <div className="mt-4 h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
  </div>
);

export default function FixturesDisplay() {
  const { fixtures: upcomingFixtures, loading: upcomingLoading, error: upcomingError } = useUpcomingFixtures(5);
  const { fixtures: recentResults, loading: resultsLoading, error: resultsError } = useRecentResults();
  const previewSkeletons = true; // TODO: remove after verifying skeleton visuals
  const showUpcomingSkeletons = previewSkeletons || upcomingLoading;
  const showResultsSkeletons = previewSkeletons || resultsLoading;

  if (!showUpcomingSkeletons && !showResultsSkeletons && (upcomingError || resultsError)) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-800 dark:text-red-200">
          Error loading fixtures: {upcomingError || resultsError}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upcoming Fixtures */}
      <div>
        <h2 className="text-2xl font-bold theme-text-primary mb-4">Upcoming Fixtures</h2>
        {showUpcomingSkeletons ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : upcomingError ? (
          <p className="text-red-600 dark:text-red-400">Unable to load upcoming fixtures. Please try again later.</p>
        ) : upcomingFixtures.length === 0 ? (
          <p className="theme-text-secondary">No upcoming fixtures scheduled.</p>
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
                    <div className="text-sm theme-text-muted">{new Date(fixture.date).toLocaleDateString('en-GB')}</div>
                  </div>
                </div>
                <div className="mt-2 text-xs theme-text-muted">{fixture.competition} • {fixture.time}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Results */}
      <div>
        <h2 className="text-2xl font-bold theme-text-primary mb-4">Recent Results</h2>
        {showResultsSkeletons ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : resultsError ? (
          <p className="text-red-600 dark:text-red-400">Unable to load recent results. Please try again later.</p>
        ) : recentResults.length === 0 ? (
          <p className="theme-text-secondary">No recent results available.</p>
        ) : (
          <div className="space-y-3">
            {recentResults.map((fixture) => (
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
                <div className="mt-2 text-xs theme-text-muted">{fixture.competition} • {new Date(fixture.date).toLocaleDateString('en-GB')}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
