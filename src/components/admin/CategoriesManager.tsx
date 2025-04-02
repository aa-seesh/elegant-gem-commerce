
import React, { useState } from "react";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { productCategories, ProductCategory } from "@/data/products";
import { useToast } from "@/components/ui/use-toast";

export const CategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>(productCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<ProductCategory>>({
    name: "",
    slug: "",
    description: ""
  });
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.slug) {
      toast({
        title: "Missing information",
        description: "Category name and slug are required",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicate slugs
    if (categories.some(category => category.slug === newCategory.slug)) {
      toast({
        title: "Duplicate slug",
        description: "A category with this slug already exists",
        variant: "destructive"
      });
      return;
    }

    const category: ProductCategory = {
      id: `cat-${Date.now()}`,
      name: newCategory.name,
      slug: newCategory.slug,
      description: newCategory.description || ""
    };

    setCategories([...categories, category]);
    setNewCategory({ name: "", slug: "", description: "" });
    
    toast({
      title: "Category added",
      description: `${category.name} has been added successfully`
    });
  };

  const handleEditCategory = (category: ProductCategory) => {
    setEditingId(category.id);
  };

  const handleUpdateCategory = (id: string, updates: Partial<ProductCategory>) => {
    setCategories(
      categories.map(category => 
        category.id === id 
          ? { ...category, ...updates }
          : category
      )
    );
  };

  const handleSaveEdit = (id: string) => {
    setEditingId(null);
    toast({
      title: "Category updated",
      description: "The category has been updated successfully"
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
    toast({
      title: "Category deleted",
      description: "The category has been deleted successfully"
    });
  };

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    setNewCategory({
      ...newCategory,
      name: value,
      slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add new category form */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Add New Category</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="categoryName" className="text-sm text-muted-foreground">Name</label>
                <Input
                  id="categoryName"
                  value={newCategory.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Category name"
                />
              </div>
              <div>
                <label htmlFor="categorySlug" className="text-sm text-muted-foreground">Slug</label>
                <Input
                  id="categorySlug"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  placeholder="category-slug"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="categoryDescription" className="text-sm text-muted-foreground">Description (optional)</label>
                <Textarea
                  id="categoryDescription"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Category description"
                  rows={2}
                />
              </div>
            </div>
            <Button onClick={handleAddCategory} className="bg-gold hover:bg-gold-dark">
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </div>

          {/* Categories list */}
          <div>
            <h3 className="text-sm font-medium mb-4">Existing Categories</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {editingId === category.id ? (
                        <Input
                          value={category.name}
                          onChange={(e) => handleUpdateCategory(category.id, { name: e.target.value })}
                        />
                      ) : (
                        category.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === category.id ? (
                        <Input
                          value={category.slug}
                          onChange={(e) => handleUpdateCategory(category.id, { slug: e.target.value })}
                        />
                      ) : (
                        <Badge variant="outline">{category.slug}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {editingId === category.id ? (
                        <Textarea
                          value={category.description}
                          onChange={(e) => handleUpdateCategory(category.id, { description: e.target.value })}
                          rows={2}
                        />
                      ) : (
                        category.description
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === category.id ? (
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleSaveEdit(category.id)}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
