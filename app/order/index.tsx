import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { useOrders } from "@/hooks/useOrders";
import { useSettingsStore } from "@/store/settingsStore";
import { formatCurrency } from "@/utils/currency";
import { ORDER_STATUS_LABELS } from "@/utils/orders";

export default function OrdersScreen() {
  const { t } = useTranslation(["profile", "common"]);
  const router = useRouter();
  const orders = useOrders().orders;
  const currency = useSettingsStore((state) => state.currency);
  const language = useSettingsStore((state) => state.language);

  return (
    <SafeAreaView className="flex-1 bg-[#f7f3ee]">
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Header
          eyebrow={t("common:orders")}
          title={t("profile:orders")}
          subtitle="Saved orders are persisted locally so the full shopping flow survives app restarts."
        />
        {orders.length ? (
          <View className="gap-3">
            {orders.map((order) => (
              <Card key={order.id} className="gap-3">
                <View className="flex-row items-start justify-between gap-3">
                  <View className="flex-1 gap-1">
                    <Text className="text-base font-bold text-[#2d241f]">{order.id}</Text>
                    <Text className="text-sm text-[#74655b]">
                      {new Intl.DateTimeFormat(language === "id" ? "id-ID" : language === "ar" ? "ar-SA" : "en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(order.createdAt))}
                    </Text>
                  </View>
                  <Badge label={ORDER_STATUS_LABELS[order.status]} tone="success" />
                </View>
                <Text className="text-sm leading-6 text-[#74655b]">
                  {order.itemCount} item(s) · {formatCurrency(order.total, currency, language)}
                </Text>
                <Button
                  label="View order"
                  variant="secondary"
                  onPress={() => router.push(`/order/${order.id}`)}
                />
              </Card>
            ))}
          </View>
        ) : (
          <EmptyState
            title={t("profile:orders")}
            description="Place your first order from checkout and it will appear here."
            actionLabel={t("common:goHome")}
            onAction={() => router.push("/(tabs)")}
            icon={<Ionicons name="receipt-outline" size={28} color="#9a5b3d" />}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
