import { create } from 'zustand';

import { Planificador } from '@/shared';

interface PlanificadoresState {
  planificadoresArray: Planificador[];
  setPlanificadoresArray: (value: Planificador[]) => void;
}

export const usePlanificadoresStore = create<PlanificadoresState>()(set => ({
  planificadoresArray: [],
  setPlanificadoresArray: value => set({ planificadoresArray: value }),
}));
