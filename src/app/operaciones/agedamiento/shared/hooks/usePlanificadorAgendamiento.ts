import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useFetchFlotas, useFetchPlanificadors } from '@/actions/app';
import { useSocket } from '@/context/SocketContext';
import {
  defaultSystemParamsValues,
  Planificador,
  SystemParamsSlugsEnum,
  useLoaders,
} from '@/shared';
import {
  useAgendamientoVentasStore,
  useParametrosSistemaStore,
} from '@/store/app';
import dayjs from 'dayjs';

export type UsePlanificadorAgendamientoParams = {
  cackeKey: string;
};
export const usePlanificadorAgendamiento = ({
  cackeKey,
}: UsePlanificadorAgendamientoParams) => {
  ///* local state ============================
  const [isMounted, setIsMounted] = useState<boolean>(false);
  false && console.log('cackeKey', cackeKey);

  ///* global state ============================
  const setPlanificadoresArray = useAgendamientoVentasStore(
    s => s.setPlanificadoresArray,
  );
  const setAvailableFleetsByZonePks = useAgendamientoVentasStore(
    s => s.setAvailableFleetsByZonePks,
  );
  const setAvailableTimeMap = useAgendamientoVentasStore(
    s => s.setAvailableTimeMap,
  );
  const preventa = useAgendamientoVentasStore(s => s.activePreventa);

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
      // TODO: filter selected day in calendar
      initial_date_month: dayjs()
        .startOf('week')
        .add(1, 'day') // 'cause startOf('week') is sunday
        .format('YYYY-MM-DD'),
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

    // register fleet -------
    socket.emit('register_fleet', preventa.flota);

    // listen fleet schedule -------
    socket.on('receive_fleet_schedule', (dayPlanificador: Planificador) => {
      if (dayPlanificador?.flota !== preventa?.flota) return;

      // filter becoming time slots from time_map
      const currentAvailableTimeMap =
        useAgendamientoVentasStore.getState().availableTimeMap;
      if (!currentAvailableTimeMap) return;
      const newTimeMap = currentAvailableTimeMap.filter(
        timeSlot =>
          !dayPlanificador.time_map?.find(
            planificadorTimeSlot => planificadorTimeSlot.hora === timeSlot.hora,
          ),
      );
      setAvailableTimeMap(newTimeMap || []);

      // console.log('-------------- receive_fleet_schedule --------------', {
      //   planificador: dayPlanificador,
      // });
    });

    return () => {
      socket.off('receive_fleet_schedule');
    };
  }, [
    isMounted,
    preventa?.flota,
    setPlanificadoresArray,
    socket,
    setAvailableTimeMap,
  ]);

  ///* available time slots ============================
  const startInstallHour =
    useParametrosSistemaStore(s => s.systemParametersArray).find(
      param => param?.slug === SystemParamsSlugsEnum.HORA_INICIO_INSTALACIONES,
    )?.value || defaultSystemParamsValues.HORA_INICIO_INSTALACIONES;
  const endInstallHour =
    useParametrosSistemaStore(s => s.systemParametersArray).find(
      param => param?.slug === SystemParamsSlugsEnum.HORA_FIN_INSTALACIONES,
    )?.value || defaultSystemParamsValues.HORA_FIN_INSTALACIONES;

  useEffect(() => {
    if (!isMounted) return;

    // create array of hours between start and end hour in 30 minutes intervals
    const hoursArray: string[] = [];
    for (
      let i = parseInt(startInstallHour);
      i < parseInt(endInstallHour);
      i++
    ) {
      hoursArray.push(`${i}:00:00`);
      hoursArray.push(`${i}:30:00`);
    }
    hoursArray.push(`${endInstallHour}`);

    setAvailableTimeMap(
      hoursArray.map(hour => ({
        uuid: uuidv4(),
        hora: hour,
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const isCustomLoading =
    isLoadingPlanificadores ||
    isFetchingPlanificadores ||
    isLoadingFlotas ||
    isFetchingFlotas;
  useLoaders(isCustomLoading);
};
