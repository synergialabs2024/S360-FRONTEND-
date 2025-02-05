import { ProductosDisponiblesTableType } from '@/shared';
import { create } from 'zustand';

export interface RecepcionTransferenciaState {
  recepcionTransferencias: ProductosDisponiblesTableType[];
  setRecepcionTransferencias: (items: ProductosDisponiblesTableType[]) => void;
}

export const useRecepcionTransferenciaStore =
  create<RecepcionTransferenciaState>()(set => ({
    recepcionTransferencias: [],
    setRecepcionTransferencias: items =>
      set({ recepcionTransferencias: items }),
  }));
