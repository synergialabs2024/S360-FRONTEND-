import { create } from 'zustand';

import { Nullable, OrdenTrabajo, Rubro } from '@/shared';

interface RubroState {
  activeOrdenTrabajo: Nullable<OrdenTrabajo>;
  setActiveOrdenTrabajo: (value: Nullable<OrdenTrabajo>) => void;

  activeRubro: Nullable<Rubro>;
  setActiveRubro: (value: Nullable<Rubro>) => void;

  clearAll: () => void;
}

export const useRubroStore = create<RubroState>()(set => ({
  activeOrdenTrabajo: null,
  activeRubro: null,

  setActiveOrdenTrabajo: value => set({ activeOrdenTrabajo: value }),
  setActiveRubro: value => set({ activeRubro: value }),

  clearAll: () => set({ activeOrdenTrabajo: null, activeRubro: null }),
}));
