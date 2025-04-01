
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-beige-dark py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-gold">ELEGANCE</h2>
            <p className="text-sm text-muted-foreground">
              Exquisite jewelry crafted with precision and passion, 
              bringing elegance to your every moment.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gold hover:text-gold-dark transition-colors">
                <Facebook size={18} />
              </Link>
              <Link to="#" className="text-gold hover:text-gold-dark transition-colors">
                <Instagram size={18} />
              </Link>
              <Link to="#" className="text-gold hover:text-gold-dark transition-colors">
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/collections/necklaces" className="text-sm hover:text-gold transition-colors">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link to="/collections/earrings" className="text-sm hover:text-gold transition-colors">
                  Earrings
                </Link>
              </li>
              <li>
                <Link to="/collections/rings" className="text-sm hover:text-gold transition-colors">
                  Rings
                </Link>
              </li>
              <li>
                <Link to="/collections/bracelets" className="text-sm hover:text-gold transition-colors">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link to="/collections/new-arrivals" className="text-sm hover:text-gold transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm hover:text-gold transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/care" className="text-sm hover:text-gold transition-colors">
                  Jewelry Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 border border-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                required
              />
              <button
                type="submit"
                className="btn-primary"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-gold/20 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Elegance Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
