
import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Loader2,
  Search,
  Filter,
  Eye,
  ImagePlus,
  CheckCircle,
  XCircle
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { 
  fetchProducts,
  deleteProduct,
  updateProduct 
} from "@/services/productService";
import { fetchCategories } from "@/services/categoryService";
import { AddProductDialog } from "@/components/admin/AddProductDialog";

export const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories()
      ]);
      setProducts(productsData || []);
      setCategories(categoriesData || []);
    } catch (error: any) {
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsAddProductOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setIsAddProductOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      setProcessingId(id);
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting product",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleToggleProductStatus = async (id: string, currentStatus: boolean) => {
    try {
      setProcessingId(id);
      const updatedProduct = await updateProduct(id, { in_stock: !currentStatus });
      setProducts(products.map(product => 
        product.id === id ? updatedProduct : product
      ));
      toast({
        title: `Product ${!currentStatus ? "activated" : "deactivated"}`,
        description: `The product is now ${!currentStatus ? "in stock" : "out of stock"}`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating product status",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleSaveProduct = async (productData: any) => {
    try {
      await loadData();
      setIsAddProductOpen(false);
      toast({
        title: editingProduct ? "Product updated" : "Product added",
        description: `The product has been successfully ${editingProduct ? "updated" : "added"}`,
      });
    } catch (error: any) {
      toast({
        title: `Error ${editingProduct ? "updating" : "adding"} product`,
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "all" || 
      product.category_id === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-5">
        <CardTitle>Products</CardTitle>
        <Button 
          onClick={handleAddProduct}
          className="bg-gold hover:bg-gold-dark"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="border rounded-md px-3 py-2 bg-background"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" /> More Filters
              </Button>
            </div>
          </div>

          {/* Products Table */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                          No products found. Try a different search or add a new product.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="bg-muted rounded-md w-10 h-10 overflow-hidden flex-shrink-0">
                                {product.product_images && product.product_images.length > 0 ? (
                                  <img 
                                    src={product.product_images[0].image_url} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-muted">
                                    <ImagePlus className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getCategoryName(product.category_id)}
                          </TableCell>
                          <TableCell>
                            {product.sale_price ? (
                              <div>
                                <span className="line-through text-muted-foreground text-sm">
                                  ${product.price.toFixed(2)}
                                </span>
                                <span className="font-medium ml-2 text-green-600">
                                  ${product.sale_price.toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span>${product.price.toFixed(2)}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={product.in_stock}
                                onCheckedChange={() => handleToggleProductStatus(product.id, product.in_stock)}
                                disabled={processingId === product.id}
                              />
                              <Badge variant={product.in_stock ? "default" : "secondary"}>
                                {product.in_stock ? (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                ) : (
                                  <XCircle className="h-3 w-3 mr-1" />
                                )}
                                {product.in_stock ? "In Stock" : "Out of Stock"}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteProduct(product.id)}
                                disabled={processingId === product.id}
                              >
                                {processingId === product.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                                ) : (
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {/* Add/Edit Product Dialog */}
      <AddProductDialog 
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        product={editingProduct}
        categories={categories}
        onSave={handleSaveProduct}
      />
    </Card>
  );
};
