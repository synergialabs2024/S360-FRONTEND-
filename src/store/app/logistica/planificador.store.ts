import { create } from 'zustand';

import { Flota, Planificador, TimeMapPlanificador } from '@/shared';
import { PlanificadorEvent } from '@/app/mante-operacion/planificador/shared/components/PlanificadorCalendar';

interface PlanificadoresState {
  selectedFleet: Flota | null;
  setSelectedFleet: (value: Flota | null) => void;

  planificadoresArray: Planificador[];
  setPlanificadoresArray: (value: Planificador[]) => void;

  globalTimeMap: TimeMapPlanificador[];
  setGlobalTimeMap: (value: TimeMapPlanificador[]) => void;

  events: PlanificadorEvent[];
  setEvents: (value: PlanificadorEvent[]) => void;

  // modals
  // selectedEvents: PlanificadorEvent[];
  // setSelectedEvents: (value: PlanificadorEvent[]) => void;
  selectedEvent: PlanificadorEvent | null;
  setSelectedEvent: (value: PlanificadorEvent | null) => void;

  selectedSlots: Date[];
  setSelectedSlots: (value: Date[]) => void;
}

export const usePlanificadoresStore = create<PlanificadoresState>()(set => ({
  selectedFleet: null,
  setSelectedFleet: value => set({ selectedFleet: value }),

  planificadoresArray: [],
  setPlanificadoresArray: value => set({ planificadoresArray: value }),

  globalTimeMap: [],
  setGlobalTimeMap: value => set({ globalTimeMap: value }),

  events: [],
  setEvents: value => set({ events: value }),

  // modals
  selectedEvent: null,
  setSelectedEvent: value => set({ selectedEvent: value }),
  // selectedEvents: [],
  // setSelectedEvents: value => set({ selectedEvents: value }),

  selectedSlots: [],
  setSelectedSlots: value => set({ selectedSlots: value }),
}));
