import { SetCodigoOtpInCacheData } from '@/actions/shared/cache-redis-types.interface';
import { Nullable } from '@/shared';
import { create } from 'zustand';

interface PreventaState {
  isOTPVerified: boolean;
  setIsOTPVerified: (isOTPVerified: boolean) => void;

  cachedOtpData: Nullable<SetCodigoOtpInCacheData>;
  setCachedOtpData: (cachedOtpData: Nullable<SetCodigoOtpInCacheData>) => void;

  isComponentBlocked: boolean;
  setIsComponentBlocked: (isComponentBlocked: boolean) => void;

  // equipos venta --------------------
  scoreServicio: string | null;
  setScoreServicio: (scoreServicio: string | null) => void;
  selectedEquiposVenta: any[];
  setSelectedEquiposVenta: (selectedEquiposVenta: any[]) => void;

  clearAll: () => void;
}

export const usePreventaStore = create<PreventaState>(set => ({
  isOTPGenerated: false,
  isOTPVerified: false,

  cachedOtpData: null,

  isComponentBlocked: false,

  setIsOTPVerified: isOTPVerified => set({ isOTPVerified }),

  setCachedOtpData: cachedOtpData => set({ cachedOtpData }),

  setIsComponentBlocked: isComponentBlocked => set({ isComponentBlocked }),

  // equipos venta --------------------
  scoreServicio: null,
  setScoreServicio: scoreServicio => set({ scoreServicio }),
  selectedEquiposVenta: [],
  setSelectedEquiposVenta: selectedEquiposVenta =>
    set({ selectedEquiposVenta }),

  clearAll: () =>
    set({
      isOTPVerified: false,
      cachedOtpData: null,
      isComponentBlocked: false,
    }),
}));
