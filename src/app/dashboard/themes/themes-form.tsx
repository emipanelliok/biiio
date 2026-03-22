"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { saveAppearance } from "./actions";

const themes = [
  { id: "pastel-dream", name: "Pastel Dream", tag: "CURRENT THEME", bg: "#fcf9f8", accent: "#d2aef8", card: "#f0eaff", pro: false },
  { id: "sunset-vibe", name: "Sunset Vibe", tag: "WARM & EARTHY", bg: "#fff8f0", accent: "#f09ba4", card: "#ffeee0", pro: false },
  { id: "cool-mint", name: "Cool Mint", tag: "MINIMAL & FRESH", bg: "#f0faf8", accent: "#91cefb", card: "#e0f5ff", pro: false },
  { id: "cyber-night", name: "Cyber Night", tag: "HIGH CONTRAST", bg: "#111111", accent: "#d2aef8", card: "#1e1e1e", pro: true },
  { id: "matcha-latte", name: "Matcha Latte", tag: "ORGANIC TONES", bg: "#f5f5e8", accent: "#8fb87a", card: "#eaeed8", pro: true },
];

const roundnessOpts = ["Round", "Rounded", "Square", "Hard Shadow"];
const styleOpts = ["Bold", "Outline", "Soft"];
const colorOpts = ["#d2aef8", "#1a1c1c", "#91cefb", "#f09ba4", "#f7d59e", "#f6f3f2"];
const markerOpts = [
  { color: "#d2aef8", label: "Violet" },
  { color: "#f7d59e", label: "Yellow" },
  { color: "#91cefb", label: "Cyan" },
  { color: "#f09ba4", label: "Pink" },
];

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
  return { backgroundColor: color + "20", color: color === "#f6f3f2" ? "#1c1b1b" : color, borderRadius: radius, boxShadow: shadow, border: "none" };
}

interface Props {
  initial: {
    theme: string;
    markerColor: string;
    buttonRoundness: string;
    buttonStyle: string;
    buttonColor: string;
  };
}

export default function ThemesForm({ initial }: Props) {
  const [activeTheme, setActiveTheme] = useState(initial.theme);
  const [activeRound, setActiveRound] = useState(initial.buttonRoundness);
  const [activeStyle, setActiveStyle] = useState(initial.buttonStyle);
  const [activeColor, setActiveColor] = useState(initial.buttonColor);
  const [markerColor, setMarkerColor] = useState(initial.markerColor);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await saveAppearance({
      theme: activeTheme,
      marker_color: markerColor,
      button_roundness: activeRound,
      button_style: activeStyle,
      button_color: activeColor,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const currentTheme = themes.find(t => t.id === activeTheme) || themes[0];
  const isDark = activeTheme === "cyber-night";
  const previewLabels = ["Latest Portfolio", "Reading List", "Monthly Newsletter"];

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[#f9f9f9]/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-10 py-3 md:py-4 border-b border-black/[0.04]">
        <h2 className="font-black text-base md:text-lg tracking-tighter text-[#1a1c1c]">Appearance</h2>
        <nav className="flex gap-4 md:gap-6 text-xs md:text-sm font-bold">
          <button className="text-[#d2aef8] border-b-2 border-[#f7d59e] pb-0.5">Themes</button>
          <button className="text-[#7c7480] hover:text-[#1a1c1c] transition-colors">Buttons</button>
          <button className="text-[#7c7480] hover:text-[#1a1c1c] transition-colors">Fonts</button>
        </nav>
        <div className="hidden md:flex gap-2">
          <div className="w-8 h-8 rounded-full bg-[#d2aef8] flex items-center justify-center font-black text-sm text-[#1c1b1b]">A</div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left content */}
        <div className="flex-1 px-4 md:px-10 py-6 md:py-8 overflow-y-auto">

          {/* Themes grid */}
          <div className="mb-8 md:mb-10">
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <h3 className="font-black text-xl md:text-2xl tracking-tighter text-[#1a1c1c]">Choose your <span className="marker">vibe</span></h3>
              <span className="text-xs font-bold text-[#7c7480] bg-[#eeeeee] px-3 py-1 rounded-full">6 PRESETS</span>
            </div>
            <p className="text-[#4a454f] text-sm mb-4 md:mb-6">Select a curated theme that matches your brand&apos;s personality.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme.id)}
                  className="relative rounded-2xl overflow-hidden text-left transition-all hover:scale-[1.02]"
                  style={{ border: activeTheme === theme.id ? `2px solid ${theme.accent}` : "2px solid transparent" }}
                >
                  <div className="p-3 md:p-4 h-24 md:h-32" style={{ backgroundColor: theme.bg }}>
                    <div className="flex flex-col gap-1.5">
                      <div className="h-2 md:h-2.5 rounded-full w-3/4" style={{ backgroundColor: theme.card }} />
                      <div className="h-2 md:h-2.5 rounded-full w-full" style={{ backgroundColor: theme.accent }} />
                      <div className="h-2 md:h-2.5 rounded-full w-full" style={{ backgroundColor: theme.card }} />
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
                  <div className="px-3 md:px-4 py-2 bg-white">
                    <p className="font-black text-xs text-[#1a1c1c]">{theme.name}</p>
                    <p className="text-[9px] text-[#7c7480] font-bold">{theme.tag}</p>
                  </div>
                </button>
              ))}
              <button className="rounded-2xl border-2 border-dashed border-[#cdc3d0] h-[120px] md:h-[160px] flex flex-col items-center justify-center gap-2 hover:border-[#d2aef8] transition-colors cursor-not-allowed opacity-60">
                <span className="text-2xl text-[#cdc3d0]">+</span>
                <p className="text-xs font-bold text-[#7c7480]">Custom Theme</p>
                <p className="text-[9px] text-[#cdc3d0]">Coming soon</p>
              </button>
            </div>
          </div>

          {/* Customize Buttons */}
          <div className="bg-white rounded-3xl p-5 md:p-8 shadow-[0_20px_40px_rgba(26,28,28,0.04)]">
            <h3 className="font-black text-lg md:text-xl tracking-tighter text-[#1a1c1c] mb-5 md:mb-6 flex items-center gap-2">
              Customize Buttons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] block mb-3">Button Roundness</label>
                <div className="flex gap-2 flex-wrap">
                  {roundnessOpts.map(r => (
                    <button key={r} onClick={() => setActiveRound(r)} className="px-3 md:px-4 py-2 text-xs font-bold rounded-full transition-all"
                      style={{ backgroundColor: activeRound === r ? "#1a1c1c" : "#f3f3f3", color: activeRound === r ? "white" : "#4a454f" }}
                    >{r}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] block mb-3">Visual Style</label>
                <div className="flex gap-2">
                  {styleOpts.map(s => (
                    <button key={s} onClick={() => setActiveStyle(s)} className="px-3 md:px-4 py-2 text-xs font-bold rounded-full transition-all"
                      style={{ backgroundColor: activeStyle === s ? "#1a1c1c" : "#f3f3f3", color: activeStyle === s ? "white" : "#4a454f" }}
                    >{s}</button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] block mb-3">Button Color</label>
              <div className="flex gap-3 items-center">
                {colorOpts.map(c => (
                  <button key={c} onClick={() => setActiveColor(c)} className="w-8 h-8 rounded-full transition-transform hover:scale-110"
                    style={{ backgroundColor: c, border: activeColor === c ? "3px solid #1a1c1c" : "3px solid transparent", outline: activeColor === c ? "2px solid white" : "none" }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Marker Color */}
          <div className="bg-white rounded-3xl p-5 md:p-8 shadow-[0_20px_40px_rgba(26,28,28,0.04)] mt-6 md:mt-8">
            <h3 className="font-black text-lg md:text-xl tracking-tighter text-[#1a1c1c] mb-2 flex items-center gap-2">
              Marker Highlight
            </h3>
            <p className="text-[#7b7487] text-sm mb-4 md:mb-6">Your signature highlight color. This is applied to your name and key text.</p>
            <div className="flex gap-4 items-center">
              {markerOpts.map(({ color, label }) => (
                <button key={color} onClick={() => setMarkerColor(color)} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl transition-transform hover:scale-110"
                    style={{ backgroundColor: color, border: markerColor === color ? "3px solid #1a1c1c" : "3px solid transparent", outline: markerColor === color ? "2px solid white" : "none" }}
                  />
                  <span className="text-[10px] font-bold text-[#7c7480] uppercase">{label}</span>
                </button>
              ))}
            </div>
            <div className="mt-5 md:mt-6 p-4 md:p-5 bg-[#f3f3f3] rounded-2xl">
              <p className="font-black text-xl md:text-2xl tracking-tight text-[#1c1b1b]">
                Your <span className="relative inline z-[1]">Name<span className="absolute left-[-4px] right-[-4px] bottom-[2px] h-[45%] z-[-1] rounded-[3px]" style={{ backgroundColor: markerColor, transform: "rotate(-1.5deg)" }} /></span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: phone preview — hidden on mobile */}
        <div className="hidden lg:flex w-80 flex-shrink-0 flex-col items-center pt-10 pb-8 border-l border-black/[0.04] bg-[#f3f3f3]">
          <div className="w-[220px]">
            <div className="rounded-[2rem] border-[5px] border-[#1a1c1c] overflow-hidden shadow-2xl" style={{ height: 440, backgroundColor: currentTheme.bg }}>
              <div className="w-full h-20" style={{ background: "linear-gradient(135deg, #f09ba4, #f7d59e, #91cefb, #d2aef8)" }} />
              <div className="px-4 -mt-6 pb-4 flex flex-col items-start gap-2">
                <div className="p-1 rounded-xl bg-white shadow-lg">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#d2aef8] to-[#91cefb]" />
                </div>
                <p className="font-black text-sm tracking-tight" style={{ color: isDark ? "#fff" : "#1c1b1b" }}>
                  Alex <span className="relative inline z-[1]">Rivers<span className="absolute left-[-3px] right-[-3px] bottom-[1px] h-[45%] z-[-1] rounded-[2px]" style={{ backgroundColor: markerColor, transform: "rotate(-1.5deg)" }} /></span>
                </p>
                <p className="text-[9px] mb-2" style={{ color: isDark ? "#888" : "#7c7480" }}>Digital Curator & Designer</p>
                <div className="flex flex-col gap-2 w-full">
                  {previewLabels.map((label) => (
                    <div key={label} className="w-full py-2.5 px-3 text-center text-[10px] font-bold transition-all"
                      style={getButtonStyle(activeRound, activeStyle, activeColor)}
                    >{label}</div>
                  ))}
                </div>
                <p className="text-[8px] uppercase tracking-widest font-bold mt-2 w-full text-center" style={{ color: isDark ? "#555" : "#cdc3d0" }}>
                  Previewing {activeRound} • {activeStyle}
                </p>
              </div>
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] mt-4">Live Preview</p>
        </div>
      </div>

      {/* Save bar */}
      <div className="sticky bottom-0 bg-[#1a1c1c] px-4 md:px-10 py-3 md:py-4 flex items-center justify-between z-40 mb-[60px] md:mb-0">
        <div className="hidden sm:flex items-center gap-2 text-white text-sm">
          <span className="text-[#f7d59e]">✦</span>
          Unsaved Changes — <span className="text-[#d2aef8] font-bold ml-1">{currentTheme.name}</span>
        </div>
        <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
          <button onClick={() => { setActiveTheme(initial.theme); setActiveRound(initial.buttonRoundness); setActiveStyle(initial.buttonStyle); setActiveColor(initial.buttonColor); setMarkerColor(initial.markerColor); }}
            className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 rounded-full text-[#cdc3d0] font-bold text-sm hover:text-white transition-colors">Discard</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 bg-[#d2aef8] text-[#1c1b1b] rounded-full font-black text-sm hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50">
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
