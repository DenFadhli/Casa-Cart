import "@/i18n";
import "@/global.css";

import { useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";

import { AppProviders } from "@/components/providers/AppProviders";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/settingsStore";

void SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const authHydrated = useAuthStore((state) => state.isHydrated);
  const settingsHydrated = useSettingsStore((state) => state.isHydrated);

  useEffect(() => {
    if (authHydrated && settingsHydrated) {
      void SplashScreen.hideAsync();
    }
  }, [authHydrated, settingsHydrated]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
