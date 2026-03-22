"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, BarChart2, Palette, Settings, LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";
import BiiioLogo from "@/components/BiiioLogo";

const navItems = [
  { label: "Links",      href: "/dashboard",           icon: Link2,    hoverColor: "#d2aef8" },
  { label: "Appearance", href: "/dashboard/themes",     icon: Palette,  hoverColor: "#f7d59e" },
  { label: "Analytics",  href: "/dashboard/analytics",  icon: BarChart2,hoverColor: "#91cefb" },
  { label: "Settings",   href: "/dashboard/settings",   icon: Settings, hoverColor: "#f09ba4" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 min-h-screen bg-[#f6f3f2] flex-col py-8 px-4 flex-shrink-0">
        {/* Logo */}
        <div className="px-2 pb-8">
          <BiiioLogo size="lg" />
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ label, href, icon: Icon, hoverColor }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-3 rounded-full text-sm font-bold transition-all duration-150"
                style={active
                  ? { backgroundColor: "#d2aef8", color: "#1c1b1b" }
                  : { color: "#1c1b1b" }
                }
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = hoverColor + "33"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="flex flex-col gap-3 px-2">
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-3 rounded-full text-sm font-bold text-[#7b7487] hover:bg-[#f09ba4]/20 hover:text-[#c53030] transition-all"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-black/[0.06] px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 py-3 px-3 min-w-0 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={active
                    ? { backgroundColor: "#d2aef8", color: "#1c1b1b" }
                    : { color: "#7b7487" }
                  }
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className="text-[10px] font-bold"
                  style={{ color: active ? "#1c1b1b" : "#7b7487" }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
