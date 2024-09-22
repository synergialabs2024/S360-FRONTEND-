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
  otpData: CodigoOtp | null; // persist the data to resend the otp - id in supervisor unlock req
};

// // AGENDAMIENTO VENTAS ==================================
export type SetSelectedScheduleData = {
  selectedSchedule: string;
  selectedHour: string;

  // timestamp to calculate the time left
  limitTimeSelectedHour: string; // timestamp
} | null;
