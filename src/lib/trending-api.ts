import axios from 'axios';
import { TrendingKeyword } from '@/types';

// 네이버 실시간 검색어 (데이터랩 API 활용)
export async function getNaverTrends(): Promise<TrendingKeyword[]> {
  try {
    // 네이버 데이터랩 API는 실제로는 인증이 필요합니다
    // 여기서는 예시 구조를 보여드립니다
    const mockData: TrendingKeyword[] = [
      { keyword: '날씨', platform: 'naver', rank: 1, trend: 'up', timestamp: new Date() },
      { keyword: '주식', platform: 'naver', rank: 2, trend: 'stable', timestamp: new Date() },
      { keyword: '부동산', platform: 'naver', rank: 3, trend: 'down', timestamp: new Date() },
      { keyword: '코로나', platform: 'naver', rank: 4, trend: 'down', timestamp: new Date() },
      { keyword: '연예인', platform: 'naver', rank: 5, trend: 'up', timestamp: new Date() },
    ];
    return mockData;
  } catch (error) {
    console.error('네이버 트렌드 수집 실패:', error);
    return [];
  }
}

// 구글 트렌드
export async function getGoogleTrends(): Promise<TrendingKeyword[]> {
  try {
    // Google Trends API 연동
    const mockData: TrendingKeyword[] = [
      { keyword: 'ChatGPT', platform: 'google', rank: 1, trend: 'up', timestamp: new Date() },
      { keyword: 'AI', platform: 'google', rank: 2, trend: 'up', timestamp: new Date() },
      { keyword: 'Bitcoin', platform: 'google', rank: 3, trend: 'stable', timestamp: new Date() },
      { keyword: 'Tesla', platform: 'google', rank: 4, trend: 'down', timestamp: new Date() },
      { keyword: 'iPhone', platform: 'google', rank: 5, trend: 'stable', timestamp: new Date() },
    ];
    return mockData;
  } catch (error) {
    console.error('구글 트렌드 수집 실패:', error);
    return [];
  }
}

// 다음 실시간 검색어
export async function getDaumTrends(): Promise<TrendingKeyword[]> {
  try {
    // 다음 실시간 검색어 크롤링
    const mockData: TrendingKeyword[] = [
      { keyword: '정치', platform: 'daum', rank: 1, trend: 'up', timestamp: new Date() },
      { keyword: '경제', platform: 'daum', rank: 2, trend: 'stable', timestamp: new Date() },
      { keyword: '사회', platform: 'daum', rank: 3, trend: 'up', timestamp: new Date() },
      { keyword: '문화', platform: 'daum', rank: 4, trend: 'down', timestamp: new Date() },
      { keyword: '스포츠', platform: 'daum', rank: 5, trend: 'stable', timestamp: new Date() },
    ];
    return mockData;
  } catch (error) {
    console.error('다음 트렌드 수집 실패:', error);
    return [];
  }
}

// 네이트 실시간 검색어
export async function getNateTrends(): Promise<TrendingKeyword[]> {
  try {
    // 네이트 실시간 검색어 크롤링
    const mockData: TrendingKeyword[] = [
      { keyword: '드라마', platform: 'nate', rank: 1, trend: 'up', timestamp: new Date() },
      { keyword: '영화', platform: 'nate', rank: 2, trend: 'stable', timestamp: new Date() },
      { keyword: '게임', platform: 'nate', rank: 3, trend: 'up', timestamp: new Date() },
      { keyword: '패션', platform: 'nate', rank: 4, trend: 'down', timestamp: new Date() },
      { keyword: '맛집', platform: 'nate', rank: 5, trend: 'up', timestamp: new Date() },
    ];
    return mockData;
  } catch (error) {
    console.error('네이트 트렌드 수집 실패:', error);
    return [];
  }
}

// 모든 플랫폼 트렌드 수집
export async function getAllTrends(): Promise<TrendingKeyword[]> {
  const [naver, google, daum, nate] = await Promise.all([
    getNaverTrends(),
    getGoogleTrends(),
    getDaumTrends(),
    getNateTrends(),
  ]);
  
  return [...naver, ...google, ...daum, ...nate];
} 