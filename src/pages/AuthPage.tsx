
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import { useAuth } from "@/contexts/AuthContext";
import { makeUserAdmin } from "@/services/userService";
import { useToast } from "@/components/ui/use-toast";

const AuthPage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleAuthSuccess = async (isNewUser: boolean = false) => {
    // If it's a new user, try to make them an admin (first user in the system)
    if (isNewUser && user) {
      try {
        await makeUserAdmin(user.id);
        toast({
          title: "Admin role granted",
          description: "You have been granted admin privileges as the first user.",
        });
      } catch (error) {
        console.error("Error making user admin:", error);
      }
    }
    
    navigate('/');
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-beige-light">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Left section with text */}
          <motion.div 
            className="md:w-1/2 max-w-md"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {isSignIn ? "Welcome Back" : "Join Our Community"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {isSignIn 
                ? "Sign in to access your account, track orders, and explore our exclusive collection of luxury jewelry." 
                : "Create an account to enjoy personalized shopping experiences, save your favorites, and get access to special offers."}
            </p>
            <div className="hidden md:block">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <span>Secure payment options</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </motion.div>
          
          {/* Right section with form */}
          <motion.div 
            className="md:w-1/2 max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSignIn ? (
              <SignInForm onSuccess={() => handleAuthSuccess(false)} onSwitch={toggleForm} />
            ) : (
              <SignUpForm onSuccess={() => handleAuthSuccess(true)} onSwitch={toggleForm} />
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
