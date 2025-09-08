'use client';

import { useState } from 'react';
import Link from 'next/link';
import { fixtures, Fixture } from '@/data/fixtures';
import { getTeamColorClasses, getTeamBorderClass, getTeamBgClass, getTeamTextClass, getTeamGradientClass, getTeamDarkGradientClass } from '@/lib/teamColors';

interface FilterState {
  status: 'all' | 'upcoming' | 'completed';
  team: 'all' | 'A' | 'B' | 'C';
  competition: 'all' | 'league' | 'tournament' | 'internal';
  venue: 'all' | 'home' | 'away';
  season: 'all' | string;
}

export default function FixturesClient() {
  const [filters, setFilters] = useState<FilterState>({
    status: 'upcoming', // Default to showing only upcoming fixtures
    team: 'all',
    competition: 'all',
    venue: 'all',
    season: '2025-2026' // Default to current season
  });

  const [showFilters, setShowFilters] = useState(false);

  const filteredFixtures = fixtures
    .filter(fixture => {
      // Status filter
      const statusMatch = filters.status === 'all' || fixture.status === filters.status;
      
      // Team filter
      const teamMatch = filters.team === 'all' || 
        fixture.homeTeam.includes(`Andover ${filters.team}`) || 
        fixture.awayTeam.includes(`Andover ${filters.team}`);
      
      // Competition filter
      let fixtureType = 'league';
      if (fixture.isTournament) {
        fixtureType = 'tournament';
      } else if (fixture.competition.includes('Internal')) {
        fixtureType = 'internal';
      }
      const competitionMatch = filters.competition === 'all' || fixtureType === filters.competition;
      
      // Venue filter
      const venueMatch = filters.venue === 'all' || fixture.venue === filters.venue;
      
      // Season filter
      const seasonMatch = filters.season === 'all' || fixture.season === filters.season;
      
      return statusMatch && teamMatch && competitionMatch && venueMatch && seasonMatch;
    })
    .sort((a, b) => {
      // Sort by date (earliest first)
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      status: 'upcoming', // Reset to upcoming fixtures
      team: 'all',
      competition: 'all',
      venue: 'all',
      season: '2025-2026' // Reset to current season
    });
  };

  const getActiveFiltersCount = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (key === 'season') {
        return value !== 'all' && value !== '2025-2026'; // Don't count current season as active filter
      }
      if (key === 'status') {
        return value !== 'all' && value !== 'upcoming'; // Don't count upcoming as active filter (it's default)
      }
      return value !== 'all';
    }).length;
  };

  // Get unique seasons from fixtures for season filter
  const getAvailableSeasons = () => {
    const seasons = new Set<string>();
    fixtures.forEach(fixture => {
      if (fixture.season) {
        seasons.add(fixture.season);
      }
    });
    return Array.from(seasons).sort().reverse(); // Most recent season first
  };

  const generateICalContent = (fixture: Fixture) => {
    // Parse the time properly - handle both "9:30" and "09:30" formats
    const timeParts = fixture.time.split(':');
    const hours = timeParts[0].padStart(2, '0');
    const minutes = timeParts[1] || '00';
    
    // Create proper ISO date string
    const startDate = new Date(`${fixture.date}T${hours}:${minutes}:00`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration
    
    // Validate dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Invalid date for fixture:', fixture);
      return '';
    }
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const summary = `${fixture.homeTeam} vs ${fixture.awayTeam}`;
    const location = fixture.location || (fixture.venue === 'home' ? 'Andover Community Centre' : 'Away Venue');
    const description = `${fixture.competition}\n${fixture.address ? `Address: ${fixture.address}\n` : ''}${fixture.notes || ''}`;

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Andover Chess Club//Chess Fixture//EN
BEGIN:VEVENT
UID:${fixture.id}@andoverchessclub.co.uk
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
  };

  const downloadICal = (fixture: Fixture) => {
    const icalContent = generateICalContent(fixture);
    
    if (!icalContent) {
      console.error('Failed to generate iCal content for fixture:', fixture);
      alert('Sorry, there was an error generating the calendar file. Please try again.');
      return;
    }
    
    const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `chess-fixture-${fixture.date}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateMultipleICalContent = (fixtures: Fixture[]) => {
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    let icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Andover Chess Club//Chess Fixtures//EN
`;

    fixtures.forEach(fixture => {
      // Parse the time properly
      const timeParts = fixture.time.split(':');
      const hours = timeParts[0].padStart(2, '0');
      const minutes = timeParts[1] || '00';
      
      // Create proper ISO date string
      const startDate = new Date(`${fixture.date}T${hours}:${minutes}:00`);
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration
      
      // Skip invalid dates
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.warn('Skipping invalid date for fixture:', fixture);
        return;
      }

      const summary = `${fixture.homeTeam} vs ${fixture.awayTeam}`;
      const location = fixture.location || (fixture.venue === 'home' ? 'Andover Community Centre' : 'Away Venue');
      const description = `${fixture.competition}\n${fixture.address ? `Address: ${fixture.address}\n` : ''}${fixture.notes || ''}`;

      icalContent += `BEGIN:VEVENT
UID:${fixture.id}@andoverchessclub.co.uk
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
END:VEVENT
`;
    });

    icalContent += `END:VCALENDAR`;
    return icalContent;
  };

  const downloadAllFilteredEvents = () => {
    if (filteredFixtures.length === 0) {
      alert('No events to download. Please adjust your filters.');
      return;
    }

    const icalContent = generateMultipleICalContent(filteredFixtures);
    
    if (!icalContent) {
      console.error('Failed to generate iCal content for filtered fixtures');
      alert('Sorry, there was an error generating the calendar file. Please try again.');
      return;
    }
    
    const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `andover-chess-fixtures-${new Date().toISOString().slice(0, 10)}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompetitionColor = (fixture: Fixture) => {
    if (fixture.competition.includes('League')) {
      return 'bg-purple-100 text-purple-800';
    } else if (fixture.isTournament) {
      return 'bg-orange-100 text-orange-800';
    } else if (fixture.competition.includes('Internal')) {
      return 'bg-green-100 text-green-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  const getTeamColor = (team: string) => {
    if (team === 'A' || team === 'B' || team === 'C') {
      return `${getTeamBgClass(team)} ${getTeamTextClass(team)} ${getTeamBorderClass(team)}`;
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTeamFromFixture = (fixture: Fixture) => {
    if (fixture.homeTeam.includes('Andover A') || fixture.awayTeam.includes('Andover A')) {
      return 'A';
    } else if (fixture.homeTeam.includes('Andover B') || fixture.awayTeam.includes('Andover B')) {
      return 'B';
    } else if (fixture.homeTeam.includes('Andover C') || fixture.awayTeam.includes('Andover C')) {
      return 'C';
    }
    return null;
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Fixtures & Events</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Stay up to date with all our upcoming matches, tournaments, and recent results.
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Filters Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Toggle and Summary */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2> */}
              {getActiveFiltersCount() > 0 && (
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 text-sm px-2 py-1 rounded-full">
                    {getActiveFiltersCount()} active
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V3z" />
              </svg>
              <span className="font-medium">
                {showFilters ? 'Hide Filters' : 'Filter Events'}
              </span>
            </button>
          </div>

          {/* Filter Controls */}
          {showFilters && (
            <div className="theme-card rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium theme-text-secondary mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => updateFilter('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 theme-text-primary focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Team Filter */}
                <div>
                  <label className="block text-sm font-medium theme-text-secondary mb-2">
                    Team
                  </label>
                  <select
                    value={filters.team}
                    onChange={(e) => updateFilter('team', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 theme-text-primary focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                  >
                    <option value="all">All Teams</option>
                    <option value="A">A Team</option>
                    <option value="B">B Team</option>
                    <option value="C">C Team</option>
                  </select>
                </div>

                {/* Competition Filter */}
                <div>
                  <label className="block text-sm font-medium theme-text-secondary mb-2">
                    Competition
                  </label>
                  <select
                    value={filters.competition}
                    onChange={(e) => updateFilter('competition', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 theme-text-primary focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                  >
                    <option value="all">All Competitions</option>
                    <option value="league">League Matches</option>
                    <option value="tournament">Tournaments</option>
                    <option value="internal">Internal Events</option>
                  </select>
                </div>

                {/* Venue Filter */}
                <div>
                  <label className="block text-sm font-medium theme-text-secondary mb-2">
                    Venue
                  </label>
                  <select
                    value={filters.venue}
                    onChange={(e) => updateFilter('venue', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 theme-text-primary focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                  >
                    <option value="all">All Venues</option>
                    <option value="home">Home</option>
                    <option value="away">Away</option>
                  </select>
                </div>

                {/* Season Filter */}
                <div>
                  <label className="block text-sm font-medium theme-text-secondary mb-2">
                    Season
                  </label>
                  <select
                    value={filters.season}
                    onChange={(e) => updateFilter('season', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 theme-text-primary focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                  >
                    <option value="all">All Seasons</option>
                    {getAvailableSeasons().map(season => (
                      <option key={season} value={season}>
                        {season}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Filter Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium theme-text-secondary mb-3">Quick Filters</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilters({ status: 'upcoming', team: 'all', competition: 'all', venue: 'all', season: '2025-2026' })}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    Upcoming Matches
                  </button>
                  <button
                    onClick={() => setFilters({ status: 'completed', team: 'all', competition: 'all', venue: 'all', season: '2025-2026' })}
                    className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
                  >
                    Recent Results
                  </button>
                  <button
                    onClick={() => setFilters({ status: 'all', team: 'all', competition: 'all', venue: 'all', season: '2025-2026' })}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    All Fixtures
                  </button>
                  <button
                    onClick={() => setFilters({ status: 'all', team: 'A', competition: 'league', venue: 'all', season: '2025-2026' })}
                    className={`px-3 py-1 text-sm ${getTeamBgClass('A')} ${getTeamTextClass('A')} rounded-full hover:bg-${getTeamColorClasses('A', 'hover')} transition-colors`}
                  >
                    A Team League
                  </button>
                  <button
                    onClick={() => setFilters({ status: 'all', team: 'all', competition: 'internal', venue: 'all', season: '2025-2026' })}
                    className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    Internal Events
                  </button>
                  <button
                    onClick={() => setFilters({ status: 'all', team: 'all', competition: 'all', venue: 'home', season: '2025-2026' })}
                    className="px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full hover:bg-orange-200 transition-colors"
                  >
                    Home Matches
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Summary and Download Button */}
          <div className="mt-4 text-center">
            <p className="text-sm theme-text-secondary mb-4">
              Showing {filteredFixtures.length} of {fixtures.length} fixtures
              {getActiveFiltersCount() > 0 && (
                <span className="ml-2 text-emerald-600">
                  ({getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? 's' : ''} applied)
                </span>
              )}
            </p>
            
            {/* Download All Filtered Events Button */}
            {getActiveFiltersCount() > 0 && filteredFixtures.length > 0 && (
              <button
                onClick={downloadAllFilteredEvents}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium">
                  Download All Filtered Events ({filteredFixtures.length})
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Fixtures List */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredFixtures.length === 0 ? (
              <div className="text-center py-12">
                <p className="theme-text-muted text-lg">No fixtures found matching your filters.</p>
              </div>
            ) : (
              filteredFixtures.map((fixture) => (
                <div
                  key={fixture.id}
                  className="theme-card border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCompetitionColor(fixture)}`}>
                          {fixture.competition}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(fixture.status)}`}>
                          {fixture.status.charAt(0).toUpperCase() + fixture.status.slice(1)}
                        </span>
                        {getTeamFromFixture(fixture) && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTeamBgClass(getTeamFromFixture(fixture)!)} ${getTeamTextClass(getTeamFromFixture(fixture)!)} ${getTeamBorderClass(getTeamFromFixture(fixture)!)}`}>
                            {getTeamFromFixture(fixture)} Team
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold theme-text-primary mb-2">
                        {fixture.homeTeam} { fixture.awayTeam ? 'vs' : ''} {fixture.awayTeam}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 theme-text-secondary">
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
                      
                      {/* Location and Address */}
                      {(fixture.location || fixture.address) && (
                        <div className="mt-3 space-y-2">
                          {fixture.location && (
                            <div className="flex items-start gap-2">
                              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <span className="text-sm theme-text-secondary">{fixture.location}</span>
                            </div>
                          )}
                          {fixture.address && (
                            <div className="flex items-start gap-2">
                              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="text-sm theme-text-secondary">{fixture.address}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Notes */}
                      {fixture.notes && (
                        <div className="mt-3">
                          <div className="flex items-start gap-2">
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm theme-text-secondary">{fixture.notes}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* More Info Link */}
                      {fixture.moreInfoLink && (
                        <div className="mt-3">
                          <a 
                            href={fixture.moreInfoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            More Information
                          </a>
                        </div>
                      )}
                      {fixture.result && (
                        <div className="mt-3">
                          <span className="text-lg font-medium theme-text-primary">Result: </span>
                          <span className="text-lg theme-text-secondary">{
                            (() => {
                              switch (fixture.result) {
                                case 'Win':
                                  return 'Win ✅';
                                case 'Loss':
                                  return 'Loss ❌';
                            case 'Draw':
                              return 'Draw ➖';
                            default:
                              return fixture.result;
                          }
                          })()
                          }</span>
                        </div>
                      )}
                    </div>
                    <div className="lg:flex-shrink-0 flex flex-col gap-2">
                      {fixture.status === 'upcoming' && (
                        <button 
                          onClick={() => downloadICal(fixture)}
                          className="bg-emerald-800 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Add to Calendar
                        </button>
                      )}
                      {!fixture.isTournament && fixture.status === 'completed' && (
                        <Link
                          href={`/match/${fixture.id}`}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 text-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Match Details
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold theme-text-primary mb-4">Regular Schedule</h2>
            <p className="text-lg theme-text-secondary max-w-2xl mx-auto">
              Our regular weekly sessions and activities
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="theme-card rounded-lg p-6 shadow-sm">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-emerald-800 dark:text-emerald-300 text-2xl">T</span>
                </div>
                <h3 className="text-xl font-semibold theme-text-primary">Tuesday Evenings</h3>
                <p className="theme-text-secondary">7:00 PM - 10:00 PM</p>
              </div>
              <ul className="space-y-2 theme-text-secondary">
                <li>• Casual games and practice</li>
                <li>• Strategy discussions</li>
                <li>• New member welcome</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
