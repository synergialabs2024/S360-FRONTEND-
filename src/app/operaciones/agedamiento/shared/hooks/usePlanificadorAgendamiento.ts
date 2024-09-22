import { useEffect, useState } from 'react';

import { useFetchFlotas, useFetchPlanificadors } from '@/actions/app';
import { useSocket } from '@/context/SocketContext';
import { Preventa, useLoaders } from '@/shared';
import { useAgendamientoVentasStore } from '@/store/app';

export type UsePlanificadorAgendamientoParams = {
  cackeKey: string;
  preventa: Preventa;
};
export const usePlanificadorAgendamiento = ({
  preventa,
}: UsePlanificadorAgendamientoParams) => {
  ///* local state ============================
  const [isMounted, setIsMounted] = useState<boolean>(false);

  ///* global state ============================
  const setPlanificadoresArray = useAgendamientoVentasStore(
    s => s.setPlanificadoresArray,
  );
  const setAvailableFleetsByZonePks = useAgendamientoVentasStore(
    s => s.setAvailableFleetsByZonePks,
  );

  //* effects ------------------------
  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  ///* socket ============================
  const socket = useSocket();

  // fetch data -------------
  const {
    data: planificadoresPagingRes,
    isLoading: isLoadingPlanificadores,
    isFetching: isFetchingPlanificadores,
  } = useFetchPlanificadors({
    enabled: isMounted && !!preventa?.flota,
    params: {
      page_size: 900,
      flota: preventa?.flota,
      initial_date_month: '2024-09-20',
    },
  });
  const {
    data: flotasPagingRes,
    isLoading: isLoadingFlotas,
    isFetching: isFetchingFlotas,
  } = useFetchFlotas({
    enabled: isMounted && !!preventa?.solicitud_servicio_data?.zona,
    params: {
      zonas: preventa?.solicitud_servicio_data?.zona! as any, // filter by pk not [pk]
    },
  });

  useEffect(() => {
    if (!isMounted) return;

    if (isLoadingPlanificadores || isFetchingPlanificadores) return;
    setPlanificadoresArray(planificadoresPagingRes?.data?.items || []);

    if (isLoadingFlotas || isFetchingFlotas) return;
    setAvailableFleetsByZonePks(
      flotasPagingRes?.data?.items
        .map(item => item.id)
        .filter((id): id is number => id !== undefined) || [],
    );
  }, [
    isMounted,
    isLoadingPlanificadores,
    isFetchingPlanificadores,
    planificadoresPagingRes,
    setPlanificadoresArray,
    isLoadingFlotas,
    isFetchingFlotas,
    flotasPagingRes,
    setAvailableFleetsByZonePks,
  ]);

  useEffect(() => {
    if (!socket || !isMounted || !preventa?.flota) return;

    // register fleet
    socket.emit('register_fleet', preventa.flota);

    // listen fleet schedule
    socket.on('receive_fleet_schedule', (data: any) => {
      console.log('-------------- receive_fleet_schedule --------------', {
        planificador: data,
      });
      if (data?.flota !== preventa?.flota) return;

      setPlanificadoresArray(data?.items || []);
    });

    return () => {
      socket.off('receive_fleet_schedule');
    };
  }, [isMounted, preventa?.flota, setPlanificadoresArray, socket]);

  const isCustomLoading =
    isLoadingPlanificadores ||
    isFetchingPlanificadores ||
    isLoadingFlotas ||
    isFetchingFlotas;
  useLoaders(isCustomLoading);
};
