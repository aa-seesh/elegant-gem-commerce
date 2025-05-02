
import React from "react";
import { ShoppingBag, X, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";

const CartDrawer = () => {
  const { cartItems, cartTotal, cartCount, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // For now just close the drawer and redirect - we'll implement checkout later
    navigate('/checkout');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:text-gold relative">
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-ruby text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl font-serif flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" /> Your Cart
            <span className="ml-2 text-sm font-normal">({cartCount} items)</span>
          </SheetTitle>
          <SheetDescription>
            Review your items before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-grow overflow-auto py-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <SheetClose asChild>
                <Button onClick={() => navigate('/shop')}>
                  Browse Products
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex border-b border-border pb-5 last:border-0">
                  <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-muted-foreground hover:text-destructive p-1 rounded-full" 
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-gold mt-1">{formatCurrency(item.price)}</div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="flex-col mt-4">
            <div className="space-y-2 mb-4 w-full">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border font-medium">
                <span>Total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 w-full">
              <SheetClose asChild>
                <Button className="bg-gold hover:bg-gold/90 w-full" onClick={handleCheckout}>
                  Checkout
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
