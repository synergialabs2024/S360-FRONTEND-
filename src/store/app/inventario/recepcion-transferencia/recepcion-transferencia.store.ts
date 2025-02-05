import { create } from 'zustand';
import { UbicacionProductosDisponiblesTableType } from '@/app/inventario/egreso-material/pages/modal/UbicacionProductosDisponiblesModal';

export interface RecepcionTransferenciaState {
  recepcionTransferencias: UbicacionProductosDisponiblesTableType[];
  setRecepcionTransferencias: (
    items: UbicacionProductosDisponiblesTableType[],
  ) => void;
}

export const useRecepcionTransferenciaStore =
  create<RecepcionTransferenciaState>()(set => ({
    recepcionTransferencias: [],
    setRecepcionTransferencias: items =>
      set({ recepcionTransferencias: items }),
  }));
