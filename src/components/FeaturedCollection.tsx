
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

interface FeaturedCollectionProps {
  title: string;
  description?: string;
  viewAllLink: string;
  products: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    isNew?: boolean;
    isSale?: boolean;
  }[];
}

const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  title,
  description,
  viewAllLink,
  products
}) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10 max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              originalPrice={product.originalPrice}
              isNew={product.isNew}
              isSale={product.isSale}
            />
          ))}
        </div>
        
        {/* View all link */}
        <div className="text-center mt-10">
          <Link to={viewAllLink}>
            <Button variant="outline" className="btn-outlined">
              View All Collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
