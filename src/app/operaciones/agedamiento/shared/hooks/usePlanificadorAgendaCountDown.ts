import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { getCacheRedis, SetSelectedScheduleData } from '@/actions/shared';
import { CacheResponse, HTTPResStatusCodeEnum } from '@/shared';
import { useAgendamientoVentasStore } from '@/store/app';
import { useGenericCountdownStore, useUiStore } from '@/store/ui';

export type UsePlanificadorAgendaCountDownParams = {
  cackeKey: string;
  counterIdSelectedHour: string;
};
export const usePlanificadorAgendaCountDown = ({
  cackeKey,
  counterIdSelectedHour,
}: UsePlanificadorAgendaCountDownParams) => {
  ///* local state ============================
  const [isMounted, setIsMounted] = useState(false);

  ///* global state ============================
  const setIsGLobalLoading = useUiStore(s => s.setIsGlobalLoading);
  const startTimer = useGenericCountdownStore(s => s.start);
  const clearAll = useGenericCountdownStore(s => s.clearAll);

  const setIsComponentBlocked = useAgendamientoVentasStore(
    s => s.setIsComponentBlocked,
  );

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
      const res = await getCacheRedis<CacheResponse<SetSelectedScheduleData>>({
        key: cackeKey,
        showErrorToast: false,
      });
      if (res?.status !== HTTPResStatusCodeEnum.OK || !res?.data) return;

      const data = res?.data as unknown as SetSelectedScheduleData;
      setIsGLobalLoading(false);
      setIsComponentBlocked(true);

      // start timer -------
      const timerOtp = dayjs(data?.limitTimeSelectedHour).diff(
        dayjs(),
        'second',
      );
      startTimer(counterIdSelectedHour, timerOtp, () => {
        clearAll();
        setIsComponentBlocked(false);
      });
    })();
  }, [
    cackeKey,
    clearAll,
    counterIdSelectedHour,
    isMounted,
    setIsComponentBlocked,
    setIsGLobalLoading,
    startTimer,
  ]);
};
