import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "../logout/actions";
import type { UserRole } from "@/lib/types";
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
  Users,
  UserCog,
} from "lucide-react";

type NavItem =
  | { label: string; href: string; icon: React.ComponentType<{ size?: number; className?: string }>; roles: UserRole[] }
  | { label: string; href: ""; icon: null };

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, roles: ["superadmin", "admin", "editor"] },
  { label: "─ 홈페이지", href: "", icon: null },
  { label: "Home", href: "/admin/home", icon: Home, roles: ["superadmin", "admin", "editor"] },
  { label: "Navigation", href: "/admin/nav", icon: Navigation, roles: ["superadmin", "admin", "editor"] },
  { label: "─ 콘텐츠", href: "", icon: null },
  { label: "Company", href: "/admin/company", icon: Building2, roles: ["superadmin", "admin", "editor"] },
  { label: "Business", href: "/admin/business", icon: Briefcase, roles: ["superadmin", "admin", "editor"] },
  { label: "Project", href: "/admin/project", icon: FolderKanban, roles: ["superadmin", "admin", "editor"] },
  { label: "Product", href: "/admin/product", icon: Package, roles: ["superadmin", "admin", "editor"] },
  { label: "Contact", href: "/admin/contact", icon: Phone, roles: ["superadmin", "admin", "editor"] },
  { label: "Partners", href: "/admin/partners", icon: Users, roles: ["superadmin", "admin", "editor"] },
  { label: "─ 시스템", href: "", icon: null },
  { label: "Users", href: "/admin/users", icon: UserCog, roles: ["superadmin", "admin"] },
  { label: "Settings", href: "/admin/settings", icon: Settings, roles: ["superadmin", "admin"] },
];

function filterNavItems(items: NavItem[], role: UserRole): NavItem[] {
  const result: NavItem[] = [];
  let pendingDivider: NavItem | null = null;
  for (const item of items) {
    if (!item.icon) {
      pendingDivider = item;
      continue;
    }
    if (item.roles.includes(role)) {
      if (pendingDivider) {
        result.push(pendingDivider);
        pendingDivider = null;
      }
      result.push(item);
    }
  }
  return result;
}

const ROLE_BADGE: Record<UserRole, string> = {
  superadmin: "Superadmin",
  admin: "Admin",
  editor: "Editor",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const visibleItems = filterNavItems(NAV_ITEMS, session.role);

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
          {visibleItems.map((item) => {
            if (!item.icon) {
              return (
                <p
                  key={item.label}
                  className="px-3 pt-4 pb-1 text-[9px] font-mono tracking-widest uppercase text-[#333]"
                >
                  {item.label.replace("─ ", "")}
                </p>
              );
            }
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-xs font-medium tracking-wider uppercase text-[#b5b5b5] hover:text-[#f0f0f0] hover:bg-[#111] transition-colors rounded-sm group"
              >
                <Icon size={14} className="group-hover:text-[#c8ff00] transition-colors" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#1e1e1e]">
          <div className="px-3 py-2 mb-1">
            <p className="text-[10px] text-[#666] font-mono tracking-wider">
              {session.id === "superadmin" ? "superadmin" : session.id}
            </p>
            <p className="text-[9px] text-[#444] font-mono tracking-widest uppercase mt-0.5">
              {ROLE_BADGE[session.role]}
            </p>
          </div>
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
