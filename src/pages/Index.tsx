
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import CategoryShowcase from "@/components/CategoryShowcase";
import FeaturedCollection from "@/components/FeaturedCollection";
import PromoBanner from "@/components/PromoBanner";
import Testimonials from "@/components/Testimonials";
import { featuredProducts, newArrivals, onSaleProducts } from "@/data/products";
import { FadeContainer, SlideUp } from "@/components/ui/fade-container";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <HeroBanner />
        
        {/* Categories */}
        <SlideUp delay={0.2}>
          <CategoryShowcase />
        </SlideUp>
        
        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <FeaturedCollection
            title="Our Featured Collection"
            description="Discover our most popular and sought-after pieces that embody timeless elegance."
            viewAllLink="/shop"
            products={featuredProducts.slice(0, 8).map(product => ({
              id: product.id,
              name: product.name,
              image: product.images[0],
              price: product.price,
              originalPrice: product.originalPrice,
              isNew: product.isNew,
              isSale: product.isSale
            }))}
          />
        </motion.div>
        
        {/* Promotional Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <PromoBanner />
        </motion.div>
        
        {/* New Arrivals */}
        <FadeContainer>
          <FeaturedCollection
            title="New Arrivals"
            description="Be the first to discover our latest additions and exclusive designs."
            viewAllLink="/collections/new-arrivals"
            products={newArrivals.map(product => ({
              id: product.id,
              name: product.name,
              image: product.images[0],
              price: product.price,
              originalPrice: product.originalPrice,
              isNew: product.isNew,
              isSale: product.isSale
            }))}
          />
        </FadeContainer>
        
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Testimonials />
        </motion.div>
        
        {/* Special Offers Section */}
        <SlideUp>
          <FeaturedCollection
            title="Special Offers"
            description="Limited time offers on select pieces from our exclusive collections."
            viewAllLink="/collections/sale"
            products={onSaleProducts.map(product => ({
              id: product.id,
              name: product.name,
              image: product.images[0],
              price: product.price,
              originalPrice: product.originalPrice,
              isNew: product.isNew,
              isSale: product.isSale
            }))}
          />
        </SlideUp>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
