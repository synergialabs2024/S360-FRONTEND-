import { create } from 'zustand';

import { Zona } from '@/shared';
import { CoordenadasType } from '@/shared/components/CustomMaps/CustomMap';

type FlotasState = {
  // zones ----------
  zonesObj: Zona[];
  setZonesObj: (zones: Zona[]) => void;
  addZoneObj: (zone: Zona) => void;
  removeZoneObj: (zoneId: number) => void;

  zoneCoords: CoordenadasType[];
  setZoneCoords: (coords: CoordenadasType[]) => void;
};

export const useFlotasStore = create<FlotasState>(set => ({
  // zones ----------
  zonesObj: [],
  setZonesObj: zonesObj => set({ zonesObj }),
  addZoneObj: zone =>
    set(state => ({
      zonesObj: [...state.zonesObj, zone],
    })),
  removeZoneObj: zoneId =>
    set(state => ({
      zonesObj: state.zonesObj.filter(zone => zone.id !== zoneId),
    })),

  zoneCoords: [],
  setZoneCoords: zoneCoords => set({ zoneCoords }),
}));
