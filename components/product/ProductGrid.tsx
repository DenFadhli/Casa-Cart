import { Text, View } from "react-native";

import type { Product } from "@/types/product";

import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ products }: { products: Product[] }) => {
  if (!products.length) {
    return (
      <Text className="text-sm text-[#74655b]">
        No products available right now.
      </Text>
    );
  }

  return (
    <View className="flex-row flex-wrap justify-between gap-y-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </View>
  );
};
