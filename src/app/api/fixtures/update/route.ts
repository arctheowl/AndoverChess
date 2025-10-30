import { NextRequest, NextResponse } from 'next/server';
import { updateFromLMS } from '../../../../lib/lmsUpdateService';

// Simple in-memory cache to avoid excessive scraping
let cache: {
  data: any;
  timestamp: number;
} | null = null;

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * GET /api/fixtures/update
 * Fetches latest fixture results from LMS and returns new results
 */
export async function GET(request: NextRequest) {
  try {
    // Check cache first
    const now = Date.now();
    if (cache && (now - cache.timestamp) < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        cached: true,
        timestamp: new Date(cache.timestamp).toISOString(),
        ...cache.data
      });
    }

    // Rate limiting check (simple implementation)
    const rateLimitKey = request.headers.get('x-forwarded-for') || 'unknown';
    // In a real implementation, you'd want to use Redis or similar for rate limiting
    
    console.log('Fetching fresh data from LMS...');
    const result = await updateFromLMS();

    // Update cache
    cache = {
      data: result,
      timestamp: now
    };

    return NextResponse.json({
      success: true,
      cached: false,
      timestamp: new Date(now).toISOString(),
      ...result
    });

  } catch (error) {
    console.error('Error in fixtures update API:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

/**
 * POST /api/fixtures/update
 * Forces a fresh update (bypasses cache)
 */
export async function POST(request: NextRequest) {
  try {
    // Clear cache to force fresh fetch
    cache = null;
    
    console.log('Forcing fresh data fetch from LMS...');
    const result = await updateFromLMS();

    // Update cache
    cache = {
      data: result,
      timestamp: Date.now()
    };

    return NextResponse.json({
      success: true,
      cached: false,
      forced: true,
      timestamp: new Date().toISOString(),
      ...result
    });

  } catch (error) {
    console.error('Error in forced fixtures update API:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

/**
 * DELETE /api/fixtures/update
 * Clears the cache
 */
export async function DELETE() {
  cache = null;
  
  return NextResponse.json({
    success: true,
    message: 'Cache cleared',
    timestamp: new Date().toISOString()
  });
}
