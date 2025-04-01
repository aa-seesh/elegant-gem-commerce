
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingBag, Share2, ChevronRight, Star, Truck, Package, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProductById, featuredProducts } from "@/data/products";
import FeaturedCollection from "@/components/FeaturedCollection";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
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

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
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
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Thumbnails */}
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
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
                <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
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
                  <span>{product.sku}</span>
                </div>
                <div className="flex">
                  <span className="font-medium min-w-28">Availability:</span>
                  <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                    {product.stock > 0
                      ? `In Stock (${product.stock} available)`
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
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button className="btn-primary flex-grow" disabled={product.stock <= 0}>
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
