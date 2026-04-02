import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCartStore } from "@/store/cartStore";

export default function CartScreen() {
  const { t } = useTranslation(["cart", "common"]);
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.totalPrice());

  return (
    <SafeAreaView className="flex-1 bg-[#f7f3ee]">
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Header eyebrow={t("common:cart")} title={t("title")} />

        {items.length ? (
          <>
            <View className="gap-3">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                  onDecrease={() =>
                    item.quantity === 1
                      ? removeItem(item.product.id)
                      : updateQuantity(item.product.id, item.quantity - 1)
                  }
                  onRemove={() => removeItem(item.product.id)}
                />
              ))}
            </View>
            <CartSummary subtotal={totalPrice} />
            <Button label={t("checkout")} onPress={() => router.push("/checkout")} />
          </>
        ) : (
          <EmptyState
            title={t("title")}
            description={t("empty")}
            actionLabel={t("continueShopping")}
            onAction={() => router.push("/(tabs)/explore")}
            icon={<Ionicons name="bag-outline" size={28} color="#9a5b3d" />}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
