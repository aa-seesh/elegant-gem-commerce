
import React, { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Material } from "@/data/products";

export interface VariantAttribute {
  name: string;
  values: string[];
}

export interface VariantOption {
  id: string;
  attributes: { [key: string]: string };
  pricingType?: "flat" | "dynamic";
  price?: string;
  weight?: string;
  materialId?: string;
  makingCharge?: string;
  calculatedPrice?: number;
  sku: string;
  stock: string;
}

interface ProductVariantsManagerProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  variants: VariantOption[];
  onVariantsChange: (variants: VariantOption[]) => void;
  attributes: VariantAttribute[];
  onAttributesChange: (attributes: VariantAttribute[]) => void;
  availableAttributes?: VariantAttribute[];
  showDynamicPricing?: boolean;
  materials?: Material[];
}

export const ProductVariantsManager: React.FC<ProductVariantsManagerProps> = ({
  enabled,
  onEnabledChange,
  variants,
  onVariantsChange,
  attributes,
  onAttributesChange,
  availableAttributes = [],
  showDynamicPricing = false,
  materials = [],
}) => {
  const [newAttributeName, setNewAttributeName] = useState("");
  const [newAttributeValue, setNewAttributeValue] = useState("");
  const [selectedAttributeName, setSelectedAttributeName] = useState<string>("");
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  // Toggle accordion for variant
  const toggleAccordion = (variantId: string) => {
    setOpenAccordions(prev => 
      prev.includes(variantId) 
        ? prev.filter(id => id !== variantId) 
        : [...prev, variantId]
    );
  };

  // Add a new attribute (like "Color" or "Size")
  const addAttribute = () => {
    if (!selectedAttributeName && !newAttributeName.trim()) return;
    
    let attributeName = selectedAttributeName;
    
    // If using custom attribute name
    if (!attributeName && newAttributeName.trim()) {
      attributeName = newAttributeName.trim();
    }
    
    // Check if attribute already exists
    if (attributes.some(attr => attr.name.toLowerCase() === attributeName.toLowerCase())) {
      return;
    }
    
    // If using pre-defined attribute, get the values from availableAttributes
    const predefinedValues: string[] = [];
    if (selectedAttributeName) {
      const found = availableAttributes.find(attr => attr.name === selectedAttributeName);
      if (found) {
        predefinedValues.push(...found.values);
      }
    }
    
    const updatedAttributes = [
      ...attributes,
      { name: attributeName, values: predefinedValues }
    ];
    onAttributesChange(updatedAttributes);
    setNewAttributeName("");
    setSelectedAttributeName("");
  };

  // Add a value to an existing attribute (like adding "Red" to "Color")
  const addAttributeValue = (attributeIndex: number) => {
    if (!newAttributeValue.trim()) return;
    
    const attribute = attributes[attributeIndex];
    
    // Check if value already exists for this attribute
    if (attribute.values.some(val => val.toLowerCase() === newAttributeValue.toLowerCase())) {
      return;
    }
    
    const updatedAttributes = [...attributes];
    updatedAttributes[attributeIndex].values = [
      ...attribute.values,
      newAttributeValue
    ];
    onAttributesChange(updatedAttributes);
    setNewAttributeValue("");
    
    // Generate variants if there are values for all attributes
    if (updatedAttributes.every(attr => attr.values.length > 0)) {
      generateVariantOptions(updatedAttributes);
    }
  };

  // Remove an attribute
  const removeAttribute = (index: number) => {
    const updatedAttributes = attributes.filter((_, i) => i !== index);
    onAttributesChange(updatedAttributes);
    
    // Regenerate variants
    if (updatedAttributes.every(attr => attr.values.length > 0)) {
      generateVariantOptions(updatedAttributes);
    } else {
      onVariantsChange([]);
    }
  };

  // Remove a value from an attribute
  const removeAttributeValue = (attributeIndex: number, valueIndex: number) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[attributeIndex].values = attributes[attributeIndex].values.filter(
      (_, i) => i !== valueIndex
    );
    onAttributesChange(updatedAttributes);
    
    // Regenerate variants
    if (updatedAttributes.every(attr => attr.values.length > 0)) {
      generateVariantOptions(updatedAttributes);
    } else {
      onVariantsChange([]);
    }
  };

  // Generate all possible variant combinations
  const generateVariantOptions = (attrs: VariantAttribute[]) => {
    if (attrs.length === 0 || attrs.some(attr => attr.values.length === 0)) {
      onVariantsChange([]);
      return;
    }

    // Recursive function to generate all combinations
    const generateCombinations = (
      attributes: VariantAttribute[],
      currentIndex: number,
      currentCombination: { [key: string]: string } = {}
    ): { [key: string]: string }[] => {
      if (currentIndex === attributes.length) {
        return [currentCombination];
      }

      const currentAttribute = attributes[currentIndex];
      const combinations: { [key: string]: string }[] = [];

      currentAttribute.values.forEach(value => {
        const newCombination = {
          ...currentCombination,
          [currentAttribute.name]: value
        };
        
        combinations.push(
          ...generateCombinations(attributes, currentIndex + 1, newCombination)
        );
      });

      return combinations;
    };

    // Generate all attribute combinations
    const combinations = generateCombinations(attrs, 0);
    
    // Create variant options from combinations
    const newVariants: VariantOption[] = combinations.map((combination, index) => {
      // Try to find existing variant with same attributes
      const existingVariant = variants.find(v => 
        Object.keys(combination).every(key => 
          v.attributes[key] === combination[key]
        )
      );
      
      return {
        id: existingVariant?.id || `variant-${index + 1}`,
        attributes: combination,
        pricingType: existingVariant?.pricingType || "flat",
        price: existingVariant?.price || "",
        weight: existingVariant?.weight || "",
        materialId: existingVariant?.materialId || "",
        makingCharge: existingVariant?.makingCharge || "",
        sku: existingVariant?.sku || "",
        stock: existingVariant?.stock || "0"
      };
    });
    
    onVariantsChange(newVariants);
  };

  // Update a variant's data (price, sku, stock)
  const updateVariant = (index: number, field: string, value: string) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value
    };
    
    // Calculate dynamic price if applicable
    if (showDynamicPricing && 
        (field === "weight" || field === "materialId" || field === "makingCharge")) {
      const variant = updatedVariants[index];
      if (variant.pricingType === "dynamic") {
        const weight = parseFloat(variant.weight || "0");
        const material = materials.find(m => m.id === variant.materialId);
        const makingCharge = parseFloat(variant.makingCharge || "0");
        
        if (weight > 0 && material && makingCharge >= 0) {
          variant.calculatedPrice = (weight * material.pricePerGram) + makingCharge;
        } else {
          variant.calculatedPrice = undefined;
        }
      }
    }
    
    onVariantsChange(updatedVariants);
  };

  // Update variant pricing type
  const updateVariantPricingType = (index: number, pricingType: "flat" | "dynamic") => {
    const updatedVariants = [...variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      pricingType
    };
    onVariantsChange(updatedVariants);
  };

  // Toggle variants on/off
  const toggleVariantsEnabled = () => {
    if (enabled) {
      // If turning off variants, clear the data
      onAttributesChange([]);
      onVariantsChange([]);
    }
    onEnabledChange(!enabled);
  };

  // Generate variant SKU based on attributes
  const generateVariantSku = (index: number) => {
    const variant = variants[index];
    const basePrefix = `SKU-${index+1}`;
    const attributeCodes = Object.entries(variant.attributes)
      .map(([key, value]) => value.substring(0, 2).toUpperCase())
      .join("-");
    
    updateVariant(index, "sku", `${basePrefix}-${attributeCodes}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="variants-enabled" 
          checked={enabled} 
          onCheckedChange={toggleVariantsEnabled} 
        />
        <label 
          htmlFor="variants-enabled" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          This product has multiple variants (sizes, colors, etc.)
        </label>
      </div>
      
      {enabled && (
        <>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Define Variant Attributes</h4>
            
            {/* Add new attribute */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              {availableAttributes && availableAttributes.length > 0 ? (
                <div className="flex-1 flex gap-2">
                  <Select value={selectedAttributeName} onValueChange={setSelectedAttributeName}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select an attribute" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableAttributes.map((attr, index) => (
                        <SelectItem key={index} value={attr.name}>{attr.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">or</span>
                  <Input
                    placeholder="Custom attribute name"
                    value={newAttributeName}
                    onChange={(e) => setNewAttributeName(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addAttribute}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 w-full">
                  <Input
                    placeholder="Attribute name (e.g. Size, Color)"
                    value={newAttributeName}
                    onChange={(e) => setNewAttributeName(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addAttribute}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Attribute
                  </Button>
                </div>
              )}
            </div>
            
            {/* List of attributes */}
            <div className="space-y-3">
              {attributes.map((attribute, attrIndex) => (
                <Card key={attrIndex} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{attribute.name}</h5>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeAttribute(attrIndex)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    
                    {/* Add value to this attribute */}
                    <div className="flex items-center gap-2 mb-2">
                      <Input
                        placeholder="Value (e.g. Red, Small)"
                        value={newAttributeValue}
                        onChange={(e) => setNewAttributeValue(e.target.value)}
                        className="max-w-xs"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => addAttributeValue(attrIndex)}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    
                    {/* Values for this attribute */}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {attribute.values.map((value, valueIndex) => (
                        <Badge 
                          key={valueIndex} 
                          variant="outline" 
                          className="flex items-center gap-1 px-2 py-0.5"
                        >
                          {value}
                          <button 
                            onClick={() => removeAttributeValue(attrIndex, valueIndex)}
                            className="ml-1 rounded-full hover:bg-gray-100 p-0.5"
                          >
                            <span className="sr-only">Remove</span>
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Variant options */}
          {variants.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Configure Variants</h4>
              <div className="space-y-2">
                {variants.map((variant, index) => (
                  <Accordion
                    key={variant.id}
                    type="single"
                    collapsible
                    value={openAccordions.includes(variant.id) ? variant.id : undefined}
                    onValueChange={(value) => {
                      if (value) {
                        setOpenAccordions(prev => [...prev, variant.id]);
                      } else {
                        setOpenAccordions(prev => prev.filter(id => id !== variant.id));
                      }
                    }}
                    className="border rounded-md"
                  >
                    <AccordionItem value={variant.id} className="border-0">
                      <AccordionTrigger className="px-4 py-2 hover:bg-muted/30 hover:no-underline">
                        <div className="flex flex-wrap gap-2 items-center">
                          {Object.entries(variant.attributes).map(([name, value]) => (
                            <Badge key={name} variant="secondary">
                              {name}: {value}
                            </Badge>
                          ))}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pt-0">
                        {/* Pricing options */}
                        {showDynamicPricing && (
                          <div className="mb-4 p-4 border border-gray-200 rounded-md">
                            <h5 className="font-medium mb-2">Pricing Options</h5>
                            
                            <div className="flex flex-col space-y-3 mb-4">
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={variant.pricingType === "flat"}
                                  onChange={() => updateVariantPricingType(index, "flat")}
                                  className="form-radio h-4 w-4"
                                />
                                <span>Flat Rate</span>
                              </label>
                              
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={variant.pricingType === "dynamic"}
                                  onChange={() => updateVariantPricingType(index, "dynamic")}
                                  className="form-radio h-4 w-4"
                                />
                                <span>Dynamic (Weight Based)</span>
                              </label>
                            </div>
                            
                            {variant.pricingType === "flat" ? (
                              <div className="mb-4">
                                <label className="text-xs text-gray-500">Price ($)</label>
                                <Input 
                                  type="number" 
                                  value={variant.price || ""} 
                                  onChange={(e) => updateVariant(index, "price", e.target.value)} 
                                  placeholder="Price"
                                />
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-xs text-gray-500">Weight (grams)</label>
                                  <Input 
                                    type="number" 
                                    value={variant.weight || ""} 
                                    onChange={(e) => updateVariant(index, "weight", e.target.value)} 
                                    placeholder="Weight"
                                    min="0"
                                    step="0.001"
                                  />
                                </div>
                                
                                <div>
                                  <label className="text-xs text-gray-500">Material</label>
                                  <Select 
                                    value={variant.materialId || ""}
                                    onValueChange={(value) => updateVariant(index, "materialId", value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select material" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {materials.map(material => (
                                        <SelectItem key={material.id} value={material.id}>
                                          {material.name} (${material.pricePerGram.toFixed(2)}/g)
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div>
                                  <label className="text-xs text-gray-500">Making Charge ($)</label>
                                  <Input 
                                    type="number" 
                                    value={variant.makingCharge || ""} 
                                    onChange={(e) => updateVariant(index, "makingCharge", e.target.value)} 
                                    placeholder="Making charge"
                                    min="0"
                                    step="0.01"
                                  />
                                </div>
                                
                                {variant.calculatedPrice !== undefined && (
                                  <div className="text-sm font-medium mt-2 p-2 bg-muted rounded">
                                    <p>Calculated Price: <span className="text-gold">${variant.calculatedPrice.toFixed(2)}</span></p>
                                    {variant.materialId && (
                                      <p className="text-xs text-muted-foreground">
                                        ({variant.weight || 0} g × ${materials.find(m => m.id === variant.materialId)?.pricePerGram.toFixed(2) || 0}/g) + ${variant.makingCharge || 0} making charge
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-500">SKU</label>
                            <div className="flex gap-2">
                              <Input 
                                value={variant.sku} 
                                onChange={(e) => updateVariant(index, "sku", e.target.value)} 
                                placeholder="SKU"
                                className="flex-1"
                              />
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => generateVariantSku(index)}
                              >
                                Generate
                              </Button>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Stock</label>
                            <Input 
                              type="number" 
                              value={variant.stock} 
                              onChange={(e) => updateVariant(index, "stock", e.target.value)} 
                              placeholder="Stock"
                              min="0"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
