import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserModulesStore {
  modules: string[];
  isLoading: boolean;

  setModules: (modules: string[]) => void;
  clear: () => void;
}

export const useUserModulesStore = create<UserModulesStore>()(
  persist(
    set => ({
      modules: [],
      isLoading: true,

      setModules: modules => {
        set({ modules });
      },

      clear: () => {
        set({ modules: [] });
      },
    }),

    {
      name: 'user-modules',
    },
  ),
);
