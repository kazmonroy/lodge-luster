import { supabase } from "./supabase-client";
import { Settings } from "./types/collection";

export async function getSettings() {
  const { data, error } = await supabase
    .from("settings")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return { data };
}

export async function updateSettings(newSettings: Settings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    .eq("id", 1)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }

  return data;
}
