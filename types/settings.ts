import type {
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
  SUPPORTED_CURRENCIES,
  SUPPORTED_LANGUAGES,
} from "@/constants/config";

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];
export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number];

export interface SettingsState {
  language: LanguageCode;
  currency: CurrencyCode;
}

export type DefaultLanguage = typeof DEFAULT_LANGUAGE;
export type DefaultCurrency = typeof DEFAULT_CURRENCY;
