export interface TrendingKeyword {
  keyword: string;
  platform: 'naver' | 'google' | 'daum' | 'nate';
  rank: number;
  searchVolume?: number;
  trend?: 'up' | 'down' | 'stable';
  timestamp: Date;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  imageUrl?: string;
  source: string;
  publishedAt: Date;
  keywords: string[];
  viewCount?: number;
}

export interface Platform {
  name: string;
  id: 'naver' | 'google' | 'daum' | 'nate';
  icon: string;
  color: string;
}

export interface AdSpace {
  id: string;
  type: 'banner' | 'sidebar' | 'inline';
  position: 'top' | 'bottom' | 'left' | 'right' | 'middle';
  width?: number;
  height?: number;
} 