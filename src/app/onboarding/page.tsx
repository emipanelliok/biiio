"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { label: "Designer", emoji: "🎨" },
  { label: "Artist", emoji: "✏️" },
  { label: "Streamer", emoji: "🎮" },
  { label: "Entrepreneur", emoji: "🚀" },
  { label: "Musician", emoji: "🎵" },
  { label: "Coach", emoji: "💡" },
  { label: "Writer", emoji: "📝" },
  { label: "Photographer", emoji: "📷" },
];

export default function OnboardingPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-[#e2e2e2]">
        <div className="h-full bg-[#d2aef8] w-1/3 transition-all" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <span className="font-black text-xl tracking-tighter text-[#1a1c1c] uppercase">Biiio</span>
        <span className="text-xs font-bold text-[#7c7480] uppercase tracking-widest">Step 1 of 3</span>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-lg">
          <h1 className="font-black text-5xl tracking-tighter text-[#1a1c1c] leading-tight mb-10">
            Let&apos;s build your<br />digital <span className="marker">identity</span>
          </h1>

          {/* Username */}
          <div className="mb-8">
            <label className="text-xs font-bold uppercase tracking-widest text-[#7c7480] block mb-2">
              What&apos;s your username?
            </label>
            <div className="flex items-center bg-[#f3f3f3] rounded-2xl px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#d2aef8]">
              <span className="text-[#cdc3d0] font-bold text-sm mr-1">biiio.io/</span>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="yourname"
                className="bg-transparent border-none outline-none text-sm font-bold text-[#1a1c1c] placeholder:text-[#cdc3d0] flex-1"
              />
            </div>
          </div>

          {/* Category */}
          <div className="mb-10">
            <label className="text-xs font-bold uppercase tracking-widest text-[#7c7480] block mb-4">I am a...</label>
            <div className="grid grid-cols-4 gap-3">
              {categories.map(({ label, emoji }) => (
                <button
                  key={label}
                  onClick={() => setSelected(label)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl font-bold text-sm transition-all"
                  style={{
                    backgroundColor: selected === label ? "#d2aef8" : "#f3f3f3",
                    color: "#1a1c1c",
                    transform: selected === label ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#d2aef8] text-[#1c1b1b] rounded-full font-black text-sm hover:opacity-90 transition-opacity shadow-lg shadow-[#d2aef8]/30"
          >
            Next →
          </Link>
        </div>
      </main>
    </div>
  );
}
