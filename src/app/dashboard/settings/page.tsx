"use client";

import { useState } from "react";
import { Bell, HelpCircle, Search, Camera, Shield, Lock, Mail, User } from "lucide-react";

export default function SettingsPage() {
  const [twoFA, setTwoFA] = useState(true);
  const [notif1, setNotif1] = useState(true);
  const [notif2, setNotif2] = useState(true);
  const [notif3, setNotif3] = useState(false);

  return (
    <div className="min-h-screen bg-[#f9f9f9]">

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[#f9f9f9]/80 backdrop-blur-xl flex justify-between items-center px-10 py-4 border-b border-black/[0.04]">
        <span className="font-black text-xl tracking-tighter text-[#1a1c1c]">Biiio</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#eeeeee] px-4 py-2 rounded-full w-56">
            <Search className="w-4 h-4 text-[#7c7480]" />
            <input className="bg-transparent border-none outline-none text-sm w-full text-[#1a1c1c] placeholder:text-[#7c7480]" placeholder="Search settings..." />
          </div>
          <button className="p-2 text-[#7c7480] hover:text-[#d2aef8] transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#7c7480] hover:text-[#d2aef8] transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#d2aef8] flex items-center justify-center font-black text-sm text-[#1c1b1b]">A</div>
        </div>
      </header>

      {/* Content */}
      <main className="px-12 py-12 max-w-5xl">

        {/* Title */}
        <div className="mb-12">
          <h1 className="font-black text-5xl tracking-tighter text-[#1a1c1c]">
            Account <span className="marker">Settings</span>
          </h1>
          <p className="text-[#4a454f] mt-3 text-lg leading-relaxed max-w-xl">
            Refine your digital presence. This is your command center for personal identity and platform security.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">

          {/* Profile card */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 shadow-[0_20px_40px_rgba(26,28,28,0.04)]">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 rounded-full border-4 border-[#d2aef8] overflow-hidden bg-[#f3f3f3]">
                  <div className="w-full h-full bg-gradient-to-br from-[#d2aef8] to-[#91cefb] flex items-center justify-center font-black text-4xl text-white">A</div>
                </div>
                <button className="absolute bottom-0 right-0 bg-[#d2aef8] text-[#1c1b1b] p-2 rounded-full shadow-lg border-4 border-white">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Fields */}
              <div className="flex-1 w-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] flex items-center gap-1.5">
                      <User className="w-3 h-3" /> Display Name
                    </label>
                    <input
                      className="w-full bg-[#f3f3f3] border-none rounded-2xl px-4 py-3 font-bold text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#d2aef8]"
                      defaultValue="Alex Rivera"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] flex items-center gap-1.5">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <input
                      className="w-full bg-[#f3f3f3] border-none rounded-2xl px-4 py-3 font-bold text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#d2aef8]"
                      defaultValue="alex@biiio.io"
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480]">Professional Bio</label>
                  <textarea
                    className="w-full bg-[#f3f3f3] border-none rounded-2xl px-4 py-3 font-medium text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#d2aef8] resize-none"
                    rows={3}
                    defaultValue="Multidisciplinary digital curator based in Brooklyn. Crafting experiences that bridge art and technology."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pro Plan card */}
          <div className="col-span-12 lg:col-span-4 bg-[#91cefb]/20 rounded-3xl p-7 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-[#91cefb] text-[#1c1b1b] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Pro Plan</span>
              <span className="text-[#1c1b1b] text-lg">✓</span>
            </div>
            <div>
              <h3 className="font-black text-2xl tracking-tight text-[#1a1c1c]">Curator<br />Premium</h3>
              <p className="text-[#4a454f] text-sm mt-1">Billed annually · <span className="font-bold">$120/year</span></p>
            </div>
            <button className="w-full py-3 bg-[#91cefb] text-[#1c1b1b] font-black rounded-full text-sm hover:opacity-90 transition-opacity shadow-sm">
              Manage Billing
            </button>
            <p className="text-[#7c7480] text-xs text-center">Next payment on Oct 12, 2025</p>
          </div>

          {/* Security & Privacy */}
          <div className="col-span-12 md:col-span-6 bg-white rounded-3xl p-8 shadow-[0_20px_40px_rgba(26,28,28,0.04)]">
            <h3 className="font-black text-xl tracking-tight text-[#1a1c1c] mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#f09ba4]" />
              Security & Privacy
            </h3>
            <div className="space-y-4">
              <div className="bg-[#f3f3f3] rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f7d59e] flex items-center justify-center">
                    <Lock className="w-4 h-4 text-[#1c1b1b]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#1a1c1c]">Two-Factor Auth</p>
                    <p className="text-xs text-[#7c7480]">Protect your account with SMS codes</p>
                  </div>
                </div>
                {/* Toggle */}
                <button
                  onClick={() => setTwoFA(!twoFA)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${twoFA ? "bg-[#d2aef8]" : "bg-[#e2e2e2]"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${twoFA ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div className="bg-[#f3f3f3] rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f09ba4] flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#1a1c1c]">Password</p>
                    <p className="text-xs text-[#7c7480]">Last changed 3 months ago</p>
                  </div>
                </div>
                <button className="text-[#d2aef8] font-bold text-sm hover:opacity-70 transition-opacity">Change</button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="col-span-12 md:col-span-6 bg-white rounded-3xl p-8 shadow-[0_20px_40px_rgba(26,28,28,0.04)]">
            <h3 className="font-black text-xl tracking-tight text-[#1a1c1c] mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#91cefb]" />
              Notifications
            </h3>
            <div className="space-y-4">
              {[
                { label: "Email alerts for new curation insights", state: notif1, set: setNotif1 },
                { label: "Push notifications for collaborator comments", state: notif2, set: setNotif2 },
                { label: "Monthly curator performance report", state: notif3, set: setNotif3 },
              ].map(({ label, state, set }) => (
                <label key={label} className="flex items-center justify-between gap-4 cursor-pointer">
                  <span className="text-sm text-[#1a1c1c] font-medium leading-snug">{label}</span>
                  <input
                    type="checkbox"
                    checked={state}
                    onChange={() => set(!state)}
                    className="w-5 h-5 rounded-md border-[#cdc3d0] text-[#d2aef8] focus:ring-[#d2aef8] flex-shrink-0"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Save bar */}
      <div className="fixed bottom-0 left-60 right-0 bg-[#1a1c1c] px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white text-sm">
          <span className="text-[#d2aef8]">✦</span>
          Changes you make are saved in real-time but require publishing to go live.
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-full text-[#cdc3d0] font-bold text-sm hover:text-white transition-colors">Discard</button>
          <button className="px-6 py-2.5 bg-[#d2aef8] text-[#1c1b1b] rounded-full font-black text-sm hover:opacity-90 transition-opacity shadow-lg">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
