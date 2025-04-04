
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface OrderInput {
  user_id: string;
  total: number;
  shipping_address: Json;
  billing_address: Json;
  payment_method: string;
  status?: string;
}

export interface OrderItemInput {
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}

export const createOrder = async (orderData: OrderInput, orderItems: Omit<OrderItemInput, "order_id">[]) => {
  try {
    // Start with creating the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert(orderData as any)
      .select()
      .single();
    
    if (orderError) throw orderError;
    
    // Add order items with the created order ID
    const itemsWithOrderId = orderItems.map(item => ({
      ...item,
      order_id: order.id
    }));
    
    const { data: itemsData, error: itemsError } = await supabase
      .from("order_items")
      .insert(itemsWithOrderId as any)
      .select();
    
    if (itemsError) throw itemsError;
    
    return { order, items: itemsData };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const fetchUserOrders = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items(*)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

export const fetchOrderById = async (orderId: string) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items(*)
      `)
      .eq("id", orderId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// Using a simpler query structure to avoid deep type instantiation
export const fetchAllOrders = async (filters?: Record<string, any>) => {
  try {
    // First select from orders to get a proper query builder
    let query = supabase
      .from("orders")
      .select('*');
    
    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }

    // Order by created_at
    query = query.order("created_at", { ascending: false });
    
    // Get the orders first
    const { data: ordersData, error: ordersError } = await query;
    
    if (ordersError) throw ordersError;
    
    // If we have orders, get their items separately
    if (ordersData && ordersData.length > 0) {
      const orderIds = ordersData.map(order => order.id);
      
      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select('*')
        .in('order_id', orderIds);
      
      if (itemsError) throw itemsError;
      
      // Merge the order items into their respective orders
      const ordersWithItems = ordersData.map(order => ({
        ...order,
        order_items: itemsData?.filter(item => item.order_id === order.id) || []
      }));
      
      return ordersWithItems;
    }
    
    return ordersData || [];
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};
