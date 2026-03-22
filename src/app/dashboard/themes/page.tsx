import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ThemesForm from "./themes-form";

export default async function ThemesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("theme, marker_color, button_roundness, button_shadow, button_style, button_color, header_style")
    .eq("id", user.id)
    .single();

  return (
    <ThemesForm
      initial={{
        theme: profile?.theme || "pastel-dream",
        markerColor: profile?.marker_color || "#d2aef8",
        buttonRoundness: profile?.button_roundness || "Rounded",
        buttonShadow: profile?.button_shadow || "None",
        buttonStyle: profile?.button_style || "Bold",
        buttonColor: profile?.button_color || "#d2aef8",
        headerStyle: profile?.header_style || "rainbow",
      }}
    />
  );
}
