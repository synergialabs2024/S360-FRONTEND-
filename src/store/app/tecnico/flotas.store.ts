import { create } from 'zustand';

import { Zona } from '@/shared';
import { CoordenadasType } from '@/shared/components/CustomMaps/CustomMap';

type FlotasState = {
  // zones ----------
  zonesPk: number[];
  setZonesPk: (zones: number[]) => void;
  addZonePk: (zone: number) => void;

  zonesObj: Zona[];
  setZonesObj: (zones: Zona[]) => void;
  addZoneObj: (zone: Zona) => void;

  zoneCoords: CoordenadasType[];
  setZoneCoords: (coords: CoordenadasType[]) => void;
};

export const useFlotasStore = create<FlotasState>(set => ({
  // zones ----------
  zonesPk: [],
  zonesObj: [],
  setZonesPk: zonesPk => set({ zonesPk }),
  addZonePk: zone => set(state => ({ zonesPk: [...state.zonesPk, zone] })),
  setZonesObj: zonesObj => set({ zonesObj }),
  addZoneObj: zone => set(state => ({ zonesObj: [...state.zonesObj, zone] })),

  zoneCoords: [],
  setZoneCoords: zoneCoords => set({ zoneCoords }),
}));
