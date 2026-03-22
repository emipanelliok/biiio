import { mockProfile } from "@/lib/mock-data";
import LinkEditor from "@/components/dashboard/LinkEditor";
import MobilePreview from "@/components/dashboard/MobilePreview";
import { ExternalLink, Share2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const profile = mockProfile;

  return (
    <div className="flex h-full min-h-screen">
      {/* Editor panel */}
      <div className="flex-1 flex flex-col border-r border-black/[0.05]">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-[#fcf9f8]/80 backdrop-blur-sm sticky top-0 z-10 border-b border-black/[0.05]">
          <div>
            <p className="text-[#7b7487] text-xs mb-0.5">Your page</p>
            <p className="font-bold text-sm text-[#1c1b1b]">
              biiio.io/<span className="text-[#d2aef8]">{profile.username}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[#4a4455] bg-white ghost-border text-xs font-bold hover:bg-[#f6f3f2] transition-colors">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            <Link
              href={`/${profile.username}`}
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1c1b1b] text-white text-xs font-bold hover:opacity-80 transition-opacity"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View my page
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 px-6 py-6 overflow-y-auto">
          {/* Heading */}
          <div className="mb-6">
            <h1 className="font-black text-3xl tracking-tighter text-[#1c1b1b]">
              My <span className="marker">Links</span>
            </h1>
            <p className="text-[#7b7487] text-sm mt-1">Curate your digital identity by adding and organizing your favorite destinations.</p>
          </div>

          {/* Add new link */}
          <LinkEditor links={profile.links} />
        </div>
      </div>

      {/* Mobile preview panel */}
      <div className="w-[300px] flex-shrink-0 flex flex-col items-center pt-16 pb-8 bg-[#f6f3f2]">
        <MobilePreview profile={profile} />
        <p className="text-xs text-[#7b7487] font-bold uppercase tracking-widest mt-4">Live Preview</p>
        <p className="text-xs text-[#ccc3d8] mt-1">biiio.io/{profile.username}</p>
      </div>
    </div>
  );
}
