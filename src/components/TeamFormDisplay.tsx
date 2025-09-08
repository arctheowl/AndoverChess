'use client';

import { getRecentTeamResults } from '@/lib/teamFixtures';

interface TeamFormDisplayProps {
  teamName: string;
  className?: string;
}

export default function TeamFormDisplay({ teamName, className = '' }: TeamFormDisplayProps) {
  const recentResults = getRecentTeamResults(teamName);
  
  // If no recent results, show placeholder
  if (recentResults.length === 0) {
    return (
      <div className={`${className}`}>
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Recent Form</h4>
        <div className="flex gap-1 justify-center">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
              title="No recent matches"
            >
              <span className="text-xs text-gray-400 dark:text-gray-500">-</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 text-center">No recent matches</p>
      </div>
    );
  }

  // Get the last 5 results, padding with empty slots if needed
  const formResults = [...recentResults].reverse().slice(0, 5);
  const emptySlots = 5 - formResults.length;

  const getResultIcon = (result: string | undefined) => {
    if (!result) return null;
    
    switch (result.toLowerCase()) {
      case 'win':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'loss':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      case 'draw':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <span className="text-xs text-white font-bold">?</span>
        );
    }
  };

  const getResultColor = (result: string | undefined) => {
    if (!result) return 'bg-gray-200 dark:bg-gray-700';
    
    switch (result.toLowerCase()) {
      case 'win':
        return 'bg-green-500';
      case 'loss':
        return 'bg-red-500';
      case 'draw':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getResultTooltip = (result: string | undefined, opponent: string, date: string) => {
    if (!result) return 'No result available';
    
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    });
    
    return `${result} vs ${opponent} (${formattedDate})`;
  };

  return (
    <div className={`${className}`}>
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Recent Form</h4>
      <div className="flex gap-1 justify-center">
        {/* Empty slots for missing results */}
        {emptySlots > 0 && [...Array(emptySlots)].map((_, index) => (
          <div
            key={`empty-${index}`}
            className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
            title="No recent match"
          >
            <span className="text-xs text-gray-400 dark:text-gray-500">-</span>
          </div>
        ))}
        
        {/* Actual results */}
        {formResults.map((match, index) => (
          <div
            key={match.id}
            className={`w-6 h-6 rounded-full ${getResultColor(match.result)} flex items-center justify-center cursor-pointer transition-transform hover:scale-110`}
            title={getResultTooltip(match.result, match.opponent, match.date)}
          >
            {getResultIcon(match.result)}
          </div>
        ))}
      </div>
      
      {/* Form summary */}
      {formResults.length > 0 && (
        <div className="mt-2 text-center">
          <div className="flex justify-center gap-2 text-xs">
            <span className="text-green-600 dark:text-green-400">
              W: {formResults.filter(m => m.result?.toLowerCase() === 'win').length}
            </span>
            <span className="text-yellow-600 dark:text-yellow-400">
              D: {formResults.filter(m => m.result?.toLowerCase() === 'draw').length}
            </span>
            <span className="text-red-600 dark:text-red-400">
              L: {formResults.filter(m => m.result?.toLowerCase() === 'loss').length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
