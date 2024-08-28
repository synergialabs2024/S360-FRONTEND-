import { CodigoOtp } from '@/shared';

export type SetCodigoOtpInCacheData = {
  // timestamp to calculate the time left
  limitTimeOtp: string; // timestamp
  limitTimeNewOtp: string; // timestamp

  otpData: CodigoOtp | null;
} | null;

export type ResendOtpDataCache = {
  limitTimeNewOtp: string; // timestamp
  limitTimeOtp: string; // timestamp to not override the previous timer
};
