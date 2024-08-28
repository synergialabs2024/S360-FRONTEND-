import { SetCodigoOtpInCacheData } from '@/actions/shared/cache-redis-types.interface';
import { Nullable } from '@/shared';
import { create } from 'zustand';

interface PreventaState {
  isOTPVerified: boolean;
  setIsOTPVerified: (isOTPVerified: boolean) => void;

  cachedOtpData: Nullable<SetCodigoOtpInCacheData>;
  setCachedOtpData: (cachedOtpData: Nullable<SetCodigoOtpInCacheData>) => void;
}

export const usePreventaStore = create<PreventaState>(set => ({
  isOTPGenerated: false,
  isOTPVerified: false,

  cachedOtpData: null,

  setIsOTPVerified: isOTPVerified => set({ isOTPVerified }),

  setCachedOtpData: cachedOtpData => set({ cachedOtpData }),
}));
