import { create } from 'zustand';

import { Planificador } from '@/shared';

interface AgendamientoVentasState {
  isComponentBlocked: boolean;
  setIsComponentBlocked: (value: boolean) => void;

  planificadoresArray: Planificador[];
  setPlanificadoresArray: (value: Planificador[]) => void;

  availableFleetsByZonePks: number[];
  setAvailableFleetsByZonePks: (value: number[]) => void;

  // schedule
  selectedHour: string; // HH:MM:SS
  setSelectedHour: (value: string) => void;
  selectedDate: string; // YYYY-MM-DD
  setSelectedDate: (value: string) => void;
}

export const useAgendamientoVentasStore = create<AgendamientoVentasState>()(
  set => ({
    isComponentBlocked: false,
    setIsComponentBlocked: value => set({ isComponentBlocked: value }),

    planificadoresArray: [],
    setPlanificadoresArray: value => set({ planificadoresArray: value }),

    availableFleetsByZonePks: [],
    setAvailableFleetsByZonePks: value =>
      set({ availableFleetsByZonePks: value }),

    // schedule
    selectedHour: '',
    setSelectedHour: value => set({ selectedHour: value }),

    selectedDate: '',
    setSelectedDate: value => set({ selectedDate: value }),
  }),
);
