import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEYS } from "@/core/constants/auth.constants";
import type { AuthState, SupabaseUser } from "@/core/types/auth.types";

const createInitialState = (): AuthState => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
});

export type AuthStore = AuthState & {
  login: (user: SupabaseUser) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

const createStoreConfig: StateCreator<AuthStore> = (set) => ({
  ...createInitialState(),
  login: (user: SupabaseUser) =>
    set({
      user,
      isAuthenticated: true,
      error: null,
      isLoading: false,
    }),
  logout: () =>
    set({
      ...createInitialState(),
    }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  reset: () => set({ ...createInitialState() }),
});

const shouldPersist =
  typeof import.meta !== "undefined" && import.meta.env.MODE !== "test";

const storeInitializer = shouldPersist
  ? persist(createStoreConfig, {
    name: LOCAL_STORAGE_KEYS.AUTH_STATE,
    partialize: (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
    }),
  })
  : createStoreConfig;

export const useAuthStore = create<AuthStore>()(
  storeInitializer as unknown as StateCreator<AuthStore>
);
