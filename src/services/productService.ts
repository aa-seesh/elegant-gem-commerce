
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Define proper types based on the Supabase schema
export interface ProductInput {
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  category_id: string;
  slug: string;
  attributes?: Record<string, any>;
  featured?: boolean;
  in_stock?: boolean;
  material_type?: Database["public"]["Enums"]["material_type"] | null;
  weight?: number;
  making_charge?: number;
  pricing_model?: Database["public"]["Enums"]["pricing_model"];
}

export const fetchProducts = async (filters?: Record<string, any>) => {
  try {
    // Step 1: Fetch all products with a basic query
    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select('*');
    
    if (productsError) throw productsError;
    
    let filteredProducts = productsData || [];
    
    // Step 2: Apply any filters in JavaScript
    if (filters && filteredProducts.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return Object.entries(filters).every(([key, value]) => {
          return value === undefined || value === null || product[key] === value;
        });
      });
    }
    
    // Step 3: If we have products, fetch their images separately
    if (filteredProducts.length > 0) {
      const productIds = filteredProducts.map(product => product.id);
      
      const { data: imagesData, error: imagesError } = await supabase
        .from("product_images")
        .select('*')
        .in('product_id', productIds);
      
      if (imagesError) throw imagesError;
      
      // Step 4: Combine the data manually
      const productsWithImages = filteredProducts.map(product => ({
        ...product,
        product_images: imagesData?.filter(img => img.product_id === product.id) || []
      }));
      
      return productsWithImages;
    }
    
    return filteredProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id: string) => {
  try {
    // Fetch the product first
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select('*')
      .eq("id", id)
      .single();
    
    if (productError) throw productError;
    
    // Fetch the product images
    const { data: imagesData, error: imagesError } = await supabase
      .from("product_images")
      .select('*')
      .eq('product_id', id);
    
    if (imagesError) throw imagesError;
    
    // Combine the data
    const productWithImages = {
      ...productData,
      product_images: imagesData || []
    };
    
    return productWithImages;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const createProduct = async (product: ProductInput) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert(product as any)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, updates: Partial<ProductInput>) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(updates as any)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const addProductImage = async (productId: string, imageUrl: string, displayOrder = 0) => {
  try {
    const { data, error } = await supabase
      .from("product_images")
      .insert({
        product_id: productId,
        image_url: imageUrl,
        display_order: displayOrder
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding product image:", error);
    throw error;
  }
};

export const deleteProductImage = async (imageId: string) => {
  try {
    const { error } = await supabase
      .from("product_images")
      .delete()
      .eq("id", imageId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting product image:", error);
    throw error;
  }
};
