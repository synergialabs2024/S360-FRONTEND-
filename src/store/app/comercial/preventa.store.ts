import { create } from 'zustand';

interface PreventaState {
  isOTPGenerated: boolean;
  isOTPVerified: boolean;

  setIsOTPGenerated: (isOTPGenerated: boolean) => void;
  setIsOTPVerified: (isOTPVerified: boolean) => void;
}

export const usePreventaStore = create<PreventaState>(set => ({
  isOTPGenerated: false,
  isOTPVerified: false,

  setIsOTPGenerated: isOTPGenerated => set({ isOTPGenerated }),
  setIsOTPVerified: isOTPVerified => set({ isOTPVerified }),
}));
