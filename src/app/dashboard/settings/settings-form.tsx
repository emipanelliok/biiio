"use client";

import { useState, useRef } from "react";
import { updateProfile, updateAvatar } from "./actions";
import { Camera, Shield, Lock, Mail, Bell } from "lucide-react";

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

  // Local-only toggles (not saved to DB yet)
  const [twoFA, setTwoFA] = useState(false);
  const [notifClicks, setNotifClicks] = useState(true);
  const [notifMilestones, setNotifMilestones] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(false);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    setError("");

    const formData = new FormData();
    formData.set("display_name", displayName);
    formData.set("bio", bio);
    formData.set("username", username);

    const result = await updateProfile(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setMessage("Profile saved!");
    }
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
    if (result?.error) {
      setError(result.error);
    } else if (result?.url) {
      setAvatarPreview(result.url);
      setMessage("Avatar updated!");
    }
  }

  const hasChanges =
    displayName !== profile.displayName ||
    username !== profile.username ||
    bio !== profile.bio;

  return (
    <div className="p-8 md:p-12 max-w-3xl flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="font-black text-4xl tracking-tighter text-[#1c1b1b]">
          Account <span className="marker">Settings</span>
        </h1>
        <p className="text-[#7b7487] text-sm mt-2">Manage your profile and preferences.</p>
      </div>

      {message && (
        <div className="bg-[#d2aef8]/20 text-[#5b3fa0] text-sm font-medium px-4 py-3 rounded-2xl">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-[#f09ba4]/20 text-[#9a2c2c] text-sm font-medium px-4 py-3 rounded-2xl">
          {error}
        </div>
      )}

      {/* Profile Card — Avatar + Name + Email + Bio */}
      <div
        className="bg-white rounded-3xl p-8 flex flex-col gap-6"
        style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}
      >
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#7b7487]">Your Profile</h2>

        {/* Avatar row */}
        <div className="flex items-center gap-5">
          <div className="relative group cursor-pointer" onClick={() => fileRef.current?.click()}>
            <div
              className="w-20 h-20 rounded-full bg-[#f3f3f3] bg-cover bg-center border-4 border-white shadow-lg"
              style={{
                backgroundImage: avatarPreview
                  ? `url(${avatarPreview})`
                  : `url(https://api.dicebear.com/7.x/initials/svg?seed=${username})`,
              }}
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <p className="font-black text-lg text-[#1c1b1b]">{displayName || username}</p>
            <p className="text-xs text-[#7b7487]">{profile.email}</p>
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="px-5 py-2 rounded-full bg-[#f3f3f3] text-[#705092] font-bold text-xs hover:bg-[#d2aef8]/20 transition-colors"
          >
            Change Photo
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#7b7487]">Display Name</label>
          <input
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            className="bg-[#f3f3f3] rounded-xl px-4 py-3.5 text-sm font-medium text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#d2aef8]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#7b7487]">Username</label>
          <div className="flex items-center bg-[#f3f3f3] rounded-xl px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#d2aef8]">
            <span className="text-[#cdc3d0] font-bold text-sm mr-1">biiio.io/</span>
            <input
              value={username}
              onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
              className="bg-transparent border-none outline-none text-sm font-bold text-[#1a1c1c] flex-1"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#7b7487]">Email</label>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#cdc3d0]" />
            <input
              value={profile.email}
              disabled
              className="bg-[#f3f3f3] rounded-xl px-4 py-3.5 text-sm font-medium text-[#aaa3b5] cursor-not-allowed flex-1"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#7b7487]">Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={3}
            placeholder="Tell your audience about yourself..."
            className="bg-[#f3f3f3] rounded-xl px-4 py-3.5 text-sm font-medium text-[#1a1c1c] placeholder:text-[#cdc3d0] focus:outline-none focus:ring-2 focus:ring-[#d2aef8] resize-none"
          />
        </div>
      </div>

      {/* Pro Plan Card */}
      <div
        className="rounded-3xl p-8 flex items-center justify-between"
        style={{ backgroundColor: "#91cefb", boxShadow: "0 20px 40px rgba(145,206,251,0.3)" }}
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">Current Plan</p>
          <p className="font-black text-2xl text-white tracking-tight">Pro Plan</p>
          <p className="text-white/80 text-sm mt-1">Unlimited links, custom themes, analytics</p>
        </div>
        <button className="px-6 py-2.5 bg-white text-[#1c1b1b] rounded-full font-black text-sm hover:opacity-90 transition-opacity shadow-lg">
          Manage
        </button>
      </div>

      {/* Security & Privacy */}
      <div
        className="bg-white rounded-3xl p-8 flex flex-col gap-6"
        style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}
      >
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#705092]" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#7b7487]">Security & Privacy</h2>
        </div>

        {/* 2FA Toggle */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-[#7b7487]" />
            <div>
              <p className="text-sm font-bold text-[#1c1b1b]">Two-Factor Authentication</p>
              <p className="text-xs text-[#7b7487]">Add an extra layer of security</p>
            </div>
          </div>
          <div
            onClick={() => setTwoFA(!twoFA)}
            className="w-11 h-6 rounded-full relative cursor-pointer transition-colors"
            style={{ backgroundColor: twoFA ? "#d2aef8" : "#e2e2e2" }}
          >
            <div
              className="absolute top-[2px] w-5 h-5 bg-white rounded-full shadow transition-transform"
              style={{ left: twoFA ? "22px" : "2px" }}
            />
          </div>
        </div>

        {/* Change password */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-bold text-[#1c1b1b]">Password</p>
            <p className="text-xs text-[#7b7487]">Last changed 30 days ago</p>
          </div>
          <button className="px-5 py-2 rounded-full bg-[#f3f3f3] text-[#705092] font-bold text-xs hover:bg-[#d2aef8]/20 transition-colors">
            Change
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div
        className="bg-white rounded-3xl p-8 flex flex-col gap-5"
        style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}
      >
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#705092]" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#7b7487]">Notifications</h2>
        </div>

        {[
          { label: "Link click alerts", desc: "Get notified when someone clicks your links", state: notifClicks, set: setNotifClicks },
          { label: "Milestone alerts", desc: "Celebrate when you hit view milestones", state: notifMilestones, set: setNotifMilestones },
          { label: "Weekly digest", desc: "Summary of your performance every Monday", state: notifWeekly, set: setNotifWeekly },
        ].map(({ label, desc, state, set }) => (
          <div key={label} className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-bold text-[#1c1b1b]">{label}</p>
              <p className="text-xs text-[#7b7487]">{desc}</p>
            </div>
            <div
              onClick={() => set(!state)}
              className="w-11 h-6 rounded-full relative cursor-pointer transition-colors"
              style={{ backgroundColor: state ? "#d2aef8" : "#e2e2e2" }}
            >
              <div
                className="absolute top-[2px] w-5 h-5 bg-white rounded-full shadow transition-transform"
                style={{ left: state ? "22px" : "2px" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Save Bar */}
      {hasChanges && (
        <div className="sticky bottom-6 bg-[#1c1b1b] text-white rounded-2xl p-4 flex items-center justify-between shadow-2xl">
          <p className="text-sm font-medium">You have unsaved changes</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setDisplayName(profile.displayName);
                setUsername(profile.username);
                setBio(profile.bio);
              }}
              className="px-5 py-2 rounded-full text-sm font-bold hover:bg-white/10 transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 rounded-full bg-[#d2aef8] text-[#1c1b1b] text-sm font-black hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
