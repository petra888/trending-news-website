'use client';

import { useState, useEffect } from 'react';
import TrendingKeywords from '@/components/TrendingKeywords';
import NewsCard from '@/components/NewsCard';
import AdBanner from '@/components/AdBanner';
import { getAllTrends } from '@/lib/trending-api';
import { searchNews, getPopularNews } from '@/lib/news-api';
import { TrendingKeyword, NewsArticle } from '@/types';
import { RefreshCw, Search } from 'lucide-react';

export default function Home() {
  const [trendingKeywords, setTrendingKeywords] = useState<TrendingKeyword[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // 초기 데이터 로드
  useEffect(() => {
    loadInitialData();
    // 5분마다 자동 새로고침
    const interval = setInterval(refreshData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [trends, news] = await Promise.all([
        getAllTrends(),
        getPopularNews()
      ]);
      setTrendingKeywords(trends);
      setNewsArticles(news);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    try {
      const [trends, news] = await Promise.all([
        getAllTrends(),
        selectedKeyword ? searchNews(selectedKeyword) : getPopularNews()
      ]);
      setTrendingKeywords(trends);
      setNewsArticles(news);
    } catch (error) {
      console.error('데이터 새로고침 실패:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleKeywordClick = async (keyword: string) => {
    setSelectedKeyword(keyword);
    setLoading(true);
    try {
      const news = await searchNews(keyword);
      setNewsArticles(news);
    } catch (error) {
      console.error('뉴스 검색 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const news = await searchNews(searchTerm);
      setNewsArticles(news);
      setSelectedKeyword(searchTerm);
    } catch (error) {
      console.error('검색 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                📰 트렌딩 뉴스
              </h1>
            </div>
            
            {/* 검색바 */}
            <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="키워드 검색..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
            
            {/* 새로고침 버튼 */}
            <button
              onClick={refreshData}
              disabled={refreshing}
              className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* 상단 광고 배너 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AdBanner slot="top-banner" format="horizontal" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 왼쪽 사이드바 - 트렌딩 키워드 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TrendingKeywords 
                keywords={trendingKeywords}
                onKeywordClick={handleKeywordClick}
              />
              
              {/* 사이드바 광고 */}
              <div className="mt-6">
                <AdBanner slot="sidebar-1" format="vertical" />
              </div>
            </div>
          </div>

          {/* 메인 콘텐츠 - 뉴스 그리드 */}
          <div className="lg:col-span-3">
            {selectedKeyword && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  "{selectedKeyword}" 관련 뉴스
                </h2>
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {newsArticles.slice(0, 4).map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
                
                {/* 중간 광고 */}
                {newsArticles.length > 4 && (
                  <div className="my-8">
                    <AdBanner slot="middle-banner" format="horizontal" />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {newsArticles.slice(4, 8).map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
                
                {/* 하단 광고 */}
                {newsArticles.length > 8 && (
                  <div className="my-8">
                    <AdBanner slot="bottom-banner" format="horizontal" />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {newsArticles.slice(8).map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            )}
            
            {newsArticles.length === 0 && !loading && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">관련 뉴스가 없습니다.</p>
                <p className="mt-2">다른 키워드로 검색해보세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © 2024 트렌딩 뉴스. 실시간 트렌드와 뉴스를 한눈에.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              네이버, 구글, 다음, 네이트의 인기 검색어를 기반으로 관련 뉴스를 제공합니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
