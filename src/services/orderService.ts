
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

export const fetchAllOrders = async (filters?: Record<string, any>) => {
  try {
    let query = supabase.from("orders").select(`
      *,
      order_items(*)
    `);

    // Apply filters if provided
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      }
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};
