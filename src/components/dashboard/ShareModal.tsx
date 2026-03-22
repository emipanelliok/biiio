"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Check, Copy, QrCode } from "lucide-react";

const PLATFORMS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    getUrl: (url: string) => `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    id: "x",
    label: "X / Twitter",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    getUrl: (url: string, username: string) =>
      `https://twitter.com/intent/tweet?text=Check+out+%40${username}+on+Biiio&url=${encodeURIComponent(url)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

interface Props {
  username: string;
  onClose: () => void;
}

function ModalContent({ username, onClose }: Props) {
  const profileUrl = `https://biiio.io/${username}`;
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  async function copyUrl() {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-black text-lg text-[#1c1b1b] tracking-tight">Share your page</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#f3f3f3] text-[#7c7480] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* URL row */}
        <div className="flex items-center gap-2 bg-[#f3f3f3] rounded-2xl px-4 py-3 mb-5">
          <span className="font-black text-[#f7d59e] text-lg select-none">✦</span>
          <span className="flex-1 text-sm font-medium text-[#1c1b1b] truncate">{profileUrl}</span>
          <button
            onClick={copyUrl}
            className="flex items-center gap-1.5 bg-[#1c1b1b] text-white text-xs font-black px-3 py-1.5 rounded-xl hover:opacity-80 transition-opacity flex-shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* QR */}
        {showQr && (
          <div className="flex flex-col items-center mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(profileUrl)}&bgcolor=ffffff&color=1c1b1b&margin=10`}
              alt="QR Code"
              className="w-36 h-36 rounded-2xl border border-black/[0.06]"
            />
            <button onClick={() => setShowQr(false)} className="text-xs text-[#7c7480] font-bold mt-2 hover:text-[#1c1b1b]">
              Hide QR
            </button>
          </div>
        )}

        {/* Share to */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c7480] mb-3">Share to</p>
        <div className="grid grid-cols-5 gap-3">
          {PLATFORMS.map(p => (
            <a
              key={p.id}
              href={p.getUrl(profileUrl, username)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 group"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                style={{ backgroundColor: p.color }}
              >
                {p.icon}
              </div>
              <span className="text-[10px] font-bold text-[#7c7480] text-center leading-tight">{p.label}</span>
            </a>
          ))}
          <button
            onClick={() => setShowQr(v => !v)}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#f3f3f3] text-[#4a4455] transition-transform group-hover:scale-110">
              <QrCode className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-[#7c7480]">QR Code</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShareModal({ username, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(<ModalContent username={username} onClose={onClose} />, document.body);
}
