# 프로젝트: SEHYUN ICT Homepage Renewal

http://sehyunict.com 홈페이지 리뉴얼

## 디자인 스타일

- MZ 감성의 텍스처 스타일
- 10년차 이상의 디자이너 스킬
- 전체 배경: 딥 블랙 (`#080808`)
- 포인트 컬러: 라임 `#c8ff00` / 핑크 `#ff3cac`
- grain 노이즈 텍스처 오버레이 (SVG fractalNoise, body::before)
- 타이포그래피 효과: SplitText (글자 reveal), ScrambleText (decode), glitch, outline text

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

## 명령어

- `npm run dev`: 개발 서버 시작 (포트 3000)
- `npm run build`: 프로덕션 빌드
- `npm run lint`: ESLint 검사

## 아키텍처

```
app/
  layout.tsx          ← 루트 레이아웃, Navbar 포함
  page.tsx            ← 홈페이지 (Hero, Services, About, CTA)
  globals.css         ← 전역 스타일 (grain, glitch, outline, marquee)
  company/            ← 회사 소개
  business/           ← 사업 영역
  project/            ← 주요 프로젝트
  product/            ← 제품 소개
  contact/            ← 연락처 + 문의 폼
  admin/
    layout.tsx        ← CMS 레이아웃 (사이드바, 세션 검증 server-side)
    page.tsx          ← CMS 대시보드
    login/            ← 로그인 (server action + useActionState)
    logout/           ← 로그아웃 (server action)
components/ui/
  Navbar.tsx          ← fixed 상단바, 모바일 햄버거 메뉴
  MarqueeBar.tsx      ← 키워드 마퀴 (CSS animation)
  SplitText.tsx       ← 글자별 overflow:hidden 마스크 reveal
  ScrambleText.tsx    ← 랜덤 문자 → 실제 텍스트 decode
lib/
  auth.ts             ← HMAC-SHA256 세션 서명/검증, cookie 관리
proxy.ts              ← /admin/* 라우트 보호
```

## CMS 인증

- 인증 방식: httpOnly cookie + HMAC-SHA256 서명 (8시간)
- 환경변수: `ADMIN_USER`, `ADMIN_PASSWORD`, `ADMIN_SECRET`
- 로그인 페이지: `/admin/login`
- 프로덕션에서 반드시 `.env`에 위 변수 설정 필요

## 중요 사항

- `.env` 파일은 절대 커밋하지 마세요
- `/prisma`, Stripe, Cloudinary는 현재 미사용 — 관련 코드 추가 금지
- `proxy.ts`의 export 함수명은 반드시 `proxy` (Next.js 16 규칙)
- 타이포 효과 컴포넌트(SplitText, ScrambleText)는 `"use client"` 필수
