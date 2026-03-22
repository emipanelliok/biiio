"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { addSocial, deleteSocial, saveSocialPosition } from "@/app/dashboard/actions";

const platforms = [
  {
    id: "instagram", label: "Instagram",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
    color: "#E1306C",
    placeholder: "instagram.com/yourname",
  },
  {
    id: "x", label: "X / Twitter",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    color: "#000000",
    placeholder: "x.com/yourname",
  },
  {
    id: "tiktok", label: "TikTok",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>,
    color: "#010101",
    placeholder: "tiktok.com/@yourname",
  },
  {
    id: "youtube", label: "YouTube",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    color: "#FF0000",
    placeholder: "youtube.com/@yourname",
  },
  {
    id: "linkedin", label: "LinkedIn",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    color: "#0A66C2",
    placeholder: "linkedin.com/in/yourname",
  },
  {
    id: "github", label: "GitHub",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
    color: "#181717",
    placeholder: "github.com/yourname",
  },
  {
    id: "spotify", label: "Spotify",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
    color: "#1DB954",
    placeholder: "open.spotify.com/artist/...",
  },
];

interface SocialItem {
  id: string;
  platform: string;
  url: string;
}

interface Props {
  socials: SocialItem[];
  socialPosition: "above" | "below";
}

export default function SocialEditor({ socials: initialSocials, socialPosition: initialPosition }: Props) {
  const router = useRouter();
  const [socials, setSocials] = useState(initialSocials);
  const [position, setPosition] = useState<"above" | "below">(initialPosition);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const selectedMeta = platforms.find(p => p.id === selectedPlatform);
  const existingPlatforms = new Set(socials.map(s => s.platform));

  async function handleAdd() {
    if (!selectedPlatform || !url.trim()) return;
    setSaving(true);
    // Prepend https:// if missing
    let finalUrl = url.trim();
    if (!finalUrl.startsWith("http")) finalUrl = "https://" + finalUrl;
    await addSocial(selectedPlatform, finalUrl);
    setSocials(prev => {
      const filtered = prev.filter(s => s.platform !== selectedPlatform);
      return [...filtered, { id: "temp-" + Date.now(), platform: selectedPlatform, url: finalUrl }];
    });
    setSelectedPlatform(null);
    setUrl("");
    setSaving(false);
    router.refresh();
  }

  async function handleDelete(id: string, platform: string) {
    setDeleting(id);
    await deleteSocial(id);
    setSocials(prev => prev.filter(s => s.id !== id));
    setDeleting(null);
    router.refresh();
  }

  async function handlePosition(pos: "above" | "below") {
    setPosition(pos);
    await saveSocialPosition(pos);
    router.refresh();
  }

  return (
    <div className="bg-white rounded-2xl p-5 mb-3" style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-[#7b7487]">Social Profiles</p>
        {/* Position toggle */}
        <div className="flex bg-[#f3f3f3] rounded-full p-0.5 gap-0.5">
          {(["above", "below"] as const).map(pos => (
            <button
              key={pos}
              onClick={() => handlePosition(pos)}
              className="px-3 py-1 rounded-full text-[10px] font-bold transition-all"
              style={{
                backgroundColor: position === pos ? "white" : "transparent",
                color: position === pos ? "#1c1b1b" : "#7b7487",
                boxShadow: position === pos ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {pos === "above" ? "↑ Above" : "↓ Below"}
            </button>
          ))}
        </div>
      </div>

      {/* Platform picker */}
      <div className="flex gap-2 flex-wrap mb-3">
        {platforms.map(({ id, label, icon, color }) => {
          const isActive = selectedPlatform === id;
          const isAdded = existingPlatforms.has(id) && selectedPlatform !== id;
          return (
            <button
              key={id}
              onClick={() => {
                setSelectedPlatform(isActive ? null : id);
                setUrl(socials.find(s => s.platform === id)?.url || "");
              }}
              title={label}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
              style={{
                backgroundColor: isActive ? color + "20" : "#f3f3f3",
                color: isActive ? color : isAdded ? "#1c1b1b" : "#7b7487",
                border: isActive ? `2px solid ${color}` : isAdded ? "2px solid #1c1b1b" : "2px solid transparent",
              }}
            >
              {icon}
            </button>
          );
        })}
      </div>

      {/* URL input */}
      {selectedPlatform && (
        <div className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center bg-[#f3f3f3] rounded-xl px-3 gap-2">
            <span style={{ color: selectedMeta?.color }} className="flex-shrink-0">{selectedMeta?.icon}</span>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder={selectedMeta?.placeholder}
              onKeyDown={e => e.key === "Enter" && handleAdd()}
              className="flex-1 bg-transparent py-2.5 text-sm font-medium text-[#1c1b1b] placeholder:text-[#cdc3d0] focus:outline-none"
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={saving || !url.trim()}
            className="px-4 py-2.5 bg-[#1c1b1b] text-white rounded-xl text-xs font-black hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            {saving ? "..." : existingPlatforms.has(selectedPlatform) ? "Update" : "Add"}
          </button>
          <button
            onClick={() => { setSelectedPlatform(null); setUrl(""); }}
            className="px-3 py-2.5 bg-[#f3f3f3] text-[#7b7487] rounded-xl hover:bg-[#ebebeb] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Added socials list */}
      {socials.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {socials.map((s) => {
            const meta = platforms.find(p => p.id === s.platform);
            return (
              <div
                key={s.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: (meta?.color || "#1c1b1b") + "15", color: meta?.color || "#1c1b1b" }}
              >
                <span className="flex-shrink-0">{meta?.icon}</span>
                <span className="max-w-[80px] truncate opacity-60">{meta?.label}</span>
                <button
                  onClick={() => handleDelete(s.id, s.platform)}
                  disabled={deleting === s.id}
                  className="ml-1 opacity-50 hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {socials.length === 0 && !selectedPlatform && (
        <p className="text-xs text-[#cdc3d0] text-center py-1">Tap a platform to add your social profiles</p>
      )}
    </div>
  );
}
