
import { supabase } from "@/integrations/supabase/client";

export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    if (!userId) return false;
    
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single();
    
    if (error && error.code !== "PGRST116") {
      console.error("Error checking admin status:", error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

export const makeUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    // Check if the role already exists
    const { data: existingRole } = await supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single();
    
    if (existingRole) {
      // User is already an admin
      return true;
    }
    
    // Add admin role to the user
    const { error } = await supabase
      .from("user_roles")
      .insert({
        user_id: userId,
        role: "admin"
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error making user admin:", error);
    throw error;
  }
};

export const fetchUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
