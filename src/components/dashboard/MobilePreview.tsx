"use client";

import { BiiioProfile } from "@/lib/types";
import Image from "next/image";

const pastelColors = ["#d2aef8", "#91cefb", "#f7d59e", "#f09ba4", "#d2aef8"];

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "#E1306C", tiktok: "#010101", youtube: "#FF0000",
  x: "#000000", spotify: "#1DB954", github: "#181717",
  linkedin: "#0A66C2", facebook: "#1877F2", threads: "#000000",
  whatsapp: "#25D366", telegram: "#2AABEE", discord: "#5865F2",
  pinterest: "#E60023", twitch: "#9146FF", snapchat: "#FFFC00",
  patreon: "#FF424D", substack: "#FF6719", kick: "#53FC18", email: "#7b7487",
};

export default function MobilePreview({ profile }: { profile: BiiioProfile }) {
  const firstName = profile.displayName.split(" ")[0];
  const lastName = profile.displayName.split(" ").slice(1).join(" ");

  return (
    <div className="w-[280px] flex-shrink-0">
      {/* Phone frame */}
      <div className="relative mx-auto w-[270px]">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#1c1b1b] rounded-full z-20" />

        <div className="w-full rounded-[2.5rem] border-[5px] border-[#1c1b1b] bg-white overflow-hidden shadow-2xl" style={{ height: 560 }}>
          {/* Cover gradient */}
          <div
            className="w-full h-28 relative"
            style={{
              background: "linear-gradient(135deg, #f09ba4, #f7d59e, #91cefb, #d2aef8)",
            }}
          />

          {/* Content overlapping cover */}
          <div className="px-5 pb-4 flex flex-col items-start -mt-10 h-[calc(100%-7rem)] overflow-y-auto relative z-10">
            {/* Avatar */}
            <div className="p-1 rounded-2xl bg-white shadow-lg mb-3">
              <Image
                src={profile.avatarUrl}
                alt={profile.displayName}
                width={56}
                height={56}
                className="w-14 h-14 rounded-xl object-cover"
              />
            </div>

            {/* Name with marker */}
            <div className="mb-1">
              <p className="font-black text-base text-[#1c1b1b] tracking-tight leading-tight">
                {firstName}{lastName ? " " : ""}
                {lastName && <span className="marker marker-violet">{lastName}</span>}
                {!lastName && firstName && ""}
              </p>
            </div>

            {/* Bio */}
            <p className="text-[#7b7487] text-[10px] leading-snug mb-3">
              {profile.bio ? profile.bio.slice(0, 60) : "Digital Creator & Curator"}
              {profile.bio && profile.bio.length > 60 ? "..." : ""}
            </p>

            {/* Socials */}
            {profile.socials && profile.socials.length > 0 && (
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {profile.socials.slice(0, 8).map((s) => (
                  <div
                    key={s.platform}
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: PLATFORM_COLORS[s.platform] || "#cdc3d0" }}
                    title={s.platform}
                  >
                    <span className="text-white text-[8px] font-black uppercase">
                      {s.platform[0]}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex flex-col gap-2 w-full">
              {profile.links.filter(l => l.active).slice(0, 5).map((link, i) => (
                <div
                  key={link.id}
                  className="w-full py-2.5 px-3 text-center text-[10px] font-bold text-[#1c1b1b] rounded-xl"
                  style={{
                    backgroundColor: i === 0 ? pastelColors[0] : "white",
                    border: i === 0 ? "none" : "1px solid rgba(205,195,208,0.2)",
                  }}
                >
                  {link.emoji && <span className="mr-1">{link.emoji}</span>}
                  {link.title}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 w-full flex justify-center">
              <span className="text-[9px] font-black italic text-[#d2aef8] tracking-tight">Biiio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
