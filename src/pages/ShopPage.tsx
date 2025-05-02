
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";
import { fetchProducts } from "@/services/productService";
import { useToast } from "@/components/ui/use-toast";

const ShopPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch products on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-beige-light">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold">Shop All Jewelry</h1>
          <div className="w-16 h-1 bg-gold rounded-full mt-4"></div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-gold" />
            <p className="mt-4 text-lg">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.sale_price ? product.price : undefined}
                  image={product.product_images?.[0]?.image_url || '/placeholder.svg'}
                  isNew={new Date(product.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000}
                  isSale={!!product.sale_price}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No products found.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
