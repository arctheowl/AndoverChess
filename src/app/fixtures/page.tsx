'use client';

import { useState } from 'react';

interface Fixture {
  id: number;
  date: string;
  time: string;
  type: 'league' | 'tournament' | 'friendly' | 'training';
  title: string;
  opponent?: string;
  venue: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  result?: string;
}

const fixtures: Fixture[] = [
  {
    id: 1,
    date: '2024-01-15',
    time: '19:00',
    type: 'league',
    title: 'Hampshire League Division 1',
    opponent: 'Southampton Chess Club',
    venue: 'Home',
    status: 'upcoming'
  },
  {
    id: 2,
    date: '2024-01-17',
    time: '19:00',
    type: 'training',
    title: 'Wednesday Training Session',
    venue: 'Andover Community Centre',
    status: 'upcoming'
  },
  {
    id: 3,
    date: '2024-01-20',
    time: '10:00',
    type: 'tournament',
    title: 'Club Championship Round 1',
    venue: 'Andover Community Centre',
    status: 'upcoming'
  },
  {
    id: 4,
    date: '2024-01-22',
    time: '19:00',
    type: 'league',
    title: 'Hampshire League Division 1',
    opponent: 'Portsmouth Chess Club',
    venue: 'Away',
    status: 'upcoming'
  },
  {
    id: 5,
    date: '2024-01-08',
    time: '19:00',
    type: 'league',
    title: 'Hampshire League Division 1',
    opponent: 'Winchester Chess Club',
    venue: 'Home',
    status: 'completed',
    result: 'Won 3.5-2.5'
  },
  {
    id: 6,
    date: '2024-01-06',
    time: '10:00',
    type: 'tournament',
    title: 'New Year Rapid Tournament',
    venue: 'Andover Community Centre',
    status: 'completed',
    result: '1st Place: David Thompson'
  },
  {
    id: 7,
    date: '2024-01-03',
    time: '19:00',
    type: 'training',
    title: 'Wednesday Training Session',
    venue: 'Andover Community Centre',
    status: 'completed'
  }
];

export default function FixturesPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'league' | 'tournament' | 'friendly' | 'training'>('all');

  const filteredFixtures = fixtures.filter(fixture => {
    const statusMatch = filter === 'all' || fixture.status === filter;
    const typeMatch = typeFilter === 'all' || fixture.type === typeFilter;
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'league':
        return 'bg-purple-100 text-purple-800';
      case 'tournament':
        return 'bg-orange-100 text-orange-800';
      case 'friendly':
        return 'bg-green-100 text-green-800';
      case 'training':
        return 'bg-blue-100 text-blue-800';
      default:
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
                onClick={() => setTypeFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  typeFilter === 'all'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setTypeFilter('league')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  typeFilter === 'league'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                League
              </button>
              <button
                onClick={() => setTypeFilter('tournament')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  typeFilter === 'tournament'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tournaments
              </button>
              <button
                onClick={() => setTypeFilter('training')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  typeFilter === 'training'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Training
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
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(fixture.type)}`}>
                          {fixture.type.charAt(0).toUpperCase() + fixture.type.slice(1)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(fixture.status)}`}>
                          {fixture.status.charAt(0).toUpperCase() + fixture.status.slice(1)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {fixture.title}
                        {fixture.opponent && (
                          <span className="text-gray-600 font-normal">
                            {' '}vs {fixture.opponent}
                          </span>
                        )}
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
                          <span>{fixture.venue}</span>
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
