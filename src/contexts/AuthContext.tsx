
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  name?: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // This is a placeholder for Supabase integration
  // We'll connect this to Supabase Auth once integrated
  const signIn = async (email: string, password: string) => {
    try {
      console.log('Sign in with:', email, password);
      // Here we would connect to Supabase Auth
      // const { user, error } = await supabase.auth.signIn({ email, password });
      
      // For now, we'll just simulate a successful login
      setUser({
        id: '1',
        email,
        name: 'Test User'
      });
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('Sign up with:', email, password, name);
      // Here we would connect to Supabase Auth
      // const { user, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
      
      // For now, we'll just simulate a successful registration
      setUser({
        id: '1',
        email,
        name
      });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Here we would connect to Supabase Auth
      // await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Simulate checking for an existing session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Here we would connect to Supabase Auth
        // const { data: { session } } = await supabase.auth.getSession();
        // if (session) setUser(session.user);
        
        setLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
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
