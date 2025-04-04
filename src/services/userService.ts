
import { supabase } from "@/integrations/supabase/client";

export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    if (!userId) return false;
    
    // Using raw query with RPC for the has_role function
    const { data, error } = await supabase
      .rpc('has_role', { role: 'admin' });
    
    if (error) {
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
    // Check if the role already exists by querying the user_roles table directly with direct SQL
    const { data: existingRoles, error: checkError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .eq('role', 'admin');
    
    if (checkError) throw checkError;
    
    if (existingRoles && existingRoles.length > 0) {
      // User is already an admin
      return true;
    }
    
    // Add admin role to the user using direct SQL
    const { error } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: 'admin'
      } as any);
    
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
