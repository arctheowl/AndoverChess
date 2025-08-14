import { NextRequest, NextResponse } from 'next/server';
import { getCompletedFixtures, getRecentResults } from '@/data/fixtures';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const recent = searchParams.get('recent');

    let results = getCompletedFixtures();

    // If recent parameter is provided, get only recent results
    if (recent === 'true') {
      results = getRecentResults();
    }

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum)) {
        results = results.slice(0, limitNum);
      }
    }

    // Calculate summary statistics
    const summary = {
      total: results.length,
      won: results.filter(f => f.result === 'won').length,
      lost: results.filter(f => f.result === 'lost').length,
      drawn: results.filter(f => f.result === 'drew').length,
      winRate: Math.round((results.filter(f => f.result === 'won').length / results.length) * 100)
    };

    return NextResponse.json({
      success: true,
      data: results,
      summary,
      count: results.length
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}
