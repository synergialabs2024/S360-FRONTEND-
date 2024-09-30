import { create } from 'zustand';

import { Nap } from '@/shared';

interface MapState {
  napsByCoords: Nap[];
  setNapsByCoords: (value: Nap[]) => void;

  isLoadingNaps: boolean;
  setIsLoadingNaps: (value: boolean) => void;

  clearAll: () => void;
}

export const useMapStore = create<MapState>()(set => ({
  napsByCoords: [],
  setNapsByCoords: value => set({ napsByCoords: value }),

  isLoadingNaps: false,
  setIsLoadingNaps: value => set({ isLoadingNaps: value }),

  clearAll: () => set({ napsByCoords: [] }),
}));
