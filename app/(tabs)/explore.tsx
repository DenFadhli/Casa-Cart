import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";

import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/layout/SearchBar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCategories, useProducts } from "@/hooks/useProducts";

export default function ExploreScreen() {
  const { t } = useTranslation(["common", "product"]);
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const incomingCategory = Array.isArray(params.category)
    ? params.category[0] ?? null
    : params.category ?? null;
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    incomingCategory,
  );
  const deferredSearch = useDeferredValue(search);
  const { data: products = [], isLoading, isError, refetch } = useProducts();
  const { data: categories = [] } = useCategories();

  useEffect(() => {
    setSelectedCategory(incomingCategory);
  }, [incomingCategory]);

  const filteredProducts = useMemo(() => {
    const normalized = deferredSearch.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalized ||
        product.title.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized);
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [deferredSearch, products, selectedCategory]);

  return (
    <SafeAreaView className="flex-1 bg-[#f7f3ee]">
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40, gap: 24 }}>
        <Header
          eyebrow={t("common:explore")}
          title={t("common:exploreCatalog")}
          subtitle={t("common:tagline")}
          rightSlot={<Button label={t("common:viewCart")} variant="secondary" onPress={() => router.push("/cart")} />}
        />

        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search products"
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            <Button
              label="All"
              variant={!selectedCategory ? "primary" : "secondary"}
              onPress={() => setSelectedCategory(null)}
            />
            {categories.map((category) => (
              <Button
                key={category}
                label={category}
                variant={selectedCategory === category ? "primary" : "secondary"}
                onPress={() => setSelectedCategory(category)}
              />
            ))}
          </View>
        </ScrollView>

        {isLoading ? (
          <Card>
            <Text className="text-sm text-[#74655b]">{t("common:loading")}</Text>
          </Card>
        ) : isError ? (
          <Card className="gap-3">
            <Text className="text-sm leading-6 text-[#74655b]">
              We could not load the product catalog.
            </Text>
            <Button label={t("common:retry")} onPress={() => void refetch()} />
          </Card>
        ) : (
          <View className="gap-3">
            <Text className="text-sm text-[#74655b]">
              {filteredProducts.length} products
            </Text>
            <ProductGrid products={filteredProducts} />
            {!filteredProducts.length ? (
              <Card>
                <Text className="text-sm leading-6 text-[#74655b]">
                  {t("product:noProducts")}
                </Text>
              </Card>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
