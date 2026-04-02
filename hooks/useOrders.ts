import { useOrderStore } from "@/store/orderStore";

export const useOrders = () => {
  const orders = useOrderStore((state) => state.orders);
  const checkoutDraft = useOrderStore((state) => state.checkoutDraft);
  const lastCreatedOrderId = useOrderStore((state) => state.lastCreatedOrderId);
  const setShippingAddress = useOrderStore((state) => state.setShippingAddress);
  const setPaymentMethod = useOrderStore((state) => state.setPaymentMethod);
  const placeOrder = useOrderStore((state) => state.placeOrder);
  const clearCheckoutDraft = useOrderStore((state) => state.clearCheckoutDraft);
  const clearLastCreatedOrder = useOrderStore((state) => state.clearLastCreatedOrder);
  const getOrderById = useOrderStore((state) => state.getOrderById);

  return {
    orders,
    checkoutDraft,
    lastCreatedOrderId,
    setShippingAddress,
    setPaymentMethod,
    placeOrder,
    clearCheckoutDraft,
    clearLastCreatedOrder,
    getOrderById,
  };
};
