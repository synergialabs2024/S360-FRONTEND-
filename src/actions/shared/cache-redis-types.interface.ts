import { CodigoOtp } from '@/shared';
import { CounterType } from '@/store/ui';

export type SetCodigoOtpInCacheData = {
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
