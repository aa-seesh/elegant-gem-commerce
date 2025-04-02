
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
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

export interface VariantAttribute {
  name: string;
  values: string[];
}

export interface VariantOption {
  id: string;
  attributes: { [key: string]: string };
  price: string;
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
}

export const ProductVariantsManager: React.FC<ProductVariantsManagerProps> = ({
  enabled,
  onEnabledChange,
  variants,
  onVariantsChange,
  attributes,
  onAttributesChange,
}) => {
  const [newAttributeName, setNewAttributeName] = useState("");
  const [newAttributeValue, setNewAttributeValue] = useState("");

  // Add a new attribute (like "Color" or "Size")
  const addAttribute = () => {
    if (!newAttributeName.trim()) return;
    
    // Check if attribute already exists
    if (attributes.some(attr => attr.name.toLowerCase() === newAttributeName.toLowerCase())) {
      return;
    }
    
    const updatedAttributes = [
      ...attributes,
      { name: newAttributeName, values: [] }
    ];
    onAttributesChange(updatedAttributes);
    setNewAttributeName("");
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
        price: existingVariant?.price || "",
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
            <div className="flex items-center gap-2">
              <Input
                placeholder="Attribute name (e.g. Size, Color)"
                value={newAttributeName}
                onChange={(e) => setNewAttributeName(e.target.value)}
                className="max-w-xs"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addAttribute}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Attribute
              </Button>
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
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {Object.entries(variant.attributes).map(([name, value]) => (
                          <Badge key={name} variant="secondary">
                            {name}: {value}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs text-gray-500">Price ($)</label>
                          <Input 
                            type="number" 
                            value={variant.price} 
                            onChange={(e) => updateVariant(index, "price", e.target.value)} 
                            placeholder="Price"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">SKU</label>
                          <Input 
                            value={variant.sku} 
                            onChange={(e) => updateVariant(index, "sku", e.target.value)} 
                            placeholder="SKU"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Stock</label>
                          <Input 
                            type="number" 
                            value={variant.stock} 
                            onChange={(e) => updateVariant(index, "stock", e.target.value)} 
                            placeholder="Stock"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
