import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "../logout/actions";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FolderKanban,
  Package,
  Phone,
  LogOut,
  Home,
  Navigation,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "─ 홈페이지", href: "", icon: null },
  { label: "Home", href: "/admin/home", icon: Home },
  { label: "Navigation", href: "/admin/nav", icon: Navigation },
  { label: "─ 콘텐츠", href: "", icon: null },
  { label: "Company", href: "/admin/company", icon: Building2 },
  { label: "Business", href: "/admin/business", icon: Briefcase },
  { label: "Project", href: "/admin/project", icon: FolderKanban },
  { label: "Product", href: "/admin/product", icon: Package },
  { label: "Contact", href: "/admin/contact", icon: Phone },
  { label: "─ 시스템", href: "", icon: null },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await getSession();
  if (!authenticated) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <aside className="w-56 shrink-0 border-r border-[#1e1e1e] flex flex-col">
        <div className="h-14 flex items-center px-5 border-b border-[#1e1e1e]">
          <span className="font-mono text-sm font-bold tracking-[0.15em] uppercase">
            SEHYUN<span className="text-[#c8ff00]">ICT</span>
          </span>
          <span className="ml-2 text-[10px] text-[#d1d1d1] tracking-widest uppercase">CMS</span>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            if (!Icon) {
              return (
                <p key={label} className="px-3 pt-4 pb-1 text-[9px] font-mono tracking-widest uppercase text-[#333]">
                  {label.replace("─ ", "")}
                </p>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2 text-xs font-medium tracking-wider uppercase text-[#b5b5b5] hover:text-[#f0f0f0] hover:bg-[#111] transition-colors rounded-sm group"
              >
                <Icon size={14} className="group-hover:text-[#c8ff00] transition-colors" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#1e1e1e]">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium tracking-wider uppercase text-[#b5b5b5] hover:text-[#ff3cac] transition-colors rounded-sm"
            >
              <LogOut size={14} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-[#1e1e1e] flex items-center px-6">
          <span className="text-xs text-[#d1d1d1] tracking-widest uppercase">Admin Panel</span>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
