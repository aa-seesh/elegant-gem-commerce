
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ImagePlus, X } from "lucide-react";
import { createProduct, updateProduct, ProductInput, addProductImage } from "@/services/productService";
import { supabase } from "@/integrations/supabase/client";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: any;
  categories: any[];
  onSave: (product: any) => void;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({ 
  open, 
  onOpenChange, 
  product, 
  categories, 
  onSave 
}) => {
  const [formData, setFormData] = useState<ProductInput>({
    name: "",
    description: "",
    price: 0,
    category_id: "",
    slug: "",
    in_stock: true,
    featured: false
  });
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageUploading, setImageUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (product) {
      const { id, created_at, product_images, ...productData } = product;
      setFormData(productData);
      
      // Set existing image URLs
      if (product_images && product_images.length > 0) {
        setImageUrls(product_images.map(img => img.image_url));
      } else {
        setImageUrls([]);
      }
    } else {
      resetForm();
    }
  }, [product, open]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      category_id: "",
      slug: "",
      in_stock: true,
      featured: false
    });
    setImages([]);
    setImageUrls([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Auto-generate slug from name
    if (name === "name") {
      setFormData({
        ...formData,
        name: value,
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      });
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (name: string, value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    setFormData({ ...formData, [name]: numValue });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setImages([...images, ...selectedFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const uploadImages = async (productId: string) => {
    if (images.length === 0) return [];
    
    setImageUploading(true);
    const uploadedUrls = [];
    
    try {
      for (const [index, image] of images.entries()) {
        const fileName = `${Date.now()}-${index}-${image.name.replace(/\s+/g, '-')}`;
        const filePath = `products/${productId}/${fileName}`;
        
        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, image);
        
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);
        
        if (urlData) {
          // Save to product_images table
          await addProductImage(productId, urlData.publicUrl, index);
          uploadedUrls.push(urlData.publicUrl);
        }
      }
      
      return uploadedUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      toast({
        title: "Error uploading images",
        description: "There was a problem uploading one or more images",
        variant: "destructive"
      });
      return [];
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category_id || formData.price <= 0) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      let savedProduct;
      if (product) {
        // Update existing product
        savedProduct = await updateProduct(product.id, formData);
      } else {
        // Create new product
        savedProduct = await createProduct(formData);
      }
      
      // Upload images if any
      if (images.length > 0) {
        await uploadImages(savedProduct.id);
      }
      
      toast({
        title: product ? "Product updated" : "Product created",
        description: `${formData.name} has been ${product ? "updated" : "created"} successfully`
      });
      
      onSave(savedProduct);
      resetForm();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error saving product",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? `Edit Product: ${product.name}` : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category_id">Category *</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => handleSelectChange("category_id", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleNumberChange("price", e.target.value)}
                      className="pl-7"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="sale_price">Sale Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="sale_price"
                      name="sale_price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.sale_price || ""}
                      onChange={(e) => handleNumberChange("sale_price", e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="in_stock"
                    checked={formData.in_stock}
                    onCheckedChange={(checked) => handleSwitchChange("in_stock", checked)}
                  />
                  <Label htmlFor="in_stock">In Stock</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>
            </div>
            
            {/* Description and Images */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                />
              </div>
              
              <div>
                <Label>Product Images</Label>
                
                {/* Current Images */}
                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                        <img src={url} alt="Product" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Image Upload Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                        <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover" />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-5 w-5 rounded-full"
                          onClick={() => removeImage(index)}
                          type="button"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Image Upload Input */}
                <div className="mt-2">
                  <Label
                    htmlFor="images"
                    className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-md py-4 hover:border-muted-foreground/40 transition-colors"
                  >
                    <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload images</span>
                  </Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gold hover:bg-gold-dark"
              disabled={loading || imageUploading}
            >
              {(loading || imageUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Saving..." : imageUploading ? "Uploading Images..." : "Save Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
