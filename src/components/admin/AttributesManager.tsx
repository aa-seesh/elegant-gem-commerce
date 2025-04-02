
import React, { useState } from "react";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { productAttributes, ProductAttribute, ProductAttributeValue } from "@/data/products";
import { useToast } from "@/components/ui/use-toast";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const AttributesManager: React.FC = () => {
  const [attributes, setAttributes] = useState<ProductAttribute[]>(productAttributes);
  const [editingAttributeId, setEditingAttributeId] = useState<string | null>(null);
  const [editingValueId, setEditingValueId] = useState<string | null>(null);
  const [newAttributeName, setNewAttributeName] = useState("");
  const [newAttributeValue, setNewAttributeValue] = useState("");
  const [openAttributes, setOpenAttributes] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleAttribute = (attributeId: string) => {
    setOpenAttributes(prev => 
      prev.includes(attributeId) 
        ? prev.filter(id => id !== attributeId) 
        : [...prev, attributeId]
    );
  };

  const handleAddAttribute = () => {
    if (!newAttributeName.trim()) {
      toast({
        title: "Missing information",
        description: "Attribute name is required",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicate attribute names
    if (attributes.some(attr => attr.name.toLowerCase() === newAttributeName.toLowerCase())) {
      toast({
        title: "Duplicate attribute",
        description: "An attribute with this name already exists",
        variant: "destructive"
      });
      return;
    }

    const newAttribute: ProductAttribute = {
      id: `attr-${Date.now()}`,
      name: newAttributeName,
      values: []
    };

    setAttributes([...attributes, newAttribute]);
    setOpenAttributes([...openAttributes, newAttribute.id]); // Open the new attribute
    setNewAttributeName("");
    
    toast({
      title: "Attribute added",
      description: `${newAttributeName} has been added successfully`
    });
  };

  const handleAddAttributeValue = (attributeId: string) => {
    if (!newAttributeValue.trim()) {
      toast({
        title: "Missing information",
        description: "Value cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const attribute = attributes.find(attr => attr.id === attributeId);
    
    if (!attribute) return;
    
    // Check for duplicate values
    if (attribute.values.some(v => v.value.toLowerCase() === newAttributeValue.toLowerCase())) {
      toast({
        title: "Duplicate value",
        description: "This value already exists for this attribute",
        variant: "destructive"
      });
      return;
    }

    const newValue: ProductAttributeValue = {
      id: `value-${Date.now()}`,
      value: newAttributeValue
    };

    setAttributes(attributes.map(attr => 
      attr.id === attributeId 
        ? { ...attr, values: [...attr.values, newValue] }
        : attr
    ));
    
    setNewAttributeValue("");
  };

  const handleEditAttributeName = (id: string) => {
    setEditingAttributeId(id);
  };

  const handleEditAttributeValue = (valueId: string) => {
    setEditingValueId(valueId);
  };

  const handleUpdateAttributeName = (id: string, name: string) => {
    setAttributes(attributes.map(attr => 
      attr.id === id ? { ...attr, name } : attr
    ));
  };

  const handleUpdateAttributeValue = (attributeId: string, valueId: string, newValue: string) => {
    setAttributes(attributes.map(attr => 
      attr.id === attributeId 
        ? {
            ...attr, 
            values: attr.values.map(val => 
              val.id === valueId 
                ? { ...val, value: newValue }
                : val
            )
          }
        : attr
    ));
  };

  const handleSaveAttributeName = (id: string) => {
    setEditingAttributeId(null);
    toast({
      title: "Attribute updated",
      description: "The attribute has been updated successfully"
    });
  };

  const handleSaveAttributeValue = (attributeId: string, valueId: string) => {
    setEditingValueId(null);
    toast({
      title: "Value updated",
      description: "The attribute value has been updated successfully"
    });
  };

  const handleCancelEdit = () => {
    setEditingAttributeId(null);
    setEditingValueId(null);
  };

  const handleDeleteAttribute = (id: string) => {
    setAttributes(attributes.filter(attr => attr.id !== id));
    toast({
      title: "Attribute deleted",
      description: "The attribute has been deleted successfully"
    });
  };

  const handleDeleteAttributeValue = (attributeId: string, valueId: string) => {
    setAttributes(attributes.map(attr => 
      attr.id === attributeId 
        ? { ...attr, values: attr.values.filter(val => val.id !== valueId) }
        : attr
    ));
    toast({
      title: "Value deleted",
      description: "The attribute value has been deleted successfully"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Attributes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add new attribute form */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Add New Attribute</h3>
            <div className="flex gap-4">
              <Input
                value={newAttributeName}
                onChange={(e) => setNewAttributeName(e.target.value)}
                placeholder="Attribute name (e.g., Color, Size)"
                className="flex-1"
              />
              <Button onClick={handleAddAttribute} className="bg-gold hover:bg-gold-dark">
                <Plus className="mr-2 h-4 w-4" /> Add Attribute
              </Button>
            </div>
          </div>

          {/* Attributes list */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Existing Attributes</h3>
            
            {attributes.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No attributes added yet
              </div>
            ) : (
              <div className="space-y-2">
                {attributes.map((attribute) => (
                  <Collapsible 
                    key={attribute.id} 
                    open={openAttributes.includes(attribute.id)}
                    onOpenChange={() => toggleAttribute(attribute.id)}
                    className="border rounded-md overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-4 bg-muted/40">
                      <div className="flex items-center flex-1">
                        {editingAttributeId === attribute.id ? (
                          <div className="flex-1 flex gap-2">
                            <Input
                              value={attribute.name}
                              onChange={(e) => handleUpdateAttributeName(attribute.id, e.target.value)}
                              className="max-w-xs"
                            />
                            <Button variant="outline" size="sm" onClick={() => handleSaveAttributeName(attribute.id)}>
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <h4 className="font-medium flex-1">{attribute.name}</h4>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!editingAttributeId && (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleEditAttributeName(attribute.id)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteAttribute(attribute.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </>
                        )}
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            {openAttributes.includes(attribute.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </div>
                    
                    <CollapsibleContent>
                      <div className="p-4 space-y-4 bg-background">
                        {/* Add value form */}
                        <div className="flex gap-2">
                          <Input
                            value={newAttributeValue}
                            onChange={(e) => setNewAttributeValue(e.target.value)}
                            placeholder={`New ${attribute.name.toLowerCase()} value`}
                            className="flex-1"
                          />
                          <Button 
                            variant="outline"
                            onClick={() => handleAddAttributeValue(attribute.id)}
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Value
                          </Button>
                        </div>
                        
                        {/* Values list */}
                        <div className="flex flex-wrap gap-2">
                          {attribute.values.map((value) => (
                            <div key={value.id} className="flex items-center">
                              {editingValueId === value.id ? (
                                <div className="flex items-center gap-1">
                                  <Input
                                    value={value.value}
                                    onChange={(e) => handleUpdateAttributeValue(attribute.id, value.id, e.target.value)}
                                    className="w-24 h-8 text-xs"
                                  />
                                  <Button 
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleSaveAttributeValue(attribute.id, value.id)}
                                  >
                                    <Save className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={handleCancelEdit}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <Badge className="px-3 flex items-center gap-1">
                                  {value.value}
                                  <div className="flex items-center ml-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-4 w-4"
                                      onClick={() => handleEditAttributeValue(value.id)}
                                    >
                                      <Pencil className="h-2 w-2" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-4 w-4"
                                      onClick={() => handleDeleteAttributeValue(attribute.id, value.id)}
                                    >
                                      <Trash2 className="h-2 w-2 text-destructive" />
                                    </Button>
                                  </div>
                                </Badge>
                              )}
                            </div>
                          ))}
                          
                          {attribute.values.length === 0 && (
                            <p className="text-sm text-muted-foreground">No values added yet</p>
                          )}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
