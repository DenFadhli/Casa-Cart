import { I18nManager } from "react-native";

import { useSettingsStore } from "@/store/settingsStore";
import { isRTLLanguage } from "@/utils/rtl";

export const useRTL = () => {
  const language = useSettingsStore((state) => state.language);

  return {
    isRTL: I18nManager.isRTL || isRTLLanguage(language),
    language,
  };
};
