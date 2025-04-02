
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const PromoBanner = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div 
          className="relative overflow-hidden rounded-xl shadow-lg"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="bg-gradient-to-r from-brown/90 to-brown-light/80 py-16 px-8 md:py-24 md:px-16 relative z-10">
            <motion.div 
              className="max-w-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h3 
                className="text-xl text-gold font-serif mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Limited Time Offer
              </motion.h3>
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                25% Off Our New Summer Collection
              </motion.h2>
              <motion.p 
                className="text-white/80 mb-8 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Discover our newest exclusive designs for Summer 2023. Elegant pieces that 
                complement your style and elevate every occasion.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Link to="/collections/summer">
                  <ShimmerButton variant="luxury" className="group transition-all duration-300">
                    Shop The Collection
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </ShimmerButton>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Background image with overlay and shimmer effect */}
          <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 hover-shine">
            <motion.img
              src="https://images.unsplash.com/photo-1617039600241-7f376e55dbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
              alt="Summer jewelry collection"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
          </div>
          
          {/* Decorative gold element */}
          <motion.div 
            className="absolute -bottom-1 -right-1 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-gold to-gold-dark rounded-tl-[40%] opacity-50"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;
