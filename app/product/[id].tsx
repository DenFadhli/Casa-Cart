import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

import { Header } from "@/components/layout/Header";
import { RatingStars } from "@/components/product/RatingStars";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cartStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatCurrency } from "@/utils/currency";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation(["product"]);
  const numericId = Number(id);
  const { data: product, isLoading } = useProduct(Number.isFinite(numericId) ? numericId : null);
  const addItem = useCartStore((state) => state.addItem);
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const contains = useWishlistStore((state) => state.contains);
  const currency = useSettingsStore((state) => state.currency);
  const language = useSettingsStore((state) => state.language);
  const [quantity, setQuantity] = useState(1);

  if (isLoading || !product) {
    return (
      <SafeAreaView className="flex-1 bg-[#f7f3ee]">
        <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const inWishlist = contains(product.id);

  return (
    <SafeAreaView className="flex-1 bg-[#f7f3ee]">
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Header eyebrow={product.category} title={product.title} />

        <Card className="items-center bg-[#f3ebe1]">
          <Image
            source={{ uri: product.image }}
            style={{ width: "100%", height: 280 }}
            contentFit="contain"
          />
        </Card>

        <Card className="gap-4">
          <Text className="text-3xl font-bold text-[#9a5b3d]">
            {formatCurrency(product.price, currency, language)}
          </Text>
          <RatingStars rate={product.rating.rate} count={product.rating.count} />
          <View className="gap-2">
            <Text className="text-sm font-semibold text-[#4f3422]">
              {t("description")}
            </Text>
            <Text className="text-sm leading-6 text-[#74655b]">
              {product.description}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Button label="−" variant="secondary" onPress={() => setQuantity((value) => Math.max(1, value - 1))} className="w-12" />
            <View className="min-h-12 min-w-12 items-center justify-center rounded-2xl border border-[#e7d7c7] bg-[#fffdf9] px-4">
              <Text className="text-base font-semibold text-[#2d241f]">{quantity}</Text>
            </View>
            <Button label="+" variant="secondary" onPress={() => setQuantity((value) => value + 1)} className="w-12" />
          </View>
          <Button
            label={t("addToCart")}
            onPress={() => {
              addItem(product, quantity);
              void Haptics.selectionAsync();
              Toast.show({ type: "success", text1: t("addToCart"), text2: product.title });
            }}
          />
          <Button
            label={inWishlist ? "Remove from wishlist" : t("wishlist")}
            variant="secondary"
            onPress={() => {
              toggleItem(product);
              Toast.show({
                type: "success",
                text1: t("wishlist"),
                text2: inWishlist ? "Removed from saved items." : "Saved for later.",
              });
            }}
            icon={<Ionicons name={inWishlist ? "heart" : "heart-outline"} size={18} color="#9a5b3d" />}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
