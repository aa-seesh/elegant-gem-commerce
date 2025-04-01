
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const HeroBanner = () => {
  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1617038260897-43a7195d1de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury jewelry collection"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>
      
      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg animate-slide-up">
            <h4 className="text-gold font-medium mb-2">New Collection 2023</h4>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
              Timeless Elegance in Every Detail
            </h1>
            <p className="text-white/80 mb-8 md:text-lg">
              Discover our exquisite collection of handcrafted jewelry pieces that elevate any occasion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button className="btn-primary font-medium">
                  Shop Now <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/collections">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20 font-medium">
                  View Collections
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
