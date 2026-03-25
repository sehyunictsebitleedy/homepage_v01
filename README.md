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
├── data/                       # JSON 콘텐츠 (CMS 데이터 소스)
│   ├── site.json               # 사이트 설정 (이름, SEO, 푸터)
│   ├── nav.json                # 내비게이션 메뉴
│   ├── home.json               # 홈페이지 섹션 (Hero, Services, About, CTA)
│   ├── company.json            # 회사 소개
│   ├── business.json           # 사업 영역
│   ├── project.json            # 주요 프로젝트
│   ├── product.json            # 제품 소개
│   └── contact.json            # 연락처
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (SEO → site.json)
│   ├── page.tsx                # 홈페이지 (서버 컴포넌트 → home.json)
│   ├── HomeContent.tsx         # 홈페이지 클라이언트 컴포넌트
│   ├── globals.css             # 전역 스타일 (grain, neon-glow, outline text)
│   ├── company/
│   │   ├── page.tsx            # 서버 컴포넌트 (company.json 읽기)
│   │   └── CompanyContent.tsx  # 클라이언트 컴포넌트 (애니메이션)
│   ├── business/
│   │   ├── page.tsx
│   │   └── BusinessContent.tsx
│   ├── project/
│   │   ├── page.tsx
│   │   └── ProjectContent.tsx
│   ├── product/
│   │   ├── page.tsx
│   │   └── ProductContent.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   └── ContactContent.tsx
│   └── admin/
│       ├── login/              # 로그인 (server action + useActionState)
│       ├── logout/             # 로그아웃 (server action)
│       └── (protected)/        # 세션 보호 라우트 그룹
│           ├── layout.tsx      # CMS 레이아웃 (사이드바, 세션 검증)
│           ├── page.tsx        # 대시보드
│           ├── home/           # 홈페이지 섹션 관리
│           ├── nav/            # 내비게이션 관리
│           ├── company/        # 회사 소개 관리
│           ├── business/       # 사업 영역 관리
│           ├── project/        # 프로젝트 관리
│           ├── product/        # 제품 관리
│           ├── contact/        # 연락처 관리
│           └── settings/       # 사이트 설정 (SEO, 푸터)
├── components/
│   └── ui/
│       ├── Navbar.tsx          # 서버 컴포넌트 (nav.json 읽기)
│       ├── NavbarContent.tsx   # 클라이언트 컴포넌트 (햄버거 메뉴)
│       ├── MarqueeBar.tsx      # 키워드 마퀴 배너
│       ├── SplitText.tsx       # 글자별 reveal 애니메이션
│       └── ScrambleText.tsx    # 문자 decode 애니메이션
├── lib/
│   ├── auth.ts                 # 세션 관리 (HMAC-SHA256)
│   ├── data.ts                 # JSON 파일 read/write 헬퍼
│   └── types.ts                # 전체 타입 정의
└── proxy.ts                    # /admin/* 라우트 보호 (Next.js 16 middleware)
```

## CMS 아키텍처

모든 콘텐츠는 `data/*.json` 파일로 관리됩니다.

```
어드민 저장 → Server Action → writeData() → data/*.json
프론트엔드  → readData()   → data/*.json → 서버 컴포넌트 → 클라이언트 컴포넌트
```

### 관리 가능 항목

| 어드민 메뉴 | 경로 | 관리 내용 |
|---|---|---|
| Home | `/admin/home` | Hero, Services 카드, About, CTA |
| Navigation | `/admin/nav` | GNB 메뉴 추가·삭제·활성화 |
| Company | `/admin/company` | 회사 소개, Mission/Vision, 연혁 |
| Business | `/admin/business` | 사업 영역, 태그 |
| Project | `/admin/project` | 프로젝트 목록 |
| Product | `/admin/product` | 제품 소개, 기능 목록, 컬러 |
| Contact | `/admin/contact` | 전화·이메일·주소 |
| Settings | `/admin/settings` | 사이트명, SEO, 푸터, 설립연도 |

## 디자인 시스템

### 컬러
| 변수 | 값 | 용도 |
|---|---|---|
| 배경 | `#080808` | 전체 배경 |
| 기본 텍스트 | `#f0f0f0` | 본문 |
| 라임 포인트 | `#c8ff00` | 강조, 버튼, 아이콘 |
| 핑크 포인트 | `#ff3cac` | 보조 강조 |
| 경계선 | `#1e1e1e` | 보더 |

### 텍스트 컬러 팔레트
| 클래스 | 색상값 | 용도 |
|---|---|---|
| `text-[#ededed]` | `#ededed` | 본문 설명 |
| `text-[#ddd9d9]` | `#ddd9d9` | 보조 텍스트 |
| `text-[#d1d1d1]` | `#d1d1d1` | 레이블 / 메타 |
| `text-[#b5b5b5]` | `#b5b5b5` | 설명 / 서브 |
| `text-[#a1a1a1]` | `#a1a1a1` | 넘버링 / 약한 강조 |

### 타이포그래피 효과
- **SplitText** — 글자 단위 마스크 슬라이드 reveal
- **ScrambleText** — 랜덤 문자 → 실제 텍스트 decode 효과
- **`.text-neon`** — 네온 글로우 브리딩 애니메이션 (`#c8ff00`)
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

리다이렉트 루프 방지를 위해 `/admin/login`은 `(protected)` 라우트 그룹 외부에 위치합니다.

## About 텍스트 강조 마크업

`home.json`의 `about.text`에서 `**텍스트**` 형식으로 라임 강조를 표현합니다.

```json
"text": "세현ICT는 GIS·CAD 기반의 스마트 IT 솔루션을 통해 **고객의 디지털 인프라를 혁신**하는 전문 기업입니다."
```

## 주의사항

- `.env` 파일은 절대 커밋하지 마세요
- `any` 타입 사용 금지 (TypeScript strict 모드)
- 커스텀 CSS 파일 생성 금지 — Tailwind 유틸리티 + `globals.css`만 사용
- `data/*.json`은 런타임에 직접 수정되므로 git에서 추적되지만, 운영 서버에서는 별도 관리 권장
