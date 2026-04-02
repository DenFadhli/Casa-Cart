import { useMemo, useState } from "react";

import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { useOrders } from "@/hooks/useOrders";
import { useCartStore } from "@/store/cartStore";
import { useSettingsStore } from "@/store/settingsStore";
import type { PaymentMethod } from "@/types/order";
import { formatCurrency } from "@/utils/currency";
import { PAYMENT_METHOD_LABELS } from "@/utils/orders";

const methods = [
  { id: "cod", label: "Cash on Delivery", detail: "Pay when your order arrives." },
  { id: "transfer", label: "Bank Transfer", detail: "Keep a simple manual payment path ready." },
  { id: "card", label: "Card", detail: "Simulated card confirmation for the demo flow." },
];

export default function PaymentScreen() {
  const { t } = useTranslation(["checkout", "common"]);
  const router = useRouter();
  const subtotal = useCartStore((state) => state.totalPrice());
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const currency = useSettingsStore((state) => state.currency);
  const language = useSettingsStore((state) => state.language);
  const { checkoutDraft, setPaymentMethod, placeOrder } = useOrders();
  const [submitting, setSubmitting] = useState(false);
  const shippingFee = useMemo(() => (cartItems.length ? 8 : 0), [cartItems.length]);

  if (!cartItems.length) {
    return (
      <SafeAreaView className="flex-1 bg-[#f7f3ee]">
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <EmptyState
            title={t("paymentTitle")}
            description="There is no active cart to pay for yet."
            actionLabel={t("common:viewCart")}
            onAction={() => router.replace("/cart")}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!checkoutDraft.shippingAddress.fullName || !checkoutDraft.shippingAddress.address) {
    return (
      <SafeAreaView className="flex-1 bg-[#f7f3ee]">
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <EmptyState
            title={t("paymentTitle")}
            description="Complete the shipping form before choosing a payment method."
            actionLabel={t("shippingTitle")}
            onAction={() => router.replace("/checkout")}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f7f3ee]">
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Header
          eyebrow={t("common:payment")}
          title={t("paymentTitle")}
          subtitle="Choose a payment method, review the shipping draft, and place the order."
        />
        <Card className="gap-3">
          <Text className="text-sm font-semibold text-[#4f3422]">Deliver to</Text>
          <Text className="text-base font-semibold text-[#2d241f]">
            {checkoutDraft.shippingAddress.fullName}
          </Text>
          <Text className="text-sm leading-6 text-[#74655b]">
            {checkoutDraft.shippingAddress.address}, {checkoutDraft.shippingAddress.city}{" "}
            {checkoutDraft.shippingAddress.postalCode}
          </Text>
          <Text className="text-sm text-[#74655b]">{checkoutDraft.shippingAddress.phone}</Text>
        </Card>
        <View className="gap-3">
          {methods.map((method) => {
            const selected = checkoutDraft.paymentMethod === method.id;

            return (
              <Card key={method.id} className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-[#2d241f]">{method.label}</Text>
                  {selected ? <Badge label="Selected" tone="success" /> : null}
                </View>
                <Text className="text-sm leading-6 text-[#74655b]">{method.detail}</Text>
                <Button
                  label={selected ? "Selected" : "Choose method"}
                  variant={selected ? "primary" : "secondary"}
                  onPress={() => setPaymentMethod(method.id as PaymentMethod)}
                />
              </Card>
            );
          })}
        </View>
        <Card className="gap-3">
          <Text className="text-lg font-bold text-[#2d241f]">Order review</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-[#74655b]">Items</Text>
            <Text className="text-sm font-semibold text-[#2d241f]">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-[#74655b]">Payment</Text>
            <Text className="text-sm font-semibold text-[#2d241f]">
              {PAYMENT_METHOD_LABELS[checkoutDraft.paymentMethod]}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-[#74655b]">Subtotal</Text>
            <Text className="text-sm font-semibold text-[#2d241f]">
              {formatCurrency(subtotal, currency, language)}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-[#74655b]">Shipping</Text>
            <Text className="text-sm font-semibold text-[#2d241f]">
              {formatCurrency(shippingFee, currency, language)}
            </Text>
          </View>
        </Card>
        <Button
          label="Place order"
          loading={submitting}
          onPress={() => {
            setSubmitting(true);
            const order = placeOrder({
              items: cartItems,
              subtotal,
              shippingFee,
            });
            clearCart();
            void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Toast.show({
              type: "success",
              text1: t("successTitle"),
              text2: `${order.id} created successfully.`,
            });
            router.replace("/checkout/success");
            setSubmitting(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
