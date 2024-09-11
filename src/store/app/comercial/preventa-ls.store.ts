import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PreventaLSState {
  tempLinks: string[];

  setTempLinks: (tempLinks: string[]) => void;
}

export const usePreventaLSStore = create<PreventaLSState>()(
  persist(
    set => ({
      tempLinks: [],

      setTempLinks: tempLinks => set({ tempLinks }),
    }),

    {
      name: 'preventa-ls',
    },
  ),
);
