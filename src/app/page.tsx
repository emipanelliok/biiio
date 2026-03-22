"use client";

import { useState } from "react";
import Link from "next/link";
import BiiioLogo from "@/components/BiiioLogo";
import { translations, Lang } from "@/lib/landing-translations";

const categoryColors = ["#d2aef8","#91cefb","#f7d59e","#f09ba4"];
const stepColors = ["#d2aef8","#91cefb","#f09ba4"];

const analyticsData = [
  { pct: "84%", clicks: 84 },
  { pct: "61%", clicks: 61 },
  { pct: "43%", clicks: 43 },
  { pct: "27%", clicks: 27 },
];

const socialPlatforms = [
  { color: "#E1306C", label: "IG" },
  { color: "#000000", label: "X" },
  { color: "#010101", label: "TT" },
  { color: "#FF0000", label: "YT" },
  { color: "#9146FF", label: "Tw" },
  { color: "#53FC18", label: "Ki", dark: true },
  { color: "#5865F2", label: "Di" },
  { color: "#1DB954", label: "Sp" },
  { color: "#25D366", label: "WA" },
  { color: "#26A5E4", label: "Te" },
  { color: "#0A66C2", label: "Li" },
  { color: "#1877F2", label: "FB" },
];

function TestimonialCard({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-2xl p-5 ghost-border mx-3">
      <div className="flex gap-0.5 mb-3">
        {[0,1,2,3,4].map(i => <span key={i} className="text-[#f7d59e]">★</span>)}
      </div>
      <p className="text-[#1c1b1b] text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=d2aef8,91cefb,f7d59e,f09ba4`}
          alt={name}
          className="w-9 h-9 rounded-full"
        />
        <div>
          <p className="font-bold text-sm text-[#1c1b1b]">{name}</p>
          <p className="text-xs text-[#7b7487]">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("es");
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col">

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-6 md:px-8 py-5 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-10">
          <BiiioLogo size="lg" />
          <div className="hidden md:flex gap-8">
            <a href="#faq" className="text-[#1c1b1b] font-medium text-sm hover:opacity-60 transition-opacity">{t.nav.faq}</a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="flex items-center bg-[#f3f3f3] rounded-full p-1">
            {(["es","en"] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-3 py-1 rounded-full text-xs font-bold transition-all"
                style={lang === l
                  ? { backgroundColor: "#fff", color: "#1c1b1b", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }
                  : { color: "#7b7487" }
                }
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/login" className="text-sm font-semibold text-[#1c1b1b] hover:opacity-60 transition-opacity">{t.nav.login}</Link>
          <Link href="/signup" className="bg-[#1c1b1b] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-80 transition-opacity">
            {t.nav.signup}
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="px-6 md:px-8 pt-12 md:pt-16 pb-20 md:pb-24 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="animate-in">
          <div className="inline-flex items-center gap-2 bg-[#f7d59e] text-[#1c1b1b] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            {t.hero.badge}
          </div>
          <h1 className="font-black text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] mb-6 text-[#111]">
            Three i&apos;s.<br />
            <span className="marker">One link.</span>
          </h1>
          <p className="text-lg text-[#4a4455] font-medium mb-10 max-w-lg leading-relaxed">
            {t.hero.sub}
          </p>
          <div className="flex items-center p-2 bg-white rounded-full max-w-xl border border-[rgba(0,0,0,0.06)] shadow-sm focus-within:shadow-md transition-shadow">
            <div className="flex items-center flex-1 px-5 py-2">
              <span className="text-[#4a4455] font-bold mr-1 text-sm whitespace-nowrap">biiio.io/</span>
              <input
                className="bg-transparent border-none outline-none text-[#1c1b1b] font-bold placeholder:text-[#ccc3d8] w-full text-sm"
                placeholder={t.hero.placeholder}
                type="text"
              />
            </div>
            <Link href="/signup" className="bg-[#1c1b1b] text-white px-5 md:px-7 py-3.5 rounded-full font-black text-sm hover:opacity-80 transition-opacity whitespace-nowrap">
              {t.hero.cta}
            </Link>
          </div>
          <p className="mt-3 px-5 text-xs text-[#7b7487] italic">{t.hero.note}</p>
        </div>

        {/* Phone mockup — stacked collage */}
        <div className="relative flex justify-center items-center h-[500px] md:h-[600px] animate-in delay-2">
          {/* Back: celular2 (Jessica, pink) — rotated left */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mockups/celular2.png"
            alt="Biiio profile mockup"
            className="absolute w-[280px] md:w-[340px] object-contain drop-shadow-2xl"
            style={{ transform: "rotate(-12deg) translate(-120px, 30px)", zIndex: 1 }}
          />
          {/* Middle: celular1 (Alex, blue) — slight tilt */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mockups/celular1.png"
            alt="Biiio profile mockup"
            className="absolute w-[290px] md:w-[350px] object-contain drop-shadow-2xl"
            style={{ transform: "rotate(-3deg) translate(10px, -15px)", zIndex: 2 }}
          />
          {/* Front: celular4 (hand) — rotated right, focal point */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mockups/celular4.png"
            alt="Biiio profile mockup"
            className="absolute w-[310px] md:w-[370px] object-contain drop-shadow-2xl"
            style={{ transform: "rotate(9deg) translate(130px, 40px)", zIndex: 3 }}
          />
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="py-4 overflow-hidden" style={{ backgroundColor: "#d2aef8" }}>
        <div className="marquee-track">
          {t.marquee.map((item, i) => (
            <span key={i} className="text-[#1c1b1b] font-black text-sm uppercase tracking-widest mx-8 flex-shrink-0">
              {item} <span className="mx-4 opacity-40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Who uses Biiio ── */}
      <section className="py-20 md:py-24 px-6 md:px-8" style={{ backgroundColor: "#f7d59e" }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#735a2e" }}>{t.who.label}</p>
          <h2 className="font-black text-4xl md:text-5xl tracking-tighter text-[#1c1b1b] mb-5 leading-tight">
            {t.who.h2} <span className="marker marker-pink">{t.who.h2mark}</span>
          </h2>
          <p className="text-[#4a4455] text-lg mb-12 max-w-xl mx-auto leading-relaxed">{t.who.sub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {t.categories.map((label, i) => (
              <span key={label} className="px-5 py-2.5 rounded-full font-bold text-sm text-[#1c1b1b] shadow-sm" style={{ backgroundColor: categoryColors[i % 4] }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo funciona ── */}
      <section className="py-20 md:py-24 px-6 md:px-8 bg-[#fcf9f8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#7b7487] mb-4">{t.steps.label}</p>
            <h2 className="font-black text-4xl md:text-5xl tracking-tighter text-[#1c1b1b]">
              {t.steps.h2} <span className="marker">{t.steps.h2mark}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.steps.items.map(({ title, desc }, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 ghost-border shadow-sm relative overflow-hidden">
                <div className="text-8xl font-black absolute top-4 right-6 select-none text-[#1c1b1b]" style={{ opacity: 0.05 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-11 h-11 rounded-2xl mb-6" style={{ backgroundColor: stepColors[i] }} />
                <h3 className="font-black text-xl text-[#1c1b1b] mb-3">{title}</h3>
                <p className="text-[#4a4455] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature: Personalización (celeste) ── */}
      <section className="py-20 md:py-24 px-6 md:px-8" style={{ backgroundColor: "#91cefb" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1d648c" }}>{t.customization.label}</p>
            <h2 className="font-black text-4xl md:text-5xl tracking-tighter text-[#1c1b1b] mb-6 leading-tight">
              {t.customization.h2}<br /><span className="marker marker-violet">{t.customization.h2mark}</span>
            </h2>
            <p className="text-[#1c1b1b] text-lg leading-relaxed mb-8 max-w-lg">{t.customization.sub}</p>
            <Link href="/signup" className="inline-block bg-[#1c1b1b] text-white px-8 py-3.5 rounded-full font-black text-sm hover:opacity-80 transition-opacity">
              {t.customization.cta}
            </Link>
          </div>
          <div className="flex justify-center items-end gap-4 md:gap-6">
            {[
              { bg: "#d2aef8", btn: "#1c1b1b", h: "h-52" },
              { bg: "#1c1b1b", btn: "#f7d59e", h: "h-64" },
              { bg: "#f09ba4", btn: "#1c1b1b", h: "h-52" },
              { bg: "#fcf9f8", btn: "#91cefb", h: "h-44" },
            ].map(({ bg, btn, h }, i) => (
              <div key={i} className={`w-20 ${h} rounded-3xl border-4 border-white shadow-xl flex flex-col items-center justify-center gap-2 p-2`} style={{ backgroundColor: bg }}>
                <div className="w-8 h-8 rounded-full bg-white/30" />
                <div className="w-14 h-2.5 rounded-full" style={{ backgroundColor: btn, opacity: 0.8 }} />
                <div className="w-14 h-2.5 rounded-full" style={{ backgroundColor: btn, opacity: 0.8 }} />
                <div className="w-14 h-2.5 rounded-full" style={{ backgroundColor: btn, opacity: 0.8 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature: Analytics (rosa) ── */}
      <section className="py-20 md:py-24 px-6 md:px-8" style={{ backgroundColor: "#f09ba4" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex justify-center">
            <div className="bg-white rounded-3xl p-6 shadow-xl w-72">
              <div className="flex items-center justify-between mb-5">
                <p className="font-black text-sm text-[#1c1b1b]">{t.analytics.cardTitle}</p>
                <span className="text-xs text-[#7b7487] font-medium">{t.analytics.cardPeriod}</span>
              </div>
              {t.analytics.cardLinks.map((label, i) => (
                <div key={label} className="mb-4">
                  <div className="flex justify-between text-xs font-semibold text-[#4a4455] mb-1.5">
                    <span>{label}</span>
                    <span className="font-bold text-[#1c1b1b]">{analyticsData[i].clicks} clicks</span>
                  </div>
                  <div className="h-2 bg-[#f3f3f3] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: analyticsData[i].pct, backgroundColor: "#f09ba4" }} />
                  </div>
                </div>
              ))}
              <div className="mt-5 pt-4 border-t border-[#f3f3f3] flex justify-between">
                <div className="text-center">
                  <p className="font-black text-xl text-[#1c1b1b]">215</p>
                  <p className="text-[10px] text-[#7b7487]">{t.analytics.cardTotal}</p>
                </div>
                <div className="text-center">
                  <p className="font-black text-xl text-[#1c1b1b]">1.2k</p>
                  <p className="text-[10px] text-[#7b7487]">{t.analytics.cardViews}</p>
                </div>
                <div className="text-center">
                  <p className="font-black text-xl text-[#1c1b1b]">18%</p>
                  <p className="text-[10px] text-[#7b7487]">CTR</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#7a2020" }}>{t.analytics.label}</p>
            <h2 className="font-black text-4xl md:text-5xl tracking-tighter text-[#1c1b1b] mb-6 leading-tight">
              {t.analytics.h2}<br /><span className="marker">{t.analytics.h2mark}</span>
            </h2>
            <p className="text-[#1c1b1b] text-lg leading-relaxed mb-8 max-w-lg">{t.analytics.sub}</p>
            <Link href="/signup" className="inline-block bg-[#1c1b1b] text-white px-8 py-3.5 rounded-full font-black text-sm hover:opacity-80 transition-opacity">
              {t.analytics.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Feature: Redes sociales (violeta suave) ── */}
      <section className="py-20 md:py-24 px-6 md:px-8" style={{ backgroundColor: "#f0eaff" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#705092] mb-4">{t.socials.label}</p>
            <h2 className="font-black text-4xl md:text-5xl tracking-tighter text-[#1c1b1b] mb-6 leading-tight">
              {t.socials.h2}<br /><span className="marker marker-blue">{t.socials.h2mark}</span>
            </h2>
            <p className="text-[#4a4455] text-lg leading-relaxed mb-8 max-w-lg">{t.socials.sub}</p>
            <Link href="/signup" className="inline-block bg-[#1c1b1b] text-white px-8 py-3.5 rounded-full font-black text-sm hover:opacity-80 transition-opacity">
              {t.socials.cta}
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 justify-center max-w-xs mx-auto lg:mx-0 lg:ml-auto">
            {socialPlatforms.map(({ color, label, dark }) => (
              <div
                key={label}
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xs font-black shadow-md border-2 border-white"
                style={{ backgroundColor: color, color: dark ? "#1c1b1b" : "#ffffff" }}
              >
                {label}
              </div>
            ))}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xs font-black border-2 border-dashed text-[#ccc3d8]" style={{ borderColor: "#ccc3d8" }}>
              +6
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 md:py-24 overflow-hidden bg-[#1c1b1b]">
        <div className="text-center mb-12 px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#4a4455] mb-4">{t.testimonials.label}</p>
          <h2 className="font-black text-4xl md:text-5xl tracking-tighter text-white">
            {t.testimonials.h2} <span className="marker">{t.testimonials.h2mark}</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="marquee-track-slow">
            {t.testimonials.row1.map((item, i) => <TestimonialCard key={i} {...item} />)}
          </div>
          <div className="marquee-track-reverse">
            {t.testimonials.row2.map((item, i) => <TestimonialCard key={i} {...item} />)}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 md:py-24 px-6 md:px-8 bg-[#f3f3f3]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#7b7487] mb-4">{t.faq.label}</p>
            <h2 className="font-black text-4xl md:text-5xl tracking-tighter text-[#1c1b1b]">
              {t.faq.h2} <span className="marker marker-violet">{t.faq.h2mark}</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {t.faq.items.map(({ q, a }) => (
              <details key={q} className="bg-white rounded-2xl ghost-border group">
                <summary className="px-6 py-5 font-bold text-[#1c1b1b] cursor-pointer flex items-center justify-between text-sm list-none select-none">
                  {q}
                  <span className="text-[#7b7487] text-xl leading-none group-open:rotate-45 transition-transform duration-200 flex-shrink-0 ml-4">+</span>
                </summary>
                <div className="px-6 pb-5 text-[#4a4455] text-sm leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final (violeta) ── */}
      <section className="py-20 md:py-28 px-6 md:px-8 text-center" style={{ backgroundColor: "#d2aef8" }}>
        <h2 className="font-black text-4xl md:text-6xl tracking-tighter text-[#1c1b1b] mb-4 leading-tight">
          {t.cta.h2}<br /><span className="marker">{t.cta.h2mark}</span>
        </h2>
        <p className="text-[#4a4455] mb-10 text-lg">{t.cta.sub}</p>
        <div className="flex items-center p-2 bg-white rounded-full max-w-md mx-auto shadow-lg">
          <div className="flex items-center flex-1 px-5 py-2">
            <span className="text-[#4a4455] font-bold mr-1 text-sm whitespace-nowrap">biiio.io/</span>
            <input
              className="bg-transparent border-none outline-none text-[#1c1b1b] font-bold placeholder:text-[#ccc3d8] w-full text-sm"
              placeholder={t.cta.placeholder}
              type="text"
            />
          </div>
          <Link href="/signup" className="bg-[#1c1b1b] text-white px-6 py-3.5 rounded-full font-black text-sm hover:opacity-80 transition-opacity whitespace-nowrap">
            {t.cta.btn}
          </Link>
        </div>
        <p className="mt-4 text-xs text-[#4a4455]">{t.cta.note}</p>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full text-xs text-[#7b7487]">
        <BiiioLogo size="sm" />
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#1c1b1b] transition-colors">{t.footer.privacy}</a>
          <a href="#" className="hover:text-[#1c1b1b] transition-colors">{t.footer.terms}</a>
          <a href="#" className="hover:text-[#1c1b1b] transition-colors">{t.footer.support}</a>
        </div>
      </footer>
    </div>
  );
}
