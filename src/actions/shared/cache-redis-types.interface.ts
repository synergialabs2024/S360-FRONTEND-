import { CodigoOtp } from '@/shared';
import { CounterType } from '@/store/ui';

export type SetCodigoOtpInCacheData = {
  limitTimeOtp: string; // timestamp
  limitTimeNewOtp: string; // timestamp

  otpCode: string | null;

  counterOtp: {
    counter: CounterType;
    actualCount: number;
  } | null;

  counterNewOtp: {
    counter: CounterType;
    actualCount: number;
  } | null;

  otpData: CodigoOtp | null;
} | null;
