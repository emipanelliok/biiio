"use client";

import { BiiioLink } from "@/lib/types";

interface LinkCardProps {
  link: BiiioLink;
  index: number;
}

const pastelColors = ["#d2aef8", "#91cefb", "#f7d59e", "#f09ba4", "#d2aef8", "#91cefb"];

export default function LinkCard({ link, index }: LinkCardProps) {
  const accentColor = pastelColors[index % pastelColors.length];

  if (link.type === "hero") {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full p-6 rounded-2xl relative overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 active:scale-95 group"
        style={{ backgroundColor: accentColor }}
      >
        <div className="relative flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <span className="inline-block px-3 py-1 bg-black/10 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
              {link.emoji || "✦"} Featured
            </span>
            <h3 className="font-black text-xl tracking-tight text-[#1c1b1b] mb-1">{link.title}</h3>
            {link.description && (
              <p className="text-[#1c1b1b]/70 text-sm leading-relaxed">{link.description}</p>
            )}
          </div>
          <div className="ml-4 bg-black/10 p-3 rounded-full flex-shrink-0">
            <span className="text-xl">{link.emoji || "✦"}</span>
          </div>
        </div>
        {/* glow blob */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
      </a>
    );
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-full bg-white ghost-border group transition-all duration-200 hover:-translate-y-0.5"
      style={{ ["--hover-bg" as string]: accentColor }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = accentColor)}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "white")}
    >
      <div className="w-11 h-11 rounded-full bg-[#f6f3f2] flex items-center justify-center text-lg flex-shrink-0 transition-colors group-hover:bg-white">
        {link.emoji || "🔗"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#1c1b1b] text-sm truncate">{link.title}</p>
        {link.description && (
          <p className="text-[#7b7487] text-xs truncate">{link.description}</p>
        )}
      </div>
      <span className="text-[#1c1b1b]/30 group-hover:text-[#1c1b1b]/60 transition-opacity pr-1">›</span>
    </a>
  );
}
