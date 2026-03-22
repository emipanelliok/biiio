"use client";

import { useState } from "react";
import { BiiioLink } from "@/lib/types";
import { GripVertical, Pencil, Trash2, Plus, Eye, EyeOff } from "lucide-react";

interface LinkEditorProps {
  links: BiiioLink[];
}

export default function LinkEditor({ links: initialLinks }: LinkEditorProps) {
  const [links, setLinks] = useState(initialLinks);

  const toggleActive = (id: string) => {
    setLinks(l => l.map(link => link.id === id ? { ...link, active: !link.active } : link));
  };

  const deleteLink = (id: string) => {
    setLinks(l => l.filter(link => link.id !== id));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Add link button */}
      <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#d2aef8] text-[#1c1b1b] font-bold text-sm hover:opacity-90 transition-opacity shadow-sm">
        <Plus className="w-4 h-4" />
        Add New Link
      </button>

      {/* Link list */}
      <div className="flex flex-col gap-2 mt-2">
        {links.map((link) => (
          <div
            key={link.id}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white ghost-border shadow-sm transition-all duration-150 group ${!link.active ? "opacity-50" : ""}`}
          >
            <GripVertical className="w-4 h-4 text-[#ccc3d8] flex-shrink-0 cursor-grab" />

            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f6f3f2] text-base flex-shrink-0">
              {link.emoji || "🔗"}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[#1c1b1b] text-sm font-bold truncate">{link.title}</p>
              <p className="text-[#7b7487] text-xs truncate">{link.url}</p>
            </div>

            {link.clicks !== undefined && (
              <span className="text-[#ccc3d8] text-xs font-medium flex-shrink-0 hidden sm:block">
                {link.clicks.toLocaleString()} clicks
              </span>
            )}

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => toggleActive(link.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-[#ccc3d8] hover:bg-[#f6f3f2] hover:text-[#4a4455] transition-all"
              >
                {link.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#ccc3d8] hover:bg-[#f6f3f2] hover:text-[#4a4455] transition-all">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => deleteLink(link.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-[#ccc3d8] hover:bg-[#f09ba4]/20 hover:text-[#f09ba4] transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
