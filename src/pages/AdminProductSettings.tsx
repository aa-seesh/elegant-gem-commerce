
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Grid,
  Package,
  Tag,
  Settings,
  Users,
  BarChart2,
  LogOut,
  Layers,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { AttributesManager } from "@/components/admin/AttributesManager";
import { MaterialsManager } from "@/components/admin/MaterialsManager";

const AdminProductSettings = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border hidden md:block">
        <div className="p-4 border-b border-border">
          <Link to="/" className="text-xl font-serif font-bold text-gold">
            ELEGANCE
          </Link>
          <div className="text-xs mt-1 text-muted-foreground">Admin Panel</div>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link to="/admin" className="hover:bg-muted p-3 rounded-md flex items-center">
            <Grid className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link to="/admin/products" className="hover:bg-muted p-3 rounded-md flex items-center">
            <ShoppingBag className="mr-3 h-5 w-5" />
            Products
          </Link>
          <Link to="/admin/product-settings" className="bg-gold/10 text-gold p-3 rounded-md flex items-center">
            <Layers className="mr-3 h-5 w-5" />
            Product Settings
          </Link>
          <Link to="/admin/orders" className="hover:bg-muted p-3 rounded-md flex items-center">
            <Package className="mr-3 h-5 w-5" />
            Orders
          </Link>
          <Link to="/admin/customers" className="hover:bg-muted p-3 rounded-md flex items-center">
            <Users className="mr-3 h-5 w-5" />
            Customers
          </Link>
          <Link to="/admin/discounts" className="hover:bg-muted p-3 rounded-md flex items-center">
            <Tag className="mr-3 h-5 w-5" />
            Discounts
          </Link>
          <Link to="/admin/analytics" className="hover:bg-muted p-3 rounded-md flex items-center">
            <BarChart2 className="mr-3 h-5 w-5" />
            Analytics
          </Link>
          <Link to="/admin/settings" className="hover:bg-muted p-3 rounded-md flex items-center">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
          
          <div className="pt-4 mt-4 border-t border-border">
            <button className="w-full flex items-center p-3 rounded-md text-muted-foreground hover:bg-muted">
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-white border-b border-border p-4 flex items-center justify-between sticky top-0 z-10">
          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <Grid className="h-5 w-5" />
          </button>
          
          <div className="md:hidden text-xl font-serif font-bold text-gold">
            ELEGANCE
          </div>
          
          {/* Admin Menu */}
          <div className="flex items-center ml-auto">
            <span className="mr-2 hidden md:inline-block">Admin User</span>
            <div className="h-8 w-8 rounded-full bg-gold flex items-center justify-center text-white">
              A
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-serif font-semibold mb-1">Product Settings</h1>
            <p className="text-muted-foreground">Manage product categories, attributes, and material prices</p>
          </div>
          
          <Tabs defaultValue="categories">
            <TabsList className="mb-6">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="attributes">Attributes</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
            </TabsList>
            <TabsContent value="categories" className="mt-0">
              <CategoriesManager />
            </TabsContent>
            <TabsContent value="attributes" className="mt-0">
              <AttributesManager />
            </TabsContent>
            <TabsContent value="materials" className="mt-0">
              <MaterialsManager />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminProductSettings;
