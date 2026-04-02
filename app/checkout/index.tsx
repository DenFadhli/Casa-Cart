import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { useOrders } from "@/hooks/useOrders";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import type { ShippingAddress } from "@/types/order";

const shippingSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  address: z.string().min(8, "Please enter a delivery address"),
  city: z.string().min(2, "Please enter a city"),
  postalCode: z.string().min(4, "Please enter a postal code"),
});

export default function CheckoutScreen() {
  const { t } = useTranslation(["checkout", "common"]);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const { checkoutDraft, setShippingAddress } = useOrders();
  const [submitting, setSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: checkoutDraft.shippingAddress.fullName || user?.fullName || "",
      phone: checkoutDraft.shippingAddress.phone,
      address: checkoutDraft.shippingAddress.address,
      city: checkoutDraft.shippingAddress.city,
      postalCode: checkoutDraft.shippingAddress.postalCode,
    },
  });

  useEffect(() => {
    reset({
      fullName: checkoutDraft.shippingAddress.fullName || user?.fullName || "",
      phone: checkoutDraft.shippingAddress.phone,
      address: checkoutDraft.shippingAddress.address,
      city: checkoutDraft.shippingAddress.city,
      postalCode: checkoutDraft.shippingAddress.postalCode,
    });
  }, [checkoutDraft.shippingAddress, reset, user?.fullName]);

  const onSubmit = handleSubmit(async (values) => {
    const result = shippingSchema.safeParse(values);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (
          field === "fullName" ||
          field === "phone" ||
          field === "address" ||
          field === "city" ||
          field === "postalCode"
        ) {
          setError(field, { message: issue.message });
        }
      });
      return;
    }

    setSubmitting(true);
    setShippingAddress(result.data);
    Toast.show({
      type: "success",
      text1: t("shippingTitle"),
      text2: "Shipping details saved.",
    });
    router.push("/checkout/payment");
    setSubmitting(false);
  });

  if (!items.length) {
    return (
      <SafeAreaView className="flex-1 bg-[#f7f3ee]">
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <EmptyState
            title={t("common:checkout")}
            description="Add products to your cart before starting checkout."
            actionLabel={t("common:viewCart")}
            onAction={() => router.replace("/cart")}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f7f3ee]">
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Header
          eyebrow={t("common:checkout")}
          title={t("shippingTitle")}
          subtitle="Capture the delivery details first, then review payment and place the order."
        />
        <Card className="gap-4">
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Full name"
                value={value}
                onChangeText={onChange}
                placeholder="Ada Lovelace"
                error={errors.fullName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Phone"
                value={value}
                onChangeText={onChange}
                placeholder="+62 812 0000 0000"
                keyboardType="phone-pad"
                error={errors.phone?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Address"
                value={value}
                onChangeText={onChange}
                placeholder="Jl. Sudirman No. 1"
                error={errors.address?.message}
              />
            )}
          />
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="City"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Jakarta"
                    error={errors.city?.message}
                  />
                )}
              />
            </View>
            <View className="flex-1">
              <Controller
                control={control}
                name="postalCode"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Postal code"
                    value={value}
                    onChangeText={onChange}
                    placeholder="10220"
                    keyboardType="number-pad"
                    error={errors.postalCode?.message}
                  />
                )}
              />
            </View>
          </View>
          <Text className="text-sm leading-6 text-[#74655b]">
            These details are saved into the checkout draft so the payment step can reuse them.
          </Text>
          <Button
            label={t("common:payment")}
            onPress={onSubmit}
            loading={submitting}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
