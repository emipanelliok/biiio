import { createClient } from "@/lib/supabase/server";
import LinkCard from "@/components/profile/LinkCard";
import SocialIcons from "@/components/profile/SocialIcons";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient();

  // Load profile by username
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  // Load active links
  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id)
    .eq("active", true)
    .order("sort_order", { ascending: true });

  // Load socials
  const { data: socials } = await supabase
    .from("socials")
    .select("*")
    .eq("user_id", profile.id);

  const avatarUrl = profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.username}`;
  const displayName = profile.display_name || profile.username;

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-[480px] flex flex-col gap-5">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-5 text-center animate-in">
          <div className="relative p-1 rounded-full shadow-xl"
            style={{ background: "linear-gradient(135deg, #d2aef8, #91cefb)" }}>
            <div className="bg-white p-1 rounded-full">
              <Image
                src={avatarUrl}
                alt={displayName}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          </div>

          <div>
            <h1 className="font-black text-4xl tracking-tighter text-[#1c1b1b] mb-3">
              {displayName.split(" ")[0]}{" "}
              <span className="marker marker-violet">{displayName.split(" ").slice(1).join(" ")}</span>
            </h1>
            {profile.bio && (
              <p className="text-[#4a4455] text-base leading-relaxed max-w-[340px]">
                {profile.bio}
              </p>
            )}
          </div>

          {socials && socials.length > 0 && (
            <SocialIcons socials={socials.map((s: { platform: string; url: string }) => ({ platform: s.platform, url: s.url }))} />
          )}
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3 mt-2">
          {(links || []).map((link: { id: string; type: string; title: string; url: string; description: string | null; emoji: string | null; clicks: number }, i: number) => (
            <LinkCard
              key={link.id}
              link={{
                id: link.id,
                type: link.type || "link",
                title: link.title,
                url: link.url,
                description: link.description || "",
                emoji: link.emoji || undefined,
                active: true,
                clicks: link.clicks || 0,
              }}
              index={i}
            />
          ))}
        </div>

        {(links || []).length === 0 && (
          <p className="text-center text-[#cdc3d0] text-sm py-8">No links yet.</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-center gap-1.5 pt-6">
          <span className="text-[#ccc3d8] text-xs">Powered by</span>
          <a href="/" className="font-black text-xs text-[#d2aef8] uppercase tracking-tight hover:opacity-70 transition-opacity">
            Biiio
          </a>
        </div>
      </div>
    </main>
  );
}
