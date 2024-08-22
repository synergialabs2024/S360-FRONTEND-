import { create } from 'zustand';

import { CoordenadasType } from '@/shared/components/CustomMaps/CustomMap';

type FlotasState = {
  // zones ----------
  zonesPk: number[];
  setZonesPk: (zones: number[]) => void;
  addZonePk: (zone: number) => void;

  zoneCoords: CoordenadasType[];
  setZoneCoords: (coords: CoordenadasType[]) => void;
};

export const useFlotasStore = create<FlotasState>(set => ({
  // zones ----------
  zonesPk: [],
  setZonesPk: zonesPk => set({ zonesPk }),
  addZonePk: zone => set(state => ({ zonesPk: [...state.zonesPk, zone] })),

  zoneCoords: [],
  setZoneCoords: zoneCoords => set({ zoneCoords }),
}));
