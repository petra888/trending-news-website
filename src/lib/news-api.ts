import axios from 'axios';
import { NewsArticle } from '@/types';

// 키워드로 뉴스 검색
export async function searchNews(keyword: string): Promise<NewsArticle[]> {
  try {
    // 실제로는 News API, 네이버 뉴스 API 등을 사용
    const mockArticles: NewsArticle[] = [
      {
        id: `${keyword}-1`,
        title: `${keyword} 관련 최신 뉴스: 시장 동향 분석`,
        description: `${keyword}에 대한 최신 동향과 전문가 분석을 제공합니다.`,
        content: `최근 ${keyword}에 대한 관심이 급증하면서 관련 업계가 주목받고 있습니다...`,
        url: '#',
        imageUrl: `https://picsum.photos/400/300?random=${Math.random()}`,
        source: '경제신문',
        publishedAt: new Date(),
        keywords: [keyword, '트렌드', '분석'],
        viewCount: Math.floor(Math.random() * 10000),
      },
      {
        id: `${keyword}-2`,
        title: `${keyword} 트렌드: 전문가가 말하는 2024년 전망`,
        description: `2024년 ${keyword} 시장의 변화와 기회를 살펴봅니다.`,
        content: `전문가들은 ${keyword} 분야가 올해 큰 성장을 보일 것으로 예상하고 있습니다...`,
        url: '#',
        imageUrl: `https://picsum.photos/400/300?random=${Math.random()}`,
        source: 'IT뉴스',
        publishedAt: new Date(Date.now() - 3600000),
        keywords: [keyword, '2024', '전망'],
        viewCount: Math.floor(Math.random() * 10000),
      },
      {
        id: `${keyword}-3`,
        title: `${keyword} 완벽 가이드: 알아야 할 모든 것`,
        description: `${keyword}에 대해 꼭 알아야 할 핵심 정보를 정리했습니다.`,
        content: `${keyword}의 기초부터 고급 활용법까지 상세히 설명합니다...`,
        url: '#',
        imageUrl: `https://picsum.photos/400/300?random=${Math.random()}`,
        source: '테크블로그',
        publishedAt: new Date(Date.now() - 7200000),
        keywords: [keyword, '가이드', '정보'],
        viewCount: Math.floor(Math.random() * 10000),
      },
    ];
    
    return mockArticles;
  } catch (error) {
    console.error('뉴스 검색 실패:', error);
    return [];
  }
}

// RSS 피드에서 콘텐츠 수집
export async function fetchRSSFeeds(feedUrls: string[]): Promise<NewsArticle[]> {
  try {
    // RSS 피드 파싱 로직
    const articles: NewsArticle[] = [];
    // 실제 구현시 rss-parser 사용
    return articles;
  } catch (error) {
    console.error('RSS 피드 수집 실패:', error);
    return [];
  }
}

// 여러 키워드로 뉴스 일괄 검색
export async function searchMultipleKeywords(keywords: string[]): Promise<NewsArticle[]> {
  const searchPromises = keywords.map(keyword => searchNews(keyword));
  const results = await Promise.all(searchPromises);
  return results.flat();
}

// 인기 뉴스 가져오기
export async function getPopularNews(): Promise<NewsArticle[]> {
  try {
    const popularKeywords = ['AI', '경제', '정치', '연예', '스포츠'];
    return await searchMultipleKeywords(popularKeywords);
  } catch (error) {
    console.error('인기 뉴스 수집 실패:', error);
    return [];
  }
} 