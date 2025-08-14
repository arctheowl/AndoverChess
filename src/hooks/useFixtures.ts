'use client';

import { useState, useEffect } from 'react';
import { fixturesApi, Fixture, ApiResponse } from '@/lib/api';

interface UseFixturesOptions {
  status?: 'upcoming' | 'completed' | 'cancelled';
  limit?: number;
  recent?: boolean;
}

interface UseFixturesReturn {
  fixtures: Fixture[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFixtures = (options: UseFixturesOptions = {}): UseFixturesReturn => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFixtures = async () => {
    try {
      setLoading(true);
      setError(null);

      let response: ApiResponse<Fixture[]>;

      if (options.recent) {
        response = await fixturesApi.getRecentResults();
      } else if (options.status === 'upcoming') {
        response = await fixturesApi.getUpcoming(options.limit?.toString());
      } else if (options.status === 'completed') {
        response = await fixturesApi.getResults({ 
          limit: options.limit?.toString(),
          recent: options.recent ? 'true' : undefined
        });
      } else {
        response = await fixturesApi.getAll({
          status: options.status,
          limit: options.limit?.toString()
        });
      }

      if (response.success) {
        setFixtures(response.data);
      } else {
        setError(response.error || 'Failed to fetch fixtures');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, [options.status, options.limit, options.recent]);

  return {
    fixtures,
    loading,
    error,
    refetch: fetchFixtures
  };
};

// Specific hooks for common use cases
export const useUpcomingFixtures = (limit?: number) => {
  return useFixtures({ status: 'upcoming', limit });
};

export const useRecentResults = () => {
  return useFixtures({ status: 'completed', recent: true });
};

export const useAllResults = (limit?: number) => {
  return useFixtures({ status: 'completed', limit });
};

export const useAllFixtures = () => {
  return useFixtures();
};
