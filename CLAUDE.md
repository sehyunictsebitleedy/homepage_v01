# 프로젝트: SEHYUN ICT Homepage Renewal

http://sehyunict.com 홈페이지 리뉴얼

## 디자인 스타일

- MZ 감성의 텍스처 스타일
- 10년차 이상의 디자이너 스킬
- 전체 배경: 딥 블랙 (`#080808`)
- 포인트 컬러: 라임 `#c8ff00` / 핑크 `#ff3cac`
- grain 노이즈 텍스처 오버레이 (SVG fractalNoise, body::before)
- 타이포그래피 효과: SplitText (글자 reveal), ScrambleText (decode), `.text-glitch` (크로마틱 글리치), `.text-neon` (네온 글로우), outline text
- 인터랙션: 커스텀 커서 (Cursor.tsx), 카드 hover lift (.sebit-card, .card-hover), 링크 언더라인 (.link-underline)
- Hero 인트로 오버레이: 전체화면 타이틀 → 스크롤/클릭 시 축소 전환 (AnimatePresence)

## 기술 스택

- Framework: Next.js 16.1.6 (App Router)
- React: 19.2.3
- 언어: TypeScript strict 모드, `any` 타입 금지
- CSS: Tailwind v4 유틸리티 클래스 사용, 커스텀 CSS 파일 생성 금지
- 애니메이션: framer-motion v12
- 아이콘: lucide-react
- 라우트 보호: `proxy.ts` (Next.js 16의 middleware 대체)

## 코드 작성 규칙

- 절대 모킹하지 않기: 실제 동작하는 코드만 작성
- TypeScript strict 모드 준수, `any` 타입 금지
- 새 패키지 추가 시 기존 의존성과 충돌 확인
- framer-motion `Variants` 타입 사용 시 `ease` 배열은 `as [number,number,number,number]` 또는 named string 사용
- Next.js 16에서 middleware 파일명은 `proxy.ts`, export 함수명은 `proxy`
- 페이지 패턴: 서버 컴포넌트(page.tsx)가 readData()로 JSON 읽기 → 클라이언트 컴포넌트(*Content.tsx)에 props로 전달
- 어드민 폼은 클라이언트 컴포넌트(*Form.tsx) + 서버 액션(actions.ts) 패턴 사용

## 명령어

- `npm run dev`: 개발 서버 시작 (포트 3000)
- `npm run build`: 프로덕션 빌드
- `npm run lint`: ESLint 검사

## 아키텍처

```
data/                     ← JSON 콘텐츠 파일 (CMS 단일 데이터 소스)
  site.json               ← 사이트 설정 (이름, SEO, 푸터, 설립연도)
  nav.json                ← 내비게이션 메뉴 항목
  home.json               ← 홈페이지 섹션 (Hero, Services, About, CTA)
  company.json            ← 회사 소개
  business.json           ← 사업 영역
  project.json            ← 주요 프로젝트
  product.json            ← 제품 소개
  contact.json            ← 연락처
  partners.json           ← 협력사 목록 (마퀴 배너용, PartnerItem[])

app/
  layout.tsx              ← 루트 레이아웃 (SEO generateMetadata → site.json)
  page.tsx                ← 홈페이지 서버 컴포넌트
  HomeContent.tsx         ← 홈페이지 클라이언트 컴포넌트
  globals.css             ← 전역 스타일 (grain, glitch, outline, marquee)
  company/
    page.tsx              ← 서버 컴포넌트
    CompanyContent.tsx    ← 클라이언트 컴포넌트
  business/ project/ product/ contact/  ← 동일 패턴
  admin/
    login/                ← 로그인 (server action + useActionState)
    logout/               ← 로그아웃 (server action)
    (protected)/          ← 세션 보호 라우트 그룹 (리다이렉트 루프 방지)
      layout.tsx          ← CMS 레이아웃 (사이드바, 세션 검증 server-side)
      page.tsx            ← CMS 대시보드
      home/               ← 홈페이지 섹션 관리 (HomeForm + actions.ts)
      nav/                ← 내비게이션 관리 (NavForm + actions.ts)
      company/            ← 각 페이지 *Form.tsx + actions.ts 패턴
      business/ project/ product/ contact/ settings/ partners/

components/ui/
  Navbar.tsx              ← 서버 컴포넌트 (nav.json + site.json 읽기)
  NavbarContent.tsx       ← 클라이언트 컴포넌트 (pathname, 햄버거 메뉴, SEbit 버튼)
  MarqueeBar.tsx          ← 협력사 마퀴 (partners: string[] props 기반)
  Cursor.tsx              ← 커스텀 커서 (닷+링, spring physics, 터치 기기 숨김)
  SplitText.tsx           ← 글자별 overflow:hidden 마스크 reveal
  ScrambleText.tsx        ← 랜덤 문자 → 실제 텍스트 decode

lib/
  auth.ts                 ← HMAC-SHA256 세션 서명/검증, cookie 관리
  data.ts                 ← readData<T>() / writeData<T>() JSON 파일 헬퍼
  types.ts                ← 전체 타입 정의 (SiteData, NavData, HomeData, ...)

proxy.ts                  ← /admin/* 라우트 보호
```

## CMS 데이터 흐름

```
어드민 폼(*Form.tsx) → Server Action(actions.ts) → writeData() → data/*.json
프론트엔드 page.tsx   → readData()               → data/*.json → *Content.tsx props
```

## CMS 인증

- 인증 방식: httpOnly cookie + HMAC-SHA256 서명 (8시간)
- 환경변수: `ADMIN_USER`, `ADMIN_PASSWORD`, `ADMIN_SECRET`
- 로그인 페이지: `/admin/login`
- 프로덕션에서 반드시 `.env`에 위 변수 설정 필요
- `/admin/login`은 `(protected)` 그룹 **외부**에 위치 — 리다이렉트 루프 방지

## About 텍스트 강조 마크업

`home.json`의 `about.text`에서 `**텍스트**` 형식으로 라임(`#c8ff00`) 강조 표현:
```json
"text": "...스마트 IT 솔루션을 통해 **고객의 디지털 인프라를 혁신**하는..."
```
`HomeContent.tsx`의 `HighlightText` 컴포넌트가 파싱하여 렌더링.

## 중요 사항

- `.env` 파일은 절대 커밋하지 마세요
- `/prisma`, Stripe, Cloudinary는 현재 미사용 — 관련 코드 추가 금지
- `proxy.ts`의 export 함수명은 반드시 `proxy` (Next.js 16 규칙)
- 타이포 효과 컴포넌트(SplitText, ScrambleText, Cursor)는 `"use client"` 필수
- 새 콘텐츠 타입 추가 시: `lib/types.ts` → `data/*.json` → 서버 컴포넌트 → 어드민 폼 + actions.ts 순서로 작업
- `Cursor.tsx`는 `app/layout.tsx`에 등록, `body`에 `cursor-none` 클래스 필수
- `HomeData.hero`의 `btn1Target` / `btn2Target`은 `"_self" | "_blank"` 유니온 타입 — `<a>` 태그 `target` 속성에 직접 전달
- `MarqueeBar`는 `partners: string[]` props를 받아 렌더링 — `page.tsx`에서 `partners.json` 읽어 전달
- `.text-glitch` 클래스는 `data-text` 속성 필수: `<span className="text-glitch" data-text={text}>{text}</span>`
- Hero 인트로 dismiss 조건: **1.5초 타이머** 자동 전환 (`setTimeout 1500ms`) — 클릭/터치/스크롤 이벤트 없음
- Product 카드에 `.sebit-card border border-[#1e1e1e]` 적용 — 모든 카드 hover는 `.sebit-card` 기준으로 통일
- 카드 목록 래퍼에 `space-y-px`(구분선용) 사용 시 hover lift가 잘릴 수 있음 → `space-y-2` 사용
