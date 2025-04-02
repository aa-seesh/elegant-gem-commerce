
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ImagePlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductVariantsManager, VariantAttribute, VariantOption } from "./ProductVariantsManager";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Define the form schema
const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pricingType: z.enum(["flat", "dynamic"]),
  price: z.string().optional(),
  weight: z.string().optional(),
  pricePerGram: z.string().optional(),
  makingCharge: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  sku: z.string().min(1, "SKU is required"),
  stock: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, "Stock must be a non-negative number"),
  materials: z.string(),
  dimensions: z.string().optional(),
  images: z.array(z.string()).default([]),
  hasVariants: z.boolean().default(false),
}).refine(
  (data) => {
    // If has variants, we don't validate the pricing fields here
    if (data.hasVariants) {
      return true;
    }
    
    // If pricing type is flat, price must be provided
    if (data.pricingType === "flat") {
      return !!data.price && !isNaN(Number(data.price)) && Number(data.price) > 0;
    }
    
    // If pricing type is dynamic, weight, pricePerGram, and makingCharge must be provided
    if (data.pricingType === "dynamic") {
      return (
        !!data.weight && !isNaN(Number(data.weight)) && Number(data.weight) > 0 &&
        !!data.pricePerGram && !isNaN(Number(data.pricePerGram)) && Number(data.pricePerGram) >= 0 &&
        !!data.makingCharge && !isNaN(Number(data.makingCharge)) && Number(data.makingCharge) >= 0
      );
    }
    
    return false;
  },
  {
    message: "Please provide valid pricing information",
    path: ["pricingType"],
  }
);

export type ProductFormValues = z.infer<typeof productSchema> & {
  variantAttributes?: VariantAttribute[];
  variants?: VariantOption[];
};

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormValues) => void;
}

export function AddProductDialog({ open, onOpenChange, onSubmit }: AddProductDialogProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      pricingType: "flat",
      price: "",
      weight: "",
      pricePerGram: "",
      makingCharge: "",
      category: "",
      sku: "",
      stock: "",
      materials: "",
      dimensions: "",
      images: [],
      hasVariants: false,
    },
  });

  const pricingType = form.watch("pricingType");
  const hasVariants = form.watch("hasVariants");
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  
  // State for variant management
  const [variantAttributes, setVariantAttributes] = useState<VariantAttribute[]>([]);
  const [variants, setVariants] = useState<VariantOption[]>([]);

  // Calculate dynamic price when inputs change
  React.useEffect(() => {
    if (pricingType === "dynamic") {
      const weight = Number(form.getValues("weight"));
      const pricePerGram = Number(form.getValues("pricePerGram"));
      const makingCharge = Number(form.getValues("makingCharge"));
      
      if (weight > 0 && pricePerGram >= 0 && makingCharge >= 0) {
        const totalPrice = (weight * pricePerGram) + makingCharge;
        setCalculatedPrice(totalPrice);
      } else {
        setCalculatedPrice(null);
      }
    }
  }, [pricingType, form.watch("weight"), form.watch("pricePerGram"), form.watch("makingCharge"), form]);

  function handleSubmit(values: ProductFormValues) {
    // Prepare the form values for submission
    const formattedValues = {
      ...values,
      // Include variants data if enabled
      variantAttributes: hasVariants ? variantAttributes : undefined,
      variants: hasVariants ? variants : undefined,
      // In a real app, we would handle image uploads here
      images: values.images.length ? values.images : [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
      ],
    };
    onSubmit(formattedValues);
    form.reset();
    setVariantAttributes([]);
    setVariants([]);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Diamond Enchantment Necklace" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Variants toggle */}
                <FormField
                  control={form.control}
                  name="hasVariants"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormControl>
                        <div className="hidden">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {!hasVariants && (
                  <>
                    <FormField
                      control={form.control}
                      name="pricingType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Pricing Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="flat" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Flat Rate
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="dynamic" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Dynamic (Weight Based)
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {pricingType === "flat" ? (
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                step="0.01" 
                                placeholder="1299.99" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <div className="space-y-4 p-4 border border-gray-200 rounded-md">
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (grams)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  step="0.001" 
                                  placeholder="5.5" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="pricePerGram"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price per Gram ($)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  step="0.01" 
                                  placeholder="65.50" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="makingCharge"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Making Charge ($)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  step="0.01" 
                                  placeholder="299.99" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {calculatedPrice !== null && (
                          <div className="text-sm font-medium mt-2 p-2 bg-muted rounded">
                            <p>Calculated Price: <span className="text-gold">${calculatedPrice.toFixed(2)}</span></p>
                            <p className="text-xs text-muted-foreground">
                              ({form.getValues("weight")} g × ${form.getValues("pricePerGram")}/g) + ${form.getValues("makingCharge")} making charge
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="necklaces">Necklaces</SelectItem>
                          <SelectItem value="rings">Rings</SelectItem>
                          <SelectItem value="earrings">Earrings</SelectItem>
                          <SelectItem value="bracelets">Bracelets</SelectItem>
                          <SelectItem value="watches">Watches</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {!hasVariants && (
                  <>
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" placeholder="15" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SKU</FormLabel>
                          <FormControl>
                            <Input placeholder="DN-1001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="A stunning 18K gold necklace with a perfect diamond pendant..." 
                          className="resize-none min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="materials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Materials</FormLabel>
                      <FormControl>
                        <Input placeholder="18K Gold, Diamond" {...field} />
                      </FormControl>
                      <FormDescription>
                        Separate materials with commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dimensions (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Chain: 18 inches, Pendant: 0.5 inches" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Image upload placeholder - in a real app, you would implement file uploads */}
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                  <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm font-medium">Upload product images</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Drag & drop or click to browse files
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Select Files
                  </Button>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Product Variants Section */}
            <Card>
              <CardContent className="pt-6">
                <ProductVariantsManager
                  enabled={hasVariants}
                  onEnabledChange={(enabled) => form.setValue("hasVariants", enabled)}
                  attributes={variantAttributes}
                  onAttributesChange={setVariantAttributes}
                  variants={variants}
                  onVariantsChange={setVariants}
                />
              </CardContent>
            </Card>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button className="bg-gold hover:bg-gold-dark" type="submit">
                Add Product
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
