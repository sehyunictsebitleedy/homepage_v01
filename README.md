# SEHYUN ICT — Homepage Renewal

> http://sehyunict.com 리뉴얼 프로젝트

## 기술 스택

| 항목 | 버전 |
|---|---|
| Next.js | 16.1.6 (App Router) |
| React | 19.2.3 |
| TypeScript | 5.x (strict) |
| Tailwind CSS | v4 |
| framer-motion | v12 |
| lucide-react | latest |

## 개발 환경 시작

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

## 프로젝트 구조

```
homepage_v01/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (Navbar 포함)
│   ├── page.tsx            # 홈페이지
│   ├── globals.css         # 전역 스타일 (grain, glitch, outline text)
│   ├── company/page.tsx    # 회사 소개
│   ├── business/page.tsx   # 사업 영역
│   ├── project/page.tsx    # 주요 프로젝트
│   ├── product/page.tsx    # 제품 소개
│   ├── contact/page.tsx    # 연락처
│   └── admin/
│       ├── layout.tsx      # CMS 레이아웃 (사이드바, 세션 검증)
│       ├── page.tsx        # CMS 대시보드
│       └── login/          # 관리자 로그인
├── components/
│   └── ui/
│       ├── Navbar.tsx      # 상단 네비게이션 (fixed, blur)
│       ├── MarqueeBar.tsx  # 키워드 마퀴 배너
│       ├── SplitText.tsx   # 글자별 reveal 애니메이션
│       └── ScrambleText.tsx # 문자 decode 애니메이션
├── lib/
│   └── auth.ts             # 세션 관리 (HMAC-SHA256)
└── proxy.ts                # /admin/* 라우트 보호
```

## 디자인 시스템

### 컬러
| 변수 | 값 | 용도 |
|---|---|---|
| `--background` | `#080808` | 전체 배경 |
| `--foreground` | `#f0f0f0` | 기본 텍스트 |
| `--accent` | `#c8ff00` | 라임 포인트 |
| `--accent-2` | `#ff3cac` | 핑크 포인트 |
| `--border` | `#1e1e1e` | 경계선 |

### 타이포그래피 효과
- **SplitText** — 글자 단위 마스크 슬라이드 reveal
- **ScrambleText** — 랜덤 문자 → 실제 텍스트 decode 효과
- **`.glitch`** — clip-path 기반 RGB 분리 글리치 (::before `#ff3cac`, ::after `#c8ff00`)
- **`.text-outline`** — `-webkit-text-stroke` 아웃라인 텍스트

### 텍스처
- `body::before` — SVG fractalNoise grain 오버레이 (opacity 3.5%)
- 히어로 배경 — CSS 그리드 라인 (80px, opacity 25%)

## 관리자 CMS

접속: `http://localhost:3000/admin/login`

| 환경변수 | 기본값 | 설명 |
|---|---|---|
| `ADMIN_USER` | `admin` | 관리자 아이디 |
| `ADMIN_PASSWORD` | `admin1234` | 관리자 비밀번호 |
| `ADMIN_SECRET` | `dev-secret-...` | 세션 서명 키 |

> **주의:** 프로덕션에서는 반드시 `.env` 파일에 위 변수를 설정하세요.

세션은 HMAC-SHA256 서명된 httpOnly 쿠키로 관리되며 8시간 유효합니다.

## 주의사항

- `.env` 파일은 절대 커밋하지 마세요
- `any` 타입 사용 금지 (TypeScript strict 모드)
- 커스텀 CSS 파일 생성 금지 — Tailwind 유틸리티 + `globals.css`만 사용
