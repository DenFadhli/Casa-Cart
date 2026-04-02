import { Redirect } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/settingsStore";

export default function IndexScreen() {
  const { t } = useTranslation("common");
  const authHydrated = useAuthStore((state) => state.isHydrated);
  const settingsHydrated = useSettingsStore((state) => state.isHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!authHydrated || !settingsHydrated) {
    return (
      <SafeAreaView className="flex-1 bg-[#f7f3ee]">
        <View className="flex-1 items-center justify-center px-6">
          <Card className="w-full items-center gap-3 p-6">
            <Text className="text-2xl font-bold text-[#2d241f]">
              {t("appName")}
            </Text>
            <Text className="text-center text-sm leading-6 text-[#74655b]">
              {t("loading")}
            </Text>
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return <Redirect href={isAuthenticated ? "/(tabs)" : "/(auth)/login"} />;
}
