import { NextRequest, NextResponse } from 'next/server';
import { fixtures } from '@/data/fixtures';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const fixture = fixtures.find(f => f.id === id);
    
    if (!fixture) {
      return NextResponse.json(
        { success: false, error: 'Fixture not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: fixture
    });
  } catch (error) {
    console.error('Error fetching fixture:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fixture' },
      { status: 500 }
    );
  }
}
