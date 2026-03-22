"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import ShareModal from "./ShareModal";

export default function ShareButton({ username }: { username: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[#4a4455] bg-white border border-black/[0.08] text-xs font-bold hover:bg-[#f6f3f2] transition-colors"
      >
        <Share2 className="w-3.5 h-3.5" />
        Share
      </button>

      {open && <ShareModal username={username} onClose={() => setOpen(false)} />}
    </>
  );
}
