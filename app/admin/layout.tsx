import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "./logout/actions";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FolderKanban,
  Package,
  Phone,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Company", href: "/admin/company", icon: Building2 },
  { label: "Business", href: "/admin/business", icon: Briefcase },
  { label: "Project", href: "/admin/project", icon: FolderKanban },
  { label: "Product", href: "/admin/product", icon: Package },
  { label: "Contact", href: "/admin/contact", icon: Phone },
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
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-[#1e1e1e] flex flex-col">
        {/* Logo */}
        <div className="h-14 flex items-center px-5 border-b border-[#1e1e1e]">
          <span className="font-mono text-sm font-bold tracking-[0.15em] uppercase">
            SEHYUN<span className="text-[#c8ff00]">ICT</span>
          </span>
          <span className="ml-2 text-[10px] text-[#444] tracking-widest uppercase">
            CMS
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 text-xs font-medium tracking-wider uppercase text-[#555] hover:text-[#f0f0f0] hover:bg-[#111] transition-colors rounded-sm group"
            >
              <Icon size={14} className="group-hover:text-[#c8ff00] transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-[#1e1e1e]">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium tracking-wider uppercase text-[#555] hover:text-[#ff3cac] transition-colors rounded-sm"
            >
              <LogOut size={14} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 border-b border-[#1e1e1e] flex items-center px-6">
          <span className="text-xs text-[#444] tracking-widest uppercase">
            Admin Panel
          </span>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
