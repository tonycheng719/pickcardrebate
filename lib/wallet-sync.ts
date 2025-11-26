import { SupabaseClient } from "@supabase/supabase-js";
import { CardSettings } from "./store/wallet-context";

export async function fetchUserWallet(supabase: SupabaseClient, userId: string) {
  const { data: cards, error: cardsError } = await supabase
    .from("user_cards")
    .select("card_id")
    .eq("user_id", userId);

  const { data: settings, error: settingsError } = await supabase
    .from("user_card_settings")
    .select("card_id, settings")
    .eq("user_id", userId);

  if (cardsError) console.error("Error fetching cards:", cardsError);
  if (settingsError) console.error("Error fetching settings:", settingsError);

  const myCardIds = cards?.map((c) => c.card_id) || [];
  const cardSettings: Record<string, CardSettings> = {};
  
  settings?.forEach((s) => {
    cardSettings[s.card_id] = s.settings;
  });

  return { myCardIds, cardSettings };
}

export async function syncCardToAdd(supabase: SupabaseClient, userId: string, cardId: string) {
  return await supabase.from("user_cards").upsert(
    { user_id: userId, card_id: cardId },
    { onConflict: "user_id,card_id" }
  );
}

export async function syncCardToRemove(supabase: SupabaseClient, userId: string, cardId: string) {
  return await supabase
    .from("user_cards")
    .delete()
    .eq("user_id", userId)
    .eq("card_id", cardId);
}

export async function syncCardSettings(supabase: SupabaseClient, userId: string, cardId: string, settings: CardSettings) {
  return await supabase.from("user_card_settings").upsert(
    { user_id: userId, card_id: cardId, settings },
    { onConflict: "user_id,card_id" }
  );
}

export async function uploadLocalWallet(
    supabase: SupabaseClient, 
    userId: string, 
    localCardIds: string[], 
    localSettings: Record<string, CardSettings>
) {
    // 1. Upload Cards
    if (localCardIds.length > 0) {
        const cardsPayload = localCardIds.map(id => ({ user_id: userId, card_id: id }));
        const { error } = await supabase.from("user_cards").upsert(cardsPayload, { onConflict: "user_id,card_id" });
        if (error) console.error("Failed to upload local cards", error);
    }

    // 2. Upload Settings
    const settingsPayload = Object.entries(localSettings).map(([cardId, settings]) => ({
        user_id: userId,
        card_id: cardId,
        settings
    }));
    
    if (settingsPayload.length > 0) {
        const { error } = await supabase.from("user_card_settings").upsert(settingsPayload, { onConflict: "user_id,card_id" });
        if (error) console.error("Failed to upload local settings", error);
    }
}

