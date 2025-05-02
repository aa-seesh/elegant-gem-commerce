
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X,
  LogOut,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleAuthClick = () => {
    if (user) {
      // If user is logged in, show dropdown (handled by DropdownMenu)
    } else {
      // If not logged in, redirect to auth page
      navigate('/auth');
    }
  };

  return (
    <motion.nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl md:text-3xl font-serif font-bold text-gold hover-shine transition-all duration-300">
              ELEGANCE
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/shop" label="Shop" />
            <NavLink to="/collections" label="Collections" />
            <NavLink to="/about" label="About" />
            <NavLink to="/contact" label="Contact" />
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <IconButton icon={<Search />} tooltip="Search" />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:text-gold relative group">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gold flex items-center justify-center text-white">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </div>
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="cursor-pointer">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* Admin link if user has admin rights */}
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer">Admin Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <IconButton 
                icon={<User />} 
                tooltip="Account" 
                onClick={() => navigate('/auth')}
              />
            )}
            
            <IconButton icon={<Heart />} tooltip="Wishlist" />
            <IconButton icon={<ShoppingBag />} badge={0} tooltip="Cart" />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button variant="ghost" size="icon" className="hover:text-gold relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-ruby text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
            
            {user && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:text-gold relative"
                onClick={() => navigate('/auth')}
              >
                <div className="h-8 w-8 rounded-full bg-gold flex items-center justify-center text-white">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </div>
              </Button>
            )}
            
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden pt-4 pb-3 border-t border-gold/20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex flex-col space-y-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                  hidden: {},
                }}
              >
                <MobileNavLink to="/" label="Home" onClick={toggleMenu} />
                <MobileNavLink to="/shop" label="Shop" onClick={toggleMenu} />
                <MobileNavLink to="/collections" label="Collections" onClick={toggleMenu} />
                <MobileNavLink to="/about" label="About" onClick={toggleMenu} />
                <MobileNavLink to="/contact" label="Contact" onClick={toggleMenu} />
                
                <div className="flex space-x-4 px-3 py-2">
                  <Button variant="ghost" size="icon" className="hover:text-gold">
                    <Search className="h-5 w-5" />
                  </Button>
                  {!user ? (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:text-gold"
                      onClick={() => {
                        toggleMenu();
                        navigate('/auth');
                      }}
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      onClick={handleSignOut} 
                      className="hover:text-red-500 flex items-center"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      <span>Sign Out</span>
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="hover:text-gold">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Helper components for cleaner code
const NavLink = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== "/" && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className="relative font-medium group"
    >
      <span className={`transition-colors ${isActive ? "text-gold" : "hover:text-gold"}`}>{label}</span>
      <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gold transform scale-x-0 transition-transform origin-left group-hover:scale-x-100 ${isActive ? "scale-x-100" : ""}`} />
    </Link>
  );
};

const MobileNavLink = ({ to, label, onClick }: { to: string; label: string; onClick: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== "/" && location.pathname.startsWith(to));
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <Link 
        to={to} 
        className={`px-3 py-2 block rounded-md transition-colors ${isActive ? "bg-gold/10 text-gold" : "hover:bg-gold/5"}`}
        onClick={onClick}
      >
        {label}
      </Link>
    </motion.div>
  );
};

const IconButton = ({ 
  icon, 
  badge, 
  tooltip,
  onClick
}: { 
  icon: React.ReactNode; 
  badge?: number;
  tooltip?: string;
  onClick?: () => void;
}) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="hover:text-gold relative group"
      onClick={onClick}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-ruby text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          {badge}
        </span>
      )}
      {tooltip && (
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-background border border-border px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {tooltip}
        </span>
      )}
    </Button>
  );
};

export default Navbar;
