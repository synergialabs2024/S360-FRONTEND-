import { create } from 'zustand';

import { SetCodigoOtpInCacheData } from '@/actions/shared/cache-redis-types.interface';
import { Nullable } from '@/shared';

interface PreventaState {
  isOTPVerified: boolean;
  setIsOTPVerified: (isOTPVerified: boolean) => void;

  cachedOtpData: Nullable<SetCodigoOtpInCacheData>;
  setCachedOtpData: (cachedOtpData: Nullable<SetCodigoOtpInCacheData>) => void;

  isComponentBlocked: boolean;
  setIsComponentBlocked: (isComponentBlocked: boolean) => void;

  // equipos venta en generic inventory --------------------
  scoreServicio: string | null;
  setScoreServicio: (scoreServicio: string | null) => void;
  selectedCuotas: number; // global to all selected equipos venta
  setSelectedCuotas: (selectedCuotas: number) => void;

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
  selectedCuotas: 1,
  setSelectedCuotas: selectedCuotas => set({ selectedCuotas }),

  clearAll: () =>
    set({
      isOTPVerified: false,
      cachedOtpData: null,
      isComponentBlocked: false,

      scoreServicio: null,
      selectedCuotas: 1,
    }),
}));
