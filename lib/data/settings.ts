import { createClient } from "@/lib/supabase/server";

export async function getSystemSetting(key: string): Promise<string | null> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("system_settings")
      .select("value")
      .eq("key", key)
      .single();

    if (error) {
      console.warn(`Error fetching setting ${key}:`, error);
      return null;
    }

    return data?.value || null;
  } catch (e) {
    console.error(`Exception fetching setting ${key}:`, e);
    return null;
  }
}

