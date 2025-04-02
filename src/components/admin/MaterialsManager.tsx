
import React, { useState } from "react";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { materials, Material } from "@/data/products";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { format } from "date-fns";

export const MaterialsManager: React.FC = () => {
  const [materialsList, setMaterialsList] = useState<Material[]>(materials);
  const [newMaterial, setNewMaterial] = useState<Partial<Material>>({
    name: "",
    pricePerGram: 0
  });
  const { toast } = useToast();

  const handleAddMaterial = () => {
    if (!newMaterial.name || !newMaterial.pricePerGram) {
      toast({
        title: "Missing information",
        description: "Material name and price are required",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicate material names
    if (materialsList.some(m => m.name.toLowerCase() === newMaterial.name?.toLowerCase())) {
      toast({
        title: "Duplicate material",
        description: "A material with this name already exists",
        variant: "destructive"
      });
      return;
    }

    const material: Material = {
      id: `mat-${Date.now()}`,
      name: newMaterial.name,
      pricePerGram: Number(newMaterial.pricePerGram),
      lastUpdated: new Date().toISOString()
    };

    setMaterialsList([...materialsList, material]);
    setNewMaterial({ name: "", pricePerGram: 0 });
    
    toast({
      title: "Material added",
      description: `${material.name} has been added successfully`
    });
  };

  const handleUpdateMaterial = (id: string, updates: Partial<Material>) => {
    setMaterialsList(materialsList.map(material => 
      material.id === id 
        ? { 
            ...material, 
            ...updates,
            lastUpdated: new Date().toISOString() // Update the timestamp when price is changed
          }
        : material
    ));

    toast({
      title: "Material updated",
      description: "The material has been updated successfully"
    });
  };

  const handleDeleteMaterial = (id: string) => {
    setMaterialsList(materialsList.filter(material => material.id !== id));
    toast({
      title: "Material deleted",
      description: "The material has been deleted successfully"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Materials & Pricing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add new material form */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Add New Material</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="materialName" className="text-sm text-muted-foreground">Material Name</label>
                <Input
                  id="materialName"
                  value={newMaterial.name}
                  onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                  placeholder="Gold (18K)"
                />
              </div>
              <div>
                <label htmlFor="materialPrice" className="text-sm text-muted-foreground">Price per Gram ($)</label>
                <Input
                  id="materialPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newMaterial.pricePerGram}
                  onChange={(e) => setNewMaterial({ ...newMaterial, pricePerGram: parseFloat(e.target.value) })}
                  placeholder="65.50"
                />
              </div>
            </div>
            <Button onClick={handleAddMaterial} className="bg-gold hover:bg-gold-dark">
              <Plus className="mr-2 h-4 w-4" /> Add Material
            </Button>
          </div>

          {/* Materials list */}
          <div>
            <h3 className="text-sm font-medium mb-4">Current Materials & Prices</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Price per Gram ($)</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materialsList.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell>{material.name}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={material.pricePerGram}
                        onChange={(e) => handleUpdateMaterial(material.id, { pricePerGram: parseFloat(e.target.value) })}
                        className="max-w-[150px]"
                      />
                    </TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {format(new Date(material.lastUpdated), "MMM d, yyyy")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteMaterial(material.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {materialsList.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                      No materials added yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
