import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
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
