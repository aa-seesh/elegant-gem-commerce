
import React from "react";
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
  Globe,
  CreditCard,
  Mail,
  Bell,
  Lock,
  User,
  Save,
  Store,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  
  // Handle save settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    });
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
          <Link to="/admin/discounts" className="hover:bg-muted p-3 rounded-md flex items-center">
            <Tag className="mr-3 h-5 w-5" />
            Discounts
          </Link>
          <Link to="/admin/analytics" className="hover:bg-muted p-3 rounded-md flex items-center">
            <BarChart2 className="mr-3 h-5 w-5" />
            Analytics
          </Link>
          <Link to="/admin/settings" className="bg-gold/10 text-gold p-3 rounded-md flex items-center">
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
              placeholder="Search settings..."
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
            <h1 className="text-2xl font-serif font-semibold mb-1">Settings</h1>
            <p className="text-muted-foreground">Configure your store settings</p>
          </div>
          
          <Tabs defaultValue="general" className="mb-6">
            <TabsList className="mb-6 w-full max-w-xl">
              <TabsTrigger value="general" className="flex-1">
                <Store className="h-4 w-4 mr-2" /> General
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex-1">
                <CreditCard className="h-4 w-4 mr-2" /> Payment
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">
                <Truck className="h-4 w-4 mr-2" /> Shipping
              </TabsTrigger>
              <TabsTrigger value="email" className="flex-1">
                <Mail className="h-4 w-4 mr-2" /> Email
              </TabsTrigger>
              <TabsTrigger value="account" className="flex-1">
                <User className="h-4 w-4 mr-2" /> Account
              </TabsTrigger>
            </TabsList>
            
            {/* General Settings */}
            <TabsContent value="general">
              <Card className="p-6">
                <form onSubmit={handleSaveSettings}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Store Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="storeName" className="text-sm font-medium">
                            Store Name
                          </label>
                          <Input id="storeName" defaultValue="Elegance Jewelry" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Contact Email
                          </label>
                          <Input id="email" type="email" defaultValue="contact@elegance.com" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Phone Number
                          </label>
                          <Input id="phone" defaultValue="+1 (555) 123-4567" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="currency" className="text-sm font-medium">
                            Currency
                          </label>
                          <Select defaultValue="usd">
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="usd">USD ($)</SelectItem>
                              <SelectItem value="eur">EUR (€)</SelectItem>
                              <SelectItem value="gbp">GBP (£)</SelectItem>
                              <SelectItem value="cad">CAD ($)</SelectItem>
                              <SelectItem value="aud">AUD ($)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Store Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="address" className="text-sm font-medium">
                            Address Line 1
                          </label>
                          <Input id="address" defaultValue="123 Elegance Avenue" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="address2" className="text-sm font-medium">
                            Address Line 2
                          </label>
                          <Input id="address2" defaultValue="Suite 100" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="city" className="text-sm font-medium">
                            City
                          </label>
                          <Input id="city" defaultValue="New York" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="state" className="text-sm font-medium">
                            State / Province
                          </label>
                          <Input id="state" defaultValue="NY" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="zip" className="text-sm font-medium">
                            ZIP / Postal Code
                          </label>
                          <Input id="zip" defaultValue="10001" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="country" className="text-sm font-medium">
                            Country
                          </label>
                          <Select defaultValue="us">
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Regional Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="language" className="text-sm font-medium">
                            Default Language
                          </label>
                          <Select defaultValue="en">
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                              <SelectItem value="it">Italian</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="timezone" className="text-sm font-medium">
                            Timezone
                          </label>
                          <Select defaultValue="est">
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="est">Eastern Time (ET)</SelectItem>
                              <SelectItem value="cst">Central Time (CT)</SelectItem>
                              <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                              <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                              <SelectItem value="utc">Universal Time (UTC)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Enable Multiple Languages</h4>
                            <p className="text-sm text-muted-foreground">
                              Allow customers to use the store in different languages
                            </p>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable multiple languages" />
                        </div>
                        <div className="space-y-2 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Enable Multiple Currencies</h4>
                            <p className="text-sm text-muted-foreground">
                              Allow customers to shop in their local currency
                            </p>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable multiple currencies" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-gold hover:bg-gold-dark">
                        <Save className="mr-2 h-4 w-4" /> Save Settings
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            </TabsContent>
            
            {/* Payment Settings */}
            <TabsContent value="payment">
              <Card className="p-6">
                <form onSubmit={handleSaveSettings}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Payment Providers</h3>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <CreditCard className="h-6 w-6 mr-4" />
                            <div>
                              <h4 className="font-medium">Credit Card</h4>
                              <p className="text-sm text-muted-foreground">Accept credit card payments</p>
                            </div>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable credit card payments" />
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="h-6 w-6 mr-4 flex items-center justify-center font-bold text-blue-600">P</div>
                            <div>
                              <h4 className="font-medium">PayPal</h4>
                              <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                            </div>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable PayPal payments" />
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="h-6 w-6 mr-4 flex items-center justify-center font-bold">A</div>
                            <div>
                              <h4 className="font-medium">Apple Pay</h4>
                              <p className="text-sm text-muted-foreground">Accept Apple Pay</p>
                            </div>
                          </div>
                          <Switch defaultChecked={false} aria-label="Enable Apple Pay" />
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <Truck className="h-6 w-6 mr-4" />
                            <div>
                              <h4 className="font-medium">Cash on Delivery</h4>
                              <p className="text-sm text-muted-foreground">Accept cash payments upon delivery</p>
                            </div>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable cash on delivery" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Tax Settings</h3>
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Enable Tax Calculation</h4>
                            <p className="text-sm text-muted-foreground">
                              Automatically calculate taxes based on location
                            </p>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable tax calculation" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="taxRate" className="text-sm font-medium">
                            Default Tax Rate (%)
                          </label>
                          <Input id="taxRate" defaultValue="7.5" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-gold hover:bg-gold-dark">
                        <Save className="mr-2 h-4 w-4" /> Save Settings
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            </TabsContent>
            
            {/* Shipping Settings */}
            <TabsContent value="shipping">
              <Card className="p-6">
                <form onSubmit={handleSaveSettings}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Shipping Methods</h3>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Standard Shipping</h4>
                            <p className="text-sm text-muted-foreground">5-7 business days</p>
                          </div>
                          <div className="flex gap-4 items-center">
                            <Input 
                              className="w-24"
                              defaultValue="5.99"
                              placeholder="Rate"
                            />
                            <Switch defaultChecked={true} aria-label="Enable standard shipping" />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Express Shipping</h4>
                            <p className="text-sm text-muted-foreground">2-3 business days</p>
                          </div>
                          <div className="flex gap-4 items-center">
                            <Input 
                              className="w-24"
                              defaultValue="12.99"
                              placeholder="Rate"
                            />
                            <Switch defaultChecked={true} aria-label="Enable express shipping" />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Next-Day Shipping</h4>
                            <p className="text-sm text-muted-foreground">Delivered next business day</p>
                          </div>
                          <div className="flex gap-4 items-center">
                            <Input 
                              className="w-24"
                              defaultValue="24.99"
                              placeholder="Rate"
                            />
                            <Switch defaultChecked={false} aria-label="Enable next-day shipping" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Free Shipping</h3>
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Enable Free Shipping</h4>
                            <p className="text-sm text-muted-foreground">
                              Offer free shipping based on order value
                            </p>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable free shipping" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="freeShippingThreshold" className="text-sm font-medium">
                            Minimum Order Value for Free Shipping ($)
                          </label>
                          <Input id="freeShippingThreshold" defaultValue="75" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-gold hover:bg-gold-dark">
                        <Save className="mr-2 h-4 w-4" /> Save Settings
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            </TabsContent>
            
            {/* Email Settings */}
            <TabsContent value="email">
              <Card className="p-6">
                <form onSubmit={handleSaveSettings}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Email Provider</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="emailProvider" className="text-sm font-medium">
                            Email Service Provider
                          </label>
                          <Select defaultValue="smtp">
                            <SelectTrigger>
                              <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="smtp">SMTP</SelectItem>
                              <SelectItem value="mailchimp">Mailchimp</SelectItem>
                              <SelectItem value="sendgrid">SendGrid</SelectItem>
                              <SelectItem value="awsses">AWS SES</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="fromEmail" className="text-sm font-medium">
                            From Email Address
                          </label>
                          <Input id="fromEmail" defaultValue="notifications@elegance.com" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Email Templates</h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label htmlFor="orderConfirmation" className="text-sm font-medium">
                            Order Confirmation Email
                          </label>
                          <Textarea
                            id="orderConfirmation"
                            rows={5}
                            defaultValue="Thank you for your order from Elegance Jewelry! Your order {{order_number}} has been received and is being processed. We'll send you another email when your order ships."
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="shippingConfirmation" className="text-sm font-medium">
                            Shipping Confirmation Email
                          </label>
                          <Textarea
                            id="shippingConfirmation"
                            rows={5}
                            defaultValue="Good news! Your order {{order_number}} has shipped and is on its way to you. You can track your order with the following tracking number: {{tracking_number}}."
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Order Confirmations</h4>
                            <p className="text-sm text-muted-foreground">
                              Send confirmation emails for new orders
                            </p>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable order confirmation emails" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Shipping Confirmations</h4>
                            <p className="text-sm text-muted-foreground">
                              Send notifications when orders ship
                            </p>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable shipping confirmation emails" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Abandoned Cart Emails</h4>
                            <p className="text-sm text-muted-foreground">
                              Send reminders for abandoned shopping carts
                            </p>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable abandoned cart emails" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Marketing Emails</h4>
                            <p className="text-sm text-muted-foreground">
                              Send promotional emails to customers
                            </p>
                          </div>
                          <Switch defaultChecked={false} aria-label="Enable marketing emails" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-gold hover:bg-gold-dark">
                        <Save className="mr-2 h-4 w-4" /> Save Settings
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            </TabsContent>
            
            {/* Account Settings */}
            <TabsContent value="account">
              <Card className="p-6">
                <form onSubmit={handleSaveSettings}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Admin Account</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="adminName" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="adminName" defaultValue="Admin User" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="adminEmail" className="text-sm font-medium">
                            Email
                          </label>
                          <Input id="adminEmail" type="email" defaultValue="admin@elegance.com" />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <label htmlFor="currentPassword" className="text-sm font-medium">
                            Current Password
                          </label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="newPassword" className="text-sm font-medium">
                            New Password
                          </label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm New Password
                          </label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Security Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch defaultChecked={false} aria-label="Enable two-factor authentication" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Session Timeout</h4>
                            <p className="text-sm text-muted-foreground">
                              Automatically log out after inactivity
                            </p>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable session timeout" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">New Order Notifications</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications for new orders
                            </p>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable new order notifications" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Customer Messages</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications for customer messages
                            </p>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable customer message notifications" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Low Stock Alerts</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications when products are low in stock
                            </p>
                          </div>
                          <Switch defaultChecked={true} aria-label="Enable low stock alerts" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-gold hover:bg-gold-dark">
                        <Save className="mr-2 h-4 w-4" /> Save Settings
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
