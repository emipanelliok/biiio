"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({ username }: { username: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `https://biiio.io/${username}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `@${username} on Biiio`, url });
        return;
      } catch {
        // user cancelled or not supported, fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-[#4a4455] bg-white border border-black/[0.08] text-xs font-bold hover:bg-[#f6f3f2] transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-500" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5" />
          Share
        </>
      )}
    </button>
  );
}
