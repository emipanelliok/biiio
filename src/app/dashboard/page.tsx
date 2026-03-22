import { createClient } from "@/lib/supabase/server";
import LinkEditor from "@/components/dashboard/LinkEditor";
import MobilePreview from "@/components/dashboard/MobilePreview";
import SocialEditor from "@/components/dashboard/SocialEditor";
import { ExternalLink } from "lucide-react";
import ShareButton from "@/components/dashboard/ShareButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Load profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/onboarding");

  // Load links
  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user.id)
    .order("sort_order", { ascending: true });

  // Load socials
  const { data: socials } = await supabase
    .from("socials")
    .select("*")
    .eq("user_id", user.id);

  const rawSocials = (socials || []) as { id: string; platform: string; url: string }[];

  const appearance = {
    markerColor: profile.marker_color || "#d2aef8",
    buttonRoundness: profile.button_roundness || "Rounded",
    buttonShadow: profile.button_shadow || "None",
    buttonStyle: profile.button_style || "Bold",
    buttonColor: profile.button_color || "#d2aef8",
    headerStyle: profile.header_style || "rainbow",
    socialPosition: ((profile.social_position as "above" | "below") || "above"),
  };

  const profileData = {
    username: profile.username,
    displayName: profile.display_name || profile.username,
    bio: profile.bio || "",
    avatarUrl: profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.username}`,
    accentColor: "#d2aef8",
    theme: profile.theme || "pastel-dream",
    socials: rawSocials.map(s => ({
      platform: s.platform as "instagram" | "tiktok" | "youtube" | "x" | "spotify" | "github" | "linkedin",
      url: s.url,
    })),
    links: (links || []).map((l: { id: string; type: string; title: string; url: string; description: string | null; emoji: string | null; active: boolean; clicks: number; sort_order: number }) => ({
      id: l.id,
      type: (l.type || "link") as "link" | "hero",
      title: l.title,
      url: l.url,
      description: l.description || "",
      emoji: l.emoji || undefined,
      active: l.active,
      clicks: l.clicks || 0,
    })),
  };

  return (
    <div className="flex h-full min-h-screen">
      {/* Editor panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-[#fcf9f8]/80 backdrop-blur-sm sticky top-0 z-10 border-b border-black/[0.05]">
          <div>
            <p className="text-[#7b7487] text-xs mb-0.5">Your page</p>
            <p className="font-bold text-sm text-[#1c1b1b]">
              biiio.io/<span className="text-[#f7d59e]">{profile.username}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton username={profile.username} />
            <Link
              href={`/${profile.username}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full bg-[#1c1b1b] text-white text-xs font-bold hover:opacity-80 transition-opacity"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View my page</span>
              <span className="sm:hidden">View</span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 px-4 md:px-6 py-4 md:py-6 overflow-y-auto">
          <div className="mb-4 md:mb-6">
            <h1 className="font-black text-2xl md:text-3xl tracking-tighter text-[#1c1b1b]">
              My <span className="marker">Links</span>
            </h1>
            <p className="text-[#7b7487] text-sm mt-1">Curate your digital identity by adding and organizing your favorite destinations.</p>
          </div>

          <SocialEditor
            socials={rawSocials}
            socialPosition={(profile.social_position as "above" | "below") || "above"}
          />
          <LinkEditor links={profileData.links} />
        </div>
      </div>

      {/* Mobile preview panel — hidden on mobile */}
      <div className="hidden lg:flex w-[420px] flex-shrink-0 flex-col items-center pt-16 pb-8 bg-[#f6f3f2] border-l border-black/[0.05]">
        <MobilePreview profile={profileData} appearance={appearance} />
        <p className="text-xs text-[#7b7487] font-bold uppercase tracking-widest mt-4">Live Preview</p>
        <p className="text-xs text-[#ccc3d8] mt-1">biiio.io/{profile.username}</p>
      </div>
    </div>
  );
}
