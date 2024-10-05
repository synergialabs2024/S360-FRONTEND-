import { create } from 'zustand';

import { Agendamiento } from '@/shared';

interface AgendamientoOperacionesState {
  activeAgendamiento: Agendamiento | null;
  setActiveAgendamiento: (value: Agendamiento | null) => void;

  isComponentBlocked: boolean;
  setIsComponentBlocked: (value: boolean) => void;

  // also used with cache if slot is selected
  isEdittingSchedule: boolean;
  setIsEdittingSchedule: (value: boolean) => void;
}

export const useAgendamientoOperacionesStore =
  create<AgendamientoOperacionesState>()(set => ({
    activeAgendamiento: null,
    setActiveAgendamiento: value => set({ activeAgendamiento: value }),

    isComponentBlocked: false,
    setIsComponentBlocked: value => set({ isComponentBlocked: value }),

    isEdittingSchedule: false,
    setIsEdittingSchedule: value => set({ isEdittingSchedule: value }),
  }));
