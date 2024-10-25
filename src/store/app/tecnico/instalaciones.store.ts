import { create } from 'zustand';

import { EquiposUtilizadosOTTableType } from '@/app/tecnico/install-asignada/shared/components/form';
import { ToastWrapper } from '@/shared';

export enum InstalacionesStoreKey {
  equiposUtilizados = 'equiposUtilizados',
  materialesUtilizados = 'materialesUtilizados',
}

export interface InstalacionesState {
  equiposUtilizados: EquiposUtilizadosOTTableType[];
  materialesUtilizados: any[];

  selectedRow: EquiposUtilizadosOTTableType | null;

  setEquiposUtilizados: (equipos: EquiposUtilizadosOTTableType[]) => void;
  setMaterialesUtilizados: (materiales: any[]) => void;

  setSelectedRow: (row: EquiposUtilizadosOTTableType | null) => void;

  // operations functions ------
  addSelectedItem: ({
    item,
    keyStore,
    idKey,
    showToast,
  }: {
    item: EquiposUtilizadosOTTableType;
    keyStore: InstalacionesStoreKey;
    idKey?: string;
    showToast?: boolean;
  }) => void;

  removeSelectedItem: ({
    item,
    keyStore,
    idKey,
  }: {
    item: EquiposUtilizadosOTTableType;
    keyStore: InstalacionesStoreKey;
    idKey?: string;
  }) => void;

  updateSelectedItemValue: ({
    keyStore,
    idKey,
    updatedItem,
  }: {
    keyStore: InstalacionesStoreKey;
    idKey?: string;
    updatedItem: EquiposUtilizadosOTTableType;
  }) => void;

  clearAll: () => void;
}

export const useInstalacionesStore = create<InstalacionesState>()(
  (set, get) => ({
    equiposUtilizados: [],
    materialesUtilizados: [],

    selectedRow: null,

    setEquiposUtilizados: items => set({ equiposUtilizados: items }),
    setMaterialesUtilizados: items => set({ materialesUtilizados: items }),

    setSelectedRow: item => set({ selectedRow: item }),

    addSelectedItem: ({ item, keyStore, idKey = 'id', showToast = true }) => {
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

      showToast && ToastWrapper.info('Item agregado correctamente.');
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
        equiposUtilizados: [],
        materialesUtilizados: [],
      });
    },
  }),
);
