
import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
  originalPrice,
  isNew = false,
  isSale = false
}) => {
  return (
    <div className="group relative">
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-md aspect-square mb-3 hover-shine">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        {isNew && (
          <div className="absolute top-2 left-2 bg-gold px-2 py-1 text-xs text-white rounded">
            New
          </div>
        )}
        {isSale && (
          <div className="absolute top-2 right-2 bg-ruby px-2 py-1 text-xs text-white rounded">
            Sale
          </div>
        )}
        
        {/* Action buttons overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-between space-x-2">
            <Button size="sm" variant="secondary" className="w-full">
              <ShoppingBag className="h-4 w-4 mr-1" /> Add
            </Button>
            <Button size="sm" variant="secondary" className="w-1/4">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="w-1/4">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <Link to={`/product/${id}`}>
        <h3 className="font-serif font-medium text-base mb-1 group-hover:text-gold transition-colors">
          {name}
        </h3>
      </Link>
      
      <div className="flex items-center">
        <span className="font-medium text-base">
          ${price.toFixed(2)}
        </span>
        {originalPrice && (
          <span className="ml-2 line-through text-muted-foreground text-sm">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
