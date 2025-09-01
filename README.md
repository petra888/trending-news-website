# 📰 트렌딩 뉴스 웹사이트

실시간 트렌딩 키워드를 수집하여 관련 뉴스를 자동으로 표시하는 웹사이트입니다.

## 🚀 주요 기능

- **실시간 트렌딩 키워드 수집**: 네이버, 구글, 다음, 네이트의 인기 검색어 수집
- **자동 뉴스 수집**: 트렌딩 키워드 기반 관련 뉴스 자동 수집 및 표시
- **광고 수익화**: Google AdSense 통합으로 광고 수익 창출
- **SEO 최적화**: 검색 엔진 최적화로 자연 유입 트래픽 확보
- **반응형 디자인**: 모바일, 태블릿, 데스크탑 완벽 지원

## 🛠 기술 스택

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## 📦 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/your-username/trending-news-website.git
cd trending-news-website
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:
```env
# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX

# News API Keys (실제 서비스시 필요)
NEWS_API_KEY=your_news_api_key_here
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret

# Google Custom Search API
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX=your_custom_search_engine_id
```

4. **개발 서버 실행**
```bash
npm run dev
```

5. **브라우저에서 확인**
`http://localhost:3000` 접속

## 🚀 배포

### Vercel 배포
1. [Vercel](https://vercel.com)에 로그인
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 자동 배포 완료

### 환경 변수 설정 (Vercel)
Vercel 대시보드에서 다음 환경 변수들을 설정하세요:
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- `NEWS_API_KEY`
- `NAVER_CLIENT_ID`
- `NAVER_CLIENT_SECRET`
- `GOOGLE_API_KEY`
- `GOOGLE_CX`

## 📊 수익화 전략

1. **트래픽 유입**
   - 실시간 트렌딩 키워드로 검색 유입 확보
   - SEO 최적화로 자연 검색 트래픽 증대

2. **광고 수익**
   - Google AdSense 광고 배치
   - 전략적 광고 위치 (헤더, 사이드바, 콘텐츠 중간)

3. **자동화**
   - 콘텐츠 자동 수집으로 운영 비용 최소화
   - 실시간 데이터 업데이트

## 🔧 개발 가이드

### 프로젝트 구조
```
src/
├── app/
│   ├── api/          # API 라우트
│   ├── layout.tsx    # 루트 레이아웃
│   └── page.tsx      # 메인 페이지
├── components/       # React 컴포넌트
├── lib/             # 유틸리티 함수
└── types/           # TypeScript 타입 정의
```

### 주요 컴포넌트
- `TrendingKeywords`: 실시간 트렌딩 키워드 표시
- `NewsCard`: 뉴스 카드 컴포넌트
- `AdBanner`: 광고 배너 컴포넌트

### API 엔드포인트
- `/api/trends`: 트렌딩 키워드 데이터
- `/api/news`: 뉴스 데이터 (키워드 검색 지원)

## 📝 TODO

- [ ] 실제 API 연동 (네이버, 구글 등)
- [ ] 데이터베이스 연동 (조회수, 통계)
- [ ] 사용자 관심사 기반 추천 시스템
- [ ] 소셜 미디어 공유 기능
- [ ] 관리자 대시보드

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

프로젝트 관련 문의: [your-email@example.com](mailto:your-email@example.com)

프로젝트 링크: [https://github.com/your-username/trending-news-website](https://github.com/your-username/trending-news-website)
