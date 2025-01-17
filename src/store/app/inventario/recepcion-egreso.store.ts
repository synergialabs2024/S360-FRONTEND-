import { create } from 'zustand';
import { UbicacionProductosDisponiblesTableType } from '@/app/inventario/egreso-material/pages/modal/UbicacionProductosDisponiblesModal';

export interface RecepcionEgresoState {
  recepcionEgresos: UbicacionProductosDisponiblesTableType[];
  setRecepcionEgresos: (
    items: UbicacionProductosDisponiblesTableType[],
  ) => void;
}

export const useRecepcionEgresoStore = create<RecepcionEgresoState>()(set => ({
  recepcionEgresos: [],
  setRecepcionEgresos: items => set({ recepcionEgresos: items }),
}));
