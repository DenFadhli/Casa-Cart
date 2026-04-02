import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
} from "@/constants/config";
import i18n from "@/i18n";
import type { CurrencyCode, LanguageCode } from "@/types/settings";
import { syncRTLPreference } from "@/utils/rtl";
import { STORAGE_KEYS } from "@/utils/storage";

interface SettingsStore {
  language: LanguageCode;
  currency: CurrencyCode;
  isHydrated: boolean;
  setHydrated: (value: boolean) => void;
  setLanguage: (language: LanguageCode) => Promise<void>;
  setCurrency: (currency: CurrencyCode) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      language: DEFAULT_LANGUAGE,
      currency: DEFAULT_CURRENCY,
      isHydrated: false,
      setHydrated: (value) => set({ isHydrated: value }),
      setLanguage: async (language) => {
        await i18n.changeLanguage(language);
        set({ language });
        await syncRTLPreference(language);
      },
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: STORAGE_KEYS.settings,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        language: state.language,
        currency: state.currency,
      }),
      onRehydrateStorage: () => async (state) => {
        if (!state) {
          return;
        }

        await i18n.changeLanguage(state.language);
        await syncRTLPreference(state.language, false);
        state.setHydrated(true);
      },
    },
  ),
);
