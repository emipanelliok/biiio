"use client";

import { useState } from "react";
import { addLink } from "../actions";
import { useRouter } from "next/navigation";
import { Share2, ShoppingBag, Music, Video, Podcast, Pencil, ImagePlus, ArrowLeft } from "lucide-react";
import Link from "next/link";

const linkTypes = [
  { label: "Social", icon: Share2, value: "social" },
  { label: "Product", icon: ShoppingBag, value: "product" },
  { label: "Music", icon: Music, value: "music" },
  { label: "Video", icon: Video, value: "video" },
  { label: "Podcast", icon: Podcast, value: "podcast" },
  { label: "Custom", icon: Pencil, value: "custom" },
];

export default function AddLinkPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [selectedType, setSelectedType] = useState("social");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!title || !url) {
      setError("Please fill in title and URL.");
      return;
    }
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.set("title", title);
    formData.set("url", url);
    formData.set("type", "link");

    const result = await addLink(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex h-full min-h-screen">
      {/* Form section */}
      <div className="flex-1 p-10 md:p-14 flex flex-col gap-10 overflow-y-auto">
        {/* Back link */}
        <Link href="/dashboard" className="flex items-center gap-2 text-sm font-bold text-[#7b7487] hover:text-[#1c1b1b] transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Links
        </Link>

        <header>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#1c1b1b] leading-tight">
            Add New <span className="marker">Link</span>
          </h1>
          <p className="text-[#7b7487] mt-4 font-medium">Curate your latest content for your audience.</p>
        </header>

        {error && (
          <div className="bg-[#f09ba4]/20 text-[#9a2c2c] text-sm font-medium px-4 py-3 rounded-2xl">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-8">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#7b7487] ml-1">Link Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="My New Portfolio"
              className="w-full bg-[#f3f3f3] border-none p-4 rounded-xl text-lg font-semibold text-[#1c1b1b] placeholder:text-[#cdc3d0] focus:outline-none focus:bg-white focus:ring-0 transition-all"
              style={{ borderBottom: "2px solid transparent" }}
              onFocus={e => (e.target.style.borderBottomColor = "#d2aef8")}
              onBlur={e => (e.target.style.borderBottomColor = "transparent")}
            />
          </div>

          {/* URL */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#7b7487] ml-1">URL</label>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://..."
              type="url"
              className="w-full bg-[#f3f3f3] border-none p-4 rounded-xl text-lg font-semibold text-[#1c1b1b] placeholder:text-[#cdc3d0] focus:outline-none focus:bg-white focus:ring-0 transition-all"
              style={{ borderBottom: "2px solid transparent" }}
              onFocus={e => (e.target.style.borderBottomColor = "#d2aef8")}
              onBlur={e => (e.target.style.borderBottomColor = "transparent")}
            />
          </div>

          {/* Link Type */}
          <div className="flex flex-col gap-4">
            <label className="text-xs font-bold uppercase tracking-widest text-[#7b7487] ml-1">Link Type</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {linkTypes.map(({ label, icon: Icon, value }) => (
                <button
                  key={value}
                  onClick={() => setSelectedType(value)}
                  className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all"
                  style={{
                    backgroundColor: selectedType === value ? "#d2aef8" + "1a" : "#f3f3f3",
                    border: selectedType === value ? "2px solid #d2aef8" : "2px solid transparent",
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: selectedType === value ? "#705092" : "#7b7487" }} />
                  <span className="text-[10px] font-bold uppercase text-[#1c1b1b]">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Thumbnail */}
          <div className="flex items-center gap-6 p-6 bg-[#f3f3f3] rounded-3xl">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#cdc3d0]">
              <ImagePlus className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#1c1b1b]">Thumbnail / Icon</p>
              <p className="text-xs text-[#7b7487] mt-1">Upload a custom image or pick from library</p>
            </div>
            <button className="px-4 py-2 bg-white text-[#705092] font-bold text-xs rounded-full ghost-border hover:bg-[#d2aef8]/10 transition-colors">
              Choose
            </button>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-10">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setActive(!active)}
                className="w-11 h-6 rounded-full relative transition-colors cursor-pointer"
                style={{ backgroundColor: active ? "#d2aef8" : "#e2e2e2" }}
              >
                <div
                  className="absolute top-[2px] w-5 h-5 bg-white rounded-full shadow transition-transform"
                  style={{ left: active ? "22px" : "2px" }}
                />
              </div>
              <span className="text-sm font-bold text-[#1c1b1b]">Active</span>
            </label>
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-5 rounded-full font-black text-lg text-[#1c1b1b] shadow-lg shadow-[#d2aef8]/20 hover:scale-[0.98] transition-all active:scale-95 mt-4 disabled:opacity-50"
            style={{ background: "linear-gradient(to right, #d2aef8, #c094f0)" }}
          >
            {loading ? "Adding..." : "Add to Profile"}
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="w-[420px] flex-shrink-0 bg-[#f3f3f3] p-10 flex items-center justify-center border-l border-black/[0.03] hidden lg:flex">
        <div className="relative w-[280px] h-[580px] bg-[#1c1b1b] rounded-[3rem] p-3 shadow-2xl overflow-hidden ring-8 ring-[#2a2a2a]">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1c1b1b] rounded-b-2xl z-20" />
          {/* Screen */}
          <div className="w-full h-full bg-[#fafafa] rounded-[2.2rem] overflow-hidden relative p-6">
            <div className="flex flex-col items-center mt-10">
              <div className="w-20 h-20 bg-[#e2e2e2] rounded-full mb-4 border-2 border-white shadow-sm flex items-center justify-center text-2xl">
                👤
              </div>
              <h3 className="font-black text-lg text-[#1c1b1b]">@you</h3>
              <p className="text-[10px] text-[#7b7487] font-medium mt-1">Your bio here</p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {/* New link preview */}
              {title && (
                <div className="w-full py-4 px-6 bg-white rounded-full shadow-sm flex items-center justify-between" style={{ border: "1px solid rgba(205,195,208,0.1)" }}>
                  <span className="text-sm font-bold text-[#705092] truncate max-w-[140px]">{title}</span>
                  <span className="text-[#705092]">→</span>
                </div>
              )}
              {/* Ghost links */}
              <div className="w-full py-4 px-6 bg-white rounded-full shadow-sm flex items-center justify-between opacity-40" style={{ border: "1px solid rgba(205,195,208,0.1)" }}>
                <span className="text-sm font-bold text-[#7b7487]">Existing Link</span>
                <span className="text-[#cdc3d0]">→</span>
              </div>
              <div className="w-full py-4 px-6 bg-white rounded-full shadow-sm flex items-center justify-between opacity-40" style={{ border: "1px solid rgba(205,195,208,0.1)" }}>
                <span className="text-sm font-bold text-[#7b7487]">Another Link</span>
                <span className="text-[#cdc3d0]">→</span>
              </div>
            </div>
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <span className="text-[10px] font-black italic text-[#d2aef8] tracking-tight">Biiio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
