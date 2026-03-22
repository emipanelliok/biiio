"use client";

import Link from "next/link";
import { login } from "./actions";
import BiiioLogo from "@/components/BiiioLogo";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-14 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #91cefb 0%, #d2aef8 50%, #f09ba4 100%)" }}>
        <div className="relative z-10">
          <BiiioLogo size="lg" />
        </div>
        <div className="relative z-10">
          <h1 className="font-black text-5xl tracking-tighter text-[#1c1b1b] leading-tight mb-6">
            Bienvenido<br />de vuelta a<br />
            <span className="relative inline-block z-[1]">
              Biiio
              <span className="absolute left-[-4px] right-[-4px] bottom-[2px] h-[40%] z-[-1] rounded-[3px]" style={{ backgroundColor: "#f7d59e" }} />
            </span>
          </h1>
          <p className="text-[#4a4455] text-lg leading-relaxed max-w-sm">
            Tu identidad digital, tus links, tus analytics. Todo en un lugar.
          </p>
        </div>
        <div className="relative z-10 bg-white/40 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#4a4455] mb-1">CURATION</p>
          <p className="text-[#1c1b1b] text-sm font-medium italic">&ldquo;Los detalles no son los detalles. Son el diseño.&rdquo;</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-8 bg-[#fcf9f8]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10">
            <BiiioLogo size="lg" />
          </div>
          <h2 className="font-black text-3xl tracking-tighter text-[#1a1c1b] mb-2">Sign in</h2>
          <p className="text-[#7c7480] text-sm mb-8">Enter your credentials to continue to your dashboard.</p>

          {error && (
            <div className="bg-[#f09ba4]/20 text-[#9a2c2c] text-sm font-medium px-4 py-3 rounded-2xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480]">Email Address</label>
              <input name="email" type="email" required placeholder="curator@biiio.io" className="bg-[#f3f3f3] border-none rounded-2xl px-4 py-3.5 text-sm font-medium text-[#1a1c1c] placeholder:text-[#cdc3d0] focus:outline-none focus:ring-2 focus:ring-[#f7d59e]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480]">Password</label>
                <a href="#" className="text-xs text-[#f7d59e] font-bold hover:opacity-70 transition-opacity">Forgot?</a>
              </div>
              <input name="password" type="password" required placeholder="••••••••" className="bg-[#f3f3f3] border-none rounded-2xl px-4 py-3.5 text-sm font-medium text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#f7d59e]" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#f7d59e] text-[#1c1b1b] rounded-full font-black text-sm text-center hover:opacity-90 transition-opacity shadow-lg shadow-[#f7d59e]/30 mt-2 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Login →"}
            </button>
          </form>
          <p className="text-center text-sm text-[#7c7480] mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#f7d59e] font-black hover:opacity-70 transition-opacity">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
