import { useEffect, useState } from 'react';

// import { useSocket } from '@/context/SocketContext';
// import { useUiStore } from '@/store/ui';

export type UsePlanificadorAgendamientoParams = {
  cackeKey: string;
};
export const usePlanificadorAgendamiento = () => {
  ///* local state ============================
  const [isMounted, setIsMounted] = useState<boolean>(false);

  ///* global state ============================
  // const setIsGLobalLoading = useUiStore(s => s.setIsGlobalLoading);

  //* effects ------------------------
  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  ///* socket ============================
  // const socket = useSocket();

  useEffect(() => {
    if (!isMounted) return;

    (async () => {
      console.log('usePlanificadorAgendamiento');
    })();
  }, [isMounted]);
};
