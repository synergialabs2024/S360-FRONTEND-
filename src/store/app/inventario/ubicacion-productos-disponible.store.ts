import { ToastWrapper, UbicacionProducto } from '@/shared';
import { create } from 'zustand';

export enum UbicacionProductosDisponiblesStoreKey {
  ubicacionProductosDisponibles = 'ubicacionProductosDisponibles',
}

export type UbicacionProductosDisponiblesTableType = UbicacionProducto & {
  cantidad?: number;
  series?: any[];
  serie?: any[];
  productos?: string[];
  categoria_data?: string[];
};

export interface UbicacionProductosDisponiblesState {
  ubicacionProductosDisponibles: UbicacionProductosDisponiblesTableType[];

  selectedRow: UbicacionProductosDisponiblesTableType | null;

  setUbicacionProductosDisponibles: (
    ubicacionproductos: UbicacionProductosDisponiblesTableType[],
  ) => void;

  setSelectedRow: (row: UbicacionProductosDisponiblesTableType | null) => void;

  // helpers ------
  selectedCategoriaModel: string | null;
  setSelectedCategoriaModel: (model: string | null) => void;

  // operations functions ------
  addSelectedItem: ({
    item,
    keyStore,
    idKey,
    showToast,
    customSuccessAddMessage,
  }: {
    item: UbicacionProductosDisponiblesTableType;
    keyStore: UbicacionProductosDisponiblesStoreKey;
    idKey?: string;
    showToast?: boolean;
    customSuccessAddMessage?: string;
  }) => void;

  removeSelectedItem: ({
    item,
    keyStore,
    idKey,
  }: {
    item: UbicacionProductosDisponiblesTableType;
    keyStore: UbicacionProductosDisponiblesStoreKey;
    idKey?: string;
  }) => void;

  updateSelectedItemValue: ({
    keyStore,
    idKey,
    updatedItem,
  }: {
    keyStore: UbicacionProductosDisponiblesStoreKey;
    idKey?: string;
    updatedItem: UbicacionProductosDisponiblesTableType;
  }) => void;

  clearAll: () => void;
}

export const useUbicacionProductosStore =
  create<UbicacionProductosDisponiblesState>()((set, get) => ({
    ubicacionProductosDisponibles: [],

    selectedRow: null,

    setUbicacionProductosDisponibles: items =>
      set({ ubicacionProductosDisponibles: items }),

    setSelectedRow: item => set({ selectedRow: item }),

    addSelectedItem: ({
      item,
      keyStore,
      idKey = 'id',
      showToast = true,
      customSuccessAddMessage = 'Item agregado correctamente.',
    }) => {
      const itemExists = get()[keyStore].find(
        (i: any) => i[idKey as any] === (item as any)[idKey as any],
      );
      if (itemExists) {
        ToastWrapper.warning('El item ya ha sido agregado.');
        return;
      }

      // add item to store
      set({
        [keyStore]: [...get()[keyStore], item],
      });

      showToast && ToastWrapper.info(customSuccessAddMessage);
    },

    updateSelectedItemValue: ({ keyStore, idKey = 'id', updatedItem }) => {
      const items = get()[keyStore].map((i: any) =>
        i[idKey as any] === (updatedItem as any)[idKey as any]
          ? { ...i, ...updatedItem }
          : i,
      );

      set({
        [keyStore]: items,
      });
    },

    removeSelectedItem: ({ item, keyStore, idKey = 'id' }) => {
      const items = get()[keyStore].filter(
        (i: any) => i[idKey as any] !== (item as any)[idKey as any],
      );

      set({
        [keyStore]: items,
      });
    },

    clearAll: () => {
      set({
        ubicacionProductosDisponibles: [],
        selectedCategoriaModel: null,
      });
    },

    // helpers ------
    selectedCategoriaModel: null,
    setSelectedCategoriaModel: model => set({ selectedCategoriaModel: model }),
  }));
