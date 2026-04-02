import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";

import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { useOrders } from "@/hooks/useOrders";
import { useSettingsStore } from "@/store/settingsStore";
import { formatCurrency } from "@/utils/currency";
import { ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from "@/utils/orders";

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getOrderById } = useOrders();
  const currency = useSettingsStore((state) => state.currency);
  const language = useSettingsStore((state) => state.language);
  const order = id ? getOrderById(id) : undefined;

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-[#f7f3ee]">
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <EmptyState
            title="Order not found"
            description="We couldn't find that saved order in local storage."
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f7f3ee]">
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Header
          eyebrow="Order detail"
          title={order.id}
          subtitle={new Intl.DateTimeFormat(
            language === "id" ? "id-ID" : language === "ar" ? "ar-SA" : "en-US",
            { dateStyle: "medium", timeStyle: "short" },
          ).format(new Date(order.createdAt))}
        />
        <Card className="gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-semibold text-[#2d241f]">Status</Text>
            <Badge label={ORDER_STATUS_LABELS[order.status]} tone="success" />
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-[#74655b]">Payment</Text>
            <Text className="text-sm font-semibold text-[#2d241f]">
              {PAYMENT_METHOD_LABELS[order.paymentMethod]}
            </Text>
          </View>
        </Card>
        <Card className="gap-3">
          <Text className="text-base font-semibold text-[#2d241f]">Shipping address</Text>
          <Text className="text-sm text-[#2d241f]">{order.shippingAddress.fullName}</Text>
          <Text className="text-sm leading-6 text-[#74655b]">
            {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}
          </Text>
          <Text className="text-sm text-[#74655b]">{order.shippingAddress.phone}</Text>
        </Card>
        <Card className="gap-3">
          <Text className="text-base font-semibold text-[#2d241f]">Items</Text>
          {order.items.map((item) => (
            <View key={item.product.id} className="flex-row items-center justify-between gap-4">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-[#2d241f]">
                  {item.product.title}
                </Text>
                <Text className="text-sm text-[#74655b]">Qty {item.quantity}</Text>
              </View>
              <Text className="text-sm font-semibold text-[#2d241f]">
                {formatCurrency(item.product.price * item.quantity, currency, language)}
              </Text>
            </View>
          ))}
        </Card>
        <Card className="gap-3">
          <Text className="text-base font-semibold text-[#2d241f]">Summary</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-[#74655b]">Subtotal</Text>
            <Text className="text-sm font-semibold text-[#2d241f]">
              {formatCurrency(order.subtotal, currency, language)}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-[#74655b]">Shipping</Text>
            <Text className="text-sm font-semibold text-[#2d241f]">
              {formatCurrency(order.shippingFee, currency, language)}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-[#74655b]">Total</Text>
            <Text className="text-base font-bold text-[#9a5b3d]">
              {formatCurrency(order.total, currency, language)}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
