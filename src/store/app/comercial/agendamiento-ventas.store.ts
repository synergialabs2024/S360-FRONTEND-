import { create } from 'zustand';

import { InstallScheduleCacheData } from '@/actions/app';
import {
  FlotaLimitData,
  Nullable,
  Planificador,
  Preventa,
  TimeMapPlanificador,
} from '@/shared';

interface AgendamientoVentasState {
  activePreventa: Preventa | null;
  setActivePreventa: (value: Preventa | null) => void;

  isComponentBlocked: boolean;
  setIsComponentBlocked: (value: boolean) => void;

  planificadoresArray: Planificador[];
  setPlanificadoresArray: (value: Planificador[]) => void;

  // fleets
  fleetsByZoneLimitData: FlotaLimitData[];
  setFleetsByZoneLimitData: (value: FlotaLimitData[]) => void;

  ///* schedule -------------
  availableTimeMap: TimeMapPlanificador[] | null;
  setAvailableTimeMap: (value: TimeMapPlanificador[] | null) => void;

  selectedHour: string; // HH:MM:SS
  setSelectedHour: (value: string) => void;
  selectedDate: string; // YYYY-MM-DD
  setSelectedDate: (value: string) => void;

  availableFleetsByZonePks: number[];
  setAvailableFleetsByZonePks: (value: number[]) => void;

  //
  cachedData: Nullable<InstallScheduleCacheData>;
  setCachedData: (value: Nullable<InstallScheduleCacheData>) => void;
  // hasStartedTimer: boolean;
  // setHasStartedTimer: (value: boolean) => void;

  clearAll: () => void;
}

export const useAgendamientoVentasStore = create<AgendamientoVentasState>()(
  set => ({
    activePreventa: null,
    setActivePreventa: value => set({ activePreventa: value }),

    isComponentBlocked: false,
    setIsComponentBlocked: value => set({ isComponentBlocked: value }),

    planificadoresArray: [],
    setPlanificadoresArray: value => set({ planificadoresArray: value }),

    // schedule
    availableTimeMap: null,
    setAvailableTimeMap: value => set({ availableTimeMap: value }),

    selectedHour: '',
    setSelectedHour: value => set({ selectedHour: value }),

    selectedDate: '',
    setSelectedDate: value => set({ selectedDate: value }),

    availableFleetsByZonePks: [],
    setAvailableFleetsByZonePks: value =>
      set({ availableFleetsByZonePks: value }),

    cachedData: null,
    setCachedData: value => set({ cachedData: value }),

    fleetsByZoneLimitData: [],
    setFleetsByZoneLimitData: value => set({ fleetsByZoneLimitData: value }),

    clearAll: () =>
      set({
        activePreventa: null,
        isComponentBlocked: false,
        planificadoresArray: [],
        availableTimeMap: null,
        selectedHour: '',
        selectedDate: '',
        availableFleetsByZonePks: [],
        cachedData: null,
        fleetsByZoneLimitData: [],
      }),
  }),
);
