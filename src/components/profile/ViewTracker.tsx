"use client";

import { useEffect } from "react";

export default function ViewTracker({ username }: { username: string }) {
  useEffect(() => {
    fetch(`/api/track-view/${username}`, { method: "POST" }).catch(() => {});
  }, [username]);
  return null;
}
