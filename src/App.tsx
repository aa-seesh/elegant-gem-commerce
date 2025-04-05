
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import AuthPage from "@/pages/AuthPage";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminOrders from "@/pages/AdminOrders";
import AdminProducts from "@/pages/AdminProducts";
import AdminProductSettings from "@/pages/AdminProductSettings";
import AdminSettings from "@/pages/AdminSettings";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import CollectionsPage from "@/pages/CollectionsPage";
import AuthCallback from "@/pages/AuthCallback";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/product-settings" element={<AdminProductSettings />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
