import { Image } from "expo-image";
import { Text, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useSettingsStore } from "@/store/settingsStore";
import type { CartItem as CartItemType } from "@/types/cart";
import { formatCurrency } from "@/utils/currency";

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  const currency = useSettingsStore((state) => state.currency);
  const language = useSettingsStore((state) => state.language);

  return (
    <Card className="flex-row gap-3 p-3">
      <View className="overflow-hidden rounded-2xl bg-[#f3ebe1]">
        <Image
          source={{ uri: item.product.image }}
          style={{ width: 84, height: 84 }}
          contentFit="contain"
        />
      </View>
      <View className="flex-1 gap-2">
        <Text className="text-sm font-semibold text-[#2d241f]">
          {item.product.title}
        </Text>
        <Text className="text-base font-bold text-[#9a5b3d]">
          {formatCurrency(item.product.price, currency, language)}
        </Text>
        <View className="flex-row gap-2">
          <Button label="−" variant="secondary" onPress={onDecrease} className="w-12" />
          <View className="min-h-12 min-w-12 items-center justify-center rounded-2xl border border-[#e7d7c7] bg-[#fffdf9] px-3">
            <Text className="text-base font-semibold text-[#2d241f]">
              {item.quantity}
            </Text>
          </View>
          <Button label="+" variant="secondary" onPress={onIncrease} className="w-12" />
          <Button label="Remove" variant="ghost" onPress={onRemove} className="ml-auto" />
        </View>
      </View>
    </Card>
  );
};
