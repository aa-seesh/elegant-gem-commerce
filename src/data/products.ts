export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stock: number;
  attributes: {
    [key: string]: string;
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

// Create empty arrays for all the data
export const featuredProducts: Product[] = [];
export const newArrivals: Product[] = [];
export const onSaleProducts: Product[] = [];

// Default categories for the store (keeping these as they might be needed for the UI)
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

// Default attributes for products (keeping minimal structure)
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
  }
];

// Default materials with pricing (keeping minimal structure)
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
  }
];

// Empty helper functions that return empty arrays or undefined
export const getProductById = (id: string): Product | undefined => {
  return undefined;
};

export const getProductsByCategory = (category: string): Product[] => {
  return [];
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
