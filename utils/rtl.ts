import { DevSettings, I18nManager } from "react-native";
import * as Updates from "expo-updates";

import type { LanguageCode } from "@/types/settings";

export const isRTLLanguage = (language: LanguageCode) => language === "ar";

const reloadApp = async () => {
  if (__DEV__) {
    DevSettings.reload();
    return;
  }

  try {
    await Updates.reloadAsync();
  } catch {
    DevSettings.reload();
  }
};

export const syncRTLPreference = async (
  language: LanguageCode,
  reload = true,
) => {
  const shouldUseRTL = isRTLLanguage(language);

  if (I18nManager.isRTL === shouldUseRTL) {
    return;
  }

  I18nManager.allowRTL(shouldUseRTL);
  I18nManager.forceRTL(shouldUseRTL);

  if (reload) {
    await reloadApp();
  }
};
