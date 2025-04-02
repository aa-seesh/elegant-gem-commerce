
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingBag, Share2, ChevronRight, Star, Truck, Package, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProductById, featuredProducts, ProductVariant } from "@/data/products";
import FeaturedCollection from "@/components/FeaturedCollection";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // For products with variants
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-serif mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/shop">
              <Button className="btn-primary">Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Find matching variant based on selected attributes
  const findMatchingVariant = () => {
    if (!product.variants || product.variants.length === 0) return null;
    
    const attributeKeys = Object.keys(selectedAttributes);
    if (attributeKeys.length === 0) return product.variants[0]; // Default to first variant
    
    return product.variants.find(variant => 
      attributeKeys.every(key => variant.attributes[key] === selectedAttributes[key])
    ) || null;
  };

  // Update selectedVariant when attributes change
  React.useEffect(() => {
    if (product?.hasVariants && product.variants) {
      const variant = findMatchingVariant();
      setSelectedVariant(variant);
      
      // If variant has its own images, show the first one
      if (variant && variant.images && variant.images.length > 0) {
        setSelectedImage(0); // Reset to first image of new variant
      }
    }
  }, [selectedAttributes, product]);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    const maxStock = selectedVariant ? selectedVariant.stock : product.stock;
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };
  
  // Get unique attribute names from variants
  const getAttributeNames = () => {
    if (!product.variants || product.variants.length === 0) return [];
    
    const allAttributes = new Set<string>();
    product.variants.forEach(variant => {
      Object.keys(variant.attributes).forEach(attr => allAttributes.add(attr));
    });
    
    return Array.from(allAttributes);
  };
  
  // Get unique values for a specific attribute
  const getAttributeValues = (attributeName: string) => {
    if (!product.variants) return [];
    
    const values = new Set<string>();
    product.variants.forEach(variant => {
      if (variant.attributes[attributeName]) {
        values.add(variant.attributes[attributeName]);
      }
    });
    
    return Array.from(values);
  };
  
  // Handle attribute selection
  const handleAttributeChange = (attributeName: string, value: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeName]: value
    }));
  };
  
  // Get current price and stock
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
  
  // Get images to display
  const displayImages = selectedVariant && selectedVariant.images && selectedVariant.images.length > 0 
    ? selectedVariant.images 
    : product.images;
  
  const relatedProducts = featuredProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.tags.some(tag => product.tags.includes(tag))))
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link to="/shop" className="hover:text-gold">Shop</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link to={`/collections/${product.category}`} className="hover:text-gold capitalize">
              {product.category}
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="truncate max-w-[150px]">{product.name}</span>
          </div>
        </div>
        
        {/* Product Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={displayImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Thumbnails */}
              <div className="flex space-x-2">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? "border-gold" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="space-y-6">
              {/* Product Title and Badges */}
              <div>
                {product.isNew && (
                  <span className="inline-block bg-gold px-2 py-1 text-xs text-white rounded mb-2">
                    New Arrival
                  </span>
                )}
                {product.isSale && (
                  <span className="inline-block bg-ruby px-2 py-1 text-xs text-white rounded mb-2 ml-2">
                    Sale
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-serif font-bold">{product.name}</h1>
              </div>
              
              {/* Price */}
              <div className="flex items-center">
                <span className="text-2xl font-semibold">${currentPrice.toFixed(2)}</span>
                {product.originalPrice && !selectedVariant && (
                  <span className="text-lg line-through text-muted-foreground ml-3">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Rating */}
              <div className="flex items-center">
                <div className="flex mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">
                  {product.rating.toFixed(1)} ({product.reviews} reviews)
                </span>
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground">{product.description}</p>
              
              {/* Product Variants */}
              {product.hasVariants && product.variants && product.variants.length > 0 && (
                <div className="space-y-4">
                  {getAttributeNames().map(attributeName => (
                    <div key={attributeName} className="space-y-2">
                      <h3 className="text-sm font-medium">Select {attributeName}</h3>
                      
                      {attributeName.toLowerCase() === 'color' ? (
                        <RadioGroup 
                          value={selectedAttributes[attributeName] || ''} 
                          onValueChange={(value) => handleAttributeChange(attributeName, value)}
                          className="flex gap-2"
                        >
                          {getAttributeValues(attributeName).map(value => (
                            <div key={value} className="flex items-center space-x-2">
                              <RadioGroupItem 
                                value={value} 
                                id={`${attributeName}-${value}`}
                                className="sr-only peer"
                              />
                              <label
                                htmlFor={`${attributeName}-${value}`}
                                className={`w-8 h-8 rounded-full border-2 cursor-pointer flex items-center justify-center
                                  ${selectedAttributes[attributeName] === value ? 'border-black' : 'border-gray-200'}
                                  peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2`}
                                style={{ backgroundColor: value.toLowerCase() }}
                              >
                                <span className="sr-only">{value}</span>
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      ) : (
                        <Select 
                          value={selectedAttributes[attributeName] || ''} 
                          onValueChange={(value) => handleAttributeChange(attributeName, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={`Select ${attributeName}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {getAttributeValues(attributeName).map(value => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Materials & Specs */}
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-medium min-w-28">Materials:</span>
                  <span>{product.materials.join(", ")}</span>
                </div>
                {product.dimensions && (
                  <div className="flex">
                    <span className="font-medium min-w-28">Dimensions:</span>
                    <span>{product.dimensions}</span>
                  </div>
                )}
                <div className="flex">
                  <span className="font-medium min-w-28">SKU:</span>
                  <span>{selectedVariant ? selectedVariant.sku : product.sku}</span>
                </div>
                <div className="flex">
                  <span className="font-medium min-w-28">Availability:</span>
                  <span className={currentStock > 0 ? "text-green-600" : "text-red-600"}>
                    {currentStock > 0
                      ? `In Stock (${currentStock} available)`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center">
                <span className="mr-4 font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-md">
                  <button
                    onClick={handleDecreaseQuantity}
                    className="px-3 py-1 border-r border-border"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    onClick={handleIncreaseQuantity}
                    className="px-3 py-1 border-l border-border"
                    disabled={quantity >= currentStock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button className="btn-primary flex-grow" disabled={currentStock <= 0}>
                  <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button variant="outline" className="btn-outlined">
                  <Heart className="mr-2 h-4 w-4" /> Wishlist
                </Button>
                <Button variant="outline" className="btn-outlined">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
              
              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="flex flex-col items-center text-center">
                  <Truck className="h-6 w-6 text-gold mb-2" />
                  <span className="text-xs">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Package className="h-6 w-6 text-gold mb-2" />
                  <span className="text-xs">Secure Packaging</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-6 w-6 text-gold mb-2" />
                  <span className="text-xs">Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Products */}
        <FeaturedCollection
          title="You May Also Like"
          viewAllLink={`/collections/${product.category}`}
          products={relatedProducts.map(p => ({
            id: p.id,
            name: p.name,
            image: p.images[0],
            price: p.price,
            originalPrice: p.originalPrice,
            isNew: p.isNew,
            isSale: p.isSale
          }))}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
