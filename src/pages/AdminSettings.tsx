
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Users, ShoppingBag, Package, Tags, 
  DollarSign, PaintBucket, Save, Undo
} from 'lucide-react';

import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const settingsTabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "users", label: "Users & Permissions", icon: Users },
  { id: "products", label: "Product Settings", icon: Package },
  { id: "orders", label: "Order Settings", icon: ShoppingBag },
  { id: "taxes", label: "Taxes & Currency", icon: DollarSign },
  { id: "appearance", label: "Appearance", icon: PaintBucket }
];

const AdminSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);

  const saveSettings = () => {
    setLoading(true);
    
    // Simulate a save operation
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully",
        variant: "default",
      });
    }, 800);
  };
  
  const resetSettings = () => {
    toast({
      title: "Settings reset",
      description: "Your settings have been reset to default values",
      variant: "destructive",
    });
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
              <h1 className="text-3xl font-serif font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">Manage your store settings and preferences</p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={resetSettings}
                className="border-gold/30 hover:border-gold/60"
              >
                <Undo className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <ShimmerButton 
                variant="gold" 
                onClick={saveSettings}
                disabled={loading}
              >
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Settings"}
              </ShimmerButton>
            </div>
          </div>

          <Card className="border-gold/20">
            <CardContent className="p-0">
              <Tabs 
                defaultValue="general" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="flex border-b border-gold/20">
                  <div className="p-2 w-full overflow-x-auto scrollbar-none">
                    <TabsList className="bg-transparent w-full justify-start gap-2 h-auto p-0">
                      {settingsTabs.map((tab) => (
                        <TabsTrigger 
                          key={tab.id} 
                          value={tab.id}
                          className={`data-[state=active]:bg-gold/10 data-[state=active]:text-gold data-[state=active]:border-gold
                          border-b-2 border-transparent py-3 px-4 rounded-none transition-all duration-200`}
                        >
                          <tab.icon className="h-4 w-4 mr-2" />
                          {tab.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                </div>

                <div className="p-6">
                  <TabsContent value="general" className="space-y-6 mt-0">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-xl font-serif font-medium mb-4">Store Information</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="store-name">Store Name</Label>
                          <Input id="store-name" defaultValue="Elegance Jewelry" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="store-url">Store URL</Label>
                          <Input id="store-url" defaultValue="elegance-jewelry.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="store-email">Contact Email</Label>
                          <Input id="store-email" type="email" defaultValue="contact@elegance-jewelry.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="store-phone">Contact Phone</Label>
                          <Input id="store-phone" defaultValue="+1 (555) 123-4567" />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="border-t border-border pt-6"
                    >
                      <h3 className="text-xl font-serif font-medium mb-4">General Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                            <p className="text-sm text-muted-foreground">Put your store in maintenance mode</p>
                          </div>
                          <Switch id="maintenance-mode" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="inventory-tracking">Inventory Tracking</Label>
                            <p className="text-sm text-muted-foreground">Track product inventory levels</p>
                          </div>
                          <Switch id="inventory-tracking" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="enable-reviews">Enable Reviews</Label>
                            <p className="text-sm text-muted-foreground">Allow customers to leave product reviews</p>
                          </div>
                          <Switch id="enable-reviews" defaultChecked />
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="appearance" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-serif font-medium mb-4">Theme Settings</h3>
                      <div className="grid gap-6 md:grid-cols-3">
                        <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-2 border-gold">
                          <div className="h-40 bg-gradient-to-r from-gold-light to-gold"></div>
                          <CardFooter className="p-3 bg-secondary">
                            <p className="font-medium">Gold (Default)</p>
                          </CardFooter>
                        </Card>
                        <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                          <div className="h-40 bg-gradient-to-r from-ruby-light to-ruby"></div>
                          <CardFooter className="p-3 bg-secondary">
                            <p className="font-medium">Ruby</p>
                          </CardFooter>
                        </Card>
                        <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                          <div className="h-40 bg-gradient-to-r from-slate-300 to-slate-500"></div>
                          <CardFooter className="p-3 bg-secondary">
                            <p className="font-medium">Silver</p>
                          </CardFooter>
                        </Card>
                      </div>

                      <div className="border-t border-border pt-6">
                        <h3 className="text-xl font-serif font-medium mb-4">Logo & Branding</h3>
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="logo-upload">Store Logo</Label>
                              <div className="flex items-center gap-4">
                                <div className="h-16 w-16 bg-secondary flex items-center justify-center rounded-md">
                                  <span className="font-serif font-bold text-xl text-gold">E</span>
                                </div>
                                <Button variant="outline" size="sm">
                                  Change Logo
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="favicon-upload">Store Favicon</Label>
                              <div className="flex items-center gap-4">
                                <div className="h-8 w-8 bg-gold flex items-center justify-center rounded-sm">
                                  <span className="font-serif font-bold text-xs text-white">E</span>
                                </div>
                                <Button variant="outline" size="sm">
                                  Change Favicon
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="users" className="mt-0">
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <Tags className="h-12 w-12 mx-auto mb-4 text-gold/50" />
                        <h3 className="text-lg font-medium mb-2">User Management</h3>
                        <p className="text-muted-foreground">
                          User and permission settings content goes here
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="products" className="mt-0">
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <Package className="h-12 w-12 mx-auto mb-4 text-gold/50" />
                        <h3 className="text-lg font-medium mb-2">Product Configuration</h3>
                        <p className="text-muted-foreground">
                          Product settings content goes here
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="orders" className="mt-0">
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gold/50" />
                        <h3 className="text-lg font-medium mb-2">Order Management</h3>
                        <p className="text-muted-foreground">
                          Order configuration content goes here
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="taxes" className="mt-0">
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <DollarSign className="h-12 w-12 mx-auto mb-4 text-gold/50" />
                        <h3 className="text-lg font-medium mb-2">Tax & Currency Settings</h3>
                        <p className="text-muted-foreground">
                          Tax and currency configuration content goes here
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
