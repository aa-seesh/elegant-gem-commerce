
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeContainer, StaggerContainer, StaggerItem } from "@/components/ui/fade-container";
import { Separator } from "@/components/ui/separator";
import { featuredProducts } from "@/data/products";

type Collection = {
  id: string;
  name: string;
  image: string;
  description: string;
  itemCount: number;
};

const collections: Collection[] = [
  {
    id: "necklaces",
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    description: "Elegant necklaces to accentuate your neckline and add a touch of sophistication to any outfit.",
    itemCount: 24
  },
  {
    id: "earrings",
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1635767798638-3665a25b32a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    description: "From studs to statement pieces, find the perfect pair to frame your face.",
    itemCount: 32
  },
  {
    id: "rings",
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    description: "Stackable bands, statement rings, and timeless solitaires to adorn your fingers.",
    itemCount: 29
  },
  {
    id: "bracelets",
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    description: "Delicate chains, cuffs, and bangles to add the perfect finishing touch to your look.",
    itemCount: 18
  },
  {
    id: "new-arrivals",
    name: "New Arrivals",
    image: "https://images.unsplash.com/photo-1633810542706-90e5ff7797f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    description: "Our latest additions - be the first to discover our newest treasures.",
    itemCount: 15
  },
  {
    id: "sale",
    name: "Sale",
    image: "https://images.unsplash.com/photo-1600721391689-2564bb8055de?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    description: "Limited time offers on select pieces from our collections.",
    itemCount: 12
  }
];

const CollectionsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.div 
          className="relative h-[50vh] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Collections" 
              className="w-full h-full object-cover object-center brightness-75"
            />
          </div>
          <div className="absolute inset-0 bg-black/30" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Collections
            </motion.h1>
            <motion.p 
              className="text-white/90 md:text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover our curated collections of handcrafted jewelry, each piece telling its own unique story.
            </motion.p>
          </div>
        </motion.div>

        {/* Collections Grid */}
        <div className="container mx-auto px-4 py-16">
          <FadeContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <motion.div 
                  key={collection.id}
                  className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={`/collections/${collection.id}`} className="block">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={collection.image} 
                        alt={collection.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-2xl font-serif text-white">{collection.name}</h3>
                        <p className="text-gold text-sm">{collection.itemCount} items</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground">{collection.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm font-medium text-gold">View collection</span>
                        <motion.span 
                          className="text-gold"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </FadeContainer>
        </div>

        {/* Featured Items Section */}
        <div className="bg-beige-light py-16">
          <div className="container mx-auto px-4">
            <StaggerContainer>
              <div className="text-center mb-12">
                <StaggerItem>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Featured Pieces</h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover our most sought-after pieces adored by customers worldwide.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <div className="mt-4">
                    <Separator animated className="max-w-[120px] mx-auto bg-gold" />
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product.id}
                  className="product-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="product-card-image-container">
                    <img 
                      src={product.images[0]}
                      alt={product.name}
                      className="product-card-image"
                    />
                  </div>
                  <div className="product-card-content">
                    <h3 className="product-card-title">{product.name}</h3>
                    <div className="product-card-price">
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground line-through text-sm">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionsPage;
