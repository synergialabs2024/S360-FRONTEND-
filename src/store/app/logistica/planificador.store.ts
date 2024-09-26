import { create } from 'zustand';

import { Flota, Planificador, TimeMapPlanificador } from '@/shared';

interface PlanificadoresState {
  selectedFleet: Flota | null;
  setSelectedFleet: (value: Flota | null) => void;

  planificadoresArray: Planificador[];
  setPlanificadoresArray: (value: Planificador[]) => void;

  globalTimeMap: TimeMapPlanificador[];
  setGlobalTimeMap: (value: TimeMapPlanificador[]) => void;
}

export const usePlanificadoresStore = create<PlanificadoresState>()(set => ({
  selectedFleet: null,
  setSelectedFleet: value => set({ selectedFleet: value }),

  planificadoresArray: [],
  setPlanificadoresArray: value => set({ planificadoresArray: value }),

  globalTimeMap: [],
  setGlobalTimeMap: value => set({ globalTimeMap: value }),
}));
