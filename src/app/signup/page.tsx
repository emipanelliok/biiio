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
      <div className="hidden lg:flex w-1/2 bg-[#1a1c1c] flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#f7d59e]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-60 h-60 bg-[#91cefb]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <BiiioLogo size="lg" color="white" />
        </div>
        <div className="relative z-10">
          <h1 className="font-black text-5xl tracking-tighter text-white leading-tight mb-6">
            Start your<br />digital <span className="text-[#f7d59e]">journey</span>
          </h1>
          <p className="text-[#7c7480] text-lg leading-relaxed max-w-sm">
            Join thousands of creators who use Biiio to share their world through one beautiful link.
          </p>
        </div>
        <div className="relative z-10 bg-white/[0.06] rounded-2xl p-5 border border-white/[0.08]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#f7d59e] mb-2">FREE FOREVER</p>
          <p className="text-white/80 text-sm italic leading-relaxed">&ldquo;Set up in minutes. Beautiful by default.&rdquo;</p>
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
