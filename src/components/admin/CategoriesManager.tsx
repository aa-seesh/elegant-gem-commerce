
import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save,
  X,
  Loader2
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
import { useToast } from "@/components/ui/use-toast";
import { 
  fetchCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  CategoryInput 
} from "@/services/categoryService";

export const CategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<CategoryInput>>({
    name: "",
    slug: "",
    description: ""
  });
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading categories",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
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

    try {
      setSavingId("new");
      const addedCategory = await createCategory(newCategory as CategoryInput);
      setCategories([...categories, addedCategory]);
      setNewCategory({ name: "", slug: "", description: "" });
      
      toast({
        title: "Category added",
        description: `${addedCategory.name} has been added successfully`
      });
    } catch (error: any) {
      toast({
        title: "Error adding category",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSavingId(null);
    }
  };

  const handleEditCategory = (category: any) => {
    setEditingId(category.id);
  };

  const handleUpdateCategoryLocal = (id: string, updates: Partial<CategoryInput>) => {
    setCategories(
      categories.map(category => 
        category.id === id 
          ? { ...category, ...updates }
          : category
      )
    );
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const categoryToUpdate = categories.find(cat => cat.id === id);
      if (!categoryToUpdate) return;

      setSavingId(id);
      const { name, slug, description } = categoryToUpdate;
      const updatedCategory = await updateCategory(id, { name, slug, description });
      
      setEditingId(null);
      toast({
        title: "Category updated",
        description: "The category has been updated successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error updating category",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSavingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    // Reload categories to revert any unsaved changes
    loadCategories();
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setSavingId(id);
      await deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
      toast({
        title: "Category deleted",
        description: "The category has been deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error deleting category",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSavingId(null);
    }
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
            <Button 
              onClick={handleAddCategory} 
              className="bg-gold hover:bg-gold-dark"
              disabled={savingId === "new"}
            >
              {savingId === "new" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </>
              )}
            </Button>
          </div>

          {/* Categories list */}
          <div>
            <h3 className="text-sm font-medium mb-4">Existing Categories</h3>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : (
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
                  {categories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No categories found. Add your first category above.
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          {editingId === category.id ? (
                            <Input
                              value={category.name}
                              onChange={(e) => handleUpdateCategoryLocal(category.id, { name: e.target.value })}
                            />
                          ) : (
                            category.name
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === category.id ? (
                            <Input
                              value={category.slug}
                              onChange={(e) => handleUpdateCategoryLocal(category.id, { slug: e.target.value })}
                            />
                          ) : (
                            <Badge variant="outline">{category.slug}</Badge>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[300px] truncate">
                          {editingId === category.id ? (
                            <Textarea
                              value={category.description || ""}
                              onChange={(e) => handleUpdateCategoryLocal(category.id, { description: e.target.value })}
                              rows={2}
                            />
                          ) : (
                            category.description
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingId === category.id ? (
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleSaveEdit(category.id)}
                                disabled={savingId === category.id}
                              >
                                {savingId === category.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Save className="h-4 w-4" />
                                )}
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
                                disabled={savingId === category.id}
                              >
                                {savingId === category.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                                ) : (
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                )}
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
