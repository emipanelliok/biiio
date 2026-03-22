import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Simple in-memory rate limit: max 1 view per IP+username per 60 seconds
const viewCache = new Map<string, number>();

export async function POST(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  // Rate limiting by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const key = `${ip}:${username}`;
  const now = Date.now();
  const last = viewCache.get(key);
  if (last && now - last < 60_000) {
    return NextResponse.json({ ok: false, reason: "rate_limited" });
  }
  viewCache.set(key, now);
  // Prune old entries every ~1000 requests to prevent memory leak
  if (viewCache.size > 1000) {
    for (const [k, t] of viewCache) {
      if (now - t > 60_000) viewCache.delete(k);
    }
  }

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (!profile) return NextResponse.json({ ok: false });

  // Insert into page_views (table must exist)
  try {
    await supabase.from("page_views").insert({ user_id: profile.id });
  } catch {
    // Table may not exist yet — silently ignore
  }

  return NextResponse.json({ ok: true });
}
