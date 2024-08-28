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
}

export const usePreventaStore = create<PreventaState>(set => ({
  isOTPGenerated: false,
  isOTPVerified: false,

  cachedOtpData: null,

  isComponentBlocked: false,

  setIsOTPVerified: isOTPVerified => set({ isOTPVerified }),

  setCachedOtpData: cachedOtpData => set({ cachedOtpData }),

  setIsComponentBlocked: isComponentBlocked => set({ isComponentBlocked }),
}));
