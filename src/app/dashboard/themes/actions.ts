"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveAppearance(data: {
  theme: string;
  marker_color: string;
  button_roundness: string;
  button_shadow: string;
  button_style: string;
  button_color: string;
  header_style: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("profiles")
    .update({
      theme: data.theme,
      marker_color: data.marker_color,
      button_roundness: data.button_roundness,
      button_shadow: data.button_shadow,
      button_style: data.button_style,
      button_color: data.button_color,
      header_style: data.header_style,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/themes");
  return { success: true };
}
