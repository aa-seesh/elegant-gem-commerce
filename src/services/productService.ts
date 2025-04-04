
import { supabase } from "@/integrations/supabase/client";

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
  material_type?: string;
  weight?: number;
  making_charge?: number;
  pricing_model?: 'flat' | 'weight_based';
}

export const fetchProducts = async (filters?: Record<string, any>) => {
  try {
    let query = supabase.from("products").select(`
      *,
      product_images(*)
    `);

    // Apply filters if provided
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      }
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data;
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
      .insert(product)
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
      .update(updates)
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
