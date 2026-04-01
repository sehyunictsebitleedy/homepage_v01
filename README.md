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
│   ├── contact.json            # 연락처
│   ├── partners.json           # 협력사 목록 (마퀴 배너)
│   └── users.json              # LINE WORKS 어드민 사용자 목록
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
│   ├── api/
│   │   └── auth/
│   │       ├── works/          # LINE WORKS OAuth 시작 (GET → 인증 페이지 리디렉트)
│   │       └── callback/       # LINE WORKS OAuth 콜백 (코드 교환 → 세션 생성)
│   └── admin/
│       ├── login/              # 로그인 (LINE WORKS 버튼 + Superadmin 폼)
│       ├── logout/             # 로그아웃 (server action)
│       └── (protected)/        # 세션 보호 라우트 그룹
│           ├── layout.tsx      # CMS 레이아웃 (역할별 메뉴 필터링)
│           ├── page.tsx        # 대시보드
│           ├── home/           # 홈페이지 섹션 관리
│           ├── nav/            # 내비게이션 관리
│           ├── company/        # 회사 소개 관리
│           ├── business/       # 사업 영역 관리
│           ├── project/        # 프로젝트 관리
│           ├── product/        # 제품 관리
│           ├── contact/        # 연락처 관리
│           ├── settings/       # 사이트 설정 (SEO, 푸터)
│           └── users/          # 사용자 관리 (Admin+만 접근)
├── components/
│   └── ui/
│       ├── Navbar.tsx          # 서버 컴포넌트 (nav.json 읽기)
│       ├── NavbarContent.tsx   # 클라이언트 컴포넌트 (햄버거 메뉴, SEbit 버튼)
│       ├── MarqueeBar.tsx      # 협력사 마퀴 배너 (partners props)
│       ├── TiltCard.tsx        # 마우스 방향 3D 틸트 카드 래퍼
│       ├── CountUp.tsx         # 뷰포트 진입 시 숫자 카운트업
│       ├── SplitText.tsx       # 글자별 reveal 애니메이션
│       └── ScrambleText.tsx    # 문자 decode 애니메이션
├── lib/
│   ├── auth.ts                 # 세션 관리 (HMAC-SHA256, SessionUser 포함)
│   ├── users.ts                # LINE WORKS 사용자 CRUD
│   ├── data.ts                 # JSON 파일 read/write 헬퍼
│   └── types.ts                # 전체 타입 정의 (AdminUser, UserRole 등)
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
| Contact | `/admin/contact` | 전화·이메일·주소·지도 검색어·지도 embed URL |
| Settings | `/admin/settings` | 사이트명, SEO, 푸터, 설립연도 |
| Partners | `/admin/partners` | 협력사 마퀴 배너 추가·삭제 |

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
- **`.text-glitch`** — 크로마틱 어버레이션 글리치 (핑크/시안 이중 레이어, `steps(1)`)

### Hover / 인터랙션 효과
- **`.sebit-card`** — 좌측 accent 바 + shine sweep + box-shadow 글로우
- **`.card-hover`** — 카드 translateY lift + border 글로우
- **`.link-underline`** — 슬라이드 언더라인 (`::after` width 0→100%)
- **`TiltCard`** — 마우스 위치 기반 perspective 3D 틸트 (intensity 조절 가능)
- **`CountUp`** — framer-motion `useInView` 기반 cubic ease-out 카운트업
- **`template.tsx`** — 페이지 전환 시 하단 6px 라임→핑크 그라디언트 라인 (`scaleX: 0→1→0`)

### 텍스처
- `body::before` — SVG fractalNoise grain 오버레이 (opacity 3.5%)
- 히어로 배경 — CSS 그리드 라인 (80px, opacity 25%)

## 관리자 CMS

접속: `http://localhost:3000/admin/login`

### 환경변수 (`.env`)

| 환경변수 | 기본값 | 설명 |
|---|---|---|
| `ADMIN_USER` | `admin` | Superadmin 아이디 |
| `ADMIN_PASSWORD` | `admin1234` | Superadmin 비밀번호 |
| `ADMIN_SECRET` | `dev-secret-...` | 세션 서명 키 |
| `WORKS_CLIENT_ID` | — | LINE WORKS OAuth Client ID |
| `WORKS_CLIENT_SECRET` | — | LINE WORKS OAuth Client Secret |
| `NEXTAUTH_URL` | `http://localhost:3000` | 서비스 도메인 (Redirect URI 기반) |

### 로그인 방식

1. **LINE WORKS OAuth** — LINE WORKS 계정으로 로그인 (일반 사용자용)
   - `/admin/users`에서 LINE WORKS 이메일을 미리 등록해야 로그인 가능
   - LINE WORKS Developer Console에서 앱 생성 후 Redirect URI 등록: `{NEXTAUTH_URL}/api/auth/callback`
2. **Superadmin** — 아이디/비밀번호 (env 변수 기반, 항상 최고 권한)

### 역할 (Role)

| 역할 | 메뉴 접근 |
|---|---|
| `superadmin` | 전체 |
| `admin` | 전체 (Users, Settings 포함) |
| `editor` | 콘텐츠만 (Users, Settings 접근 불가) |

세션은 HMAC-SHA256 서명된 httpOnly 쿠키로 관리되며 8시간 유효합니다.

세션 토큰 형식: `{userId}:{role}.{HMAC-SHA256}` — `proxy.ts`가 이 형식을 검증하며, 구형/만료 쿠키는 로그인 페이지 진입 시 자동 삭제됩니다.

### LINE WORKS 설정 단계

1. [LINE WORKS Developer Console](https://dev.worksmobile.com) → 앱 생성
2. OAuth 2.0 → Redirect URI 등록
   - 로컬: `http://localhost:3000/api/auth/callback`
   - 운영: `https://sehyunict.com/api/auth/callback`
3. Client ID / Client Secret 복사 → `.env`에 설정
4. Superadmin으로 로그인 → `/admin/users`에서 LINE WORKS 이메일 등록

### 사용자 등록 (`data/users.json`)

관리자가 직접 등록하며 자동 가입 없음. 등록된 이메일만 LINE WORKS 로그인 가능.

```json
{
  "users": [
    {
      "id": "uuid",
      "worksId": "user@company.com",
      "displayName": "홍길동",
      "role": "editor",
      "status": "active",
      "createdAt": "2026-03-31T00:00:00.000Z"
    }
  ]
}
```

### 어드민 접속 안 될 때

리디렉션 루프 발생 시 브라우저에서 `admin_session` 쿠키를 직접 삭제하거나, 개발자 도구 → Application → Cookies에서 삭제 후 재접속.

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
- `lib/auth.ts` / `lib/users.ts` / `lib/types.ts` 변경 시 — 임포트하는 모든 파일 함께 수정 후 `npx tsc --noEmit` 확인 필수
- 인증 흐름 변경 시 — `proxy.ts` + `(protected)/layout.tsx` + `login/actions.ts` 세 파일 세트로 점검

---

## 변경 이력

### 2026-04-01 — UI 세부 조정

#### Contact 지도 줌 아웃
- `data/contact.json` mapEmbedUrl의 Google Maps 반경 파라미터 `198m → 1200m`으로 확대
- `ContactContent.tsx` OpenStreetMap 폴백 bbox도 넓혀 주변 맥락 표시

#### 홈 About 섹션
- About Company 버튼을 텍스트 오른쪽 끝으로 이동 (`flex-row items-end` + `shrink-0`)
- 섹션 상하 패딩 `py-14 → py-24`로 확대
- `HighlightText` 컴포넌트가 `\n`을 `<br />`로 렌더링하도록 수정 — JSON에서 줄바꿈 가능

#### 홈 SEbit Brand 섹션 컬러 통일
- 브랜드 카드 h3 타이틀: accent 컬러 → `#f0f0f0` 흰색으로 변경
- 브랜드 카드 태그(LLM 등): accent 컬러 테두리 → `#333` 테두리 + `#f0f0f0` 텍스트로 통일

#### 페이지 전환 라인
- `template.tsx` 라인 두께 `3px → 6px`

---

### 2026-03-31 (3) — 역할 기반 어드민 권한 시스템 (LINE WORKS OAuth)

#### 인증 아키텍처 개편
- **세션 토큰 구조 변경**: `"authenticated.{hmac}"` → `"{userId}:{role}.{hmac}"`
- `lib/auth.ts`: `getSession()` 반환 타입 `boolean` → `SessionUser | null` (`{ id, role }`)
- `lib/auth.ts`: `setSession(userId, role)` 파라미터 추가
- `lib/users.ts` 신규: LINE WORKS 기반 사용자 CRUD (`readUsers`, `writeUsers`, `findUserByWorksId`, `addUser`, `updateUser`, `removeUser`)
- `data/users.json` 신규: 사용자 레지스트리 (관리자가 직접 등록)

#### LINE WORKS OAuth 2.0 로그인
- `app/api/auth/works/route.ts` — OAuth 시작 (state 생성 → LINE WORKS 인증 페이지 리디렉트)
- `app/api/auth/callback/route.ts` — 콜백 처리 (코드 → 토큰 교환 → 사용자 정보 조회 → 세션 생성)
- 로그인 흐름: LINE WORKS 버튼 클릭 → OAuth 인증 → `users.json` 조회 → 세션 발급
- state 검증으로 CSRF 방지 (httpOnly 쿠키 10분 유효)

#### 역할 기반 메뉴 접근 제어
| 역할 | 접근 가능 메뉴 |
|---|---|
| `superadmin` | 전체 (env 변수로 설정된 계정) |
| `admin` | 전체 (콘텐츠 + Users + Settings) |
| `editor` | 콘텐츠만 (Company, Business, Project, Product, Contact, Partners) |

- `app/admin/(protected)/layout.tsx`: `filterNavItems()` 함수로 역할별 메뉴 필터링
- 사이드바 하단에 로그인 사용자 ID + 역할 뱃지 표시

#### 사용자 관리 페이지 (`/admin/users`)
- Admin/Superadmin만 접근 가능
- LINE WORKS 이메일 + 이름 + 역할로 사용자 직접 등록
- 역할 변경 (Editor ↔ Admin), 활성화/비활성화, 삭제 기능

#### 로그인 페이지 개선
- LINE WORKS 로그인 버튼 (최상단 강조)
- 구분선 아래 Superadmin 아이디/패스워드 로그인 유지
- OAuth 에러 메시지 한국어 처리 (`not_authorized`, `disabled`, `token_failed` 등)

#### 필요 환경변수 (`.env`)
```
WORKS_CLIENT_ID=      # LINE WORKS Developer Console에서 발급
WORKS_CLIENT_SECRET=  # LINE WORKS Developer Console에서 발급
NEXTAUTH_URL=         # 서비스 도메인 (예: https://sehyunict.com)
```

> LINE WORKS Developer Console → 앱 생성 → Redirect URI: `{NEXTAUTH_URL}/api/auth/callback` 등록 필요

---

### 2026-03-31 (2) — 모바일 대응 & 페이지 전환 효과 개선

#### 페이지 전환 (`template.tsx`)
- 7개 바 전체화면 와이프 → **하단 3px 라인**으로 교체
- 라임→핑크 그라디언트 라인이 좌→우로 채워졌다 사라지는 효과 (`scaleX: [0,1,1,0]`)
- `transformOrigin: "left center"` 명시, `w-full` 추가

#### TiltCard 모바일 대응
- `onTouchStart` / `onTouchMove` / `onTouchEnd` 추가
- 터치 시 intensity 60% 적용 (스크롤 방해 없이 틸트 동작)
- 공통 `applyTilt()` / `resetTilt()` 함수로 마우스·터치 로직 통합

#### CountUp 모바일 대응
- `useInView` margin `"-40px"` → `"0px"` — 뷰포트 진입 즉시 트리거 (소형 화면 대응)

---

### 2026-03-31 — 인터랙션 효과 강화 & Contact 지도 추가

#### Claude Code 하네스 설정
- `.claude/settings.json` 신규 — 코드 편집 후 TypeScript 타입체크(`npx tsc --noEmit`) + 빌드 검증(`npm run build`) 자동 실행 (async 훅)

#### Hero 인트로
- 인트로 표시 시간 **3초 → 1.5초** (`setTimeout 3000ms → 1500ms`)

#### 커스텀 커서 제거
- `Cursor.tsx` 비활성화 — `layout.tsx`에서 `<Cursor />` 및 `cursor-none` 클래스 제거, 브라우저 기본 커서 사용

#### UI 인터랙션 효과 3종 추가
- **3D 틸트** (`TiltCard.tsx`) — 마우스 방향으로 perspective 기울기, 홈 서비스 카드 + 제품 카드 적용
- **숫자 카운트업** (`CountUp.tsx`) — 뷰포트 진입 시 cubic ease-out 카운팅
  - 프로젝트 페이지: 연도별 `N PJT` 카운트업
  - 회사 연혁: 연도 숫자 `year-3 → year` 카운트업
- **페이지 전환 와이프** (`template.tsx`) — 7개 가로 바(라임 5 + 핑크 2)가 위→아래 스태거로 슬라이드 아웃, 0.22s/바, 0.03s 간격

#### Business 순서 변경
- `business.json`: 1번(GIS 솔루션) ↔ 3번(SEbit Brand) 위치 교체
- SEbit Brand desc·tags 내용 보강 (Nexus/Ai/Lumo/GeoAxis 명시)

#### Contact 지도 추가
- OpenStreetMap iframe 삽입 (좌표 기반, API 키 불필요)
- 카카오맵 / 네이버지도 외부 링크 버튼 추가
- 지도를 페이지 **최상단** (헤더 바로 아래)으로 배치
- `ContactData`에 `mapQuery`, `mapEmbedUrl` 필드 추가
- 관리자 `/admin/contact`에서 지도 검색어 및 Google Maps embed URL 수정 가능

---

### 2026-03-30 (3) — UI 세부 조정

#### 홈페이지 (HomeContent)
- SEbit 브랜드 카드 레이아웃 **4열 → 2열** 변경 (`lg:grid-cols-4` 제거)
- SEbit 카드 타이틀 폰트 크기 `text-base` → **`text-xl`** (Product 카드와 동일하게)

#### Project 페이지
- 연도별 프로젝트 수 표시 텍스트 컬러 `#333` → **`#666`** (가시성 개선)

---

### 2026-03-30 (2) — 콘텐츠 전면 업데이트 & UI 개선

#### Product 페이지
- `product.json`: sehyunict.com 기준 SmartGeoKit **8개 제품** 실제 데이터로 전면 교체
  - 2D GIS Engine, 3D GIS Engine, CAD View, CAD Compare, Layout Manager, Xler, AR, RMCP
  - CAD View·Compare에 **GS인증 1등급** cert 뱃지 추가
- `ProductContent`: 헤더 우측 + 하단에 **PDF 카탈로그 다운로드 버튼** 추가
- `lib/types.ts`: `Product`에 `cert?: string` 선택 필드 추가

#### Company 페이지
- `company.json`: sehyunict.com 기준 **2019~2025년 연혁** 추가 (기존 2013~2018 보완)
- 연혁 정렬 **최신순(2025→2013)** 으로 변경

#### Business 페이지
- `business.json`: 4개 카드에 `accent` 컬러 필드 추가
  - GIS 솔루션 `#c8ff00` / CAD 솔루션 `#ff3cac` / SEbit Brand `#00f0ff` / 시스템 구축 `#ddd9d9`
- `BusinessContent`: 카드 타이틀에 accent 색상 적용
- `lib/types.ts`: `BusinessArea`에 `accent: string` 필드 추가

#### Project 페이지
- 긴 프로젝트명 축약: `삼성전자 수원 GIS솔루션/반도체 도면관리/SDC Layout Manager 솔루션 유지보수` → `GIS솔루션/도면관리/Layout Manager 유지보수` (5개 연도 일괄 적용)

#### 전체 페이지 공통
- 페이지 상단 레이블에서 숫자 제거: `✦ 01 — Company` → `✦ Company` (5개 페이지 일괄)

---

### 2026-03-30 — 콘텐츠 고도화 & Project 전면 재구성

#### 홈페이지 (HomeContent)
- 인트로 오버레이: 클릭/터치 이벤트 제거 → **3초 타이머 자동 전환**으로 변경
- SEbit 브랜드 섹션을 홈페이지 **최상단**으로 이동 (MARQUEE 바로 아래)
- h2 폰트 크기 **1.5배** 확대 (`clamp(2rem,5vw,4rem)` → `clamp(3rem,7.5vw,6rem)`)
- 섹션 상하 패딩 축소 (`py-24` → `py-14`), h2 하단 마진 축소 (`mb-14` → `mb-8`)
- SEbit 카드 설명 문장 마침표 기준 **단락 분리** 렌더링
- `SplitText` (한 글자씩 애니메이션) 제거 → 단락 단위 fade 애니메이션으로 통일

#### 회사 연혁 (Company)
- 연혁 데이터 구조 변경: `event: string` → `events: string[]` (연도당 다중 내용 지원)
- `CompanyForm`: 연도 블록 내 내용 항목 추가·삭제 UI
- `CompanyContent`: 같은 연도의 여러 내용 세로 나열 렌더링
- `company.json`: 2013~2018년 실제 이력 데이터 대폭 보강

#### 프로젝트 (Project) 전면 재구성
- 데이터 구조 변경: `projects[]` → `years[{ year, projects[] }]` 연도별 그룹
- **연도 탭 바** 추가 — sticky 고정, 클릭 시 해당 연도로 smooth scroll
- **펼치기/접기** 기능 — 2025년(최신)은 항상 펼침, 나머지는 클릭으로 토글
- **2열 그리드** 레이아웃 — 모든 연도 공통 적용
- `project.json`: sehyunict.com 실제 데이터 기준 **2014~2025년 181건** 전체 반영
- `ProjectForm`: 연도 단위 관리 UI (연도·프로젝트 추가/삭제)
- `lib/types.ts`: `ProjectItem`, `ProjectYear`, `HistoryItem` 타입 재정의

#### Business
- 03번 "IT Consulting" → **"SEbit Brand"** 콘텐츠로 교체

#### 어드민 (Company)
- 연혁 연도 입력창 너비 최적화 (`w-full` 제거, `w-16` 고정)
- 내용 입력창 `flex-1 min-w-0` 적용 (레이아웃 깨짐 수정)

---

### 2026-03-26 (2) — 인트로·카드 hover·Business 콘텐츠 개선

- 인트로 오버레이 dismiss 조건: 스크롤(`wheel`) 제거, 클릭·터치만 유지
- Product 카드에 `.sebit-card` hover 효과 적용 (SEbit 카드와 동일: accent 바 + shine + glow)
  - 카드 래퍼 `space-y-px bg-[#1e1e1e]` → `space-y-2` 변경 (hover lift 클리핑 방지)
- Business 03번 "IT Consulting" → "SEbit Brand" 콘텐츠로 교체

---

### 2026-03-26 — UI/UX 전면 개선 & CMS 확장

#### Hero 섹션 재설계
- 인트로 오버레이: SEHYUN/ICT가 전체화면으로 나타난 후 스크롤·클릭 시 축소되며 본 화면으로 전환 (framer-motion AnimatePresence)
- 레이아웃 가운데 정렬 (오른쪽 빈 공간 제거)
- Est. / IT SOLUTION PROVIDER 문구 제거, 콘텐츠 위치 위로 조정

#### ICT 크로마틱 글리치 효과
- `.text-glitch` CSS 클래스 구현 — 핑크(`#ff3cac`) / 시안(`#00f0ff`) 이중 레이어 clip-path 슬라이싱
- `steps(1)` 타이밍으로 디지털 끊김 표현, 3.5초 주기, 상시 미세 크로마틱 text-shadow

#### SEbit 브랜드 섹션
- 홈페이지 본문에 SEBIT 브랜드 소개 단락 추가
- `.sebit-card` hover 강화: 좌측 라임 accent 바 scaleY, box-shadow 글로우, shine sweep 오버레이

#### 협력사 마퀴 배너 CMS화
- `data/partners.json` 신규 추가 (협력사 목록 관리)
- `MarqueeBar.tsx` props 기반으로 전환 (하드코딩 제거)
- `/admin/partners` 어드민 메뉴 추가 (파트너 추가·삭제)

#### 커스텀 커서
- `components/ui/Cursor.tsx` 신규 — 닷 + 링 이중 커서, spring physics (stiffness/damping)
- hover 시 링 확대(48px), 클릭 시 축소(20px), 터치 기기 자동 숨김

#### 전체 hover 효과
- `.card-hover` — 카드 lift + box-shadow 글로우
- `.link-underline` — 슬라이드 언더라인 애니메이션
- Navbar 링크에 `link-underline` 적용
- `body cursor-none` 적용 (커스텀 커서 사용)

#### Navbar 개선
- SEbit 브랜드 사이트 이동 버튼 추가 (slide-fill hover 효과)
- 모바일 메뉴에 SEbit Brand Site 링크 추가

#### 어드민 CMS 개선
- Hero 버튼1/2에 새창(`_blank`) / 현재창(`_self`) 토글 UI 추가
- `home.json`에 `btn1Target`, `btn2Target` 필드 추가
- `lib/types.ts` — `PartnerItem`, `PartnersData` 인터페이스, `btn*Target` 타입 추가

#### 텍스트 컬러 팔레트 밝기 상향
| 이전 | 이후 |
|---|---|
| `#888` | `#ddd9d9` |
| `#444` | `#d1d1d1` |
| `#333` | `#a1a1a1` |
| `#555` | `#b5b5b5` |
| `#666` | `#ededed` |

---

### 2026-03-25 — JSON 기반 CMS 전체 구축

- 모든 콘텐츠를 `data/*.json`으로 관리하는 CMS 아키텍처 도입
- Admin 어드민 페이지 전 섹션 연동 (home, nav, company, business, project, product, contact, settings)
- Route Group `(protected)` 도입 — 리다이렉트 루프 방지
- HMAC-SHA256 세션 인증 (httpOnly cookie, 8시간)
- `proxy.ts` — Next.js 16 middleware (함수명 `proxy`)

---

### 2026-03-24 — 초기 구현

- SEHYUN ICT 홈페이지 리뉴얼 초기 구현
- 딥 블랙 배경 + 라임/핑크 포인트 컬러 디자인 시스템 구축
- grain 노이즈 텍스처, neon-glow, SplitText, ScrambleText 효과
- 반응형 레이아웃, 햄버거 메뉴
