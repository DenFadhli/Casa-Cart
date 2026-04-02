import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import authAr from "@/locales/ar/auth.json";
import cartAr from "@/locales/ar/cart.json";
import checkoutAr from "@/locales/ar/checkout.json";
import commonAr from "@/locales/ar/common.json";
import productAr from "@/locales/ar/product.json";
import profileAr from "@/locales/ar/profile.json";
import authEn from "@/locales/en/auth.json";
import cartEn from "@/locales/en/cart.json";
import checkoutEn from "@/locales/en/checkout.json";
import commonEn from "@/locales/en/common.json";
import productEn from "@/locales/en/product.json";
import profileEn from "@/locales/en/profile.json";
import authId from "@/locales/id/auth.json";
import cartId from "@/locales/id/cart.json";
import checkoutId from "@/locales/id/checkout.json";
import commonId from "@/locales/id/common.json";
import productId from "@/locales/id/product.json";
import profileId from "@/locales/id/profile.json";

import { DEFAULT_LANGUAGE } from "@/constants/config";
import { languageDetector } from "@/i18n/languageDetector";

const resources = {
  en: {
    common: commonEn,
    auth: authEn,
    product: productEn,
    cart: cartEn,
    checkout: checkoutEn,
    profile: profileEn,
  },
  id: {
    common: commonId,
    auth: authId,
    product: productId,
    cart: cartId,
    checkout: checkoutId,
    profile: profileId,
  },
  ar: {
    common: commonAr,
    auth: authAr,
    product: productAr,
    cart: cartAr,
    checkout: checkoutAr,
    profile: profileAr,
  },
} as const;

if (!i18n.isInitialized) {
  void i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: "v4",
      fallbackLng: DEFAULT_LANGUAGE,
      defaultNS: "common",
      ns: ["common", "auth", "product", "cart", "checkout", "profile"],
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      resources,
    });
}

export default i18n;
