import { create } from 'zustand';

import { ToastWrapper } from '@/shared/wrappers';

export type GenericInventoryItemsRecord = Record<string, any[]>;

export interface GenericInventoryStoreState {
  items: GenericInventoryItemsRecord;

  selectedRow: any | null;

  setItems: (key: string, items: any[]) => void;

  setSelectedRow: (item: any | null) => void;

  addSelectedItem: (params: {
    item: any;
    keyStore: string;
    idKey: string;
    showToast?: boolean;
  }) => void;

  removeSelectedItem: (params: {
    item: any;
    keyStore: string;
    idKey: string;
  }) => void;

  updateSelectedItemValue: (params: {
    keyStore: string;
    idKey: string;
    updatedItem: any;
  }) => void;

  clearAll: () => void;
  clearOneRecord: (keyStore: string) => void;
}

export const useGenericInventoryStore = create<GenericInventoryStoreState>()(
  (set, get) => ({
    items: {},

    selectedRow: null,

    setItems: (keyStore, items) =>
      set(state => ({
        items: {
          ...state.items,
          [keyStore]: items,
        },
      })),

    setSelectedRow: item => set({ selectedRow: item }),

    addSelectedItem: ({ item, keyStore, idKey, showToast = true }) => {
      const currentItems = get().items[keyStore] || [];
      const itemExists = currentItems.find(
        (i: any) => i[idKey] === item[idKey],
      );
      if (itemExists) {
        ToastWrapper.warning('El item ya ha sido agregado.');
        return;
      }

      set(state => ({
        items: {
          ...state.items,
          [keyStore]: [...currentItems, item],
        },
      }));

      showToast && ToastWrapper.info('Item agregado correctamente.');
    },

    updateSelectedItemValue: ({ keyStore, idKey, updatedItem }) => {
      const currentItems = get().items[keyStore] || [];
      const updatedItems = currentItems.map((i: any) =>
        i[idKey] === updatedItem[idKey] ? { ...i, ...updatedItem } : i,
      );

      set(state => ({
        items: {
          ...state.items,
          [keyStore]: updatedItems,
        },
      }));
    },

    removeSelectedItem: ({ item, keyStore, idKey }) => {
      const currentItems = get().items[keyStore] || [];
      const updatedItems = currentItems.filter(
        (i: any) => i[idKey] !== item[idKey],
      );

      set(state => ({
        items: {
          ...state.items,
          [keyStore]: updatedItems,
        },
      }));
    },

    clearAll: () => {
      set({ items: {} });
    },

    clearOneRecord: keyStore => {
      set(state => {
        const newItems = { ...state.items };
        delete newItems[keyStore];
        return { items: newItems };
      });
    },
  }),
);
