import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";

import { Header } from "@/components/layout/Header";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SUPPORTED_CURRENCIES } from "@/constants/config";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { useSettingsStore } from "@/store/settingsStore";

export default function ProfileScreen() {
  const { t } = useTranslation(["common", "profile"]);
  const router = useRouter();
  const { user, logout } = useAuth();
  const orders = useOrders().orders;
  const currency = useSettingsStore((state) => state.currency);
  const setCurrency = useSettingsStore((state) => state.setCurrency);

  return (
    <SafeAreaView className="flex-1 bg-[#f7f3ee]">
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 36, gap: 20 }}>
        <Header
          eyebrow={t("profile:title")}
          title={user?.fullName ?? t("common:guest")}
          subtitle={user?.email ?? t("common:tagline")}
        />

        <Card className="gap-3">
          <Text className="text-[13px] font-bold uppercase tracking-widest text-[#9a5b3d]">
            {t("profile:signedInAs")}
          </Text>
          <Text className="text-lg font-bold text-[#2d241f]">
            {user ? user.email : t("common:guest")}
          </Text>
          <Text className="text-[15px] text-[#74655b] pb-2">
            {orders.length} saved order(s)
          </Text>
          <Button label={t("common:orders")} variant="secondary" onPress={() => router.push("/order")} />
        </Card>

        <Card className="gap-5">
          <Text className="text-[20px] font-extrabold text-[#2d241f]">{t("profile:settings")}</Text>
          <LanguageSwitcher />
          <View className="gap-3">
            <Text className="text-[13px] font-bold uppercase tracking-widest text-[#9a5b3d]">
              {t("profile:currency")}
            </Text>
            <View className="flex-row gap-2">
              {SUPPORTED_CURRENCIES.map((code) => (
                <Button
                  key={code}
                  label={code}
                  variant={currency === code ? "primary" : "secondary"}
                  onPress={() => setCurrency(code)}
                  className="flex-1"
                />
              ))}
            </View>
          </View>
        </Card>

        <Button label={t("common:logout")} onPress={logout} />
      </ScrollView>
    </SafeAreaView>
  );
}
