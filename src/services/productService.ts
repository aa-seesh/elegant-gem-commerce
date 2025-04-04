
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

// Using a simpler query structure to avoid deep type instantiation
export const fetchProducts = async (filters?: Record<string, any>) => {
  try {
    // First select from products to get a proper query builder
    let query = supabase
      .from("products")
      .select('*');
    
    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }
    
    // Get products first
    const { data: productsData, error: productsError } = await query;
    
    if (productsError) throw productsError;
    
    // If we have products, get their images separately
    if (productsData && productsData.length > 0) {
      const productIds = productsData.map(product => product.id);
      
      const { data: imagesData, error: imagesError } = await supabase
        .from("product_images")
        .select('*')
        .in('product_id', productIds);
      
      if (imagesError) throw imagesError;
      
      // Merge the product images into their respective products
      const productsWithImages = productsData.map(product => ({
        ...product,
        product_images: imagesData?.filter(img => img.product_id === product.id) || []
      }));
      
      return productsWithImages;
    }
    
    return productsData || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_images(*)
      `)
      .eq("id", id)
      .single();
    
    if (error) throw error;
    return data;
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
