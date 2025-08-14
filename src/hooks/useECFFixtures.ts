'use client';

import { useState, useEffect } from 'react';
import { ecfApi, Fixture, ApiResponse } from '@/lib/api';

interface UseECFFixturesOptions {
  clubCode: string;
  org?: string;
  status?: 'upcoming' | 'completed' | 'all';
  autoFetch?: boolean;
}

interface UseECFFixturesReturn {
  fixtures: Fixture[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  source: string | undefined;
}

export const useECFFixtures = (options: UseECFFixturesOptions): UseECFFixturesReturn => {
  const { clubCode, org = '1', status = 'all', autoFetch = true } = options;
  
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string | undefined>();

  const fetchFixtures = async () => {
    try {
      setLoading(true);
      setError(null);

      let response: ApiResponse<Fixture[]>;

      if (status === 'upcoming') {
        response = await ecfApi.getUpcomingFixtures(clubCode, org);
      } else if (status === 'completed') {
        response = await ecfApi.getCompletedFixtures(clubCode, org);
      } else {
        response = await ecfApi.getAllFixtures(clubCode, org);
      }

      if (response.success) {
        setFixtures(response.data);
        setSource(response.source);
      } else {
        setError(response.error || 'Failed to fetch fixtures from ECF LMS');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching from ECF LMS');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && clubCode) {
      fetchFixtures();
    }
  }, [clubCode, org, status, autoFetch]);

  return {
    fixtures,
    loading,
    error,
    refetch: fetchFixtures,
    source
  };
};

// Specific hooks for common use cases
export const useECFUpcomingFixtures = (clubCode: string, org: string = '1') => {
  return useECFFixtures({ clubCode, org, status: 'upcoming' });
};

export const useECFCompletedFixtures = (clubCode: string, org: string = '1') => {
  return useECFFixtures({ clubCode, org, status: 'completed' });
};

export const useECFAllFixtures = (clubCode: string, org: string = '1') => {
  return useECFFixtures({ clubCode, org, status: 'all' });
};
