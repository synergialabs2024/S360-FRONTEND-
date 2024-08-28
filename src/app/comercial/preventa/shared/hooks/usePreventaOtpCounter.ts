import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { getCacheRedis } from '@/actions/shared';
import { SetCodigoOtpInCacheData } from '@/actions/shared/cache-redis-types.interface';
import { HTTPResStatusCodeEnum, type CacheResponse } from '@/shared';
import { usePreventaStore } from '@/store/app';
import { useGenericCountdownStore, useUiStore } from '@/store/ui';

export type UsePreventaOtpCounterParams = {
  cackeKey: string;
  counterIdOtp: string;
  counterIdNewOtp: string;
};

export const usePreventaOtpCounter = ({
  cackeKey,
  counterIdOtp,
  counterIdNewOtp,
}: UsePreventaOtpCounterParams) => {
  ///* local state ============================
  const [isMounted, setIsMounted] = useState(false);

  ///* global state ============================
  const setIsGLobalLoading = useUiStore(s => s.setIsGlobalLoading);
  const startTimer = useGenericCountdownStore(s => s.start);
  const clearAll = useGenericCountdownStore(s => s.clearAll);
  const setIsComponentBlocked = usePreventaStore(s => s.setIsComponentBlocked);
  const setCachedOtpData = usePreventaStore(s => s.setCachedOtpData);

  ///* effects ============================
  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  // check cache -------------
  useEffect(() => {
    if (!isMounted) return;

    // check cache
    (async () => {
      setIsGLobalLoading(true);
      const res = await getCacheRedis<CacheResponse<SetCodigoOtpInCacheData>>({
        key: cackeKey,
        showErrorToast: false,
      });
      if (res?.status !== HTTPResStatusCodeEnum.OK || !res?.data) return;

      const data = res?.data as unknown as SetCodigoOtpInCacheData;
      setIsGLobalLoading(false);
      setIsComponentBlocked(true);
      setCachedOtpData(data);

      // start timer -------
      const timerOtp = dayjs(data?.limitTimeOtp).diff(dayjs(), 'second');
      const timerNewOtp = dayjs(data?.limitTimeNewOtp).diff(dayjs(), 'second');
      startTimer(counterIdOtp, timerOtp, () => {
        clearAll();
        setIsComponentBlocked(false);
      });
      startTimer(counterIdNewOtp, timerNewOtp);
    })();
  }, [
    cackeKey,
    counterIdNewOtp,
    counterIdOtp,
    isMounted,
    setIsGLobalLoading,
    setIsComponentBlocked,
    startTimer,
    setCachedOtpData,
    clearAll,
  ]);
};
