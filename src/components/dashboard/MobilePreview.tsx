"use client";

import { BiiioProfile } from "@/lib/types";
import Image from "next/image";

const pastelColors = ["#d2aef8", "#91cefb", "#f7d59e", "#f09ba4", "#d2aef8"];

export default function MobilePreview({ profile }: { profile: BiiioProfile }) {
  return (
    <div className="w-[280px] flex-shrink-0">
      {/* Phone frame */}
      <div className="relative mx-auto w-[270px]">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#1c1b1b] rounded-full z-20" />

        <div className="w-full rounded-[2.5rem] border-[5px] border-[#1c1b1b] bg-white overflow-hidden shadow-2xl" style={{ height: 560 }}>
          <div className="px-4 pt-10 pb-4 flex flex-col items-center gap-3 h-full overflow-y-auto">
            {/* Avatar */}
            <div className="p-0.5 rounded-full" style={{ background: "linear-gradient(135deg, #d2aef8, #91cefb)" }}>
              <div className="bg-white p-0.5 rounded-full">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <div className="text-center">
              <p className="font-black text-sm text-[#1c1b1b] tracking-tight">{profile.displayName}</p>
              <p className="text-[#7b7487] text-[10px] mt-0.5 leading-snug max-w-[140px] mx-auto">
                {profile.bio.slice(0, 50)}...
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2 w-full">
              {profile.links.filter(l => l.active).slice(0, 5).map((link, i) => (
                <div
                  key={link.id}
                  className={`w-full py-2.5 px-3 text-center text-[10px] font-bold text-[#1c1b1b] ${link.type === "hero" ? "rounded-2xl" : "rounded-full"}`}
                  style={{ backgroundColor: pastelColors[i % pastelColors.length] }}
                >
                  {link.emoji && <span className="mr-1">{link.emoji}</span>}
                  {link.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
