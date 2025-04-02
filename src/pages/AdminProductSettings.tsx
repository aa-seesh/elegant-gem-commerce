
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, ShoppingBag, Tag, Palette, 
  Diamond, Weight, Plus, Trash2, Save, ArrowRight
} from 'lucide-react';

import AdminLayout from '@/components/admin/AdminLayout';
import SettingsCard from '@/components/admin/SettingsCard';
import { Button } from '@/components/ui/button';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const AdminProductSettings = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState([
    { id: '1', name: 'Necklaces', slug: 'necklaces' },
    { id: '2', name: 'Rings', slug: 'rings' },
    { id: '3', name: 'Earrings', slug: 'earrings' },
    { id: '4', name: 'Bracelets', slug: 'bracelets' }
  ]);
  const [newCategory, setNewCategory] = useState('');
  
  const [attributes, setAttributes] = useState([
    { id: '1', name: 'Metal', values: ['Gold', 'Silver', 'Rose Gold', 'Platinum'] },
    { id: '2', name: 'Size', values: ['Small', 'Medium', 'Large'] },
    { id: '3', name: 'Stone', values: ['Diamond', 'Ruby', 'Emerald', 'Sapphire'] }
  ]);
  const [newAttribute, setNewAttribute] = useState('');
  const [newAttributeValue, setNewAttributeValue] = useState('');
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null);

  const [materials, setMaterials] = useState([
    { id: '1', name: '14K Gold', price: 29.99, unit: 'gram' },
    { id: '2', name: '18K Gold', price: 39.99, unit: 'gram' },
    { id: '3', name: 'Sterling Silver', price: 0.89, unit: 'gram' },
    { id: '4', name: 'Platinum', price: 34.99, unit: 'gram' }
  ]);
  const [newMaterial, setNewMaterial] = useState('');
  const [newMaterialPrice, setNewMaterialPrice] = useState('');
  const [newMaterialUnit, setNewMaterialUnit] = useState('gram');

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    const slug = newCategory
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
      
    const newId = (Math.max(...categories.map(c => parseInt(c.id)), 0) + 1).toString();
    
    setCategories([...categories, { id: newId, name: newCategory, slug }]);
    setNewCategory('');
    
    toast({
      title: "Category Added",
      description: `The category "${newCategory}" has been added successfully.`,
    });
  };

  const handleRemoveCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
    toast({
      title: "Category Removed",
      description: "The category has been removed successfully.",
    });
  };

  const handleAttributeSelect = (id: string) => {
    setSelectedAttribute(id);
    setNewAttributeValue('');
  };

  const handleAddAttribute = () => {
    if (!newAttribute.trim()) return;
    
    const newId = (Math.max(...attributes.map(a => parseInt(a.id)), 0) + 1).toString();
    setAttributes([...attributes, { id: newId, name: newAttribute, values: [] }]);
    setNewAttribute('');
    setSelectedAttribute(newId);
    
    toast({
      title: "Attribute Added",
      description: `The attribute "${newAttribute}" has been added successfully.`,
    });
  };

  const handleAddAttributeValue = () => {
    if (!selectedAttribute || !newAttributeValue.trim()) return;
    
    setAttributes(attributes.map(attr => 
      attr.id === selectedAttribute 
        ? { ...attr, values: [...attr.values, newAttributeValue] } 
        : attr
    ));
    setNewAttributeValue('');
    
    toast({
      title: "Value Added",
      description: `The value has been added to the attribute.`,
    });
  };

  const handleRemoveAttributeValue = (attrId: string, value: string) => {
    setAttributes(attributes.map(attr => 
      attr.id === attrId 
        ? { ...attr, values: attr.values.filter(v => v !== value) } 
        : attr
    ));
  };

  const handleAddMaterial = () => {
    if (!newMaterial.trim() || !newMaterialPrice.trim()) return;
    
    const price = parseFloat(newMaterialPrice);
    if (isNaN(price) || price <= 0) return;
    
    const newId = (Math.max(...materials.map(m => parseInt(m.id)), 0) + 1).toString();
    setMaterials([...materials, { 
      id: newId, 
      name: newMaterial, 
      price, 
      unit: newMaterialUnit || 'gram' 
    }]);
    setNewMaterial('');
    setNewMaterialPrice('');
    setNewMaterialUnit('gram');
    
    toast({
      title: "Material Added",
      description: `The material "${newMaterial}" has been added successfully.`,
    });
  };

  const handleRemoveMaterial = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id));
    toast({
      title: "Material Removed",
      description: "The material has been removed successfully.",
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Product Settings</h1>
              <p className="text-muted-foreground mt-1">Manage categories, attributes, and materials</p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  toast({
                    title: "Changes saved",
                    description: "All product settings have been saved successfully",
                  });
                }}
                className="border-gold/30 hover:border-gold/60"
              >
                <Save className="mr-2 h-4 w-4" />
                Save All Changes
              </Button>
            </div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <SettingsCard 
                icon={Layers} 
                title="Categories" 
                description="Manage product categories for your store"
              >
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-grow">
                      <Input 
                        placeholder="New category name" 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddCategory}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  <div className="border rounded-md divide-y">
                    {categories.map((category) => (
                      <div 
                        key={category.id} 
                        className="flex items-center justify-between p-3 hover:bg-secondary/50"
                      >
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-xs text-muted-foreground">Slug: {category.slug}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {categories.length === 0 && (
                      <div className="p-4 text-center text-muted-foreground">
                        No categories added yet
                      </div>
                    )}
                  </div>
                </div>
              </SettingsCard>
            </motion.div>

            <motion.div variants={item}>
              <SettingsCard 
                icon={Tag} 
                title="Product Attributes" 
                description="Manage product attributes and their values"
              >
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-grow">
                      <Input 
                        placeholder="New attribute name" 
                        value={newAttribute}
                        onChange={(e) => setNewAttribute(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddAttribute}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 border rounded-md overflow-hidden">
                      <div className="bg-secondary/50 p-2 font-medium text-sm">Attributes</div>
                      <div className="divide-y">
                        {attributes.map((attr) => (
                          <button
                            key={attr.id}
                            className={`w-full text-left p-2 hover:bg-secondary/50 transition-colors ${selectedAttribute === attr.id ? 'bg-gold/10 text-gold' : ''}`}
                            onClick={() => handleAttributeSelect(attr.id)}
                          >
                            {attr.name}
                          </button>
                        ))}
                        
                        {attributes.length === 0 && (
                          <div className="p-4 text-center text-muted-foreground">
                            No attributes added yet
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="col-span-2 border rounded-md overflow-hidden">
                      <div className="bg-secondary/50 p-2 font-medium text-sm">Values</div>
                      
                      {selectedAttribute ? (
                        <>
                          <div className="p-2 border-b">
                            <div className="flex gap-2">
                              <div className="flex-grow">
                                <Input 
                                  placeholder="Add value" 
                                  value={newAttributeValue}
                                  onChange={(e) => setNewAttributeValue(e.target.value)}
                                  size={10}
                                />
                              </div>
                              <Button 
                                size="sm"
                                onClick={handleAddAttributeValue}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-2">
                            <div className="flex flex-wrap gap-2">
                              {attributes
                                .find(a => a.id === selectedAttribute)
                                ?.values.map((value) => (
                                  <div 
                                    key={value} 
                                    className="bg-secondary py-1 px-2 rounded-md flex items-center gap-1 group"
                                  >
                                    {value}
                                    <button 
                                      className="opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity"
                                      onClick={() => handleRemoveAttributeValue(selectedAttribute, value)}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              
                              {attributes.find(a => a.id === selectedAttribute)?.values.length === 0 && (
                                <div className="text-center text-muted-foreground w-full p-2">
                                  No values added yet
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 text-center text-muted-foreground">
                          Select an attribute to manage values
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SettingsCard>
            </motion.div>

            <motion.div variants={item} className="md:col-span-2">
              <SettingsCard 
                icon={Diamond} 
                title="Material Pricing" 
                description="Manage materials and their prices for your jewelry products"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-5">
                      <Label htmlFor="material-name" className="mb-1">Material Name</Label>
                      <Input 
                        id="material-name"
                        placeholder="e.g. 14K Gold" 
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor="material-price" className="mb-1">Price</Label>
                      <Input 
                        id="material-price"
                        type="number" 
                        placeholder="0.00" 
                        value={newMaterialPrice}
                        onChange={(e) => setNewMaterialPrice(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="material-unit" className="mb-1">Unit</Label>
                      <Input 
                        id="material-unit"
                        placeholder="gram" 
                        value={newMaterialUnit}
                        onChange={(e) => setNewMaterialUnit(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2 flex items-end">
                      <Button onClick={handleAddMaterial} className="w-full">
                        <Plus className="h-4 w-4 mr-1" /> Add Material
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-secondary/50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Material</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Unit</th>
                          <th scope="col" className="relative px-4 py-3 w-10">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-background divide-y divide-border">
                        {materials.map((material) => (
                          <tr key={material.id} className="hover:bg-secondary/20">
                            <td className="px-4 py-3">
                              {material.name}
                            </td>
                            <td className="px-4 py-3">
                              ${material.price.toFixed(2)}
                            </td>
                            <td className="px-4 py-3">
                              per {material.unit}
                            </td>
                            <td className="px-4 py-3 text-right w-10">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => handleRemoveMaterial(material.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        
                        {materials.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                              No materials added yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </SettingsCard>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <ShimmerButton 
              variant="gold" 
              onClick={() => {
                toast({
                  title: "Settings Saved",
                  description: "Your product settings have been updated successfully",
                });
              }}
            >
              Continue to Products <ArrowRight className="h-4 w-4 ml-1" />
            </ShimmerButton>
          </motion.div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminProductSettings;
