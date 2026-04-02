import type {
  OrderStatus,
  PaymentMethod,
  ShippingAddress,
} from "@/types/order";

export const DEFAULT_SHIPPING_ADDRESS: ShippingAddress = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

export const DEFAULT_PAYMENT_METHOD: PaymentMethod = "cod";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  processing: "Processing",
  confirmed: "Confirmed",
  delivered: "Delivered",
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cod: "Cash on Delivery",
  transfer: "Bank Transfer",
  card: "Credit / Debit Card",
};

export const buildOrderId = () => {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0",
  )}${String(now.getDate()).padStart(2, "0")}`;
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `ORD-${stamp}-${suffix}`;
};
