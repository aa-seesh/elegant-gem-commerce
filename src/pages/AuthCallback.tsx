
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log("Auth callback page loaded, processing authentication...");
      
      try {
        // Get the current session and log details (helpful for debugging)
        const { data, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error getting auth session:", sessionError);
          setError(sessionError.message);
          toast({
            title: "Authentication error",
            description: sessionError.message,
            variant: "destructive"
          });
          return;
        }
        
        // Log session details to help with debugging
        console.log("Session obtained:", data?.session ? "Session found" : "No session");
        console.log("User authenticated:", data?.session?.user?.email);
        
        if (data?.session) {
          toast({
            title: "Authentication successful",
            description: "You have been successfully authenticated.",
          });
        }
      } catch (err: any) {
        console.error("Unexpected error during auth callback:", err);
        setError(err.message || "An unexpected error occurred");
      } finally {
        // Navigate to the home page regardless of success or failure
        // Use a slight delay to allow toast to be visible
        setTimeout(() => {
          console.log("Redirecting to home page...");
          navigate('/', { replace: true });
        }, 1500);
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processing authentication...</h1>
        <p className="text-gray-600 mb-4">Please wait while we authenticate you.</p>
        {error && (
          <div className="text-red-500 mt-4 max-w-md mx-auto p-4 bg-red-50 rounded-md">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
