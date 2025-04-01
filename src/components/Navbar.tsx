
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-background border-b border-gold/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl md:text-3xl font-serif font-bold text-gold">
              ELEGANCE
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-gold transition-colors">
              Home
            </Link>
            <Link to="/shop" className="font-medium hover:text-gold transition-colors">
              Shop
            </Link>
            <Link to="/collections" className="font-medium hover:text-gold transition-colors">
              Collections
            </Link>
            <Link to="/about" className="font-medium hover:text-gold transition-colors">
              About
            </Link>
            <Link to="/contact" className="font-medium hover:text-gold transition-colors">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:text-gold">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-gold">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-gold">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-gold relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-ruby text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button variant="ghost" size="icon" className="hover:text-gold relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-ruby text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gold/20 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="px-3 py-2 hover:bg-gold/10 rounded-md" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/shop" className="px-3 py-2 hover:bg-gold/10 rounded-md" onClick={toggleMenu}>
                Shop
              </Link>
              <Link to="/collections" className="px-3 py-2 hover:bg-gold/10 rounded-md" onClick={toggleMenu}>
                Collections
              </Link>
              <Link to="/about" className="px-3 py-2 hover:bg-gold/10 rounded-md" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/contact" className="px-3 py-2 hover:bg-gold/10 rounded-md" onClick={toggleMenu}>
                Contact
              </Link>
              <div className="flex space-x-4 px-3 py-2">
                <Button variant="ghost" size="icon" className="hover:text-gold">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-gold">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-gold">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
