import { create } from 'zustand';

import { Nullable, OrdenTrabajo } from '@/shared';

interface RubroState {
  activeOrdenTrabajo: Nullable<OrdenTrabajo>;
  setActiveOrdenTrabajo: (value: Nullable<OrdenTrabajo>) => void;

  clearAll: () => void;
}

export const useRubroStore = create<RubroState>()(set => ({
  activeOrdenTrabajo: null,

  setActiveOrdenTrabajo: value => set({ activeOrdenTrabajo: value }),

  clearAll: () => set({ activeOrdenTrabajo: null }),
}));
