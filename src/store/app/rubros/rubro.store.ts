import { create } from 'zustand';

import { LineaServicio, Nullable, Rubro } from '@/shared';

interface RubroState {
  activeRubro: Nullable<Rubro>;
  setActiveRubro: (value: Nullable<Rubro>) => void;

  activeServiceLine: Nullable<LineaServicio>;
  setActiveServiceLine: (value: Nullable<LineaServicio>) => void;

  clearAll: () => void;
  clearAllMinusSL: () => void;
}

export const useRubroStore = create<RubroState>()(set => ({
  activeRubro: null,
  activeServiceLine: null,

  setActiveRubro: value => set({ activeRubro: value }),
  setActiveServiceLine: value => set({ activeServiceLine: value }),

  clearAll: () => set({ activeRubro: null, activeServiceLine: null }),
  clearAllMinusSL: () => set({ activeRubro: null }),
}));
