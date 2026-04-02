import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistScreen() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const items = useWishlistStore((state) => state.items);

  return (
    <SafeAreaView className="flex-1 bg-[#f7f3ee]">
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Header
          eyebrow={t("wishlist")}
          title={t("wishlist")}
          subtitle="Persisted locally with Zustand so later feature slices can build on it."
        />

        {items.length ? (
          <ProductGrid products={items} />
        ) : (
          <EmptyState
            title={t("wishlist")}
            description="Products you save from the detail screen will show up here."
            actionLabel={t("exploreCatalog")}
            onAction={() => router.push("/(tabs)/explore")}
            icon={<Ionicons name="heart-outline" size={28} color="#9a5b3d" />}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
