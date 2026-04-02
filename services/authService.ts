import AsyncStorage from "@react-native-async-storage/async-storage";

import { DEMO_LOGIN } from "@/constants/config";
import { api } from "@/services/api";
import type {
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/user";
import { STORAGE_KEYS } from "@/utils/storage";

interface AuthResponse {
  token: string;
  user: User;
}

interface RemoteLoginResponse {
  token: string;
}

interface StoredAccount {
  id: number;
  fullName: string;
  email: string;
  password: string;
}

export const authService = {
  async login(payload: LoginPayload) {
    if (
      payload.username === DEMO_LOGIN.username &&
      payload.password === DEMO_LOGIN.password
    ) {
      return {
        token: "demo-offline-token",
        user: authService.buildDemoUser(payload.username),
      } satisfies AuthResponse;
    }

    const accounts = await authService.getStoredAccounts();
    const localAccount = accounts.find(
      (account) =>
        account.email.toLowerCase() === payload.username.trim().toLowerCase() &&
        account.password === payload.password,
    );

    if (localAccount) {
      return {
        token: `local-${localAccount.id}`,
        user: {
          id: localAccount.id,
          fullName: localAccount.fullName,
          email: localAccount.email,
        },
      } satisfies AuthResponse;
    }

    const response = await api.post<RemoteLoginResponse>("/auth/login", payload);
    return {
      token: response.data.token,
      user: authService.buildDemoUser(payload.username),
    } satisfies AuthResponse;
  },

  async register(payload: RegisterPayload) {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const accounts = await authService.getStoredAccounts();
    const existing = accounts.find((account) => account.email === normalizedEmail);

    if (existing) {
      return {
        token: `local-${existing.id}`,
        user: {
          id: existing.id,
          fullName: existing.fullName,
          email: existing.email,
        },
      } satisfies AuthResponse;
    }

    const storedAccount: StoredAccount = {
      id: Date.now(),
      fullName: payload.fullName,
      email: normalizedEmail,
      password: payload.password,
    };
    await AsyncStorage.setItem(
      STORAGE_KEYS.authAccounts,
      JSON.stringify([storedAccount, ...accounts]),
    );

    const user: User = {
      id: storedAccount.id,
      fullName: storedAccount.fullName,
      email: storedAccount.email,
    };

    return {
      token: `local-${storedAccount.id}`,
      user,
    };
  },

  async getStoredAccounts() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.authAccounts);
      return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
    } catch {
      return [];
    }
  },

  buildDemoUser(username: string): User {
    const isDemo = username === DEMO_LOGIN.username;

    return {
      id: 1,
      fullName: isDemo ? "Demo Shopper" : username,
      email: isDemo ? "demo@casacart.app" : `${username}@casacart.app`,
    };
  },
};
