'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { fixtures, getMatchStats } from '@/data/fixtures';


export default function MatchPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.id as string;
  const [isClient, setIsClient] = useState(false);

  // Set client state after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Find the match by ID
  const match = fixtures.find(f => f.id === matchId);

  if (!match) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Match Not Found</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              The match you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/fixtures"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              Back to Fixtures
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isCompleted = match.status === 'completed';
  const isUpcoming = match.status === 'upcoming';
  const isCancelled = match.status === 'cancelled';

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Win': return 'text-green-600 dark:text-green-400';
      case 'Loss': return 'text-red-600 dark:text-red-400';
      case 'Draw': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getBoardResultColor = (result: string) => {
    const resultText = getBoardResultText(result);
    switch (resultText) {
      case 'Win': return 'text-green-600 dark:text-green-400';
      case 'Loss': return 'text-red-600 dark:text-red-400';
      case 'Draw': return 'text-yellow-600 dark:text-yellow-400';
      case 'Pending': return 'text-gray-500 dark:text-gray-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getBoardResultIcon = (result: string) => {
    // Determine if Andover is the home team
    const isAndoverHome = match.homeTeam.includes('Andover');
    
    // Convert the result to Andover's perspective
    let andoverResult: 'win' | 'loss' | 'draw' | 'pending';
    
    if (result === '½-½') {
      andoverResult = 'draw';
    } else if (result === 'pending') {
      andoverResult = 'pending';
    } else {
      // For '1-0' and '0-1' results, determine from Andover's perspective
      if (isAndoverHome) {
        // Andover is home team
        andoverResult = result === '1-0' ? 'win' : 'loss';
      } else {
        // Andover is away team
        andoverResult = result === '0-1' ? 'win' : 'loss';
      }
    }
    
    // Return the appropriate icon for Andover's result
    switch (andoverResult) {
      case 'win': return '✓';
      case 'loss': return '✗';
      case 'draw': return '=';
      case 'pending': return '?';
      default: return '?';
    }
  };

  const getBoardResultText = (result: string) => {
    // Determine if Andover is the home team
    const isAndoverHome = match.homeTeam.includes('Andover');
    
    // Convert the result to Andover's perspective
    let andoverResult: 'win' | 'loss' | 'draw' | 'pending';
    
    if (result === '½-½') {
      andoverResult = 'draw';
    } else if (result === 'pending') {
      andoverResult = 'pending';
    } else {
      // For '1-0' and '0-1' results, determine from Andover's perspective
      if (isAndoverHome) {
        // Andover is home team
        andoverResult = result === '1-0' ? 'win' : 'loss';
      } else {
        // Andover is away team
        andoverResult = result === '0-1' ? 'win' : 'loss';
      }
    }
    
    // Return the appropriate text for Andover's result
    switch (andoverResult) {
      case 'win': return 'Win';
      case 'loss': return 'Loss';
      case 'draw': return 'Draw';
      case 'pending': return 'Pending';
      default: return result;
    }
  };

  // Function to safely render HTML content
  const renderHtmlContent = (htmlString: string) => {
    if (!htmlString) return null;
    
    // On server side or before client hydration, return plain text
    if (!isClient) {
      return <div>{htmlString.replace(/<[^>]*>/g, '')}</div>;
    }
    
    // Simple HTML sanitization for client side (basic but safer than dangerouslySetInnerHTML)
    const sanitizedHtml = htmlString
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
      .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
      .replace(/javascript:/gi, ''); // Remove javascript: URLs
    
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/fixtures"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Fixtures
              </Link>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Match ID: {match.id}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Match Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {match.homeTeam} vs {match.awayTeam}
                </h1>
                {match.matchStats && (
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {match.matchStats.homeScore} - {match.matchStats.awayScore}
                  </div>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  isUpcoming ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(match.date).toLocaleDateString('en-GB')}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {match.time}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {match.venue === 'home' ? 'Home' : 'Away'}
                </div>
              </div>
            </div>

            {isCompleted && match.score && (
              <div className="mt-4 lg:mt-0 lg:ml-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {match.score}
                  </div>
                  <div className={`text-lg font-medium ${getResultColor(match.result || '')}`}>
                    {match.result}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Competition:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">{match.competition}</span>
              </div>
              {match.location && (
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Venue:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">{match.location}</span>
                </div>
              )}
              {match.address && (
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-900 dark:text-white">Address:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">{match.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Board Results */}
        {isCompleted && match.boardResults && match.boardResults.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Board Results</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Board
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Home Player
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Result
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Away Player
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Rating
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Opening
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {match.boardResults.map((board) => (
                    <tr key={board.board} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {board.board} {board.board % 2 === 0 ? '⚪' : '⚫'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {board.homePlayer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {board.homeRating || '-'}
                      </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBoardResultColor(board.result)}`}>
                           {/* <span className="mr-1 text-lg">{getBoardResultIcon(board.result)}</span> */}
                            <span className="text-lg">{board.result}</span>
                          </span>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {board.awayPlayer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {board.awayRating || '-'}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {board.opening || '-'}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Board Notes */}
            {/* {match.boardResults.some(board => board.notes) && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Game Notes</h3>
                <div className="space-y-3">
                  {match.boardResults
                    .filter(board => board.notes)
                    .map((board) => (
                      <div key={board.board} className="flex items-start space-x-3">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          Board {board.board}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{board.notes}</p>
                      </div>
                    ))}
                </div>
              </div>
            )} */}
          </div>
        )}

        {/* Match Statistics */}
        {isCompleted && (() => {
          const matchStats = getMatchStats(match);
          if (!matchStats) return null;
          return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Match Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    {matchStats.totalBoards}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Boards</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {matchStats.decisiveGames}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Decisive Games</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    {matchStats.averageRating.home}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Home Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {matchStats.averageRating.away}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Away Rating</div>
                </div>
              </div>

              {/* <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Team Ratings</h4>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div>Home: {matchStats.averageRating.home}</div>
                      <div>Away: {matchStats.averageRating.away}</div>
                    </div>
                  </div>
                  
                </div>
              </div> */}
            </div>
          );
        })()}

        {/* Match Notes */}
        {match.matchNotes && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Match Report</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {renderHtmlContent(match.matchNotes)}
              </div>
            </div>
          </div>
        )}

        {/* General Notes */}
        {/* {match.notes && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Additional Information</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {renderHtmlContent(match.notes)}
              </div>
            </div>
          </div>
        )} */}

        {/* Upcoming Match Info */}
        {isUpcoming && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100">Upcoming Match</h3>
                <p className="text-blue-700 dark:text-blue-300">
                  This match is scheduled for {new Date(match.date).toLocaleDateString('en-GB')} at {match.time}.
                  {match.location && ` The match will be played at ${match.location}.`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cancelled Match Info */}
        {isCancelled && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 p-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-red-900 dark:text-red-100">Match Cancelled</h3>
                <p className="text-red-700 dark:text-red-300">
                  This match has been cancelled. Please check the fixtures page for updated information.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
