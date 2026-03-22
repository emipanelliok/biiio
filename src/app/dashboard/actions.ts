"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function getUserAndUsername() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, username: null };
  const { data: profile } = await supabase
    .from("profiles").select("username").eq("id", user.id).single();
  return { supabase, user, username: profile?.username || null };
}

function revalidateAll(username: string | null) {
  revalidatePath("/dashboard");
  if (username) revalidatePath(`/${username}`);
}

export async function addSocial(platform: string, url: string) {
  const { supabase, user, username } = await getUserAndUsername();
  if (!user) return { error: "Not authenticated" };

  const { data: existing } = await supabase
    .from("socials").select("id").eq("user_id", user.id).eq("platform", platform).single();

  let error;
  if (existing) {
    ({ error } = await supabase.from("socials").update({ url }).eq("id", existing.id));
  } else {
    ({ error } = await supabase.from("socials").insert({ user_id: user.id, platform, url }));
  }

  if (error) return { error: error.message };
  revalidateAll(username);
  return { success: true };
}

export async function deleteSocial(id: string) {
  const { supabase, user, username } = await getUserAndUsername();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("socials").delete().eq("id", id).eq("user_id", user.id);
  if (error) return { error: error.message };
  revalidateAll(username);
  return { success: true };
}

export async function saveSocialPosition(position: "above" | "below") {
  const { supabase, user, username } = await getUserAndUsername();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("profiles").update({ social_position: position }).eq("id", user.id);
  if (error) return { error: error.message };
  revalidateAll(username);
  return { success: true };
}

export async function addLink(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const emoji = (formData.get("emoji") as string) || null;
  const type = (formData.get("type") as string) || "link";

  // Get max sort_order
  const { data: existing } = await supabase
    .from("links")
    .select("sort_order")
    .eq("user_id", user.id)
    .order("sort_order", { ascending: false })
    .limit(1);

  const nextOrder = existing && existing.length > 0 ? existing[0].sort_order + 1 : 0;

  const { error } = await supabase.from("links").insert({
    user_id: user.id,
    title,
    url,
    emoji,
    type,
    sort_order: nextOrder,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateLink(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const emoji = (formData.get("emoji") as string) || null;

  const { error } = await supabase
    .from("links")
    .update({ title, url, emoji, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteLink(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

export async function reorderLinks(order: { id: string; sort_order: number }[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  await Promise.all(
    order.map(({ id, sort_order }) =>
      supabase.from("links").update({ sort_order }).eq("id", id).eq("user_id", user.id)
    )
  );

  revalidatePath("/dashboard");
  return { success: true };
}

export async function toggleLink(id: string, active: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("links")
    .update({ active })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}
