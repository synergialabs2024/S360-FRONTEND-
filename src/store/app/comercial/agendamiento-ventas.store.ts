import { create } from 'zustand';

import { Planificador } from '@/shared';

interface AgendamientoVentasState {
  isComponentBlocked: boolean;
  setIsComponentBlocked: (value: boolean) => void;

  planificadoresArray: Planificador[];
  setPlanificadoresArray: (value: Planificador[]) => void;
}

export const useAgendamientoVentasStore = create<AgendamientoVentasState>()(
  set => ({
    isComponentBlocked: false,
    setIsComponentBlocked: value => set({ isComponentBlocked: value }),

    planificadoresArray: [],
    setPlanificadoresArray: value => set({ planificadoresArray: value }),
  }),
);
