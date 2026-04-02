import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { DEMO_LOGIN } from "@/constants/config";
import { useAuth } from "@/hooks/useAuth";
import type { LoginPayload } from "@/types/user";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export default function LoginScreen() {
  const { t } = useTranslation(["auth", "common"]);
  const router = useRouter();
  const { login } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: DEMO_LOGIN,
  });

  const onSubmit = handleSubmit(async (values) => {
    const result = schema.safeParse(values);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (field === "username" || field === "password") {
          setError(field, { message: issue.message });
        }
      });
      return;
    }

    try {
      setSubmitting(true);
      await login(result.data);
      Toast.show({ type: "success", text1: t("login"), text2: t("common:demoMode") });
      router.replace("/(tabs)");
    } catch {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "FakeStore demo credentials may be unavailable right now.",
      });
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <SafeAreaView className="flex-1 bg-[#f7f3ee]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <View className="flex-1 justify-center gap-6">
          <View className="gap-2">
            <Text className="text-4xl font-bold text-[#2d241f]">
              {t("welcomeBack")}
            </Text>
            <Text className="text-sm leading-6 text-[#74655b]">
              {t("subtitle")}
            </Text>
          </View>

          <Card className="gap-4">
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t("username")}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  error={errors.username?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t("password")}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  error={errors.password?.message}
                />
              )}
            />
            <Button label={t("login")} onPress={onSubmit} loading={submitting} />
            <Button
              label={t("loginDemo")}
              variant="secondary"
              onPress={() => {
                setValue("username", DEMO_LOGIN.username);
                setValue("password", DEMO_LOGIN.password);
              }}
            />
          </Card>

          <Button
            label={t("switchToRegister")}
            variant="ghost"
            onPress={() => router.push("/(auth)/register")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
