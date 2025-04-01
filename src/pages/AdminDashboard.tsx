
import React from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Zap,
  Package,
  Tag,
  Settings,
  LogOut,
  BarChart2,
  Grid,
  Clock,
  ChevronRight,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { featuredProducts } from "@/data/products";

const AdminDashboard = () => {
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
          <Link to="/admin" className="bg-gold/10 text-gold p-3 rounded-md flex items-center">
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
        <header className="bg-white border-b border-border p-4 flex items-center justify-between">
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
              placeholder="Search products, orders..."
              className="pl-8"
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
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Admin User</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-muted-foreground text-sm">Total Sales</h3>
                  <p className="text-2xl font-bold">$24,340</p>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-muted-foreground text-sm">Orders</h3>
                  <p className="text-2xl font-bold">356</p>
                  <p className="text-xs text-green-600">+5% from last month</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-muted-foreground text-sm">Customers</h3>
                  <p className="text-2xl font-bold">1,254</p>
                  <p className="text-xs text-green-600">+18% from last month</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-muted-foreground text-sm">Conversion Rate</h3>
                  <p className="text-2xl font-bold">3.2%</p>
                  <p className="text-xs text-red-600">-0.4% from last month</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <Card className="lg:col-span-2">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Recent Orders</h3>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-4 px-4">#ORD-001</td>
                        <td className="py-4 px-4">Emily Johnson</td>
                        <td className="py-4 px-4">Jul 12, 2023</td>
                        <td className="py-4 px-4">$1,299.99</td>
                        <td className="py-4 px-4">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Delivered</span>
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-4 px-4">#ORD-002</td>
                        <td className="py-4 px-4">Michael Thompson</td>
                        <td className="py-4 px-4">Jul 11, 2023</td>
                        <td className="py-4 px-4">$899.99</td>
                        <td className="py-4 px-4">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Processing</span>
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-4 px-4">#ORD-003</td>
                        <td className="py-4 px-4">Sophia Martinez</td>
                        <td className="py-4 px-4">Jul 10, 2023</td>
                        <td className="py-4 px-4">$349.99</td>
                        <td className="py-4 px-4">
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Shipped</span>
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-4 px-4">#ORD-004</td>
                        <td className="py-4 px-4">Alex Rodriguez</td>
                        <td className="py-4 px-4">Jul 09, 2023</td>
                        <td className="py-4 px-4">$599.99</td>
                        <td className="py-4 px-4">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Delivered</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
            
            {/* Product Performance */}
            <Card>
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Product Performance</h3>
                  
                  <div className="space-y-4">
                    {featuredProducts.slice(0, 5).map((product, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm truncate w-4/5">{product.name}</p>
                          <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 40) + 10}%</span>
                        </div>
                        <Progress value={Math.floor(Math.random() * 40) + 10} className="h-1" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Package className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm">New order received</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> 2 hours ago
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm">New customer registered</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> 4 hours ago
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-gold/20 p-2 rounded-full mr-3">
                        <ShoppingBag className="h-4 w-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm">Product stock updated</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> 6 hours ago
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <DollarSign className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm">Payment processed</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> 12 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
