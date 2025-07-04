
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize authentication state
    const initAuth = async () => {
      // Log important information about the environment
      console.log("Auth Provider initializing");
      console.log("Current origin:", window.location.origin);
      console.log("Current URL:", window.location.href);
      
      // Set up auth state listener FIRST
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log("Auth state changed:", event, session?.user?.email);
          setSession(session);
          setUser(session?.user ?? null);
        }
      );

      // THEN check for existing session
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error getting initial session:", error.message);
      }
      
      console.log("Existing session check:", data?.session ? "Session found" : "No session");
      if (data?.session?.user) {
        console.log("User logged in:", data.session.user.email);
      }
      
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };
    
    initAuth();
    
    // Cleanup subscription on unmount
    return () => {
      supabase.auth.onAuthStateChange(() => {}).data.subscription.unsubscribe();
      console.log("Auth Provider cleaning up subscription");
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in with:", email);
      const { error, data } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
        options: {
          captchaToken: undefined
        }
      });
      
      if (error) throw error;
      console.log("Sign in successful:", data?.user?.email);
    } catch (error: any) {
      console.error("Sign in error:", error.message);
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      console.log("Signing up with:", email);
      console.log("Redirect URL will be:", `${window.location.origin}/auth/callback`);
      
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Sign up successful",
        description: "Check your email to confirm your account.",
      });
      console.log("Sign up successful for:", email);
    } catch (error: any) {
      console.error("Sign up error:", error.message);
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out user");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("Sign out successful");
    } catch (error: any) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
