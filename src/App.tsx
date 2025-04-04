
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import AuthPage from "@/pages/AuthPage";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminOrders from "@/pages/AdminOrders";
import AdminProducts from "@/pages/AdminProducts";
import AdminProductSettings from "@/pages/AdminProductSettings";
import AdminSettings from "@/pages/AdminSettings";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/product-settings" element={<AdminProductSettings />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Routes>
          <Toaster />
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

// Temporary Home component
function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-serif font-bold text-gold mb-6">ELEGANCE</h1>
        <p className="mb-8 text-muted-foreground">Luxury Jewelry Online Store</p>
        <div className="flex flex-col space-y-4">
          <a 
            href="/auth" 
            className="bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded transition"
          >
            Sign In
          </a>
          <a 
            href="/admin" 
            className="border border-gold text-gold hover:bg-gold/10 px-8 py-3 rounded transition"
          >
            Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
