
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const HeroBanner = () => {
  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Hero Background Image with animation */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1617038260897-43a7195d1de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury jewelry collection"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      </motion.div>
      
      {/* Hero Content with animations */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <motion.h4 
              className="text-gold font-medium mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              New Collection 2023
            </motion.h4>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Timeless Elegance in Every Detail
            </motion.h1>
            
            <motion.p 
              className="text-white/90 mb-8 md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Discover our exquisite collection of handcrafted jewelry pieces that elevate any occasion.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <Link to="/shop">
                <ShimmerButton variant="gold" size="lg" className="font-medium">
                  Shop Now <ChevronRight className="ml-2 h-5 w-5" />
                </ShimmerButton>
              </Link>
              <Link to="/collections">
                <ShimmerButton variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/20 font-medium">
                  View Collections
                </ShimmerButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute bottom-10 right-10 w-24 h-24 border border-gold/30 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
      />
      <motion.div 
        className="absolute bottom-5 right-5 w-12 h-12 bg-gold/20 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      />
    </div>
  );
};

export default HeroBanner;
