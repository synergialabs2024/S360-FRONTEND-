import { ProductosDisponiblesTableType } from '@/app/inventario/ingreso-material/shared/components/SaveIngresoMaterial/SaveIngresoMaterial';
import { ToastWrapper } from '@/shared';
import { create } from 'zustand';

export enum ProductosDisponiblesStoreKey {
  productosDisponibles = 'productosDisponibles',
}

export interface ProductosDisponiblesState {
  productosDisponibles: ProductosDisponiblesTableType[];

  selectedRow: ProductosDisponiblesTableType | null;

  setProductosDisponibles: (productos: ProductosDisponiblesTableType[]) => void;

  setSelectedRow: (row: ProductosDisponiblesTableType | null) => void;

  // operations functions ------
  addSelectedItem: ({
    item,
    keyStore,
    idKey,
    showToast,
    customSuccessAddMessage,
  }: {
    item: ProductosDisponiblesTableType;
    keyStore: ProductosDisponiblesStoreKey;
    idKey?: string;
    showToast?: boolean;
    customSuccessAddMessage?: string;
  }) => void;

  removeSelectedItem: ({
    item,
    keyStore,
    idKey,
  }: {
    item: ProductosDisponiblesTableType;
    keyStore: ProductosDisponiblesStoreKey;
    idKey?: string;
  }) => void;

  updateSelectedItemValue: ({
    keyStore,
    idKey,
    updatedItem,
  }: {
    keyStore: ProductosDisponiblesStoreKey;
    idKey?: string;
    updatedItem: ProductosDisponiblesTableType;
  }) => void;

  clearAll: () => void;
}

export const useProductosStore = create<ProductosDisponiblesState>()(
  (set, get) => ({
    productosDisponibles: [],

    selectedRow: null,

    setProductosDisponibles: items => set({ productosDisponibles: items }),

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
        productosDisponibles: [],
      });
    },
  }),
);
