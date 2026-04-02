import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/constants/config";
import { STORAGE_KEYS } from "@/utils/storage";

const isSupportedLanguage = (language: string): language is (typeof SUPPORTED_LANGUAGES)[number] =>
  SUPPORTED_LANGUAGES.includes(language as (typeof SUPPORTED_LANGUAGES)[number]);

export const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: async (callback: (language: string) => void) => {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.settings);

      if (settings) {
        const parsed = JSON.parse(settings) as {
          state?: { language?: string };
        };

        const storedLanguage = parsed.state?.language;
        if (storedLanguage && isSupportedLanguage(storedLanguage)) {
          callback(storedLanguage);
          return;
        }
      }
    } catch {
      // Fall through to device locale detection.
    }

    const locale = Localization.getLocales()[0]?.languageCode ?? DEFAULT_LANGUAGE;
    callback(isSupportedLanguage(locale) ? locale : DEFAULT_LANGUAGE);
  },
  init: () => {},
  cacheUserLanguage: async () => {},
};
