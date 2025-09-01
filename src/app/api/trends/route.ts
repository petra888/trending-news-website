import { NextResponse } from 'next/server';
import { getAllTrends } from '@/lib/trending-api';

export async function GET() {
  try {
    const trends = await getAllTrends();
    
    // 캐시 헤더 설정 (5분)
    return NextResponse.json(trends, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('트렌드 API 에러:', error);
    return NextResponse.json(
      { error: '트렌드 데이터를 가져올 수 없습니다.' },
      { status: 500 }
    );
  }
} 