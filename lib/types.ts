// ── 서브 페이지 ────────────────────────────────────────────

export interface HistoryItem {
  year: string;
  event: string;
}

export interface CompanyData {
  description: string;
  mission: string;
  vision: string;
  coreValue: string;
  history: HistoryItem[];
}

export interface BusinessArea {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

export interface BusinessData {
  areas: BusinessArea[];
}

export interface Project {
  title: string;
  client: string;
  year: string;
  tag: string;
}

export interface ProjectData {
  projects: Project[];
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  features: string[];
  accent: string;
}

export interface ProductData {
  products: Product[];
}

export interface ContactData {
  tel: string;
  email: string;
  address: string;
}

// ── 사이트 설정 ───────────────────────────────────────────

export interface SiteData {
  siteName: string;
  logoText: string;
  establishedYear: string;
  location: string;
  seo: {
    title: string;
    description: string;
  };
  footer: {
    copyright: string;
    contact: string;
  };
}

// ── 내비게이션 ────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  enabled: boolean;
}

export interface NavData {
  items: NavItem[];
}

// ── 홈페이지 ──────────────────────────────────────────────

export interface HomeServiceItem {
  num: string;
  title: string;
  desc: string;
  href: string;
}

export interface HomeData {
  hero: {
    tagline: string;
    title1: string;
    title2: string;
    description: string;
    btn1Label: string;
    btn1Href: string;
    btn2Label: string;
    btn2Href: string;
  };
  services: HomeServiceItem[];
  about: {
    text: string;       // **굵게** 마크업 지원
    linkLabel: string;
    linkHref: string;
  };
  cta: {
    tagline: string;
    title1: string;
    title2: string;
    btnLabel: string;
    btnHref: string;
  };
}
