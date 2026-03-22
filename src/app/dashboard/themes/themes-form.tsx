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

const headerPatterns = [
  { id: "rainbow",       label: "Rainbow",    bg: "linear-gradient(135deg, #f09ba4, #f7d59e, #91cefb, #d2aef8)" },
  { id: "violet",        label: "Violet",     bg: "#d2aef8" },
  { id: "celeste",       label: "Celeste",    bg: "#91cefb" },
  { id: "pink",          label: "Pink",       bg: "#f09ba4" },
  { id: "yellow",        label: "Yellow",     bg: "#f7d59e" },
  { id: "violet-pink",   label: "V → Pink",   bg: "linear-gradient(135deg, #d2aef8, #f09ba4)" },
  { id: "celeste-violet",label: "C → V",      bg: "linear-gradient(135deg, #91cefb, #d2aef8)" },
  { id: "yellow-pink",   label: "Y → Pink",   bg: "linear-gradient(135deg, #f7d59e, #f09ba4)" },
  { id: "dark",          label: "Dark",       bg: "#1c1b1b" },
  { id: "dark-violet",   label: "Dark + V",   bg: "linear-gradient(135deg, #1c1b1b, #4a4455)" },
];

const roundnessOpts = ["Round", "Rounded", "Square"];
const shadowOpts    = ["None", "Soft", "Hard"];
const styleOpts     = ["Bold", "Outline", "Soft"];
const colorOpts     = ["#d2aef8", "#1a1c1c", "#91cefb", "#f09ba4", "#f7d59e", "#f6f3f2"];
const markerOpts = [
  { color: "#d2aef8", label: "Violet" },
  { color: "#f7d59e", label: "Yellow" },
  { color: "#91cefb", label: "Cyan" },
  { color: "#f09ba4", label: "Pink" },
];

function getButtonStyle(round: string, shadow: string, style: string, color: string) {
  const radius =
    round === "Round"   ? "9999px" :
    round === "Rounded" ? "12px" : "4px";

  const shadowVal =
    shadow === "Hard" ? `4px 4px 0px #1a1c1c` :
    shadow === "Soft" ? `0 4px 12px ${color}50` : "none";

  if (style === "Bold") {
    return { backgroundColor: color, color: "#1c1b1b", borderRadius: radius, boxShadow: shadowVal, border: "none" };
  }
  if (style === "Outline") {
    return { backgroundColor: "transparent", color: color === "#f6f3f2" ? "#1c1b1b" : color, borderRadius: radius, boxShadow: shadowVal, border: `2px solid ${color}` };
  }
  return { backgroundColor: color + "20", color: color === "#f6f3f2" ? "#1c1b1b" : color, borderRadius: radius, boxShadow: shadowVal, border: "none" };
}

interface Props {
  initial: {
    theme: string;
    markerColor: string;
    buttonRoundness: string;
    buttonStyle: string;
    buttonColor: string;
    buttonShadow: string;
    headerStyle: string;
  };
}

export default function ThemesForm({ initial }: Props) {
  const [activeTheme,  setActiveTheme]  = useState(initial.theme);
  const [activeRound,  setActiveRound]  = useState(
    initial.buttonRoundness === "Hard Shadow" ? "Square" : initial.buttonRoundness
  );
  const [activeShadow, setActiveShadow] = useState(
    initial.buttonRoundness === "Hard Shadow" ? "Hard" : initial.buttonShadow
  );
  const [activeStyle,  setActiveStyle]  = useState(initial.buttonStyle);
  const [activeColor,  setActiveColor]  = useState(initial.buttonColor);
  const [hexInput,     setHexInput]     = useState(initial.buttonColor);
  const [markerColor,  setMarkerColor]  = useState(initial.markerColor);
  const [headerStyle,  setHeaderStyle]  = useState(initial.headerStyle);
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  function handleColorSwatch(c: string) {
    setActiveColor(c);
    setHexInput(c);
  }

  function handleHexInput(val: string) {
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) setActiveColor(val);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await saveAppearance({
      theme: activeTheme,
      marker_color: markerColor,
      button_roundness: activeRound,
      button_shadow: activeShadow,
      button_style: activeStyle,
      button_color: activeColor,
      header_style: headerStyle,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const currentTheme = themes.find(t => t.id === activeTheme) || themes[0];
  const isDark = activeTheme === "cyber-night";
  const previewLabels = ["Latest Portfolio", "Reading List", "Monthly Newsletter"];
  const currentHeader = headerPatterns.find(h => h.id === headerStyle) || headerPatterns[0];

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

            {/* ── Mobile phone preview (inline, only on mobile) ── */}
          <div className="lg:hidden flex flex-col items-center mb-6">
            <div className="w-[180px]">
              <div className="rounded-[2rem] border-[5px] border-[#1a1c1c] overflow-hidden shadow-2xl" style={{ height: 360, backgroundColor: currentTheme.bg }}>
                <div className="w-full h-14" style={{ background: currentHeader.bg }} />
                <div className="px-3 -mt-5 pb-3 flex flex-col items-start gap-1.5">
                  <div className="p-1 rounded-xl bg-white shadow-lg">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d2aef8] to-[#91cefb]" />
                  </div>
                  <p className="font-black text-xs tracking-tight" style={{ color: isDark ? "#fff" : "#1c1b1b" }}>
                    Alex <span className="relative inline z-[1]">Rivers<span className="absolute left-[-3px] right-[-3px] bottom-[1px] h-[45%] z-[-1] rounded-[2px]" style={{ backgroundColor: markerColor, transform: "rotate(-1.5deg)" }} /></span>
                  </p>
                  <p className="text-[8px] mb-1" style={{ color: isDark ? "#888" : "#7c7480" }}>Digital Curator & Designer</p>
                  <div className="flex flex-col gap-1.5 w-full">
                    {previewLabels.map((label) => (
                      <div key={label} className="w-full py-2 px-3 text-center text-[9px] font-bold"
                        style={getButtonStyle(activeRound, activeShadow, activeStyle, activeColor)}
                      >{label}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] mt-3">Live Preview</p>
          </div>

        {/* ── Header Pattern ── */}
          <div className="bg-white rounded-3xl p-5 md:p-8 shadow-[0_20px_40px_rgba(26,28,28,0.04)] mb-6 md:mb-8">
            <h3 className="font-black text-lg md:text-xl tracking-tighter text-[#1a1c1c] mb-1">
              Header <span className="marker marker-violet">Cover</span>
            </h3>
            <p className="text-[#7b7487] text-sm mb-5">El degradé o color que se ve en la parte superior de tu perfil.</p>
            <div className="grid grid-cols-5 gap-3">
              {headerPatterns.map(p => (
                <button
                  key={p.id}
                  onClick={() => setHeaderStyle(p.id)}
                  className="relative flex flex-col items-center gap-1.5"
                >
                  <div
                    className="w-full h-12 rounded-xl transition-all hover:scale-105"
                    style={{
                      background: p.bg,
                      border: headerStyle === p.id ? "3px solid #1a1c1c" : "3px solid transparent",
                      outline: headerStyle === p.id ? "2px solid white" : "none",
                      boxShadow: headerStyle === p.id ? "0 0 0 4px #1a1c1c20" : "none",
                    }}
                  />
                  {headerStyle === p.id && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#1a1c1c] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <span className="text-[10px] font-bold text-[#7c7480] uppercase tracking-wide">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Themes grid ── */}
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

          {/* ── Customize Buttons ── */}
          <div className="bg-white rounded-3xl p-5 md:p-8 shadow-[0_20px_40px_rgba(26,28,28,0.04)]">
            <h3 className="font-black text-lg md:text-xl tracking-tighter text-[#1a1c1c] mb-5 md:mb-6">
              Customize Buttons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6">
              {/* Roundness */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] block mb-3">Corner Roundness</label>
                <div className="flex gap-2 flex-wrap">
                  {roundnessOpts.map(r => (
                    <button key={r} onClick={() => setActiveRound(r)} className="px-3 md:px-4 py-2 text-xs font-bold rounded-full transition-all"
                      style={{ backgroundColor: activeRound === r ? "#1a1c1c" : "#f3f3f3", color: activeRound === r ? "white" : "#4a454f" }}
                    >{r}</button>
                  ))}
                </div>
              </div>
              {/* Shadow */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] block mb-3">Button Shadow</label>
                <div className="flex gap-2">
                  {shadowOpts.map(s => (
                    <button key={s} onClick={() => setActiveShadow(s)} className="px-3 md:px-4 py-2 text-xs font-bold rounded-full transition-all"
                      style={{ backgroundColor: activeShadow === s ? "#1a1c1c" : "#f3f3f3", color: activeShadow === s ? "white" : "#4a454f" }}
                    >{s}</button>
                  ))}
                </div>
              </div>
              {/* Style */}
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
            {/* Color */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] block mb-3">Button Color</label>
              <div className="flex gap-3 items-center flex-wrap">
                {colorOpts.map(c => (
                  <button key={c} onClick={() => handleColorSwatch(c)} className="w-8 h-8 rounded-full transition-transform hover:scale-110"
                    style={{ backgroundColor: c, border: activeColor === c ? "3px solid #1a1c1c" : "3px solid transparent", outline: activeColor === c ? "2px solid white" : "none" }}
                  />
                ))}
                {/* Hex input */}
                <div className="flex items-center gap-1.5 ml-1">
                  <div className="w-6 h-6 rounded-md border border-[#e0e0e0]" style={{ backgroundColor: activeColor }} />
                  <input
                    type="text"
                    value={hexInput}
                    onChange={e => handleHexInput(e.target.value)}
                    maxLength={7}
                    className="w-20 px-2 py-1 text-xs font-mono bg-[#f3f3f3] rounded-lg border border-transparent focus:border-[#d2aef8] outline-none text-[#1a1c1c]"
                    placeholder="#d2aef8"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Marker Color ── */}
          <div className="bg-white rounded-3xl p-5 md:p-8 shadow-[0_20px_40px_rgba(26,28,28,0.04)] mt-6 md:mt-8">
            <h3 className="font-black text-lg md:text-xl tracking-tighter text-[#1a1c1c] mb-2">
              Marker Highlight
            </h3>
            <p className="text-[#7b7487] text-sm mb-4 md:mb-6">Your signature highlight color. Applied to your name and key text.</p>
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

        {/* Right: phone preview */}
        <div className="hidden lg:flex w-80 flex-shrink-0 flex-col items-center pt-10 pb-8 border-l border-black/[0.04] bg-[#f3f3f3]">
          <div className="w-[220px]">
            <div className="rounded-[2rem] border-[5px] border-[#1a1c1c] overflow-hidden shadow-2xl" style={{ height: 440, backgroundColor: currentTheme.bg }}>
              <div className="w-full h-20" style={{ background: currentHeader.bg }} />
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
                      style={getButtonStyle(activeRound, activeShadow, activeStyle, activeColor)}
                    >{label}</div>
                  ))}
                </div>
                <p className="text-[8px] uppercase tracking-widest font-bold mt-2 w-full text-center" style={{ color: isDark ? "#555" : "#cdc3d0" }}>
                  {activeRound} · {activeShadow} · {activeStyle}
                </p>
              </div>
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] mt-4">Live Preview</p>
        </div>
      </div>

      {/* Save bar */}
      <div className="sticky bottom-0 bg-[#1a1c1c] px-4 md:px-10 py-3 md:py-4 flex items-center justify-between z-40 mb-24 md:mb-0">
        <div className="hidden sm:flex items-center gap-2 text-white text-sm">
          <span className="text-[#f7d59e]">✦</span>
          Unsaved Changes — <span className="text-[#d2aef8] font-bold ml-1">{currentTheme.name}</span>
        </div>
        <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
          <button onClick={() => {
            setActiveTheme(initial.theme);
            setActiveRound(initial.buttonRoundness === "Hard Shadow" ? "Square" : initial.buttonRoundness);
            setActiveShadow(initial.buttonRoundness === "Hard Shadow" ? "Hard" : initial.buttonShadow);
            setActiveStyle(initial.buttonStyle);
            setActiveColor(initial.buttonColor);
            setHexInput(initial.buttonColor);
            setMarkerColor(initial.markerColor);
            setHeaderStyle(initial.headerStyle);
          }}
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
