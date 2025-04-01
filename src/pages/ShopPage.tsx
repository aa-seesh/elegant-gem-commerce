
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { featuredProducts } from "@/data/products";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<number[]>([0, 3000]);
  const [showFilters, setShowFilters] = useState(false);
  
  const categoryParam = searchParams.get("category") || "";
  
  // Get unique categories
  const categories = Array.from(new Set(featuredProducts.map(p => p.category)));
  
  // Get unique materials
  const allMaterials = featuredProducts.flatMap(p => p.materials);
  const materials = Array.from(new Set(allMaterials));
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Filter products based on URL parameters
  const filteredProducts = featuredProducts.filter(product => {
    // Filter by category if selected
    if (categoryParam && product.category !== categoryParam) {
      return false;
    }
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Shop Banner */}
        <div className="relative bg-beige-dark h-48 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold">Our Collection</h1>
        </div>
        
        {/* Shop Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              className="w-full mb-4 flex items-center justify-between"
              onClick={toggleFilters}
            >
              <span className="flex items-center">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter Products
              </span>
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block`}>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-serif font-semibold">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden"
                    onClick={toggleFilters}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Categories Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="all" checked={categoryParam === ""} />
                      <label htmlFor="all" className="ml-2 text-sm cursor-pointer">
                        All Categories
                      </label>
                    </div>
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <Checkbox 
                          id={category} 
                          checked={categoryParam === category}
                        />
                        <label htmlFor={category} className="ml-2 text-sm capitalize cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <Slider
                    defaultValue={priceRange}
                    max={3000}
                    step={50}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Materials Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Materials</h4>
                  <div className="space-y-2">
                    {materials.map((material, index) => (
                      <div key={index} className="flex items-center">
                        <Checkbox id={`material-${index}`} />
                        <label htmlFor={`material-${index}`} className="ml-2 text-sm cursor-pointer">
                          {material}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* More Filters (Availability, etc) */}
                <div>
                  <h4 className="font-medium mb-2">Availability</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="in-stock" />
                      <label htmlFor="in-stock" className="ml-2 text-sm cursor-pointer">
                        In Stock
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="on-sale" />
                      <label htmlFor="on-sale" className="ml-2 text-sm cursor-pointer">
                        On Sale
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            
            {/* Product Grid */}
            <div className="md:col-span-3">
              {/* Sorting and Results Count */}
              <div className="flex flex-wrap items-center justify-between mb-6">
                <p className="text-muted-foreground">{filteredProducts.length} results</p>
                <select className="border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gold">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Rating</option>
                </select>
              </div>
              
              {/* Products */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.images[0]}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    isNew={product.isNew}
                    isSale={product.isSale}
                  />
                ))}
              </div>
              
              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No Products Found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
              
              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex space-x-1">
                  <Button variant="outline" size="icon" disabled>
                    &lt;
                  </Button>
                  <Button variant="outline" size="icon" className="bg-gold text-white hover:bg-gold-dark">
                    1
                  </Button>
                  <Button variant="outline" size="icon">
                    2
                  </Button>
                  <Button variant="outline" size="icon">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    &gt;
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
