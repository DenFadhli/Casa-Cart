import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { authService } from "@/services/authService";
import { setAccessToken } from "@/services/api";
import type { LoginPayload, RegisterPayload, User } from "@/types/user";
import { STORAGE_KEYS } from "@/utils/storage";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrated: false,
      setHydrated: (value) => set({ isHydrated: value }),
      login: async (payload) => {
        const session = await authService.login(payload);

        setAccessToken(session.token);
        set({
          token: session.token,
          user: session.user,
          isAuthenticated: true,
        });
      },
      register: async (payload) => {
        const session = await authService.register(payload);

        setAccessToken(session.token);
        set({
          token: session.token,
          user: session.user,
          isAuthenticated: true,
        });
      },
      logout: () => {
        setAccessToken(null);
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: STORAGE_KEYS.auth,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        setAccessToken(state?.token ?? null);
        state?.setHydrated(true);
      },
    },
  ),
);
