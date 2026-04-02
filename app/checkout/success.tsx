import { useEffect } from "react";

import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { useOrders } from "@/hooks/useOrders";
import { useSettingsStore } from "@/store/settingsStore";
import { formatCurrency } from "@/utils/currency";

export default function SuccessScreen() {
  const { t } = useTranslation(["checkout", "common"]);
  const router = useRouter();
  const currency = useSettingsStore((state) => state.currency);
  const language = useSettingsStore((state) => state.language);
  const { lastCreatedOrderId, getOrderById, clearLastCreatedOrder } = useOrders();
  const order = lastCreatedOrderId ? getOrderById(lastCreatedOrderId) : undefined;

  useEffect(() => {
    return () => {
      clearLastCreatedOrder();
    };
  }, [clearLastCreatedOrder]);

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-[#f7f3ee]">
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <EmptyState
            title={t("successTitle")}
            description="There is no newly created order to preview right now."
            actionLabel={t("common:orders")}
            onAction={() => router.replace("/order")}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f7f3ee]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}>
        <Card className="items-center gap-5 py-10">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-[#d7eadc]">
            <Ionicons name="checkmark" size={40} color="#2f5c46" />
          </View>
          <Text className="text-3xl font-bold text-[#2d241f]">
            {t("successTitle")}
          </Text>
          <Text className="text-center text-sm leading-6 text-[#74655b]">
            {t("successMessage")}
          </Text>
          <Card className="w-full gap-3">
            <Text className="text-sm font-semibold text-[#4f3422]">{order.id}</Text>
            <Text className="text-sm text-[#74655b]">
              {order.itemCount} item(s) · {formatCurrency(order.total, currency, language)}
            </Text>
            <Text className="text-sm leading-6 text-[#74655b]">
              {order.shippingAddress.fullName}, {order.shippingAddress.city}
            </Text>
          </Card>
          <Button label={t("common:orders")} onPress={() => router.replace(`/order/${order.id}`)} />
          <Button label={t("common:goHome")} variant="secondary" onPress={() => router.replace("/(tabs)")} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
