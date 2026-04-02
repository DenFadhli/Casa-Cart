import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View } from "react-native";

import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCategories, useProducts } from "@/hooks/useProducts";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

export default function HomeScreen() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const totalItems = useCartStore((state) => state.totalItems());
  const { data: products, isLoading, isError, refetch } = useProducts(6);
  const { data: categories } = useCategories();

  return (
    <SafeAreaView className="flex-1 bg-[#f7f3ee]">
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40, gap: 32 }}>
        <Header
          eyebrow={t("demoMode")}
          title={t("appName")}
          subtitle={user ? `${t("shopNow")}, ${user.fullName}.` : t("tagline")}
          rightSlot={
            <Button
              label={`${t("cart")} (${totalItems})`}
              variant="secondary"
              onPress={() => router.push("/cart")}
            />
          }
        />

        <Card className="gap-3 bg-[#efe1d2] border-0">
          <Text className="text-[26px] font-extrabold tracking-tight text-[#4f3422]">
            {t("featured")}
          </Text>
          <Text className="text-[15px] leading-6 text-[#6f5c4e]">
            Foundation scaffolding is live with real products, typed stores, and localized routes.
          </Text>
          <Button className="mt-2" label={t("exploreCatalog")} onPress={() => router.push("/(tabs)/explore")} />
        </Card>

        <View className="gap-4">
          <Text className="text-[20px] font-extrabold text-[#2d241f]">{t("categories")}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {(categories ?? []).map((category) => (
                <Pressable
                  key={category}
                  onPress={() =>
                    router.push(
                      `/(tabs)/explore?category=${encodeURIComponent(category)}`,
                    )
                  }
                  className="rounded-full border border-transparent bg-white px-5 py-3 active:scale-95 transition-transform"
                >
                  <Text className="text-[15px] font-bold capitalize text-[#4f3422]">
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="gap-4">
          <Text className="text-[20px] font-extrabold text-[#2d241f]">{t("featured")}</Text>
          {isLoading ? (
            <View className="flex-row flex-wrap justify-between gap-y-4">
              <Skeleton className="h-64 w-[48%]" />
              <Skeleton className="h-64 w-[48%]" />
              <Skeleton className="h-64 w-[48%]" />
              <Skeleton className="h-64 w-[48%]" />
            </View>
          ) : isError ? (
            <Card className="gap-3">
              <Text className="text-sm leading-6 text-[#74655b]">
                FakeStoreAPI is unavailable right now.
              </Text>
              <Button label={t("retry")} onPress={() => void refetch()} />
            </Card>
          ) : (
            <ProductGrid products={products ?? []} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
