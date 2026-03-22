import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ linkId: string }> }
) {
  const { linkId } = await params;
  const supabase = await createClient();

  const { data: link } = await supabase
    .from("links")
    .select("url, clicks")
    .eq("id", linkId)
    .single();

  if (!link) {
    return NextResponse.redirect("https://biiio.io");
  }

  // Increment clicks (fire-and-forget style)
  supabase
    .from("links")
    .update({ clicks: (link.clicks || 0) + 1 })
    .eq("id", linkId)
    .then(() => {});

  return NextResponse.redirect(link.url);
}
