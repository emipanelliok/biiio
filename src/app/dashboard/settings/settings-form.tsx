"use client";

import { useState, useRef } from "react";
import { updateProfile, updateAvatar } from "./actions";
import { Camera, Shield, Lock, Bell, Sparkles, KeyRound } from "lucide-react";

interface Props {
  profile: {
    username: string;
    displayName: string;
    bio: string;
    avatarUrl: string;
    email: string;
  };
}

export default function SettingsForm({ profile }: Props) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatarUrl);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [twoFA, setTwoFA] = useState(true);
  const [notif1, setNotif1] = useState(true);
  const [notif2, setNotif2] = useState(true);
  const [notif3, setNotif3] = useState(false);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    setError("");
    const formData = new FormData();
    formData.set("display_name", displayName);
    formData.set("bio", bio);
    formData.set("username", username);
    const result = await updateProfile(formData);
    if (result?.error) setError(result.error);
    else setMessage("Profile saved!");
    setSaving(false);
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.set("avatar", file);
    const result = await updateAvatar(formData);
    if (result?.error) setError(result.error);
    else if (result?.url) { setAvatarPreview(result.url); setMessage("Avatar updated!"); }
  }

  const avatarSrc = avatarPreview || `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;

  return (
    <div className="p-8 md:p-12 max-w-6xl pb-32">
      {/* Header */}
      <div className="mb-14">
        <h1 className="text-5xl font-black tracking-tighter text-[#1c1b1b]">
          Account <span className="marker">Settings</span>
        </h1>
        <p className="text-[#7b7487] mt-4 text-lg leading-relaxed max-w-xl">
          Refine your digital presence. This is your command center for personal identity and platform security.
        </p>
      </div>

      {message && (
        <div className="bg-[#d2aef8]/20 text-[#5b3fa0] text-sm font-medium px-4 py-3 rounded-2xl mb-6">{message}</div>
      )}
      {error && (
        <div className="bg-[#f09ba4]/20 text-[#9a2c2c] text-sm font-medium px-4 py-3 rounded-2xl mb-6">{error}</div>
      )}

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">

        {/* Profile Section — 8 cols */}
        <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-3xl" style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Avatar */}
            <div className="relative group cursor-pointer flex-shrink-0" onClick={() => fileRef.current?.click()}>
              <div className="w-32 h-32 rounded-3xl p-1 border-4 border-[#d2aef8] overflow-hidden">
                <img src={avatarSrc} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 bg-[#705092] text-white p-2 rounded-full shadow-lg border-4 border-white">
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>

            {/* Fields */}
            <div className="flex-1 w-full flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#7b7487]">Display Name</label>
                  <input
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    className="w-full bg-[#f3f3f3] border-none rounded-xl px-4 py-3 text-sm font-semibold text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#d2aef8]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#7b7487]">Email Address</label>
                  <input
                    value={profile.email}
                    disabled
                    className="w-full bg-[#f3f3f3] border-none rounded-xl px-4 py-3 text-sm font-semibold text-[#aaa3b5] cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#7b7487]">Professional Bio</label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={3}
                  placeholder="Tell your audience about yourself..."
                  className="w-full bg-[#f3f3f3] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#1a1c1c] placeholder:text-[#cdc3d0] focus:outline-none focus:ring-2 focus:ring-[#d2aef8] resize-vertical"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pro Plan Card — 4 cols */}
        <div
          className="col-span-12 lg:col-span-4 rounded-3xl p-8 flex flex-col justify-between"
          style={{ backgroundColor: "rgba(144,205,250,0.3)" }}
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="bg-[#1d648c] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Pro Plan</span>
              <svg className="w-8 h-8 text-[#1d648c]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l3.09 6.26L22 8.27l-5 4.87 1.18 6.88L12 16.77l-6.18 3.25L7 13.14 2 8.27l6.91-1.01L12 1z"/></svg>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-[#005176] mb-2">Curator Premium</h3>
            <p className="text-sm text-[#1d648c] font-medium">Billed annually • $120/year</p>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <button className="w-full bg-[#87c4f0] text-[#005176] py-3 rounded-xl font-bold text-sm hover:brightness-95 transition-all">
              Manage Billing
            </button>
            <p className="text-[10px] text-center text-[#7b7487] font-medium">Next payment on Oct 12, 2024</p>
          </div>
        </div>

        {/* Security — 6 cols */}
        <div className="col-span-12 lg:col-span-6 bg-[#f3f3f3] p-10 rounded-3xl">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-5 h-5 text-[#735a2e]" />
            <h3 className="text-xl font-black tracking-tight text-[#1c1b1b]">Security & Privacy</h3>
          </div>
          <div className="flex flex-col gap-4">
            {/* 2FA */}
            <div className="flex justify-between items-center p-4 bg-white rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#fddba3]/30 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-[#735a2e]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1c1b1b]">Two-Factor Auth</p>
                  <p className="text-xs text-[#7b7487]">Protect your account with SMS codes</p>
                </div>
              </div>
              <div
                onClick={() => setTwoFA(!twoFA)}
                className="w-12 h-6 rounded-full relative cursor-pointer transition-colors"
                style={{ backgroundColor: twoFA ? "#d2aef8" : "#e2e2e2" }}
              >
                <div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
                  style={{ left: twoFA ? "26px" : "4px" }}
                />
              </div>
            </div>
            {/* Password */}
            <div className="flex justify-between items-center p-4 bg-white rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#ffdad6]/30 rounded-full flex items-center justify-center">
                  <KeyRound className="w-4 h-4 text-[#93000a]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1c1b1b]">Password</p>
                  <p className="text-xs text-[#7b7487]">Last changed 3 months ago</p>
                </div>
              </div>
              <button className="text-[#705092] text-sm font-bold px-4 py-2 hover:bg-[#d2aef8]/20 rounded-lg transition-colors">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Notifications — 6 cols */}
        <div className="col-span-12 lg:col-span-6 bg-[#f3f3f3] p-10 rounded-3xl">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="w-5 h-5 text-[#705092]" />
            <h3 className="text-xl font-black tracking-tight text-[#1c1b1b]">Notifications</h3>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { label: "Email alerts for new curation insights", state: notif1, set: setNotif1 },
              { label: "Push notifications for collaborator comments", state: notif2, set: setNotif2 },
              { label: "Monthly curator performance report", state: notif3, set: setNotif3 },
            ].map(({ label, state, set }, i) => (
              <div key={i}>
                <label className="flex items-center justify-between cursor-pointer py-2">
                  <span className="text-sm font-semibold text-[#4a454f]">{label}</span>
                  <input
                    type="checkbox"
                    checked={state}
                    onChange={() => set(!state)}
                    className="w-5 h-5 rounded border-[#cdc3d0] text-[#705092] focus:ring-[#d2aef8]"
                  />
                </label>
                {i < 2 && <div className="h-px bg-[#e2e2e2] mt-2" />}
              </div>
            ))}
          </div>
          <div className="mt-8 bg-[#d2aef8]/10 p-4 rounded-2xl flex items-center gap-4">
            <span className="text-[#705092] text-lg">ℹ️</span>
            <p className="text-[10px] font-medium text-[#5c3e7e] leading-relaxed">
              You&apos;re currently receiving <span className="font-bold">{[notif1, notif2, notif3].filter(Boolean).length}/3</span> alert types. Notification settings affect only your primary device.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="fixed bottom-8 left-60 right-0 px-12 z-50 pointer-events-none">
        <div className="max-w-4xl mx-auto bg-[#1c1b1b]/90 backdrop-blur-xl text-white p-4 rounded-full flex items-center justify-between shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-4 px-4">
            <Sparkles className="w-4 h-4 text-[#f7d59e]" />
            <p className="text-sm font-medium">Changes you make are saved in real-time but require publishing to go live.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setDisplayName(profile.displayName); setUsername(profile.username); setBio(profile.bio); }}
              className="px-6 py-2 text-sm font-bold hover:bg-white/10 rounded-full transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#d2aef8] text-[#1c1b1b] px-8 py-2 rounded-full font-black text-sm hover:scale-105 transition-transform shadow-lg shadow-[#d2aef8]/20 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
