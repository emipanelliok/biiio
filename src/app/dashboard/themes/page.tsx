"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { saveTheme } from "./actions";

const themes = [
  { id: "pastel-dream", name: "Pastel Dream", tag: "CURRENT THEME", bg: "#fcf9f8", accent: "#d2aef8", card: "#f0eaff", pro: false },
  { id: "sunset-vibe", name: "Sunset Vibe", tag: "WARM & EARTHY", bg: "#fff8f0", accent: "#f09ba4", card: "#ffeee0", pro: false },
  { id: "cool-mint", name: "Cool Mint", tag: "MINIMAL & FRESH", bg: "#f0faf8", accent: "#91cefb", card: "#e0f5ff", pro: false },
  { id: "cyber-night", name: "Cyber Night", tag: "HIGH CONTRAST", bg: "#111111", accent: "#d2aef8", card: "#1e1e1e", pro: true },
  { id: "matcha-latte", name: "Matcha Latte", tag: "ORGANIC TONES", bg: "#f5f5e8", accent: "#8fb87a", card: "#eaeed8", pro: true },
];

const roundness = ["Round", "Rounded", "Square", "Hard Shadow"];
const styles = ["Bold", "Outline", "Soft"];
const colors = ["#d2aef8", "#1a1c1c", "#91cefb", "#f09ba4", "#f7d59e", "#f6f3f2"];

export default function ThemesPage() {
  const [activeTheme, setActiveTheme] = useState("pastel-dream");
  const [activeRound, setActiveRound] = useState("Pill");
  const [activeStyle, setActiveStyle] = useState("Bold");
  const [activeColor, setActiveColor] = useState("#d2aef8");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await saveTheme(activeTheme);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[#f9f9f9]/80 backdrop-blur-xl flex items-center justify-between px-10 py-4 border-b border-black/[0.04]">
        <h2 className="font-black text-lg tracking-tighter text-[#1a1c1c]">Appearance Settings</h2>
        <nav className="flex gap-6 text-sm font-bold">
          <button className="text-[#d2aef8] border-b-2 border-[#f7d59e] pb-0.5">Themes</button>
          <button className="text-[#7c7480] hover:text-[#1a1c1c] transition-colors">Buttons</button>
          <button className="text-[#7c7480] hover:text-[#1a1c1c] transition-colors">Fonts</button>
        </nav>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#7c7480] hover:bg-[#eeeeee] transition-colors">🔔</button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#7c7480] hover:bg-[#eeeeee] transition-colors">⚙️</button>
          <div className="w-8 h-8 rounded-full bg-[#d2aef8] flex items-center justify-center font-black text-sm text-[#1c1b1b]">A</div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left content */}
        <div className="flex-1 px-10 py-8 overflow-y-auto">

          {/* Themes grid */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-2xl tracking-tighter text-[#1a1c1c]">Choose your <span className="marker">vibe</span></h3>
              <span className="text-xs font-bold text-[#7c7480] bg-[#eeeeee] px-3 py-1 rounded-full">6 PRESETS</span>
            </div>
            <p className="text-[#4a454f] text-sm mb-6">Select a curated theme that matches your brand's personality or create a custom look from scratch.</p>

            <div className="grid grid-cols-3 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme.id)}
                  className="relative rounded-2xl overflow-hidden text-left transition-all hover:scale-[1.02]"
                  style={{ border: activeTheme === theme.id ? `2px solid ${theme.accent}` : "2px solid transparent" }}
                >
                  <div className="p-4 h-32" style={{ backgroundColor: theme.bg }}>
                    <div className="flex flex-col gap-1.5">
                      <div className="h-2.5 rounded-full w-3/4" style={{ backgroundColor: theme.card }} />
                      <div className="h-2.5 rounded-full w-full" style={{ backgroundColor: theme.accent }} />
                      <div className="h-2.5 rounded-full w-full" style={{ backgroundColor: theme.card }} />
                    </div>
                  </div>
                  {activeTheme === theme.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#d2aef8] flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#1c1b1b]" />
                    </div>
                  )}
                  {theme.pro && (
                    <div className="absolute top-2 left-2 bg-[#1a1c1c] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">PRO</div>
                  )}
                  <div className="px-4 py-2 bg-white">
                    <p className="font-black text-xs text-[#1a1c1c]">{theme.name}</p>
                    <p className="text-[9px] text-[#7c7480] font-bold">{theme.tag}</p>
                  </div>
                </button>
              ))}

              {/* Custom theme */}
              <button className="rounded-2xl border-2 border-dashed border-[#cdc3d0] h-[160px] flex flex-col items-center justify-center gap-2 hover:border-[#d2aef8] transition-colors">
                <span className="text-2xl text-[#cdc3d0]">+</span>
                <p className="text-xs font-bold text-[#7c7480]">Custom Theme</p>
                <p className="text-[9px] text-[#cdc3d0]">Build your own →</p>
              </button>
            </div>
          </div>

          {/* Customize Buttons */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_20px_40px_rgba(26,28,28,0.04)]">
            <h3 className="font-black text-xl tracking-tighter text-[#1a1c1c] mb-6 flex items-center gap-2">
              🎨 Customize Buttons
            </h3>

            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] block mb-3">Button Roundness</label>
                <div className="flex gap-2">
                  {roundness.map(r => (
                    <button
                      key={r}
                      onClick={() => setActiveRound(r)}
                      className="px-4 py-2 text-xs font-bold rounded-full transition-all"
                      style={{
                        backgroundColor: activeRound === r ? "#1a1c1c" : "#f3f3f3",
                        color: activeRound === r ? "white" : "#4a454f",
                      }}
                    >{r}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] block mb-3">Visual Style</label>
                <div className="flex gap-2">
                  {styles.map(s => (
                    <button
                      key={s}
                      onClick={() => setActiveStyle(s)}
                      className="px-4 py-2 text-xs font-bold rounded-full transition-all"
                      style={{
                        backgroundColor: activeStyle === s ? "#1a1c1c" : "#f3f3f3",
                        color: activeStyle === s ? "white" : "#4a454f",
                      }}
                    >{s}</button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] block mb-3">Button Color</label>
              <div className="flex gap-3 items-center">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setActiveColor(c)}
                    className="w-8 h-8 rounded-full transition-transform hover:scale-110"
                    style={{
                      backgroundColor: c,
                      border: activeColor === c ? "3px solid #1a1c1c" : "3px solid transparent",
                      outline: activeColor === c ? "2px solid white" : "none",
                    }}
                  />
                ))}
                <button className="w-8 h-8 rounded-full border-2 border-dashed border-[#cdc3d0] flex items-center justify-center text-xs text-[#7c7480] hover:border-[#d2aef8] transition-colors">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: phone preview */}
        <div className="w-72 flex-shrink-0 flex flex-col items-center pt-10 pb-8 border-l border-black/[0.04]">
          <div className="w-[180px]">
            <div className="rounded-[2rem] border-[5px] border-[#1a1c1c] overflow-hidden shadow-2xl" style={{ height: 360, backgroundColor: themes.find(t => t.id === activeTheme)?.bg || "#fcf9f8" }}>
              <div className="h-full flex flex-col items-center pt-8 px-4 gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d2aef8] to-[#91cefb]" />
                <p className="font-black text-xs text-[#1a1c1c] tracking-tight">@curated_ink</p>
                <p className="text-[9px] text-[#7c7480] text-center">Digital Creator & Curator</p>
                {["Latest Work ✦", "Book a Consultation", "My Gear List"].map((label, i) => (
                  <div
                    key={label}
                    className="w-full py-2 text-center text-[10px] font-bold text-[#1c1b1b]"
                    style={{
                      backgroundColor: i === 0 ? activeColor : themes.find(t => t.id === activeTheme)?.card || "#f0eaff",
                      borderRadius: activeRound === "Pill" ? "9999px" : activeRound === "Rounded" ? "12px" : "4px",
                    }}
                  >{label}</div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] mt-4">Live Preview</p>
        </div>
      </div>

      {/* Save bar */}
      <div className="sticky bottom-0 bg-[#1a1c1c] px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white text-sm">
          <span className="text-[#d2aef8]">✦</span>
          Unsaved Changes — Previewing <span className="text-[#d2aef8] font-bold ml-1">{themes.find(t => t.id === activeTheme)?.name}</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setActiveTheme("pastel-dream")} className="px-6 py-2.5 rounded-full text-[#cdc3d0] font-bold text-sm hover:text-white transition-colors">Discard</button>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-[#d2aef8] text-[#1c1b1b] rounded-full font-black text-sm hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50">
            {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
