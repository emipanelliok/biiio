"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, BarChart2, Palette, Settings } from "lucide-react";

const navItems = [
  { label: "Links",     href: "/dashboard",           icon: Link2,    hoverColor: "#d2aef8" },
  { label: "Appearance",href: "/dashboard/themes",     icon: Palette,  hoverColor: "#f7d59e" },
  { label: "Analytics", href: "/dashboard/analytics",  icon: BarChart2,hoverColor: "#91cefb" },
  { label: "Settings",  href: "/dashboard/settings",   icon: Settings, hoverColor: "#f09ba4" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-[#f6f3f2] flex flex-col py-8 px-4 flex-shrink-0">
      {/* Logo */}
      <div className="px-2 pb-8">
        <span className="font-black tracking-tighter text-2xl text-[#111] uppercase">Biiio</span>
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

      {/* User + Upgrade */}
      <div className="flex flex-col gap-3 px-2">
        <div className="bg-white rounded-2xl p-3 flex items-center gap-3 ghost-border shadow-sm">
          <div className="w-9 h-9 rounded-full bg-[#d2aef8] flex items-center justify-center font-black text-sm text-[#1c1b1b] flex-shrink-0">A</div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-[#1c1b1b] truncate">@username</p>
            <p className="text-xs text-[#7b7487]">Pro Plan</p>
          </div>
        </div>
        <button className="w-full py-3 bg-[#d2aef8] text-[#1c1b1b] font-bold text-sm rounded-full hover:opacity-90 transition-opacity shadow-sm">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
}
