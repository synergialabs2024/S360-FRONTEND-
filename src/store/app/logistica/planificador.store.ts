import { create } from 'zustand';

import { Planificador, TimeMapPlanificador } from '@/shared';

interface PlanificadoresState {
  planificadoresArray: Planificador[];
  setPlanificadoresArray: (value: Planificador[]) => void;

  globalTimeMap: TimeMapPlanificador[];
  setGlobalTimeMap: (value: TimeMapPlanificador[]) => void;
}

export const usePlanificadoresStore = create<PlanificadoresState>()(set => ({
  planificadoresArray: [],
  setPlanificadoresArray: value => set({ planificadoresArray: value }),

  globalTimeMap: [],
  setGlobalTimeMap: value => set({ globalTimeMap: value }),
}));
