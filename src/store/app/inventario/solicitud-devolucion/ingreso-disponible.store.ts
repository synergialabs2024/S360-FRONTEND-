import { IngresosDisponiblesTableType } from '@/shared/hooks/app/inventario/solicitud-devolucion/columns/useColumnsIngresosDisponibles';
import { create } from 'zustand';
import { ToastWrapper } from '@/shared';

export enum IngresosDisponiblesStoreKey {
  ingresosDisponibles = 'ingresosDisponibles',
}

export interface IngresosDisponiblesState {
  ingresosDisponibles: IngresosDisponiblesTableType[];

  selectedRow: IngresosDisponiblesTableType | null;

  setIngresosDisponibles: (ingresos: IngresosDisponiblesTableType[]) => void;

  setSelectedRow: (row: IngresosDisponiblesTableType | null) => void;

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
    item: IngresosDisponiblesTableType;
    keyStore: IngresosDisponiblesStoreKey;
    idKey?: string;
    showToast?: boolean;
    customSuccessAddMessage?: string;
  }) => void;

  removeSelectedItem: ({
    item,
    keyStore,
    idKey,
  }: {
    item: IngresosDisponiblesTableType;
    keyStore: IngresosDisponiblesStoreKey;
    idKey?: string;
  }) => void;

  updateSelectedItemValue: ({
    keyStore,
    idKey,
    updatedItem,
  }: {
    keyStore: IngresosDisponiblesStoreKey;
    idKey?: string;
    updatedItem: IngresosDisponiblesTableType;
  }) => void;

  clearAll: () => void;
}

export const useIngresosStore = create<IngresosDisponiblesState>()(
  (set, get) => ({
    ingresosDisponibles: [],

    selectedRow: null,

    setIngresosDisponibles: items => set({ ingresosDisponibles: items }),

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
        ingresosDisponibles: [],
        selectedCategoriaModel: null,
      });
    },

    // helpers ------
    selectedCategoriaModel: null,
    setSelectedCategoriaModel: model => set({ selectedCategoriaModel: model }),
  }),
);
