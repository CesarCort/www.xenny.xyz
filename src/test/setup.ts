import "@testing-library/jest-dom";
import { vi, afterEach } from "vitest";
import { useAuthStore } from "@/modules/auth/store/useAuthStore";

interface Storage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

const localStorageMock: Storage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

declare global {
  interface Window {
    localStorage: Storage;
  }
}

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

global.fetch = vi.fn() as unknown as typeof fetch;

afterEach(() => {
  vi.clearAllMocks();
  useAuthStore.getState().reset();
});

