
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PromoBanner = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl">
          <div className="bg-gradient-to-r from-brown/90 to-brown-light/80 py-16 px-8 md:py-24 md:px-16 relative z-10">
            <div className="max-w-lg">
              <h3 className="text-xl text-gold mb-2">Limited Time Offer</h3>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                25% Off Our New Summer Collection
              </h2>
              <p className="text-white/80 mb-8">
                Discover our newest exclusive designs for Summer 2023. Elegant pieces that complement your style and elevate every occasion.
              </p>
              <Link to="/collections/summer">
                <Button className="btn-primary">
                  Shop The Collection
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Background image with overlay */}
          <img
            src="https://images.unsplash.com/photo-1617039600241-7f376e55dbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
            alt="Summer jewelry collection"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay -z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
