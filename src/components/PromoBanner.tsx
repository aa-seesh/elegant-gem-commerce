
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PromoBanner = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <div className="bg-gradient-to-r from-brown/90 to-brown-light/80 py-16 px-8 md:py-24 md:px-16 relative z-10">
            <div className="max-w-lg">
              <h3 className="text-xl text-gold font-serif mb-2 animate-fade-in">Limited Time Offer</h3>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 animate-slide-up">
                25% Off Our New Summer Collection
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Discover our newest exclusive designs for Summer 2023. Elegant pieces that 
                complement your style and elevate every occasion.
              </p>
              <Link to="/collections/summer">
                <Button className="bg-gold hover:bg-gold-dark text-white group transition-all duration-300 transform hover:translate-x-1">
                  Shop The Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Background image with overlay and shimmer effect */}
          <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 hover-shine">
            <img
              src="https://images.unsplash.com/photo-1617039600241-7f376e55dbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
              alt="Summer jewelry collection"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay transition-transform duration-700 hover:scale-105"
            />
          </div>
          
          {/* Decorative gold element */}
          <div className="absolute -bottom-1 -right-1 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-gold to-gold-dark rounded-tl-[40%] opacity-50"></div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
