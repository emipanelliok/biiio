"use client";

import { BiiioProfile } from "@/lib/types";
import { platformMeta } from "@/lib/social-meta";
import Image from "next/image";

const HEADER_PATTERNS: Record<string, string> = {
  rainbow:         "linear-gradient(135deg, #f09ba4, #f7d59e, #91cefb, #d2aef8)",
  violet:          "#d2aef8",
  celeste:         "#91cefb",
  pink:            "#f09ba4",
  yellow:          "#f7d59e",
  "violet-pink":   "linear-gradient(135deg, #d2aef8, #f09ba4)",
  "celeste-violet":"linear-gradient(135deg, #91cefb, #d2aef8)",
  "yellow-pink":   "linear-gradient(135deg, #f7d59e, #f09ba4)",
  dark:            "#1c1b1b",
  "dark-violet":   "linear-gradient(135deg, #1c1b1b, #4a4455)",
};

function getButtonStyle(round: string, shadow: string, style: string, color: string) {
  const radius =
    round === "Round"   ? "9999px" :
    round === "Rounded" ? "10px" : "3px";

  const shadowVal =
    (shadow === "Hard" || round === "Hard Shadow") ? "3px 3px 0px #1a1c1c" :
    shadow === "Soft" ? `0 3px 8px ${color}50` : "none";

  if (style === "Bold") {
    return { backgroundColor: color, color: "#1c1b1b", borderRadius: radius, boxShadow: shadowVal, border: "none" };
  }
  if (style === "Outline") {
    return { backgroundColor: "transparent", color: color === "#f6f3f2" ? "#1c1b1b" : color, borderRadius: radius, boxShadow: shadowVal, border: `1.5px solid ${color}` };
  }
  return { backgroundColor: color + "20", color: color === "#f6f3f2" ? "#1c1b1b" : color, borderRadius: radius, boxShadow: shadowVal, border: "none" };
}

interface Appearance {
  markerColor: string;
  buttonRoundness: string;
  buttonShadow: string;
  buttonStyle: string;
  buttonColor: string;
  headerStyle: string;
  socialPosition: "above" | "below";
}

export default function MobilePreview({ profile, appearance }: { profile: BiiioProfile; appearance: Appearance }) {
  const firstName = profile.displayName.split(" ")[0];
  const lastName = profile.displayName.split(" ").slice(1).join(" ");
  const headerBg = HEADER_PATTERNS[appearance.headerStyle] || HEADER_PATTERNS.rainbow;
  const activeLinks = profile.links.filter(l => l.active).slice(0, 5);

  return (
    <div className="w-[280px] flex-shrink-0">
      {/* Phone frame */}
      <div className="relative mx-auto w-[270px]">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#1c1b1b] rounded-full z-20" />

        <div className="w-full rounded-[2.5rem] border-[5px] border-[#1c1b1b] bg-white overflow-hidden shadow-2xl" style={{ height: 560 }}>
          {/* Cover */}
          <div className="w-full h-28 relative" style={{ background: headerBg }} />

          {/* Content */}
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
                {firstName}
                {lastName && (
                  <>
                    {" "}
                    <span className="relative inline z-[1]">
                      {lastName}
                      <span
                        className="absolute left-[-3px] right-[-3px] bottom-[1px] h-[45%] z-[-1] rounded-[2px]"
                        style={{ backgroundColor: appearance.markerColor }}
                      />
                    </span>
                  </>
                )}
              </p>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-[#7b7487] text-[10px] leading-snug mb-3">
                {profile.bio.slice(0, 60)}{profile.bio.length > 60 ? "…" : ""}
              </p>
            )}

            {/* Socials above */}
            {profile.socials && profile.socials.length > 0 && appearance.socialPosition === "above" && (
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {profile.socials.slice(0, 8).map((s) => {
                  const meta = platformMeta[s.platform];
                  if (!meta) return null;
                  return (
                    <div
                      key={s.platform}
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "#f0edf4", color: "#4a4455" }}
                      title={s.platform}
                    >
                      <span className="w-3.5 h-3.5 flex items-center justify-center [&>svg]:w-3.5 [&>svg]:h-3.5">
                        {meta.icon}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Links */}
            <div className="flex flex-col gap-1.5 w-full">
              {activeLinks.map((link) => (
                <div
                  key={link.id}
                  className="w-full py-2 px-3 text-center text-[10px] font-bold flex items-center justify-center gap-1"
                  style={getButtonStyle(appearance.buttonRoundness, appearance.buttonShadow, appearance.buttonStyle, appearance.buttonColor)}
                >
                  {link.emoji && <span>{link.emoji}</span>}
                  {link.title}
                </div>
              ))}
            </div>

            {/* Socials below */}
            {profile.socials && profile.socials.length > 0 && appearance.socialPosition === "below" && (
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {profile.socials.slice(0, 8).map((s) => {
                  const meta = platformMeta[s.platform];
                  if (!meta) return null;
                  return (
                    <div
                      key={s.platform}
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "#f0edf4", color: "#4a4455" }}
                      title={s.platform}
                    >
                      <span className="w-3.5 h-3.5 flex items-center justify-center [&>svg]:w-3.5 [&>svg]:h-3.5">
                        {meta.icon}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto pt-4 w-full flex justify-center">
              <span className="text-[9px] font-black italic text-[#ccc3d8] tracking-tight">Powered by Biiio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
