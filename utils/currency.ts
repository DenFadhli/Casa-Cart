import { DEFAULT_CURRENCY, DEFAULT_LANGUAGE } from "@/constants/config";
import type { CurrencyCode, LanguageCode } from "@/types/settings";

const localeMap: Record<LanguageCode, string> = {
  en: "en-US",
  id: "id-ID",
  ar: "ar-SA",
};

export const formatCurrency = (
  value: number,
  currency: CurrencyCode = DEFAULT_CURRENCY,
  language: LanguageCode = DEFAULT_LANGUAGE,
) =>
  new Intl.NumberFormat(localeMap[language], {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "IDR" ? 0 : 2,
  }).format(value);
