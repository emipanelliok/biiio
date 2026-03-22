import { mockProfile } from "@/lib/mock-data";
import LinkCard from "@/components/profile/LinkCard";
import SocialIcons from "@/components/profile/SocialIcons";
import Image from "next/image";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const profile = { ...mockProfile, username };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-[480px] flex flex-col gap-5">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-5 text-center animate-in">
          <div className="relative p-1 rounded-full shadow-xl"
            style={{ background: "linear-gradient(135deg, #d2aef8, #91cefb)" }}>
            <div className="bg-white p-1 rounded-full">
              <Image
                src={profile.avatarUrl}
                alt={profile.displayName}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          </div>

          <div>
            <h1 className="font-black text-4xl tracking-tighter text-[#1c1b1b] mb-3">
              {profile.displayName.split(" ")[0]}{" "}
              <span className="marker marker-violet">{profile.displayName.split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="text-[#4a4455] text-base leading-relaxed max-w-[340px]">
              {profile.bio}
            </p>
          </div>

          <SocialIcons socials={profile.socials} />
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3 mt-2">
          {profile.links.filter(l => l.active).map((link, i) => (
            <LinkCard key={link.id} link={link} index={i} />
          ))}
        </div>

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
