import { SetCodigoOtpInCacheData } from '@/actions/shared/cache-redis-types.interface';
import { Nullable } from '@/shared';
import { create } from 'zustand';

interface PreventaState {
  isOTPGenerated: boolean;
  isOTPVerified: boolean;

  cachedOtpData: Nullable<SetCodigoOtpInCacheData>;

  setIsOTPGenerated: (isOTPGenerated: boolean) => void;
  setIsOTPVerified: (isOTPVerified: boolean) => void;

  setCachedOtpData: (cachedOtpData: Nullable<SetCodigoOtpInCacheData>) => void;
}

export const usePreventaStore = create<PreventaState>(set => ({
  isOTPGenerated: false,
  isOTPVerified: false,

  cachedOtpData: null,

  setIsOTPGenerated: isOTPGenerated => set({ isOTPGenerated }),
  setIsOTPVerified: isOTPVerified => set({ isOTPVerified }),

  setCachedOtpData: cachedOtpData => set({ cachedOtpData }),
}));
