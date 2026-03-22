"use client";

import { useState, useRef } from "react";
import { updateProfile, updateAvatar } from "./actions";
import { Camera } from "lucide-react";

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

    // Preview
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Upload
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
    <div className="p-8 md:p-12 max-w-3xl flex flex-col gap-10">
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

      {/* Avatar */}
      <div
        className="bg-white rounded-3xl p-8"
        style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}
      >
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#7b7487] mb-6">Profile Photo</h2>
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer" onClick={() => fileRef.current?.click()}>
            <div
              className="w-20 h-20 rounded-full bg-[#f3f3f3] bg-cover bg-center"
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
          <div>
            <p className="text-sm font-bold text-[#1c1b1b]">Change photo</p>
            <p className="text-xs text-[#7b7487] mt-0.5">JPG, PNG. Max 2MB.</p>
          </div>
        </div>
      </div>

      {/* Profile info */}
      <div
        className="bg-white rounded-3xl p-8 flex flex-col gap-6"
        style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}
      >
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#7b7487]">Profile Information</h2>

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
          <input
            value={profile.email}
            disabled
            className="bg-[#f3f3f3] rounded-xl px-4 py-3.5 text-sm font-medium text-[#aaa3b5] cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#7b7487]">Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={3}
            className="bg-[#f3f3f3] rounded-xl px-4 py-3.5 text-sm font-medium text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#d2aef8] resize-none"
          />
        </div>
      </div>

      {/* Save bar */}
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
