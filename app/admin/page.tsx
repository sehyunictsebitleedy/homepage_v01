import Link from "next/link";
import { Building2, Briefcase, FolderKanban, Package, Phone, ArrowUpRight } from "lucide-react";

const SECTIONS = [
  {
    label: "Company",
    href: "/admin/company",
    icon: Building2,
    desc: "회사 소개 및 연혁 관리",
  },
  {
    label: "Business",
    href: "/admin/business",
    icon: Briefcase,
    desc: "사업 영역 및 협력사 관리",
  },
  {
    label: "Project",
    href: "/admin/project",
    icon: FolderKanban,
    desc: "주요 사업 현황 관리",
  },
  {
    label: "Product",
    href: "/admin/product",
    icon: Package,
    desc: "제품 소개 관리",
  },
  {
    label: "Contact",
    href: "/admin/contact",
    icon: Phone,
    desc: "연락처 및 오시는 길 관리",
  },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-display text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-[#f0f0f0]">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[#d1d1d1]">
          sehyunict.com 콘텐츠 관리 시스템
        </p>
      </div>

      {/* Quick access grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SECTIONS.map(({ label, href, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="group border border-[#1e1e1e] bg-[#0d0d0d] p-5 hover:border-[#c8ff00]/40 hover:bg-[#111] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-8 h-8 border border-[#1e1e1e] flex items-center justify-center group-hover:border-[#c8ff00]/40 transition-colors">
                <Icon size={14} className="text-[#b5b5b5] group-hover:text-[#c8ff00] transition-colors" />
              </div>
              <ArrowUpRight
                size={14}
                className="text-[#a1a1a1] group-hover:text-[#c8ff00] transition-colors"
              />
            </div>
            <p className="text-sm font-semibold tracking-wider uppercase text-[#f0f0f0]">
              {label}
            </p>
            <p className="mt-1 text-xs text-[#d1d1d1]">{desc}</p>
          </Link>
        ))}

        {/* View site link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="group border border-dashed border-[#1e1e1e] p-5 hover:border-[#c8ff00]/40 transition-all flex flex-col justify-between"
        >
          <ArrowUpRight
            size={14}
            className="text-[#a1a1a1] group-hover:text-[#c8ff00] transition-colors self-end"
          />
          <div>
            <p className="text-sm font-semibold tracking-wider uppercase text-[#d1d1d1] group-hover:text-[#f0f0f0] transition-colors">
              View Site
            </p>
            <p className="mt-1 text-xs text-[#a1a1a1]">sehyunict.com 미리보기</p>
          </div>
        </a>
      </div>

      {/* Env notice */}
      <div className="mt-8 border border-[#1e1e1e] bg-[#0d0d0d] px-4 py-3 flex items-start gap-3">
        <span className="text-[#c8ff00] text-xs mt-0.5">!</span>
        <p className="text-xs text-[#d1d1d1] leading-relaxed">
          프로덕션 환경에서는 <code className="text-[#ddd9d9]">.env</code> 파일에{" "}
          <code className="text-[#ddd9d9]">ADMIN_USER</code>,{" "}
          <code className="text-[#ddd9d9]">ADMIN_PASSWORD</code>,{" "}
          <code className="text-[#ddd9d9]">ADMIN_SECRET</code>을 반드시 설정하세요.
        </p>
      </div>
    </div>
  );
}
