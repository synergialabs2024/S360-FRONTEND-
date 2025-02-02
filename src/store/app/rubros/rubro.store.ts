import { create } from 'zustand';

import { Nullable, Rubro } from '@/shared';

interface RubroState {
  activeRubro: Nullable<Rubro>;
  setActiveRubro: (value: Nullable<Rubro>) => void;

  clearAll: () => void;
}

export const useRubroStore = create<RubroState>()(set => ({
  activeRubro: null,

  setActiveRubro: value => set({ activeRubro: value }),

  clearAll: () => set({ activeRubro: null }),
}));
