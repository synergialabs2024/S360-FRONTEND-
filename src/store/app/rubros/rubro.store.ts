import { create } from 'zustand';

import {
  CalendarioFacturacion,
  LineaServicio,
  Nullable,
  Rubro,
  RubroItemData,
} from '@/shared';

export type RubroItemDataType = RubroItemData & {};
type RubroItemStoreType = {
  item: RubroItemDataType;
  idKey?: keyof RubroItemDataType;
};

interface RubroState {
  // rubro -----------------------------
  activeRubro: Nullable<Rubro>;
  setActiveRubro: (value: Nullable<Rubro>) => void;

  calendariosFacturacion: CalendarioFacturacion[];
  setCalendariosFacturacion: (value: CalendarioFacturacion[]) => void;

  // rubro items operations ---
  removeSelectedRubroItem: (data: RubroItemStoreType) => void;
  softDeleteSelectedRubroItem: (data: RubroItemStoreType) => void;
  updateSelectedRubroItemValue: (data: RubroItemStoreType) => void;
  addNewRubroItemLine: (data: RubroItemStoreType) => void;

  activeServiceLine: Nullable<LineaServicio>;
  setActiveServiceLine: (value: Nullable<LineaServicio>) => void;

  clearAll: () => void;
  clearAllMinusSL: () => void;
}

export const useRubroStore = create<RubroState>()(set => ({
  activeRubro: null,
  activeServiceLine: null,
  calendariosFacturacion: [],

  setActiveRubro: value => set({ activeRubro: value }),
  setActiveServiceLine: value => set({ activeServiceLine: value }),
  setCalendariosFacturacion: value => set({ calendariosFacturacion: value }),

  // operations -----------------------------
  removeSelectedRubroItem: ({ item, idKey = 'id' }) => {
    set(state => {
      if (!state.activeRubro) return {};
      return {
        activeRubro: {
          ...state.activeRubro,
          rubro_items_data: (state.activeRubro.rubro_items_data ?? []).filter(
            (i: RubroItemDataType) => i[idKey] !== item[idKey],
          ),
        },
      };
    });
  },
  updateSelectedRubroItemValue: ({ item, idKey = 'id' }) => {
    set(state => {
      if (!state.activeRubro) return {};
      return {
        activeRubro: {
          ...state.activeRubro,
          rubro_items_data: (state.activeRubro.rubro_items_data ?? []).map(
            (i: RubroItemDataType) =>
              i[idKey] === item[idKey] ? { ...i, ...item } : i,
          ),
        },
      };
    });
  },
  addNewRubroItemLine: ({ item }) => {
    set(state => {
      if (!state.activeRubro) return {};
      return {
        activeRubro: {
          ...state.activeRubro,
          rubro_items_data: [
            ...(state.activeRubro.rubro_items_data ?? []),
            item,
          ],
        },
      };
    });
  },
  softDeleteSelectedRubroItem: ({ item, idKey = 'id' }) => {
    // only set state to false
    set(state => {
      if (!state.activeRubro) return {};
      return {
        activeRubro: {
          ...state.activeRubro,
          rubro_items_data: (state.activeRubro.rubro_items_data ?? []).map(
            (i: RubroItemDataType) =>
              i[idKey] === item[idKey] ? { ...i, state: false } : i,
          ),
        },
      };
    });
  },

  clearAll: () =>
    set({
      activeRubro: null,
      activeServiceLine: null,
      calendariosFacturacion: [],
    }),
  clearAllMinusSL: () => set({ activeRubro: null }),
}));
