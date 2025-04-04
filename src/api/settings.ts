
import { supabase } from "@/integrations/supabase/client";

export interface UserSettings {
  id: string;
  user_id: string;
  notifications_enabled: boolean;
  language: string;
  region: string;
  theme: string;
  created_at?: string;
  updated_at?: string;
}

// Fetch user settings
export const fetchUserSettings = async (userId: string): Promise<UserSettings | null> => {
  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user settings:", error);
    throw new Error(`Failed to fetch user settings: ${error.message}`);
  }

  return data;
};

// Create or update user settings
export const upsertUserSettings = async (settings: Omit<UserSettings, "id" | "created_at" | "updated_at">): Promise<UserSettings> => {
  const { data, error } = await supabase
    .from("user_settings")
    .upsert(settings, { onConflict: 'user_id' })
    .select()
    .single();

  if (error) {
    console.error("Error saving user settings:", error);
    throw new Error(`Failed to save user settings: ${error.message}`);
  }

  return data;
};

export interface UserProfile {
  id: string;
  full_name?: string;
  email?: string;
  role?: string;
  organization?: string;
  logo_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Fetch user profile
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user profile:", error);
    throw new Error(`Failed to fetch user profile: ${error.message}`);
  }

  return data;
};

// Create or update user profile
export const upsertUserProfile = async (profile: UserProfile): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(profile, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    console.error("Error saving user profile:", error);
    throw new Error(`Failed to save user profile: ${error.message}`);
  }

  return data;
};
