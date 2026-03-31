// ── 어드민 사용자 ──────────────────────────────────────────

export type UserRole = "superadmin" | "admin" | "editor";
export type UserStatus = "pending" | "active" | "disabled";

export interface AdminUser {
  id: string;
  worksId: string;       // LINE WORKS 이메일 또는 userId
  displayName?: string;
  role: Exclude<UserRole, "superadmin">;
  status: Exclude<UserStatus, "pending">;
  createdAt: string;
}

export interface UsersData {
  users: AdminUser[];
}

// ── 서브 페이지 ────────────────────────────────────────────

export interface HistoryItem {
  year: string;
  events: string[];
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
  accent: string;
  desc: string;
  tags: string[];
}

export interface BusinessData {
  areas: BusinessArea[];
}

export interface ProjectItem {
  title: string;
  client: string;
  tag: string;
}

export interface ProjectYear {
  year: string;
  projects: ProjectItem[];
}

export interface ProjectData {
  years: ProjectYear[];
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  features: string[];
  accent: string;
  cert?: string;
}

export interface ProductData {
  products: Product[];
}

export interface ContactData {
  tel: string;
  email: string;
  address: string;
  mapQuery?: string;
  mapEmbedUrl?: string;
}

export interface PartnerItem {
  id: string;
  name: string;
}

export interface PartnersData {
  partners: PartnerItem[];
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
    btn1Target: "_self" | "_blank";
    btn2Label: string;
    btn2Href: string;
    btn2Target: "_self" | "_blank";
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
