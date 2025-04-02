
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Grid,
  Search,
  Plus,
  Edit,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  LogOut,
  Package,
  Tag,
  Settings,
  Users,
  BarChart2,
  ImagePlus,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { featuredProducts } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { AddProductDialog } from "@/components/admin/AddProductDialog";

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const { toast } = useToast();
  
  // Filter products based on search term
  const filteredProducts = featuredProducts.filter(
    (product) => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle checkbox selection
  const toggleSelection = (id: string) => {
    setSelectedItems((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  // Handle bulk selection
  const toggleAll = () => {
    if (selectedItems.length === filteredProducts.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredProducts.map(product => product.id.toString()));
    }
  };
  
  // Delete handler
  const handleDelete = (id: string) => {
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted",
    });
    // In a real app, you would delete the product from the database
  };

  // Add product handler
  const handleAddProduct = (productData) => {
    console.log("New product data:", productData);
    
    // Check if this is a variable product
    if (productData.hasVariants && productData.variants && productData.variants.length > 0) {
      toast({
        title: "Variable product added",
        description: `Product "${productData.name}" with ${productData.variants.length} variants added successfully`,
      });
    } else {
      toast({
        title: "Product added",
        description: "The product has been successfully added",
      });
    }
    
    setIsAddProductOpen(false);
    // In a real app, you would add the product to the database
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - same as in AdminDashboard */}
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
          <Link to="/admin/products" className="bg-gold/10 text-gold p-3 rounded-md flex items-center">
            <ShoppingBag className="mr-3 h-5 w-5" />
            Products
          </Link>
          <Link to="/admin/product-settings" className="hover:bg-muted p-3 rounded-md flex items-center">
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
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-white border-b border-border p-4 flex items-center justify-between sticky top-0 z-10">
          {/* Mobile Menu Button */}
          <Button variant="ghost" className="md:hidden" size="icon">
            <Grid className="h-5 w-5" />
          </Button>
          
          <div className="md:hidden text-xl font-serif font-bold text-gold">
            ELEGANCE
          </div>
          
          {/* Search */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-6">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Admin Menu */}
          <div className="flex items-center">
            <span className="mr-2 hidden md:inline-block">Admin User</span>
            <div className="h-8 w-8 rounded-full bg-gold flex items-center justify-center text-white">
              A
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-serif font-semibold mb-1">Products</h1>
              <p className="text-muted-foreground">Manage your product inventory</p>
            </div>
            
            <div className="flex gap-2">
              <Link to="/admin/product-settings">
                <Button variant="outline">
                  <Layers className="mr-2 h-4 w-4" /> Settings
                </Button>
              </Link>
              <Button 
                className="bg-gold hover:bg-gold-dark"
                onClick={() => setIsAddProductOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </div>
          </div>
          
          {/* Search and filters for mobile */}
          <div className="mb-6 md:hidden">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Filters */}
          <Card className="mb-6 p-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex gap-2 items-center">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDown className="h-4 w-4" /> Sort
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={selectedItems.length === 0}>
                  Export Selected
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  disabled={selectedItems.length === 0}
                  onClick={() => {
                    toast({
                      title: "Products deleted",
                      description: `${selectedItems.length} products have been deleted`,
                    });
                    setSelectedItems([]);
                  }}
                >
                  Delete Selected
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Products Table */}
          <Card className="overflow-hidden border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={
                          filteredProducts.length > 0 && 
                          selectedItems.length === filteredProducts.length
                        } 
                        onCheckedChange={toggleAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Checkbox 
                          checked={selectedItems.includes(product.id.toString())} 
                          onCheckedChange={() => toggleSelection(product.id.toString())}
                          aria-label={`Select ${product.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded-md w-10 h-10 overflow-hidden flex-shrink-0">
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="line-clamp-2">{product.name}</span>
                            {product.hasVariants && product.variants && product.variants.length > 0 && (
                              <span className="text-xs text-muted-foreground">
                                {product.variants.length} variants
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        {product.hasVariants && product.variants
                          ? `$${product.variants[0].price} - $${product.variants[product.variants.length-1].price}`
                          : `$${product.price.toFixed(2)}`
                        }
                      </TableCell>
                      <TableCell>{Math.floor(Math.random() * 100) + 1}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <Switch
                            checked={Math.random() > 0.3}
                            aria-label="Toggle product visibility"
                          />
                          <Badge variant={Math.random() > 0.3 ? "default" : "secondary"}>
                            {Math.random() > 0.3 ? "Active" : "Draft"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(product.id.toString())}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center">
                          <ShoppingBag className="h-12 w-12 text-muted mb-4" />
                          <h3 className="font-medium mb-1">No products found</h3>
                          <p className="text-muted-foreground mb-4">
                            Try adjusting your search or filters
                          </p>
                          <Button onClick={() => setSearchTerm("")}>
                            Clear filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{filteredProducts.length}</span> of{" "}
                <span className="font-medium">{featuredProducts.length}</span> products
              </p>
              
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-gold text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>

      {/* Add Product Dialog */}
      <AddProductDialog 
        open={isAddProductOpen} 
        onOpenChange={setIsAddProductOpen} 
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default AdminProducts;
