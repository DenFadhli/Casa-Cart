import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartItem } from "@/types/cart";
import type {
  CheckoutDraft,
  Order,
  PaymentMethod,
  ShippingAddress,
} from "@/types/order";
import { buildOrderId, DEFAULT_PAYMENT_METHOD, DEFAULT_SHIPPING_ADDRESS } from "@/utils/orders";
import { STORAGE_KEYS } from "@/utils/storage";

interface PlaceOrderInput {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
}

interface OrderStore {
  orders: Order[];
  checkoutDraft: CheckoutDraft;
  lastCreatedOrderId: string | null;
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  placeOrder: (input: PlaceOrderInput) => Order;
  clearCheckoutDraft: () => void;
  clearLastCreatedOrder: () => void;
  getOrderById: (id: string) => Order | undefined;
}

const createDefaultDraft = (): CheckoutDraft => ({
  shippingAddress: { ...DEFAULT_SHIPPING_ADDRESS },
  paymentMethod: DEFAULT_PAYMENT_METHOD,
});

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      checkoutDraft: createDefaultDraft(),
      lastCreatedOrderId: null,
      setShippingAddress: (address) =>
        set((state) => ({
          checkoutDraft: {
            ...state.checkoutDraft,
            shippingAddress: address,
          },
        })),
      setPaymentMethod: (method) =>
        set((state) => ({
          checkoutDraft: {
            ...state.checkoutDraft,
            paymentMethod: method,
          },
        })),
      placeOrder: ({ items, subtotal, shippingFee }) => {
        const draft = get().checkoutDraft;
        const order: Order = {
          id: buildOrderId(),
          createdAt: new Date().toISOString(),
          status: "confirmed",
          items,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
          subtotal,
          shippingFee,
          paymentMethod: draft.paymentMethod,
          shippingAddress: draft.shippingAddress,
          total: subtotal + shippingFee,
        };

        set((state) => ({
          orders: [order, ...state.orders],
          lastCreatedOrderId: order.id,
          checkoutDraft: createDefaultDraft(),
        }));

        return order;
      },
      clearCheckoutDraft: () =>
        set({
          checkoutDraft: createDefaultDraft(),
        }),
      clearLastCreatedOrder: () =>
        set({
          lastCreatedOrderId: null,
        }),
      getOrderById: (id) => get().orders.find((order) => order.id === id),
    }),
    {
      name: STORAGE_KEYS.orders,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
