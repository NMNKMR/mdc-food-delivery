import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  createdAt: number;
};

export type SignUpInput = {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
};

export type SignInInput = {
  phone: string;
  password: string;
};

type AuthState = {
  user: User | null;
  // In-memory directory of accounts created this session. Not persisted —
  // just lets sign-in restore the name when the same phone signs back in
  // before a backend exists.
  users: User[];
  isLoggedIn: boolean;
  hasHydrated: boolean;
  signUp: (input: SignUpInput) => Promise<User>;
  signIn: (input: SignInInput) => Promise<User>;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

const makeId = () =>
  `usr_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isLoggedIn: false,
      hasHydrated: false,

      signUp: async ({ firstName, lastName, phone }) => {
        const user: User = {
          id: makeId(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          createdAt: Date.now(),
        };
        // Simulate network request
        await new Promise((res) => setTimeout(res, 1500));
        set((state) => ({
          user,
          isLoggedIn: true,
          users: [
            ...state.users.filter((u) => u.phone !== user.phone),
            user,
          ],
        }));
        return user;
      },

      signIn: async ({ phone }) => {
        const trimmedPhone = phone.trim();
        // Simulate network request
        await new Promise((res) => setTimeout(res, 1500));
        const existing = get().users.find((u) => u.phone === trimmedPhone);
        const user: User = existing ?? {
          id: makeId(),
          firstName: "",
          lastName: "",
          phone: trimmedPhone,
          createdAt: Date.now(),
        };
        set({ user, isLoggedIn: true });
        return user;
      },

      logout: () => set({ user: null, isLoggedIn: false }),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "mdc-food-delivery.auth",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
