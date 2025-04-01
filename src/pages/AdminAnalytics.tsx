
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
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample analytics data
const salesData = [
  { month: "Jan", sales: 4000, orders: 24 },
  { month: "Feb", sales: 3000, orders: 18 },
  { month: "Mar", sales: 5000, orders: 32 },
  { month: "Apr", sales: 2780, orders: 19 },
  { month: "May", sales: 1890, orders: 14 },
  { month: "Jun", sales: 2390, orders: 17 },
  { month: "Jul", sales: 3490, orders: 21 },
  { month: "Aug", sales: 4000, orders: 24 },
  { month: "Sep", sales: 5000, orders: 28 },
  { month: "Oct", sales: 6000, orders: 33 },
  { month: "Nov", sales: 7000, orders: 41 },
  { month: "Dec", sales: 9000, orders: 52 },
];

const productCategoryData = [
  { name: "Rings", value: 35 },
  { name: "Necklaces", value: 30 },
  { name: "Earrings", value: 20 },
  { name: "Bracelets", value: 15 },
];

const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];

const topProducts = [
  { id: 1, name: "Diamond Engagement Ring", sales: 28, amount: 34500 },
  { id: 2, name: "Gold Chain Necklace", sales: 24, amount: 12000 },
  { id: 3, name: "Pearl Earrings Set", sales: 21, amount: 8400 },
  { id: 4, name: "Silver Bracelet", sales: 18, amount: 5400 },
  { id: 5, name: "Gemstone Pendant", sales: 15, amount: 4500 },
];

const AdminAnalytics = () => {
  const [timeFrame, setTimeFrame] = useState("year");
  
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
          <Link to="/admin/discounts" className="hover:bg-muted p-3 rounded-md flex items-center">
            <Tag className="mr-3 h-5 w-5" />
            Discounts
          </Link>
          <Link to="/admin/analytics" className="bg-gold/10 text-gold p-3 rounded-md flex items-center">
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
              placeholder="Search reports..."
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
          <div className="mb-6 flex justify-between items-center flex-wrap">
            <div>
              <h1 className="text-2xl font-serif font-semibold mb-1">Analytics</h1>
              <p className="text-muted-foreground">View your business performance and insights</p>
            </div>
            
            <div className="flex gap-3 mt-2 md:mt-0">
              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center gap-1">
                <Calendar className="h-4 w-4 mr-1" /> Custom Range
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-muted-foreground text-sm">Total Revenue</h3>
                  <p className="text-2xl font-bold">$89,344</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> 8.2% from previous period
                  </p>
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
                  <p className="text-2xl font-bold">512</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> 5.3% from previous period
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-muted-foreground text-sm">New Customers</h3>
                  <p className="text-2xl font-bold">189</p>
                  <p className="text-xs text-red-600 flex items-center">
                    <ArrowDown className="h-3 w-3 mr-1" /> 2.5% from previous period
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-muted-foreground text-sm">Avg. Order Value</h3>
                  <p className="text-2xl font-bold">$174.53</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> 12.7% from previous period
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Sales Overview Chart */}
            <Card className="lg:col-span-2 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Sales Overview</h3>
                <p className="text-sm text-muted-foreground">Monthly revenue and order history</p>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="sales"
                      name="Sales ($)"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="orders"
                      name="Orders"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            {/* Product Categories Chart */}
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Product Categories</h3>
                <p className="text-sm text-muted-foreground">Sales distribution by category</p>
              </div>
              
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {productCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          
          {/* Top Products */}
          <Card className="p-6 mb-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Top Products</h3>
              <p className="text-sm text-muted-foreground">Best-selling products by revenue</p>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topProducts}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" name="Revenue ($)" fill="#8884d8" />
                  <Bar dataKey="sales" name="Units Sold" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminAnalytics;
