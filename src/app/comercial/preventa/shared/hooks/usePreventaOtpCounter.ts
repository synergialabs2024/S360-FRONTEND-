import { useEffect, useState } from 'react';

import { getCacheRedis } from '@/actions/shared';
import { SetCodigoOtpInCacheData } from '@/actions/shared/cache-redis-types.interface';
import type { CacheResponse } from '@/shared';
import { useUiStore } from '@/store/ui';

export type UsePreventaOtpCounterParams = {
  cackeKey: string;
};

export const usePreventaOtpCounter = ({
  cackeKey,
}: UsePreventaOtpCounterParams) => {
  ///* local state ============================
  const [isMounted, setIsMounted] = useState(false);

  ///* global state ============================
  const setIsGLobalLoading = useUiStore(s => s.setIsGlobalLoading);

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
      const data = res?.data;
      console.log('data', data);
      setIsGLobalLoading(false);
    })();
  }, [cackeKey, isMounted, setIsGLobalLoading]);
};
