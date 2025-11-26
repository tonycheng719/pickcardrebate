import { SupabaseClient } from "@supabase/supabase-js";
import { CardSettings } from "./store/wallet-context";

export async function fetchUserWallet(supabase: SupabaseClient, userId: string) {
  // 1. Fetch Cards
  const { data: cardsData, error: cardsError } = await supabase
    .from("user_cards")
    .select("card_id")
    .eq("user_id", userId);

  if (cardsError) {
    console.error("Error fetching user cards:", cardsError);
    throw cardsError;
  }

  // 2. Fetch Settings
  const { data: settingsData, error: settingsError } = await supabase
    .from("user_card_settings")
    .select("card_id, settings")
    .eq("user_id", userId);

  if (settingsError) {
    console.error("Error fetching user card settings:", settingsError);
    throw settingsError;
  }

  // Transform
  const myCardIds = cardsData ? cardsData.map((c: any) => c.card_id) : [];
  
  const cardSettings: Record<string, CardSettings> = {};
  if (settingsData) {
    settingsData.forEach((s: any) => {
      cardSettings[s.card_id] = s.settings;
    });
  }

  return { myCardIds, cardSettings };
}
