import { Zona } from '@/shared/interfaces';
import { create } from 'zustand';

type FlotasState = {
  // zones ----------
  zonesObj: Zona[];
  savedZonesObj: Zona[];
  setZonesObj: (zones: Zona[]) => void;
  addZoneObj: (zone: Zona) => void;
  removeZoneObj: (zoneId: number) => void;
  clearZonesObj: () => void;

  // saved zones ----------
  setSavedZonesObj: (zones: Zona[]) => void;
  addSavedZoneObj: (zone: Zona) => void;
  removeSavedZoneObj: (zoneId: number) => void;
  clearSavedZonesObj: () => void;
};

export const useFlotasStore = create<FlotasState>((set, get) => ({
  // zones ----------
  zonesObj: [],
  savedZonesObj: [],
  setZonesObj: zonesObj => set({ zonesObj }),
  addZoneObj: zone =>
    set(state => ({
      zonesObj: [...state.zonesObj, zone],
    })),
  removeZoneObj: zoneId =>
    set(state => ({
      zonesObj: state.zonesObj.filter(zone => zone.id !== zoneId),
    })),
  clearZonesObj: () => set({ zonesObj: [] }),

  // saved zones ----------
  setSavedZonesObj: savedZonesObj => set({ savedZonesObj }),
  addSavedZoneObj: zone =>
    set(state => ({
      savedZonesObj: [...state.savedZonesObj, zone],
      zonesObj: state.zonesObj.filter(z => z.id !== zone.id), // Remove from zonesObj
    })),

  removeSavedZoneObj: zoneId => {
    const { savedZonesObj } = get();
    const newSavedZonesObj = savedZonesObj.filter(zone => zone.id !== zoneId);
    set({ savedZonesObj: newSavedZonesObj });

    // add back to zonesObj
    const zone = savedZonesObj.find(z => z.id === zoneId);
    if (zone) {
      set(state => ({
        zonesObj: [...state.zonesObj, zone],
      }));
    }
  },

  clearSavedZonesObj: () => set({ savedZonesObj: [] }),
}));
