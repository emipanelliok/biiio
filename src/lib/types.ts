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

export interface SocialLink {
  platform: "instagram" | "tiktok" | "youtube" | "x" | "spotify" | "github" | "linkedin";
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
