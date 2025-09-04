'use client';

import { useState } from 'react';
import { fixtures, getUpcomingFixtures, getCompletedFixtures, Fixture } from '@/data/fixtures';

export default function FixturesPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [competitionFilter, setCompetitionFilter] = useState<'all' | 'league' | 'tournament' | 'internal'>('all');

  const filteredFixtures = fixtures.filter(fixture => {
    const statusMatch = filter === 'all' || fixture.status === filter;
    
    // Determine fixture type based on competition
    let fixtureType = 'league';
    if (fixture.competition.includes('Tournament') || fixture.competition.includes('Rapid') || fixture.competition.includes('Blitz')) {
      fixtureType = 'tournament';
    } else if (fixture.competition.includes('Internal')) {
      fixtureType = 'internal';
    }
    
    const typeMatch = competitionFilter === 'all' || fixtureType === competitionFilter;
    return statusMatch && typeMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompetitionColor = (competition: string) => {
    if (competition.includes('League')) {
      return 'bg-purple-100 text-purple-800';
    } else if (competition.includes('Tournament') || competition.includes('Rapid') || competition.includes('Blitz')) {
      return 'bg-orange-100 text-orange-800';
    } else if (competition.includes('Internal')) {
      return 'bg-green-100 text-green-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Fixtures & Results</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Stay up to date with all our upcoming matches, tournaments, and recent results.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'upcoming'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'completed'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Results
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCompetitionFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  competitionFilter === 'all'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setCompetitionFilter('league')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  competitionFilter === 'league'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                League
              </button>
              <button
                onClick={() => setCompetitionFilter('tournament')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  competitionFilter === 'tournament'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tournaments
              </button>
              <button
                onClick={() => setCompetitionFilter('internal')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  competitionFilter === 'internal'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Internal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fixtures List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredFixtures.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No fixtures found matching your filters.</p>
              </div>
            ) : (
              filteredFixtures.map((fixture) => (
                <div
                  key={fixture.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCompetitionColor(fixture.competition)}`}>
                          {fixture.competition}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(fixture.status)}`}>
                          {fixture.status.charAt(0).toUpperCase() + fixture.status.slice(1)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {fixture.homeTeam} vs {fixture.awayTeam}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(fixture.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{fixture.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{fixture.venue === 'home' ? 'Home' : 'Away'}</span>
                        </div>
                      </div>
                      {fixture.result && (
                        <div className="mt-3">
                          <span className="text-sm font-medium text-gray-900">Result: </span>
                          <span className="text-sm text-gray-600">{fixture.result}</span>
                        </div>
                      )}
                    </div>
                    {fixture.status === 'upcoming' && (
                      <div className="lg:flex-shrink-0">
                        <button className="bg-emerald-800 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                          Add to Calendar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Regular Schedule</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our regular weekly sessions and activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-emerald-800 text-2xl">M</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Monday Evenings</h3>
                <p className="text-gray-600">7:00 PM - 10:00 PM</p>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Casual games and practice</li>
                <li>• Strategy discussions</li>
                <li>• New member welcome</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-emerald-800 text-2xl">W</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Wednesday Evenings</h3>
                <p className="text-gray-600">7:00 PM - 10:00 PM</p>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• League matches</li>
                <li>• Tournament games</li>
                <li>• Competitive play</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-emerald-800 text-2xl">S</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Saturday Mornings</h3>
                <p className="text-gray-600">10:00 AM - 12:00 PM</p>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Junior coaching</li>
                <li>• Beginners welcome</li>
                <li>• Family sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
