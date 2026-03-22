"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const username = formData.get("username") as string;
  const category = formData.get("category") as string;

  // Update the profile created by the trigger
  const { error } = await supabase
    .from("profiles")
    .update({
      username,
      display_name: username,
      category,
    })
    .eq("id", user.id);

  if (error) {
    if (error.code === "23505") {
      return { error: "That username is already taken." };
    }
    return { error: error.message };
  }

  redirect("/dashboard");
}
