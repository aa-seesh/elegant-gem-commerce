
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Grid,
  Search,
  Package,
  Tag,
  Settings,
  Users,
  BarChart2,
  LogOut,
  Filter,
  ArrowUpDown,
  Plus,
  Edit,
  Trash2,
  Scissors,
  Calendar,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

// Sample discounts data
const discounts = [
  {
    id: 1,
    code: "SUMMER2023",
    type: "percentage",
    value: 20,
    minOrder: 100,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    usageLimit: 500,
    usedCount: 245,
    active: true,
  },
  {
    id: 2,
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minOrder: 50,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    usageLimit: 1000,
    usedCount: 572,
    active: true,
  },
  {
    id: 3,
    code: "FREESHIPPING",
    type: "fixed",
    value: 15,
    minOrder: 75,
    startDate: "2023-05-15",
    endDate: "2023-07-15",
    usageLimit: 300,
    usedCount: 189,
    active: true,
  },
  {
    id: 4,
    code: "FLASH25",
    type: "percentage",
    value: 25,
    minOrder: 150,
    startDate: "2023-04-01",
    endDate: "2023-04-03",
    usageLimit: 200,
    usedCount: 200,
    active: false,
  },
  {
    id: 5,
    code: "HOLIDAY50",
    type: "percentage",
    value: 50,
    minOrder: 200,
    startDate: "2023-12-20",
    endDate: "2023-12-26",
    usageLimit: 100,
    usedCount: 0,
    active: false,
  },
];

const AdminDiscounts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Filter discounts based on search term
  const filteredDiscounts = discounts.filter(
    (discount) => 
      discount.code.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Toggle discount status
  const toggleDiscountStatus = (id: number, newStatus: boolean) => {
    toast({
      title: `Discount ${newStatus ? "activated" : "deactivated"}`,
      description: `Discount code has been ${newStatus ? "activated" : "deactivated"}`,
    });
    // In a real app, you would update the discount status in the database
  };
  
  // Delete discount
  const handleDelete = (id: number) => {
    toast({
      title: "Discount deleted",
      description: "The discount has been successfully deleted",
    });
    // In a real app, you would delete the discount from the database
  };
  
  // Format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
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
          <Link to="/admin/products" className="hover:bg-muted p-3 rounded-md flex items-center">
            <ShoppingBag className="mr-3 h-5 w-5" />
            Products
          </Link>
          <Link to="/admin/orders" className="hover:bg-muted p-3 rounded-md flex items-center">
            <Package className="mr-3 h-5 w-5" />
            Orders
          </Link>
          <Link to="/admin/customers" className="hover:bg-muted p-3 rounded-md flex items-center">
            <Users className="mr-3 h-5 w-5" />
            Customers
          </Link>
          <Link to="/admin/discounts" className="bg-gold/10 text-gold p-3 rounded-md flex items-center">
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
              placeholder="Search discount codes..."
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
              <h1 className="text-2xl font-serif font-semibold mb-1">Discounts</h1>
              <p className="text-muted-foreground">Manage your discount codes and promotions</p>
            </div>
            
            <Button className="bg-gold hover:bg-gold-dark">
              <Plus className="mr-2 h-4 w-4" /> Add Discount
            </Button>
          </div>
          
          {/* Search and filters for mobile */}
          <div className="mb-6 md:hidden">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discount codes..."
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
                <Button variant="outline" size="sm">
                  Export Discounts
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Discounts Table */}
          <Card className="overflow-hidden border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Min Order</TableHead>
                    <TableHead>Valid Period</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDiscounts.map((discount) => (
                    <TableRow key={discount.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium uppercase">
                        <div className="flex items-center gap-2">
                          {discount.type === "percentage" ? (
                            <Percent className="h-4 w-4 text-purple-600" />
                          ) : (
                            <Tag className="h-4 w-4 text-blue-600" />
                          )}
                          {discount.code}
                        </div>
                      </TableCell>
                      <TableCell>
                        {discount.type === "percentage" ? `${discount.value}%` : `$${discount.value.toFixed(2)}`}
                      </TableCell>
                      <TableCell>${discount.minOrder.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDate(discount.startDate)} - {formatDate(discount.endDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                          <div 
                            className="bg-gold h-2.5 rounded-full" 
                            style={{width: `${(discount.usedCount / discount.usageLimit) * 100}%`}}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {discount.usedCount}/{discount.usageLimit}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <Switch
                            checked={discount.active}
                            onCheckedChange={(checked) => toggleDiscountStatus(discount.id, checked)}
                            aria-label="Toggle discount status"
                          />
                          <Badge variant={discount.active ? "default" : "secondary"}>
                            {discount.active ? "Active" : "Inactive"}
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
                            onClick={() => handleDelete(discount.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredDiscounts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center">
                          <Scissors className="h-12 w-12 text-muted mb-4" />
                          <h3 className="font-medium mb-1">No discount codes found</h3>
                          <p className="text-muted-foreground mb-4">
                            Try adjusting your search or create a new discount code
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
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminDiscounts;
