import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { useSettingsStore } from "@/store/settingsStore";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/currency";

import { RatingStars } from "./RatingStars";

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const currency = useSettingsStore((state) => state.currency);
  const language = useSettingsStore((state) => state.language);

  return (
    <Pressable
      className="w-[48%] active:scale-[0.98] active:opacity-95 transition-all"
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Card className="gap-3 p-3">
        <View className="overflow-hidden rounded-[20px] bg-white py-3">
          <Image
            source={{ uri: product.image }}
            style={{ width: "100%", height: 130 }}
            contentFit="contain"
            transition={200}
          />
        </View>
        <View className="gap-2.5 px-1 pb-1">
          <Text numberOfLines={2} className="text-[14px] leading-5 font-bold text-[#2d241f]">
            {product.title}
          </Text>
          <RatingStars rate={product.rating.rate} count={product.rating.count} />
          <View className="flex-row items-center justify-between pt-1">
            <Text className="text-[17px] font-extrabold tracking-tight text-[#9a5b3d]">
              {formatCurrency(product.price, currency, language)}
            </Text>
            <View className="h-7 w-7 items-center justify-center rounded-full bg-[#efe1d2]">
              <Ionicons name="arrow-forward" size={14} color="#9a5b3d" />
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};
