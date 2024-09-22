import { create } from 'zustand';

import { Planificador, Preventa, TimeMapPlanificador } from '@/shared';

interface AgendamientoVentasState {
  activePreventa: Preventa | null;
  setActivePreventa: (value: Preventa | null) => void;

  isComponentBlocked: boolean;
  setIsComponentBlocked: (value: boolean) => void;

  planificadoresArray: Planificador[];
  setPlanificadoresArray: (value: Planificador[]) => void;

  availableFleetsByZonePks: number[];
  setAvailableFleetsByZonePks: (value: number[]) => void;

  ///* schedule -------------
  timeMap: TimeMapPlanificador[] | null;
  setTimeMap: (value: TimeMapPlanificador[] | null) => void;

  selectedHour: string; // HH:MM:SS
  setSelectedHour: (value: string) => void;
  selectedDate: string; // YYYY-MM-DD
  setSelectedDate: (value: string) => void;
}

export const useAgendamientoVentasStore = create<AgendamientoVentasState>()(
  set => ({
    activePreventa: null,
    setActivePreventa: value => set({ activePreventa: value }),

    isComponentBlocked: false,
    setIsComponentBlocked: value => set({ isComponentBlocked: value }),

    planificadoresArray: [],
    setPlanificadoresArray: value => set({ planificadoresArray: value }),

    availableFleetsByZonePks: [],
    setAvailableFleetsByZonePks: value =>
      set({ availableFleetsByZonePks: value }),

    // schedule
    timeMap: null,
    setTimeMap: value => set({ timeMap: value }),

    selectedHour: '',
    setSelectedHour: value => set({ selectedHour: value }),

    selectedDate: '',
    setSelectedDate: value => set({ selectedDate: value }),
  }),
);
