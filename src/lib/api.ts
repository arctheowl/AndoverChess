const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
  summary?: any;
  error?: string;
  source?: string;
  clubCode?: string;
  org?: string;
}

export interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: 'home' | 'away';
  competition: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  result?: string;
  score?: string;
  notes?: string;
}

export interface ResultsSummary {
  total: number;
  won: number;
  lost: number;
  drawn: number;
  winRate: number;
}

// Generic API call function
async function apiCall<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
  try {
    const url = new URL(`${API_BASE_URL}/api${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Fixture API functions
export const fixturesApi = {
  // Get all fixtures with optional filtering
  getAll: (params?: { status?: string; limit?: string }) => 
    apiCall<Fixture[]>('/fixtures', params),

  // Get upcoming fixtures
  getUpcoming: (limit?: string) => 
    apiCall<Fixture[]>('/fixtures/upcoming', limit ? { limit } : undefined),

  // Get completed fixtures and results
  getResults: (params?: { limit?: string; recent?: string }) => 
    apiCall<Fixture[]>('/fixtures/results', params),

  // Get a specific fixture by ID
  getById: (id: string) => 
    apiCall<Fixture>(`/fixtures/${id}`),

  // Get recent results with summary
  getRecentResults: () => 
    apiCall<Fixture[]>('/fixtures/results', { recent: 'true' }),

  // ECF LMS Integration
  getFromECF: (params: { clubCode: string; org?: string; status?: string }) => 
    apiCall<Fixture[]>('/fixtures/ecf', params)
};

// Helper function to get results with summary
export const getResultsWithSummary = async () => {
  const response = await apiCall<Fixture[]>('/fixtures/results');
  return response;
};

// Helper function to get upcoming fixtures with limit
export const getUpcomingFixtures = async (limit: number = 5) => {
  const response = await apiCall<Fixture[]>('/fixtures/upcoming', { limit: limit.toString() });
  return response;
};

// Helper function to get all fixtures by status
export const getFixturesByStatus = async (status: 'upcoming' | 'completed' | 'cancelled') => {
  const response = await apiCall<Fixture[]>('/fixtures', { status });
  return response;
};

// ECF LMS Helper functions
export const ecfApi = {
  // Get fixtures for a specific club from ECF LMS
  getClubFixtures: async (clubCode: string, org: string = '1', status?: string) => {
    const params: Record<string, string> = { clubCode, org };
    if (status) params.status = status;
    return apiCall<Fixture[]>('/fixtures/ecf', params);
  },

  // Get upcoming fixtures for a club
  getUpcomingFixtures: async (clubCode: string, org: string = '1') => {
    return apiCall<Fixture[]>('/fixtures/ecf', { clubCode, org, status: 'upcoming' });
  },

  // Get completed fixtures for a club
  getCompletedFixtures: async (clubCode: string, org: string = '1') => {
    return apiCall<Fixture[]>('/fixtures/ecf', { clubCode, org, status: 'completed' });
  },

  // Get all fixtures for a club
  getAllFixtures: async (clubCode: string, org: string = '1') => {
    return apiCall<Fixture[]>('/fixtures/ecf', { clubCode, org, status: 'all' });
  }
};
