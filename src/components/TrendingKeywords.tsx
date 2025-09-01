'use client';

import { useState, useEffect } from 'react';
import { TrendingKeyword, Platform } from '@/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const platforms: Platform[] = [
  { name: '네이버', id: 'naver', icon: 'N', color: 'bg-green-500' },
  { name: '구글', id: 'google', icon: 'G', color: 'bg-blue-500' },
  { name: '다음', id: 'daum', icon: 'D', color: 'bg-yellow-500' },
  { name: '네이트', id: 'nate', icon: 'N', color: 'bg-red-500' },
];

interface TrendingKeywordsProps {
  keywords: TrendingKeyword[];
  onKeywordClick: (keyword: string) => void;
}

export default function TrendingKeywords({ keywords, onKeywordClick }: TrendingKeywordsProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [filteredKeywords, setFilteredKeywords] = useState<TrendingKeyword[]>(keywords);

  useEffect(() => {
    if (selectedPlatform === 'all') {
      setFilteredKeywords(keywords);
    } else {
      setFilteredKeywords(keywords.filter(k => k.platform === selectedPlatform));
    }
  }, [keywords, selectedPlatform]);

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPlatformColor = (platformId: string) => {
    return platforms.find(p => p.id === platformId)?.color || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔥 실시간 트렌딩</h2>
      
      {/* 플랫폼 필터 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedPlatform('all')}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedPlatform === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          전체
        </button>
        {platforms.map(platform => (
          <button
            key={platform.id}
            onClick={() => setSelectedPlatform(platform.id)}
            className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
              selectedPlatform === platform.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <span className={`w-6 h-6 rounded-full ${platform.color} text-white text-xs flex items-center justify-center`}>
              {platform.icon}
            </span>
            {platform.name}
          </button>
        ))}
      </div>

      {/* 키워드 리스트 */}
      <div className="space-y-2">
        {filteredKeywords.slice(0, 10).map((keyword, index) => (
          <div
            key={`${keyword.platform}-${keyword.keyword}`}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => onKeywordClick(keyword.keyword)}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-400 w-6">
                {keyword.rank}
              </span>
              <span className={`w-6 h-6 rounded-full ${getPlatformColor(keyword.platform)} text-white text-xs flex items-center justify-center`}>
                {platforms.find(p => p.id === keyword.platform)?.icon}
              </span>
              <span className="font-medium">{keyword.keyword}</span>
            </div>
            <div className="flex items-center gap-2">
              {getTrendIcon(keyword.trend)}
              {keyword.searchVolume && (
                <span className="text-sm text-gray-500">
                  {keyword.searchVolume.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredKeywords.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          트렌딩 키워드를 불러오는 중...
        </div>
      )}
    </div>
  );
} 