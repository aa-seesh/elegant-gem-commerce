
export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stock: number;
  attributes: {
    [key: string]: string; // e.g., { color: "gold", size: "small" }
  };
  images?: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  isNew?: boolean;
  isSale?: boolean;
  stock: number;
  sku: string;
  materials: string[];
  dimensions?: string;
  rating: number;
  reviews: number;
  hasVariants?: boolean;
  variants?: ProductVariant[];
  // Dynamic pricing fields
  pricingType?: "flat" | "dynamic";
  weight?: number;
  pricePerGram?: number;
  makingCharge?: number;
}

// New interface for product categories
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// New interface for product attributes
export interface ProductAttributeValue {
  id: string;
  value: string;
}

export interface ProductAttribute {
  id: string;
  name: string;
  values: ProductAttributeValue[];
}

// New interface for materials with pricing
export interface Material {
  id: string;
  name: string;
  pricePerGram: number;
  lastUpdated: string; // ISO date string
}

export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Diamond Enchantment Necklace",
    description: "A stunning 18K gold necklace with a perfect diamond pendant that captures light beautifully.",
    price: 1299.99,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1633555715049-16a0f3527c15?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    ],
    category: "necklaces",
    tags: ["diamond", "gold", "pendant", "luxury"],
    isNew: true,
    stock: 12,
    sku: "DN-1001",
    materials: ["18K Gold", "Diamond"],
    dimensions: "Chain: 18 inches, Pendant: 0.5 inches",
    rating: 4.9,
    reviews: 28
  },
  {
    id: "2",
    name: "Royal Sapphire Ring",
    description: "An elegant ring featuring a brilliant blue sapphire surrounded by small diamonds set in white gold.",
    price: 899.99,
    originalPrice: 1099.99,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
    ],
    category: "rings",
    tags: ["sapphire", "white gold", "diamond", "engagement"],
    isSale: true,
    stock: 8,
    sku: "SR-2002",
    materials: ["14K White Gold", "Sapphire", "Diamonds"],
    dimensions: "Size: Adjustable, Gem: 0.3 inches",
    rating: 4.7,
    reviews: 42
  },
  {
    id: "3",
    name: "Pearl Lustre Earrings",
    description: "Classic pearl earrings with a modern touch, featuring freshwater pearls with small diamond accents.",
    price: 349.99,
    images: [
      "https://images.unsplash.com/photo-1651754277261-c2433aebea3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    ],
    category: "earrings",
    tags: ["pearl", "silver", "diamond", "classic"],
    stock: 25,
    sku: "PE-3003",
    materials: ["Sterling Silver", "Freshwater Pearls", "Diamonds"],
    rating: 4.8,
    reviews: 36
  },
  {
    id: "4",
    name: "Twisted Gold Bracelet",
    description: "A contemporary bracelet design with twisted strands of yellow and rose gold.",
    price: 599.99,
    images: [
      "https://images.unsplash.com/photo-1611085583191-a3b181a88552?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80",
      "https://images.unsplash.com/photo-1630707987879-1eb903994329?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    ],
    category: "bracelets",
    tags: ["gold", "rose gold", "modern", "bracelet"],
    isNew: true,
    stock: 15,
    sku: "GB-4004",
    materials: ["18K Yellow Gold", "18K Rose Gold"],
    dimensions: "Length: 7.5 inches, Width: 0.3 inches",
    rating: 4.6,
    reviews: 19
  },
  {
    id: "5",
    name: "Emerald Halo Ring",
    description: "A gorgeous emerald surrounded by a halo of diamonds set in platinum for a timeless look.",
    price: 1499.99,
    originalPrice: 1799.99,
    images: [
      "https://images.unsplash.com/photo-1605170794348-11c3bc5ed1d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80"
    ],
    category: "rings",
    tags: ["emerald", "platinum", "diamond", "halo"],
    isSale: true,
    stock: 6,
    sku: "ER-5005",
    materials: ["Platinum", "Emerald", "Diamonds"],
    dimensions: "Size: Adjustable, Gem: 0.4 inches",
    rating: 5.0,
    reviews: 14
  },
  {
    id: "6",
    name: "Vintage Ruby Pendant",
    description: "A stunning vintage-inspired pendant featuring a deep red ruby surrounded by intricate gold work.",
    price: 799.99,
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80",
      "https://images.unsplash.com/photo-1615655114865-4cc5c5c21f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    ],
    category: "necklaces",
    tags: ["ruby", "gold", "vintage", "pendant"],
    stock: 9,
    sku: "RP-6006",
    materials: ["18K Gold", "Ruby", "Diamonds"],
    dimensions: "Chain: 20 inches, Pendant: 0.75 inches",
    rating: 4.7,
    reviews: 23
  },
  {
    id: "7",
    name: "Diamond Tennis Bracelet",
    description: "A classic tennis bracelet with a continuous line of brilliant-cut diamonds set in white gold.",
    price: 2499.99,
    images: [
      "https://images.unsplash.com/photo-1599643447986-a040a481fb3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1599643478339-a68131387c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    ],
    category: "bracelets",
    tags: ["diamond", "white gold", "tennis bracelet", "luxury"],
    isNew: true,
    stock: 4,
    sku: "DT-7007",
    materials: ["14K White Gold", "Diamonds"],
    dimensions: "Length: 7 inches, Total Diamond Weight: 3 carats",
    rating: 4.9,
    reviews: 16
  },
  {
    id: "8",
    name: "Aquamarine Drop Earrings",
    description: "Elegant drop earrings featuring aquamarine stones that catch the light beautifully.",
    price: 449.99,
    originalPrice: 599.99,
    images: [
      "https://images.unsplash.com/photo-1631982330206-800adf596db8?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80"
    ],
    category: "earrings",
    tags: ["aquamarine", "silver", "drop earrings", "elegant"],
    isSale: true,
    stock: 18,
    sku: "AE-8008",
    materials: ["Sterling Silver", "Aquamarine"],
    dimensions: "Length: 1.5 inches",
    rating: 4.5,
    reviews: 27
  }
];

export const newArrivals = featuredProducts.filter(product => product.isNew);
export const onSaleProducts = featuredProducts.filter(product => product.isSale);

// Default categories for the store
export const productCategories: ProductCategory[] = [
  {
    id: "cat-1",
    name: "Necklaces",
    slug: "necklaces",
    description: "Elegant necklaces for every occasion"
  },
  {
    id: "cat-2",
    name: "Rings",
    slug: "rings",
    description: "Beautiful rings for engagements, weddings, and fashion"
  },
  {
    id: "cat-3",
    name: "Earrings",
    slug: "earrings",
    description: "Stunning earrings from studs to chandeliers"
  },
  {
    id: "cat-4",
    name: "Bracelets",
    slug: "bracelets",
    description: "Stylish bracelets for wrists and ankles"
  },
  {
    id: "cat-5",
    name: "Watches",
    slug: "watches",
    description: "Luxury timepieces for men and women"
  }
];

// Default attributes for products
export const productAttributes: ProductAttribute[] = [
  {
    id: "attr-1",
    name: "Color",
    values: [
      { id: "color-1", value: "Gold" },
      { id: "color-2", value: "Silver" },
      { id: "color-3", value: "Rose Gold" },
      { id: "color-4", value: "Platinum" }
    ]
  },
  {
    id: "attr-2",
    name: "Size",
    values: [
      { id: "size-1", value: "Small" },
      { id: "size-2", value: "Medium" },
      { id: "size-3", value: "Large" }
    ]
  },
  {
    id: "attr-3",
    name: "Style",
    values: [
      { id: "style-1", value: "Classic" },
      { id: "style-2", value: "Modern" },
      { id: "style-3", value: "Vintage" }
    ]
  }
];

// Default materials with pricing
export const materials: Material[] = [
  {
    id: "mat-1",
    name: "Gold (18K)",
    pricePerGram: 65.50,
    lastUpdated: new Date().toISOString()
  },
  {
    id: "mat-2",
    name: "Silver (925)",
    pricePerGram: 0.85,
    lastUpdated: new Date().toISOString()
  },
  {
    id: "mat-3",
    name: "Platinum",
    pricePerGram: 32.75,
    lastUpdated: new Date().toISOString()
  },
  {
    id: "mat-4",
    name: "Rose Gold (14K)",
    pricePerGram: 45.25,
    lastUpdated: new Date().toISOString()
  }
];

export const getProductById = (id: string): Product | undefined => {
  return featuredProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return featuredProducts.filter(product => product.category === category);
};

// Helper function to get a category by its slug
export const getCategoryBySlug = (slug: string): ProductCategory | undefined => {
  return productCategories.find(category => category.slug === slug);
};

// Helper function to get an attribute by its id
export const getAttributeById = (id: string): ProductAttribute | undefined => {
  return productAttributes.find(attribute => attribute.id === id);
};

// Helper function to get a material by its id
export const getMaterialById = (id: string): Material | undefined => {
  return materials.find(material => material.id === id);
};
