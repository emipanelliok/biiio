"use client";

import { SocialLink } from "@/lib/types";
import { platformMeta } from "@/lib/social-meta";

export default function SocialIcons({ socials }: { socials: SocialLink[] }) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      {socials.map((social) => {
        const meta = platformMeta[social.platform];
        if (!meta) return null;
        return (
          <a
            key={social.platform}
            href={social.url}
            target={social.platform === "email" ? "_self" : "_blank"}
            rel="noopener noreferrer"
            aria-label={social.platform}
            className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110"
            style={{ backgroundColor: "#f0edf4", color: "#4a4455" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = meta.color + "20";
              (e.currentTarget as HTMLElement).style.color = meta.color;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#f0edf4";
              (e.currentTarget as HTMLElement).style.color = "#4a4455";
            }}
          >
            {meta.icon}
          </a>
        );
      })}
    </div>
  );
}
