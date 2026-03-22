export type LinkType = "link" | "hero" | "social" | "header" | "divider";

export interface BiiioLink {
  id: string;
  type: LinkType;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  emoji?: string;
  clicks?: number;
  active: boolean;
}

export type SocialPlatform =
  | "instagram" | "x" | "tiktok" | "youtube" | "facebook" | "threads"
  | "whatsapp" | "telegram" | "discord" | "linkedin" | "github"
  | "spotify" | "pinterest" | "twitch" | "snapchat" | "patreon"
  | "substack" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface BiiioProfile {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  links: BiiioLink[];
  socials: SocialLink[];
  theme: "dark" | "light";
  accentColor: string;
}
