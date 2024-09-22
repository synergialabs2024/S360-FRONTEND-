import { create } from 'zustand';

interface AgendamientoVentasState {
  isComponentBlocked: boolean;
  setIsComponentBlocked: (value: boolean) => void;
}

export const useAgendamientoVentasStore = create<AgendamientoVentasState>()(
  set => ({
    isComponentBlocked: false,
    setIsComponentBlocked: value => set({ isComponentBlocked: value }),
  }),
);
