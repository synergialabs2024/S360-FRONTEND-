import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Flota } from '@/shared';

interface PlanificadoresStateLs {
  selectedFleet: Flota | null;
  setSelectedFleet: (value: Flota | null) => void;

  clearAll: () => void;
}

export const usePlanificadorLsStore = create<PlanificadoresStateLs>()(
  persist(
    set => ({
      selectedFleet: null,
      setSelectedFleet: value => set({ selectedFleet: value }),

      clearAll: () => set({ selectedFleet: null }),
    }),

    {
      name: 'planificador-ls',
    },
  ),
);
