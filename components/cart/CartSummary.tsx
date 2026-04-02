import { Text, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { useSettingsStore } from "@/store/settingsStore";
import { formatCurrency } from "@/utils/currency";

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
}

export const CartSummary = ({
  subtotal,
  shipping = subtotal > 0 ? 8 : 0,
}: CartSummaryProps) => {
  const currency = useSettingsStore((state) => state.currency);
  const language = useSettingsStore((state) => state.language);
  const total = subtotal + shipping;

  return (
    <Card className="gap-3">
      <Text className="text-lg font-bold text-[#2d241f]">Summary</Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-[#74655b]">Subtotal</Text>
        <Text className="text-sm font-semibold text-[#2d241f]">
          {formatCurrency(subtotal, currency, language)}
        </Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-[#74655b]">Shipping</Text>
        <Text className="text-sm font-semibold text-[#2d241f]">
          {formatCurrency(shipping, currency, language)}
        </Text>
      </View>
      <View className="h-px bg-[#e7d7c7]" />
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-semibold text-[#2d241f]">Total</Text>
        <Text className="text-lg font-bold text-[#9a5b3d]">
          {formatCurrency(total, currency, language)}
        </Text>
      </View>
    </Card>
  );
};
