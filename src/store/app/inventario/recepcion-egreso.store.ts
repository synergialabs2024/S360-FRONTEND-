import { create } from 'zustand';
import { ProductosDisponiblesTableType } from '@/shared';

export interface RecepcionEgresoState {
  recepcionEgresos: ProductosDisponiblesTableType[];
  setRecepcionEgresos: (items: ProductosDisponiblesTableType[]) => void;
}

export const useRecepcionEgresoStore = create<RecepcionEgresoState>()(set => ({
  recepcionEgresos: [],
  setRecepcionEgresos: items => set({ recepcionEgresos: items }),
}));
