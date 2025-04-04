
import { supabase } from "@/integrations/supabase/client";

export const uploadProductImage = async (file: File, productId: string) => {
  try {
    // Create a unique file name to prevent collisions
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = `products/${productId}/${fileName}`;
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('products')
      .upload(filePath, file);
      
    if (error) throw error;
    
    // Get public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);
      
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const deleteProductImage = async (imagePath: string) => {
  try {
    // Extract the path from the URL
    const pathMatch = imagePath.match(/storage\/v1\/object\/public\/products\/(.+)/);
    if (!pathMatch || !pathMatch[1]) {
      throw new Error("Invalid image path");
    }
    
    const path = pathMatch[1];
    
    // Delete file from Supabase Storage
    const { error } = await supabase.storage
      .from('products')
      .remove([path]);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

// Create a bucket if it doesn't exist
export const createBucketIfNotExists = async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    
    if (!buckets?.find(bucket => bucket.name === 'products')) {
      const { error } = await supabase.storage.createBucket('products', {
        public: true
      });
      
      if (error) throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error creating bucket:", error);
    throw error;
  }
};
