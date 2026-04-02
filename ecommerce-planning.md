# 🛒 E-Commerce Full Flow — React Native Expo

> **Project Planning Document**
> Stack: React Native · Expo SDK 51+ · TypeScript · Public API
> Last Updated: April 2026

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [Multi-Language (i18n) Setup](#4-multi-language-i18n-setup)
5. [Features & User Flows](#5-features--user-flows)
6. [Screen List](#6-screen-list)
7. [API Integration](#7-api-integration)
8. [State Management](#8-state-management)
9. [UI Design System](#9-ui-design-system)
10. [Milestones & Timeline](#10-milestones--timeline)
11. [Development Checklist](#11-development-checklist)

---

## 1. Project Overview

A cross-platform mobile e-commerce application built with React Native Expo, covering the complete shopping flow from product discovery to order confirmation. Powered by public APIs with no custom backend required.

| Property | Detail |
|---|---|
| Platform | Android & iOS |
| Framework | React Native (Expo SDK 51+) |
| Language | TypeScript (strict mode) |
| Navigation | Expo Router v3 (file-based) |
| API Source | FakeStoreAPI · DummyJSON |
| State Management | Zustand + React Query |
| Styling | NativeWind v4 (Tailwind for RN) |
| i18n | i18next + react-i18next |
| Supported Languages | 🇺🇸 English · 🇮🇩 Indonesian · 🇸🇦 Arabic (RTL) |

---

## 2. Tech Stack

### Core Dependencies
```bash
expo: ~51.x
react-native: 0.74.x
expo-router: ~3.x
typescript: ~5.x
```

### UI & Styling
```bash
nativewind: ^4.x                        # Tailwind utility classes for React Native
react-native-reanimated: ~3.x           # Smooth animations
react-native-gesture-handler            # Gesture support
expo-linear-gradient                    # Gradient backgrounds
@expo/vector-icons                      # Icon library
react-native-skeleton-placeholder       # Skeleton loading UI
expo-image                              # Optimized image loading & caching
```

### Data Fetching & State
```bash
zustand: ^4.x                           # Global state (cart, auth, wishlist)
@tanstack/react-query: ^5.x             # Server state, caching, background sync
axios: ^1.x                             # HTTP client with interceptors
@react-native-async-storage/async-storage  # Local persistence
```

### Internationalization (i18n)
```bash
i18next: ^23.x                          # Core i18n framework
react-i18next: ^14.x                    # React bindings for i18next
expo-localization                       # Detect device locale
i18next-resources-to-backend            # Lazy-load translation files
```

### UX Enhancements
```bash
expo-haptics                            # Haptic feedback on interactions
react-native-toast-message              # Non-blocking notifications
@gorhom/bottom-sheet                    # Bottom sheet modal
react-hook-form: ^7.x                   # Form management
zod: ^3.x                               # Schema validation
expo-splash-screen                      # Splash screen control
react-native-safe-area-context          # Safe area insets
```

---

## 3. Folder Structure

```
ecommerce-app/
│
├── app/                                  # Expo Router (pages)
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   │
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx                     # Home
│   │   ├── explore.tsx                   # Catalog & Search
│   │   ├── wishlist.tsx                  # Saved Items
│   │   └── profile.tsx                   # User Profile
│   │
│   ├── product/
│   │   └── [id].tsx                      # Product Detail
│   │
│   ├── cart/
│   │   └── index.tsx                     # Shopping Cart
│   │
│   ├── checkout/
│   │   ├── index.tsx                     # Shipping Form
│   │   ├── payment.tsx                   # Payment Method
│   │   └── success.tsx                   # Order Confirmation
│   │
│   ├── order/
│   │   ├── index.tsx                     # Order History
│   │   └── [id].tsx                      # Order Detail
│   │
│   └── _layout.tsx                       # Root layout
│
├── components/
│   ├── ui/                               # Reusable UI atoms
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Divider.tsx
│   │   └── EmptyState.tsx
│   │
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCarousel.tsx
│   │   └── RatingStars.tsx
│   │
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   │
│   └── layout/
│       ├── Header.tsx
│       ├── LanguageSwitcher.tsx          # Language picker component
│       └── SearchBar.tsx
│
├── locales/                              # Translation files
│   ├── en/
│   │   ├── common.json
│   │   ├── product.json
│   │   ├── cart.json
│   │   ├── checkout.json
│   │   └── profile.json
│   ├── id/
│   │   ├── common.json
│   │   ├── product.json
│   │   ├── cart.json
│   │   ├── checkout.json
│   │   └── profile.json
│   └── ar/
│       ├── common.json
│       ├── product.json
│       ├── cart.json
│       ├── checkout.json
│       └── profile.json
│
├── store/                                # Zustand stores
│   ├── cartStore.ts
│   ├── authStore.ts
│   ├── wishlistStore.ts
│   └── settingsStore.ts                  # Language, theme preferences
│
├── hooks/
│   ├── useProducts.ts
│   ├── useCart.ts
│   ├── useAuth.ts
│   └── useRTL.ts                         # RTL layout helper
│
├── services/
│   ├── api.ts                            # Axios instance + interceptors
│   ├── productService.ts
│   ├── categoryService.ts
│   └── authService.ts
│
├── i18n/
│   ├── index.ts                          # i18next config & init
│   └── languageDetector.ts              # Custom device locale detector
│
├── types/
│   ├── product.ts
│   ├── cart.ts
│   ├── order.ts
│   └── user.ts
│
├── utils/
│   ├── currency.ts                       # Multi-currency formatter
│   ├── storage.ts                        # AsyncStorage helpers
│   ├── validation.ts
│   └── rtl.ts                            # RTL utility functions
│
└── constants/
    ├── colors.ts
    ├── typography.ts
    └── config.ts
```

---

## 4. Multi-Language (i18n) Setup

### Supported Languages

| Code | Language | Direction | Flag |
|---|---|---|---|
| `en` | English | LTR | 🇺🇸 |
| `id` | Indonesian | LTR | 🇮🇩 |
| `ar` | Arabic | RTL | 🇸🇦 |

### i18next Configuration

```typescript
// i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from '../locales/en/common.json';
import id from '../locales/id/common.json';
import ar from '../locales/ar/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      id: { translation: id },
      ar: { translation: ar },
    },
    lng: Localization.getLocales()[0]?.languageCode ?? 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
```

### Translation File Example

```json
// locales/en/common.json
{
  "home": {
    "greeting": "Good {{time}}, {{name}}!",
    "featured": "Featured Products",
    "categories": "Shop by Category",
    "seeAll": "See all"
  },
  "cart": {
    "title": "My Cart",
    "empty": "Your cart is empty",
    "subtotal": "Subtotal",
    "checkout": "Proceed to Checkout",
    "itemCount": "{{count}} item",
    "itemCount_other": "{{count}} items"
  },
  "product": {
    "addToCart": "Add to Cart",
    "outOfStock": "Out of Stock",
    "rating": "{{value}} out of 5",
    "reviews": "{{count}} review",
    "reviews_other": "{{count}} reviews"
  }
}
```

### RTL Support for Arabic

```typescript
// utils/rtl.ts
import { I18nManager } from 'react-native';
import * as Updates from 'expo-updates';

export const enableRTL = async (language: string) => {
  const isRTL = language === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    await Updates.reloadAsync(); // reload to apply RTL layout
  }
};
```

### Language Switcher Component

```typescript
// components/layout/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';
import { enableRTL } from '@/utils/rtl';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (code: string) => {
    await i18n.changeLanguage(code);
    await enableRTL(code);
  };

  return (/* Render language options */);
};
```

### Using Translations in Components

```typescript
// Inside any screen/component
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <Text>{t('home.featured')}</Text>        // "Featured Products"
    <Text>{t('cart.itemCount', { count: 3 })}</Text>  // "3 items"
  );
};
```

---

## 5. Features & User Flows

### 🔐 Authentication Flow
```
Splash Screen
  └── Check stored token (AsyncStorage)
       ├── Token found   → Home Tab
       └── No token      → Login Screen
                             ├── Login  (POST /auth/login)
                             └── Register (local simulation)
```

### 🏠 Home Flow
```
Home Screen
├── Personalized greeting (translated)
├── Promo banner carousel
├── Category chips (GET /products/categories)
├── Featured products grid (GET /products?limit=8)
└── Tap product card → Product Detail
```

### 🔍 Explore & Search Flow
```
Explore Screen
├── Search bar (filter by title — client side)
├── Category filter tabs
├── Sort options: Price ↑↓ · Rating · Newest
└── Infinite scroll product grid
     └── (GET /products/category/:name OR /products)
```

### 🛍️ Product Detail Flow
```
Product Detail [id]
├── Full-screen image gallery with zoom
├── Name · Price · Rating · Review count
├── Description (expandable)
├── Quantity selector (+/-)
├── [Add to Cart]  → Zustand cart store + haptic feedback + toast
└── [Wishlist]     → Zustand wishlist store + icon toggle
```

### 🛒 Cart Flow
```
Cart Screen
├── Cart item list
│   ├── Quantity controls (+ / -)
│   └── Swipe to delete
├── Cart summary
│   ├── Subtotal
│   ├── Shipping estimate
│   └── Total (formatted by locale)
└── [Proceed to Checkout] → Checkout Screen
```

### 💳 Checkout Flow
```
Step 1 — Shipping Details
├── Full name · Phone · Address · City · Postal code
└── [Continue] → Step 2

Step 2 — Payment Method
├── Cash on Delivery (COD)
├── Bank Transfer
└── Credit / Debit Card (simulated)
    └── [Place Order] → Order Success Screen

Order Success Screen
├── Success animation (Reanimated)
├── Generated Order ID
├── Order summary preview
└── [View Order] or [Back to Home]
```

### 📦 Order History Flow
```
Profile → My Orders
├── Order list (from AsyncStorage)
│   ├── Order ID · Date · Status badge
│   └── Total amount
└── Tap → Order Detail
           ├── Delivery address
           ├── Items ordered
           ├── Payment method
           └── Price breakdown
```

### ❤️ Wishlist Flow
```
Wishlist Screen
├── Saved product grid (Zustand + AsyncStorage)
├── Remove item (swipe or icon)
└── Tap → Product Detail
```

### 🌐 Language & Settings Flow
```
Profile → Settings
├── Language Switcher (EN / ID / AR)
│   └── Applies RTL layout for Arabic on reload
├── Currency display (USD / IDR / SAR)
└── App theme (system / light / dark) [future]
```

---

## 6. Screen List

| # | Screen | Route | Description |
|---|---|---|---|
| 1 | Splash | `/` | Token check & app init |
| 2 | Login | `/(auth)/login` | Email + password login |
| 3 | Register | `/(auth)/register` | New user registration |
| 4 | Home | `/(tabs)/` | Main landing with featured content |
| 5 | Explore | `/(tabs)/explore` | Full catalog, search & filter |
| 6 | Wishlist | `/(tabs)/wishlist` | Saved products |
| 7 | Profile | `/(tabs)/profile` | User info, orders, settings |
| 8 | Product Detail | `/product/[id]` | Full product info + add to cart |
| 9 | Cart | `/cart` | Cart items + summary |
| 10 | Checkout | `/checkout` | Shipping address form |
| 11 | Payment | `/checkout/payment` | Payment method selection |
| 12 | Order Success | `/checkout/success` | Confirmation + animation |
| 13 | Order History | `/order` | List of past orders |
| 14 | Order Detail | `/order/[id]` | Full order breakdown |

---

## 7. API Integration

### Base URLs

```
Primary:    https://fakestoreapi.com
Fallback:   https://dummyjson.com
```

### Endpoints Reference

#### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Login and receive JWT token |
| GET | `/users/:id` | Fetch user profile |

#### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | All products |
| GET | `/products/:id` | Single product detail |
| GET | `/products?limit=n&sort=asc` | Paginated + sorted products |
| GET | `/products/categories` | List all categories |
| GET | `/products/category/:name` | Products by category |

### Axios Instance
```typescript
// services/api.ts
import axios from 'axios';
import { authStore } from '@/store/authStore';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = authStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      authStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
```

### React Query Hook Example
```typescript
// hooks/useProducts.ts
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';

export const useProducts = (limit?: number) =>
  useQuery({
    queryKey: ['products', limit],
    queryFn: () => productService.getAll(limit),
    staleTime: 1000 * 60 * 5,   // 5 minutes cache
    retry: 2,
  });

export const useProductsByCategory = (category: string) =>
  useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productService.getByCategory(category),
    enabled: !!category,
  });
```

---

## 8. State Management

### Cart Store
```typescript
// store/cartStore.ts
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
}
```

### Auth Store
```typescript
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => void;
}
```

### Settings Store (includes language)
```typescript
interface SettingsStore {
  language: 'en' | 'id' | 'ar';
  currency: 'USD' | 'IDR' | 'SAR';
  setLanguage: (lang: string) => void;
  setCurrency: (currency: string) => void;
}
```

> All stores use `zustand/middleware` `persist` with `AsyncStorage` for data persistence across sessions.

---

## 9. UI Design System

### Design Principles

| Principle | Implementation |
|---|---|
| Modern | Clean card-based layout, smooth transitions, rounded corners |
| Responsive | Flexible grid, safe area aware, supports all screen sizes |
| Consistent | Shared design tokens (colors, spacing, typography) |
| Accessible | Minimum touch targets 48×48dp, color contrast WCAG AA |
| Localized | Fonts and layouts adapt for RTL languages |

### Color Tokens
```typescript
// constants/colors.ts
export const colors = {
  primary: '#6C63FF',         // Vibrant indigo — CTA, active states
  primaryLight: '#EEF0FF',    // Tinted background
  secondary: '#FF6584',       // Accent — wishlist, badges
  success: '#2DCE89',         // Order confirmed, in stock
  warning: '#FB8500',         // Low stock, alerts
  error: '#F5365C',           // Errors, out of stock
  neutral: {
    50: '#F8F9FA',
    100: '#E9ECEF',
    400: '#ADB5BD',
    700: '#495057',
    900: '#212529',
  },
};
```

### Typography Scale
```typescript
// constants/typography.ts
export const typography = {
  h1: { fontSize: 28, fontWeight: '700', lineHeight: 36 },
  h2: { fontSize: 22, fontWeight: '600', lineHeight: 30 },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 26 },
  body: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 18 },
  price: { fontSize: 20, fontWeight: '700' },
};
```

### Spacing Scale
```
4px · 8px · 12px · 16px · 20px · 24px · 32px · 48px · 64px
```

### Component Patterns
- **ProductCard** — Image, title (2 lines max), price, rating chip
- **Button** — Primary (filled) / Secondary (outlined) / Ghost
- **Input** — Floating label, error state, icon prefix/suffix
- **Badge** — Status: success / warning / error / info
- **Skeleton** — Matches exact layout of loading content
- **EmptyState** — Illustration + title + subtitle + optional CTA

---

## 10. Milestones & Timeline

> Estimated for 1 developer, ~4 productive hours/day

| Week | Milestone | Key Deliverables |
|---|---|---|
| 1 | Foundation | Expo init, folder structure, navigation, API connection, TypeScript types, design tokens |
| 2 | Authentication | Login & Register screens, Auth store, token persistence, protected routes |
| 3 | Home & Explore | Home screen, category filter, product grid, search bar, skeleton loading |
| 4 | Product & Wishlist | Product detail screen, image gallery, add-to-cart, wishlist toggle |
| 5 | Cart & Checkout | Cart screen, checkout form, payment screen, order success animation |
| 6 | Orders & Profile | Order history, order detail, profile screen, settings page |
| 7 | i18n Implementation | Set up i18next, translate all 14 screens (EN/ID/AR), RTL layout for Arabic |
| 8 | Polish & QA | Error boundaries, empty states, haptics, toast system, UI consistency pass |
| 9 | Final & Build | Performance optimization, build APK/IPA with EAS Build, README documentation |

---

## 11. Development Checklist

### Project Setup
- [ ] `npx create-expo-app ecommerce-app --template expo-template-blank-typescript`
- [ ] Install and configure all dependencies
- [ ] Configure NativeWind v4 with Tailwind config
- [ ] Set up Expo Router with tab + stack navigation
- [ ] Configure TypeScript strict mode
- [ ] Set up React Query with QueryClientProvider
- [ ] Configure Axios with base URL and interceptors

### i18n & Localization
- [ ] Install i18next and react-i18next
- [ ] Create locale files for EN, ID, AR
- [ ] Configure i18n with device locale detection
- [ ] Implement RTL toggle for Arabic
- [ ] Build LanguageSwitcher component
- [ ] Translate: Home, Explore, Product, Cart screens
- [ ] Translate: Checkout, Order, Profile, Auth screens
- [ ] Test RTL layout on all 14 screens

### Authentication
- [ ] Splash screen with animated logo
- [ ] Login screen with validation (react-hook-form + zod)
- [ ] Register screen (local simulation)
- [ ] Auth store with token persistence
- [ ] Redirect logic (authenticated vs guest)
- [ ] Logout + clear all stores

### Home & Explore
- [ ] Animated header with cart badge
- [ ] Banner carousel with auto-scroll
- [ ] Horizontal category chips
- [ ] Featured products 2-column grid
- [ ] Explore screen with search input
- [ ] Category filter (tab row)
- [ ] Sort bottom sheet (price, rating)
- [ ] Skeleton loading for all lists
- [ ] Pull-to-refresh

### Product
- [ ] Product card component (image, title, price, rating)
- [ ] Product detail screen
- [ ] Pinch-to-zoom image gallery
- [ ] Rating stars with review count
- [ ] Expandable description text
- [ ] Quantity selector with min/max bounds
- [ ] Add to Cart — haptic + toast feedback
- [ ] Wishlist toggle — animated heart icon

### Cart
- [ ] Cart screen with item list
- [ ] Swipe-to-delete cart item
- [ ] Quantity +/- controls
- [ ] Real-time cart summary update
- [ ] Empty cart state with CTA
- [ ] Cart item count badge on tab icon

### Checkout
- [ ] Multi-step checkout layout (progress indicator)
- [ ] Shipping address form with validation
- [ ] Shipping method selection
- [ ] Payment method cards (COD, Transfer, Card)
- [ ] Order review before confirmation
- [ ] Success screen with Reanimated animation
- [ ] Save order to AsyncStorage

### Orders & Profile
- [ ] Order history list with status badges
- [ ] Order detail with full breakdown
- [ ] Profile screen with user info
- [ ] Edit profile (local update)
- [ ] Settings: language, currency, logout

### Polish
- [ ] Global error boundary + fallback UI
- [ ] Network error handler with retry
- [ ] Empty state illustrations for all lists
- [ ] Consistent toast notifications
- [ ] Haptic feedback on key interactions
- [ ] Smooth screen transition animations
- [ ] Custom app icon and splash screen

### Final
- [ ] Test on physical Android device
- [ ] Test on physical iOS device
- [ ] Test all 3 languages + Arabic RTL
- [ ] EAS Build setup (`eas.json` configuration)
- [ ] Build APK for Android
- [ ] Build IPA for iOS (TestFlight)
- [ ] Write README with setup instructions

---

## 📌 Important Notes

- **Auth simulation** — FakeStoreAPI returns a JWT token on `/auth/login`, but doesn't validate it for subsequent requests. Use the token to simulate authentication only; user data is stored locally in AsyncStorage.
- **Order simulation** — No real backend. Orders are saved to AsyncStorage with a randomly generated order ID (e.g., `ORD-20260401-4X7K`).
- **Currency formatting** — FakeStoreAPI prices are in USD. Use `Intl.NumberFormat` to display in the user's preferred currency with locale-appropriate formatting.
- **Image optimization** — Use `expo-image` for all product images. It supports caching, progressive loading, and blurhash placeholders while loading.
- **RTL reload** — Forcing RTL via `I18nManager.forceRTL()` requires an app reload. Use `expo-updates` `reloadAsync()` to apply layout changes when switching to/from Arabic.

---

*This is a living document — update it as the project evolves.*
