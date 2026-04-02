import type { CartItem } from "@/types/cart";

export type OrderStatus = "processing" | "confirmed" | "delivered";
export type PaymentMethod = "cod" | "transfer" | "card";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface CheckoutDraft {
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
  total: number;
}
