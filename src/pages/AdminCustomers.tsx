
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
  Eye,
  Mail,
  MessageSquare,
  UserCheck,
  UserX,
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

// Sample customer data
const customers = [
  {
    id: 1,
    name: "Emily Johnson",
    email: "emily@example.com",
    date: "2023-01-15",
    orders: 8,
    spent: 2450.75,
    status: "active",
  },
  {
    id: 2,
    name: "Michael Thompson",
    email: "michael@example.com",
    date: "2023-02-20",
    orders: 3,
    spent: 899.99,
    status: "active",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    email: "sophia@example.com",
    date: "2023-03-10",
    orders: 1,
    spent: 349.99,
    status: "inactive",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex@example.com",
    date: "2023-02-05",
    orders: 5,
    spent: 1750.50,
    status: "active",
  },
  {
    id: 5,
    name: "Jessica Williams",
    email: "jessica@example.com",
    date: "2023-03-18",
    orders: 2,
    spent: 2100.25,
    status: "active",
  },
  {
    id: 6,
    name: "Ryan Baker",
    email: "ryan@example.com",
    date: "2023-01-30",
    orders: 0,
    spent: 0,
    status: "inactive",
  },
];

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { toast } = useToast();
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle checkbox selection
  const toggleSelection = (id: number) => {
    setSelectedItems((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  // Handle bulk selection
  const toggleAll = () => {
    if (selectedItems.length === filteredCustomers.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredCustomers.map(customer => customer.id));
    }
  };
  
  // Send email handler
  const handleSendEmail = (id: number) => {
    toast({
      title: "Email sent",
      description: "The email has been sent to the customer",
    });
    // In a real app, you would send an email to the customer
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
          <Link to="/admin/customers" className="bg-gold/10 text-gold p-3 rounded-md flex items-center">
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
              placeholder="Search customers..."
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
              <h1 className="text-2xl font-serif font-semibold mb-1">Customers</h1>
              <p className="text-muted-foreground">Manage your customer accounts</p>
            </div>
            
            <Button className="bg-gold hover:bg-gold-dark">
              Add Customer
            </Button>
          </div>
          
          {/* Search and filters for mobile */}
          <div className="mb-6 md:hidden">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={selectedItems.length === 0}
                  onClick={() => {
                    toast({
                      title: "Email campaign started",
                      description: `${selectedItems.length} customers will receive emails`,
                    });
                    setSelectedItems([]);
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Selected
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  disabled={selectedItems.length === 0}
                  onClick={() => {
                    toast({
                      title: "Customers deleted",
                      description: `${selectedItems.length} customers have been deleted`,
                    });
                    setSelectedItems([]);
                  }}
                >
                  Delete Selected
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Customers Table */}
          <Card className="overflow-hidden border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={
                          filteredCustomers.length > 0 && 
                          selectedItems.length === filteredCustomers.length
                        } 
                        onCheckedChange={toggleAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Checkbox 
                          checked={selectedItems.includes(customer.id)} 
                          onCheckedChange={() => toggleSelection(customer.id)}
                          aria-label={`Select ${customer.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div>
                          <p>{customer.name}</p>
                          <p className="text-xs text-muted-foreground">{customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(customer.date).toLocaleDateString()}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>${customer.spent.toFixed(2)}</TableCell>
                      <TableCell>
                        {customer.status === "active" ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            <UserCheck className="w-3 h-3 mr-1" /> Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            <UserX className="w-3 h-3 mr-1" /> Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleSendEmail(customer.id)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredCustomers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center">
                          <Users className="h-12 w-12 text-muted mb-4" />
                          <h3 className="font-medium mb-1">No customers found</h3>
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
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminCustomers;
