import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { SUPPORTED_LANGUAGES } from "@/constants/config";
import { useSettingsStore } from "@/store/settingsStore";
import type { LanguageCode } from "@/types/settings";

const labels: Record<LanguageCode, string> = {
  en: "English",
  id: "Indonesia",
  ar: "العربية",
};

export const LanguageSwitcher = () => {
  const { t } = useTranslation(["profile"]);
  const language = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  return (
    <View className="gap-3">
      <Text className="text-[13px] font-bold uppercase tracking-widest text-[#9a5b3d]">
        {t("language")}
      </Text>
      <View className="flex-row gap-2">
        {SUPPORTED_LANGUAGES.map((code) => (
          <Button
            key={code}
            label={labels[code]}
            variant={language === code ? "primary" : "secondary"}
            onPress={() => {
              void setLanguage(code);
            }}
            className="flex-1"
          />
        ))}
      </View>
    </View>
  );
};
