
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import CategoryShowcase from "@/components/CategoryShowcase";
import FeaturedCollection from "@/components/FeaturedCollection";
import PromoBanner from "@/components/PromoBanner";
import Testimonials from "@/components/Testimonials";
import { featuredProducts, newArrivals, onSaleProducts } from "@/data/products";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <HeroBanner />
        
        {/* Categories */}
        <CategoryShowcase />
        
        {/* Featured Products */}
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
        
        {/* Promotional Banner */}
        <PromoBanner />
        
        {/* New Arrivals */}
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
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Special Offers Section */}
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
