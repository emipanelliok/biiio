"use client";

import Link from "next/link";
import { useState } from "react";
import BiiioLogo from "@/components/BiiioLogo";
import { signup } from "./actions";

export default function SignupPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — colorful, on-brand */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-14 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f7d59e 0%, #f09ba4 40%, #d2aef8 75%, #91cefb 100%)" }}>
        {/* Noise/texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        <div className="relative z-10">
          <BiiioLogo size="lg" />
        </div>

        {/* Floating profile card mockup */}
        <div className="relative z-10 flex flex-col items-start gap-6">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl w-72">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f7d59e] to-[#f09ba4] flex-shrink-0" />
              <div>
                <p className="font-black text-sm text-[#1c1b1b]">Tu <span className="relative inline z-[1]">nombre<span className="absolute left-[-3px] right-[-3px] bottom-[1px] h-[45%] z-[-1] rounded-[2px]" style={{ backgroundColor: "#f7d59e" }} /></span></p>
                <p className="text-xs text-[#7b7487]">tu bio va acá ✨</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {["Mi portfolio", "Mis redes", "Mi newsletter"].map(l => (
                <div key={l} className="w-full py-2.5 px-4 rounded-xl bg-[#f7d59e] text-xs font-bold text-[#1c1b1b] text-center">{l}</div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="font-black text-4xl tracking-tighter text-[#1c1b1b] leading-tight mb-3">
              Tu link,<br />tu identidad.
            </h1>
            <p className="text-[#4a4455] text-base leading-relaxed max-w-xs">
              Gratis para siempre. Listo en 2 minutos.
            </p>
          </div>
        </div>

        <div className="relative z-10 bg-white/40 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#4a4455] mb-1">FREE FOREVER</p>
          <p className="text-[#1c1b1b] text-sm font-medium italic">&ldquo;Listo en minutos. Hermoso por defecto.&rdquo;</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 bg-[#fcf9f8]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10">
            <BiiioLogo size="lg" />
          </div>
          <h2 className="font-black text-3xl tracking-tighter text-[#1a1c1b] mb-2">Create account</h2>
          <p className="text-[#7c7480] text-sm mb-8">Sign up to start building your digital identity.</p>

          {error && (
            <div className="bg-[#f09ba4]/20 text-[#9a2c2c] text-sm font-medium px-4 py-3 rounded-2xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480]">Email Address</label>
              <input name="email" type="email" required placeholder="you@email.com" className="bg-[#f3f3f3] border-none rounded-2xl px-4 py-3.5 text-sm font-medium text-[#1a1c1c] placeholder:text-[#cdc3d0] focus:outline-none focus:ring-2 focus:ring-[#f7d59e]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480]">Password</label>
              <input name="password" type="password" required minLength={6} placeholder="••••••••" className="bg-[#f3f3f3] border-none rounded-2xl px-4 py-3.5 text-sm font-medium text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#f7d59e]" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#f7d59e] text-[#1c1b1b] rounded-full font-black text-sm text-center hover:opacity-90 transition-opacity shadow-lg shadow-[#f7d59e]/30 mt-2 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign Up →"}
            </button>
          </form>
          <p className="text-center text-sm text-[#7c7480] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#f7d59e] font-black hover:opacity-70 transition-opacity">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
