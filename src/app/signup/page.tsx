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
          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-[#e2e2e2]" />
            <span className="text-xs text-[#cdc3d0] font-medium">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-[#e2e2e2]" />
          </div>
          <button className="w-full py-3.5 bg-white ghost-border rounded-full font-bold text-sm text-[#1a1c1c] flex items-center justify-center gap-3 hover:bg-[#f3f3f3] transition-colors shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
          <p className="text-center text-sm text-[#7c7480] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#f7d59e] font-black hover:opacity-70 transition-opacity">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
