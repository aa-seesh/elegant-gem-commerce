
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Tags, 
  BarChart3,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';

const menuItems = [
  {
    path: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    path: '/admin/products',
    label: 'Products',
    icon: Package,
    submenu: [
      {
        path: '/admin/product-settings',
        label: 'Product Settings',
        icon: ChevronRight
      }
    ]
  },
  {
    path: '/admin/orders',
    label: 'Orders',
    icon: ShoppingBag
  },
  {
    path: '/admin/customers',
    label: 'Customers',
    icon: Users
  },
  {
    path: '/admin/discounts',
    label: 'Discounts',
    icon: Tags
  },
  {
    path: '/admin/analytics',
    label: 'Analytics',
    icon: BarChart3
  },
  {
    path: '/admin/settings',
    label: 'Settings',
    icon: Settings
  }
];

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar variant="sidebar" side="left">
          <SidebarHeader className="bg-gold/5 border-b border-gold/10 p-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gold rounded-md w-8 h-8 flex items-center justify-center">
                <span className="font-serif font-bold text-white">E</span>
              </div>
              <span className="font-serif font-bold text-xl">ELEGANCE</span>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="px-2 py-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <React.Fragment key={item.path}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      isActive={currentPath === item.path}
                    >
                      <Link 
                        to={item.path} 
                        className="group hover:bg-gold/10"
                      >
                        <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-gold" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {item.submenu && currentPath.includes(item.path.substring(0, item.path.lastIndexOf('/'))) && (
                    <div className="ml-6 border-l border-gold/20 pl-2 my-1">
                      {item.submenu.map((subItem) => (
                        <SidebarMenuItem key={subItem.path}>
                          <SidebarMenuButton
                            asChild
                            size="sm"
                            isActive={currentPath === subItem.path}
                          >
                            <Link 
                              to={subItem.path} 
                              className="text-muted-foreground hover:text-gold"
                            >
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-gold/10 p-4">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1">
          <header className="border-b border-gold/10 bg-background/95 backdrop-blur sticky top-0 z-10">
            <div className="flex h-16 items-center px-6">
              <SidebarTrigger />
              <div className="ml-auto flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="font-medium text-sm">JD</span>
                  </div>
                  <span className="text-sm font-medium">John Doe</span>
                </div>
              </div>
            </div>
          </header>
          
          <main>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
