# SARA - Next.js 멀티존 앱

Next.js 앱 라우터를 사용한 멀티존 구조 데모 애플리케이션입니다.

## 🚀 주요 기능

- **멀티존 구조**: 메인 앱과 서브앱들(네이버, 구글) 간의 독립적인 라우팅
- **공통 헤더**: 모든 페이지에서 유지되는 네비게이션 헤더
- **서브앱별 레이아웃**: 각 서브앱마다 고유한 디자인과 기능
- **반응형 디자인**: Tailwind CSS를 활용한 모던한 UI

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx          # 메인 레이아웃 (공통 헤더 포함)
│   ├── page.tsx            # 홈페이지
│   └── apps/               # 서브앱들
│       ├── naver/          # 네이버 서브앱
│       │   ├── layout.tsx  # 네이버 전용 레이아웃
│       │   ├── page.tsx    # 네이버 메인 페이지
│       │   ├── search/     # 네이버 검색
│       │   ├── news/       # 네이버 뉴스
│       │   └── map/        # 네이버 지도
│       └── google/         # 구글 서브앱
│           ├── layout.tsx  # 구글 전용 레이아웃
│           ├── page.tsx    # 구글 메인 페이지
│           ├── search/     # 구글 검색
│           ├── gmail/      # Gmail
│           └── drive/      # 구글 드라이브
└── components/
    └── Header.tsx          # 공통 네비게이션 헤더
```

## 🛠️ 기술 스택

- **Next.js 15**: 앱 라우터 기반
- **React 18**: 최신 React 기능 활용
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 스타일링
- **ESLint**: 코드 품질 관리

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 🎯 멀티존 구조의 장점

1. **독립적인 개발**: 각 서브앱은 독립적으로 개발하고 배포 가능
2. **코드 분리**: 서브앱별로 코드가 분리되어 유지보수 용이
3. **성능 최적화**: 필요한 코드만 로드하여 성능 향상
4. **팀 협업**: 각 팀이 담당 서브앱에 집중 가능
5. **확장성**: 새로운 서브앱 추가가 용이

## 📱 사용법

1. **홈페이지**: 메인 대시보드에서 서브앱 선택
2. **네이버 서브앱**: 검색, 뉴스, 지도 기능 체험
3. **구글 서브앱**: 검색, Gmail, 드라이브 기능 체험
4. **네비게이션**: 헤더를 통해 언제든지 다른 서브앱으로 이동

## 🔧 라우팅 설정

`next.config.js`에서 URL 리라이팅을 통해 깔끔한 URL 구조를 제공합니다:

```javascript
async rewrites() {
  return [
    {
      source: '/naver/:path*',
      destination: '/apps/naver/:path*',
    },
    {
      source: '/google/:path*',
      destination: '/apps/google/:path*',
    },
  ];
}
```

## 📝 라이선스

MIT License
