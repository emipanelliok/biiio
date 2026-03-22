import { createClient } from "@/lib/supabase/server";
import SocialIcons from "@/components/profile/SocialIcons";
import Image from "next/image";
import { notFound } from "next/navigation";

function getButtonStyle(round: string, style: string, color: string) {
  const radius =
    round === "Round" ? "9999px" :
    round === "Rounded" ? "12px" :
    round === "Square" ? "4px" : "4px";
  const shadow = round === "Hard Shadow" ? "4px 4px 0px #1a1c1c" : "none";

  if (style === "Bold") {
    return { backgroundColor: color, color: "#1c1b1b", borderRadius: radius, boxShadow: shadow, border: "none" };
  }
  if (style === "Outline") {
    return { backgroundColor: "transparent", color: color === "#f6f3f2" ? "#1c1b1b" : color, borderRadius: radius, boxShadow: shadow, border: `2px solid ${color}` };
  }
  // Soft
  return { backgroundColor: color + "20", color: color === "#f6f3f2" ? "#1c1b1b" : color, borderRadius: radius, boxShadow: shadow, border: "none" };
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id)
    .eq("active", true)
    .order("sort_order", { ascending: true });

  const { data: socials } = await supabase
    .from("socials")
    .select("*")
    .eq("user_id", profile.id);

  const avatarUrl = profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.username}`;
  const displayName = profile.display_name || profile.username;
  const firstName = displayName.split(" ")[0];
  const lastName = displayName.split(" ").slice(1).join(" ");

  // Appearance settings from DB
  const markerColor = profile.marker_color || "#d2aef8";
  const btnRound = profile.button_roundness || "Rounded";
  const btnStyle = profile.button_style || "Bold";
  const btnColor = profile.button_color || "#d2aef8";
  const socialPosition = (profile.social_position as "above" | "below") || "above";

  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col items-center">
      {/* Cover gradient */}
      <div
        className="w-full h-48 md:h-56"
        style={{ background: "linear-gradient(135deg, #f09ba4, #f7d59e, #91cefb, #d2aef8)" }}
      />

      <div className="w-full max-w-[480px] flex flex-col gap-5 px-4 -mt-16">
        {/* Avatar + Info */}
        <div className="flex flex-col items-start gap-4">
          <div className="p-1.5 rounded-2xl bg-white shadow-xl">
            <Image
              src={avatarUrl}
              alt={displayName}
              width={96}
              height={96}
              className="w-24 h-24 rounded-xl object-cover"
            />
          </div>

          <div>
            <h1 className="font-black text-4xl tracking-tighter text-[#1c1b1b] mb-2">
              {lastName ? (
                <>
                  {firstName}{" "}
                  <span className="relative inline z-[1]">
                    {lastName}
                    <span
                      className="absolute left-[-4px] right-[-4px] bottom-[2px] h-[45%] z-[-1] rounded-[3px]"
                      style={{ backgroundColor: markerColor, transform: "rotate(-1.5deg)" }}
                    />
                  </span>
                </>
              ) : (
                <span className="relative inline z-[1]">
                  {firstName}
                  <span
                    className="absolute left-[-4px] right-[-4px] bottom-[2px] h-[45%] z-[-1] rounded-[3px]"
                    style={{ backgroundColor: markerColor, transform: "rotate(-1.5deg)" }}
                  />
                </span>
              )}
            </h1>
            {profile.bio && (
              <p className="text-[#4a4455] text-base leading-relaxed max-w-[340px]">
                {profile.bio}
              </p>
            )}
          </div>

          {socials && socials.length > 0 && socialPosition === "above" && (
            <SocialIcons socials={socials.map((s: { platform: string; url: string }) => ({
              platform: s.platform as "instagram" | "tiktok" | "youtube" | "x" | "spotify" | "github" | "linkedin",
              url: s.url,
            }))} />
          )}
        </div>

        {/* Links — using saved button styles */}
        <div className="flex flex-col gap-3 mt-2">
          {(links || []).map((link: { id: string; title: string; url: string; emoji: string | null }) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 text-center font-bold text-sm transition-all hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
              style={getButtonStyle(btnRound, btnStyle, btnColor)}
            >
              {link.emoji && <span>{link.emoji}</span>}
              {link.title}
            </a>
          ))}
        </div>

        {/* Socials below links */}
        {socials && socials.length > 0 && socialPosition === "below" && (
          <SocialIcons socials={socials.map((s: { platform: string; url: string }) => ({
            platform: s.platform as "instagram" | "tiktok" | "youtube" | "x" | "spotify" | "github" | "linkedin",
            url: s.url,
          }))} />
        )}

        {(links || []).length === 0 && (
          <p className="text-center text-[#cdc3d0] text-sm py-8">No links yet.</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-center gap-1.5 py-8">
          <span className="text-[#ccc3d8] text-xs">Powered by</span>
          <a href="/" className="font-black text-sm text-[#1c1b1b] relative inline-block z-[1] hover:opacity-70 transition-opacity">
            Biiio
            <span className="absolute left-[-3px] right-[-3px] bottom-[1px] h-[40%] z-[-1] rounded-[2px]" style={{ backgroundColor: "#f7d59e" }} />
          </a>
        </div>
      </div>
    </main>
  );
}
