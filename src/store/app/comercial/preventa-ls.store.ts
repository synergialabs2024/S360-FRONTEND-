import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// TODO: to save already saved images in s3 bucket
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
