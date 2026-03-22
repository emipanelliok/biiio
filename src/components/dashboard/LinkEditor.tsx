"use client";

import { useState } from "react";
import { deleteLink, toggleLink, updateLink } from "@/app/dashboard/actions";
import { Eye, EyeOff, Pencil, Trash2, GripVertical, Plus, X } from "lucide-react";
import Link from "next/link";

interface LinkItem {
  id: string;
  type: string;
  title: string;
  url: string;
  description: string;
  emoji?: string;
  active: boolean;
  clicks: number;
}

export default function LinkEditor({ links }: { links: LinkItem[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await updateLink(formData);
    setEditingId(null);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    setLoading(true);
    await deleteLink(id);
    setLoading(false);
  }

  async function handleToggle(id: string, current: boolean) {
    await toggleLink(id, !current);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Add new link button */}
      <Link
        href="/dashboard/add-link"
        className="w-full py-4 rounded-2xl bg-[#d2aef8] text-[#1c1b1b] font-black text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-[#d2aef8]/20"
      >
        <Plus className="w-4 h-4" />
        Add New Link
      </Link>

      {/* Links list */}
      {links.map((link) => (
        <div key={link.id}>
          {editingId === link.id ? (
            <form
              onSubmit={handleUpdate}
              className="bg-white rounded-2xl p-5 flex flex-col gap-3"
              style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.06)" }}
            >
              <input type="hidden" name="id" value={link.id} />
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#7c7480]">Edit Link</span>
                <button type="button" onClick={() => setEditingId(null)} className="text-[#7c7480] hover:text-[#1c1b1b]">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                name="title"
                defaultValue={link.title}
                required
                className="bg-[#f3f3f3] rounded-xl px-4 py-3 text-sm font-medium text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#d2aef8]"
              />
              <input
                name="url"
                defaultValue={link.url}
                required
                type="url"
                className="bg-[#f3f3f3] rounded-xl px-4 py-3 text-sm font-medium text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#d2aef8]"
              />
              <input
                name="emoji"
                defaultValue={link.emoji || ""}
                placeholder="Emoji (optional)"
                className="bg-[#f3f3f3] rounded-xl px-4 py-3 text-sm font-medium text-[#1a1c1c] placeholder:text-[#cdc3d0] focus:outline-none focus:ring-2 focus:ring-[#d2aef8]"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-[#1c1b1b] text-white font-black text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          ) : (
            <div
              className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 group"
              style={{
                boxShadow: "0 20px 40px rgba(26,28,28,0.04)",
                opacity: link.active ? 1 : 0.5,
              }}
            >
              <GripVertical className="w-4 h-4 text-[#cdc3d0] cursor-grab flex-shrink-0" />

              <div className="w-9 h-9 rounded-xl bg-[#f3f3f3] flex items-center justify-center text-base flex-shrink-0">
                {link.emoji || "🔗"}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#1c1b1b] truncate">{link.title}</p>
                <p className="text-xs text-[#7b7487] truncate">{link.url}</p>
              </div>

              <span className="text-xs text-[#aaa3b5] flex-shrink-0">{link.clicks.toLocaleString()} clicks</span>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleToggle(link.id, link.active)}
                  className="p-1.5 rounded-lg hover:bg-[#f3f3f3] text-[#7b7487] transition-colors"
                  title={link.active ? "Hide" : "Show"}
                >
                  {link.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setEditingId(link.id)}
                  className="p-1.5 rounded-lg hover:bg-[#f3f3f3] text-[#7b7487] transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(link.id)}
                  className="p-1.5 rounded-lg hover:bg-[#f09ba4]/20 text-[#7b7487] hover:text-[#c53030] transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {links.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#cdc3d0] text-sm">No links yet. Add your first one!</p>
        </div>
      )}
    </div>
  );
}
