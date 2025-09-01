import { NextRequest, NextResponse } from 'next/server';
import { searchNews, getPopularNews } from '@/lib/news-api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword');
    
    let news;
    if (keyword) {
      news = await searchNews(keyword);
    } else {
      news = await getPopularNews();
    }
    
    // 캐시 헤더 설정 (10분)
    return NextResponse.json(news, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
      },
    });
  } catch (error) {
    console.error('뉴스 API 에러:', error);
    return NextResponse.json(
      { error: '뉴스 데이터를 가져올 수 없습니다.' },
      { status: 500 }
    );
  }
} 