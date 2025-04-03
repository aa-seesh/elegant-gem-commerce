
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  image: string;
  fallbackImage: string;
  link: string;
  count: number;
}

const CategoryShowcase = () => {
  const categories: Category[] = [
    {
      id: "1",
      name: "Necklaces",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1617039600241-7f376e55dbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      link: "/collections/necklaces",
      count: 24
    },
    {
      id: "2",
      name: "Rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1598560917505-59c5a75ca129?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "/collections/rings",
      count: 42
    },
    {
      id: "3",
      name: "Earrings",
      image: "https://images.unsplash.com/photo-1651754277261-c2433aebea3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80", 
      fallbackImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88552?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80",
      link: "/collections/earrings",
      count: 36
    },
    {
      id: "4",
      name: "Bracelets",
      image: "https://images.unsplash.com/photo-1611085583191-a3b181a88552?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      link: "/collections/bracelets",
      count: 18
    }
  ];

  return (
    <section className="py-16 bg-beige">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-serif font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Shop By Category
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={category.link}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] block"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = category.fallbackImage;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-serif font-medium text-white mb-1">{category.name}</h3>
                  <p className="text-gold text-sm">{category.count} Products</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
