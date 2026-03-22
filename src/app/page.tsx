import Link from "next/link";
import BiiioLogo from "@/components/BiiioLogo";

const marqueeItems = [
  "NO CODING REQUIRED", "FULLY CUSTOMIZABLE", "SET UP IN MINUTES",
  "BEAUTIFUL TEMPLATES", "ANALYTICS BUILT IN", "FREE TO START",
  "NO CODING REQUIRED", "FULLY CUSTOMIZABLE", "SET UP IN MINUTES",
  "BEAUTIFUL TEMPLATES", "ANALYTICS BUILT IN", "FREE TO START",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-12">
          <BiiioLogo size="lg" />
          <div className="hidden md:flex gap-8">
            <a href="#" className="font-bold text-[#d2aef8] border-b-2 border-[#f7d59e] text-sm">Customers</a>
            <a href="#" className="text-[#1c1b1b] font-medium text-sm hover:text-[#d2aef8] transition-colors">Templates</a>
            <a href="#" className="text-[#1c1b1b] font-medium text-sm hover:text-[#d2aef8] transition-colors">Pricing</a>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/login" className="text-sm font-semibold text-[#1c1b1b] hover:opacity-70 transition-opacity">Log In</Link>
          <Link
            href="/signup"
            className="bg-[#d2aef8] text-[#1c1b1b] px-7 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-[#d2aef8]/30 hover:opacity-90 transition-opacity"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 px-8 pt-16 pb-24 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="animate-in">
          <h1 className="font-black text-7xl md:text-8xl tracking-tighter leading-[0.9] mb-8 text-[#111]">
            One link for<br />
            <span className="marker">everything</span>
          </h1>
          <p className="text-lg text-[#4a4455] font-medium mb-10 max-w-lg leading-relaxed">
            The launchpad for your digital life. Connect your audience to all your content, products, and socials with a single, beautiful link.
          </p>

          {/* Input CTA */}
          <div className="flex items-center p-2 bg-white rounded-full max-w-xl border border-[rgba(0,0,0,0.06)] shadow-sm focus-within:shadow-md transition-shadow">
            <div className="flex items-center flex-1 px-5 py-2">
              <span className="text-[#4a4455] font-bold mr-1 text-sm">biiio.io/</span>
              <input
                className="bg-transparent border-none outline-none text-[#1c1b1b] font-bold placeholder:text-[#ccc3d8] w-full text-sm"
                placeholder="yourname"
                type="text"
              />
            </div>
            <Link href="/signup" className="bg-[#1c1b1b] text-white px-7 py-3.5 rounded-full font-black text-sm hover:opacity-80 transition-opacity whitespace-nowrap">
              Get Started
            </Link>
          </div>
          <p className="mt-3 px-5 text-xs text-[#7b7487] italic">It's free, and takes less than a minute.</p>
        </div>

        {/* Phone mockups */}
        <div className="relative flex justify-center items-center h-[520px] animate-in delay-2">
          {/* Back phone */}
          <div className="absolute w-[240px] h-[480px] bg-[#d2aef8] rounded-[2.5rem] shadow-2xl rotate-[-10deg] -translate-x-20 opacity-40" />
          {/* Front phone */}
          <div className="absolute w-[250px] h-[500px] bg-white rounded-[2.5rem] shadow-2xl rotate-[-3deg] translate-x-6 border-[6px] border-[#111] overflow-hidden">
            <div className="h-full bg-[#fcf9f8] flex flex-col items-center pt-10 px-5 gap-4">
              <div className="w-20 h-20 rounded-full bg-[#f09ba4] overflow-hidden shadow-inner border-4 border-white" />
              <div className="text-center">
                <p className="font-black text-base text-[#111] tracking-tight">@sarah_creates</p>
                <p className="text-xs text-[#4a4455] mt-0.5">Photographer & Storyteller</p>
              </div>
              {[
                { label: "My Portfolio", bg: "#d2aef8" },
                { label: "Latest YouTube", bg: "#91cefb" },
                { label: "Book a Call", bg: "#f7d59e" },
                { label: "Newsletter", bg: "#f09ba4" },
              ].map(({ label, bg }) => (
                <div
                  key={label}
                  className="w-full py-3 rounded-full text-center text-xs font-bold text-[#1c1b1b] shadow-sm"
                  style={{ backgroundColor: bg }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
          {/* Third card floating */}
          <div className="absolute top-8 right-0 w-[160px] bg-white rounded-2xl shadow-xl p-4 rotate-[6deg] ghost-border">
            <div className="text-xs font-bold text-[#111] mb-1">Weekly Newsletter</div>
            <div className="text-[10px] text-[#4a4455]">500+ subscribers</div>
            <div className="mt-2 h-1.5 rounded-full bg-[#d2aef8] w-3/4" />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#d2aef8] py-4 overflow-hidden">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="text-[#1c1b1b] font-black text-sm uppercase tracking-widest mx-8 flex-shrink-0">
              {item} <span className="mx-4 opacity-50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Built for creators */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#d2aef8] mb-4">THE PLATFORM</p>
            <h2 className="font-black text-5xl tracking-tighter leading-tight text-[#111] mb-6">
              Built for every <span className="marker marker-violet">creator.</span>
            </h2>
            <p className="text-[#4a4455] text-lg leading-relaxed mb-10">
              Whether you're a musician, designer, coach or entrepreneur — Biiio gives you a page that feels as intentional as your work.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Beautiful Templates", color: "#d2aef8" },
                { label: "Smart Analytics",     color: "#91cefb" },
                { label: "Custom Domains",       color: "#f7d59e" },
                { label: "AI Page Builder",      color: "#f09ba4" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-3 p-4 bg-white rounded-2xl ghost-border shadow-sm">
                  <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="font-bold text-sm text-[#1c1b1b]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Infinite customization card */}
          <div className="bg-[#f0eaff] rounded-3xl p-10 flex flex-col items-center text-center gap-4">
            <div className="text-5xl">✦</div>
            <h3 className="font-black text-2xl tracking-tight text-[#1c1b1b]">Infinite Customization</h3>
            <p className="text-[#4a4455] text-sm leading-relaxed max-w-xs">
              Colors, fonts, layouts — make it yours. No design skills required, just your taste.
            </p>
            <div className="flex gap-2 mt-2">
              {["#d2aef8","#91cefb","#f7d59e","#f09ba4","#1c1b1b"].map(c => (
                <div key={c} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-[#f0eaff] py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-black text-5xl tracking-tighter text-[#111] mb-4">
            The world is linking with <span className="marker">Biiio.</span>
          </h2>
          <p className="text-[#4a4455] text-lg mb-12">Loved by 10,000+ creators worldwide</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sofia M.", role: "Photographer", text: "Finally a link page that looks as good as my photos. My engagement tripled." },
              { name: "Carlos D.", role: "Music Producer", text: "Set it up in 5 minutes. All my streams, beats and socials in one place." },
              { name: "Mia L.", role: "Coach & Speaker", text: "My clients always comment on how beautiful my page is. Best tool I use." },
            ].map(({ name, role, text }) => (
              <div key={name} className="bg-white rounded-2xl p-6 text-left ghost-border shadow-sm">
                <div className="flex gap-1 mb-4">
                  {"★★★★★".split("").map((s, i) => <span key={i} className="text-[#f7d59e] text-lg">★</span>)}
                </div>
                <p className="text-[#1c1b1b] text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <div>
                  <p className="font-bold text-sm text-[#1c1b1b]">{name}</p>
                  <p className="text-xs text-[#7b7487]">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA dark */}
      <section className="bg-[#1c1b1b] py-20 px-8 text-center">
        <h2 className="font-black text-5xl tracking-tighter text-white mb-4">
          Claim your link<br />before it&apos;s gone.
        </h2>
        <p className="text-[#7b7487] mb-8">Your name is waiting.</p>
        <Link
          href="/dashboard"
          className="inline-block bg-[#d2aef8] text-[#1c1b1b] px-10 py-4 rounded-full font-black text-lg shadow-xl hover:opacity-90 transition-opacity"
        >
          Get started — it&apos;s free
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 flex items-center justify-between max-w-7xl mx-auto w-full text-xs text-[#7b7487]">
        <BiiioLogo size="sm" />
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#1c1b1b] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#1c1b1b] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#1c1b1b] transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
}
