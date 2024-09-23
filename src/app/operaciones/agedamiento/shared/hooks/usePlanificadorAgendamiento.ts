import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
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
import type { SaveFormDataAgendaVentas } from '../components/SaveAgendamiento/SaveAgendamiento';

export type UsePlanificadorAgendamientoParams = {
  cackeKey: string;
  form: UseFormReturn<SaveFormDataAgendaVentas>;
};
export const usePlanificadorAgendamiento = ({
  cackeKey,
  form,
}: UsePlanificadorAgendamientoParams) => {
  ///* local state ============================
  const [isMounted, setIsMounted] = useState<boolean>(false);
  false && console.log('cackeKey', cackeKey);

  ///* form ---------------------
  const watchedFechaInstalacion = form.watch('fecha_instalacion');

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
    enabled: isMounted && !!preventa?.flota && !!watchedFechaInstalacion,
    params: {
      page_size: 900,
      flota: preventa?.flota,
      fecha: watchedFechaInstalacion,

      // initial_date_month: dayjs(watchedFechaInstalacion)
      //   .startOf('week')
      //   .add(1, 'day') // 'cause startOf('week') is sunday
      //   .format('YYYY-MM-DD'),
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

  ///* available time slots ------
  const startInstallHour =
    useParametrosSistemaStore(s => s.systemParametersArray).find(
      param => param?.slug === SystemParamsSlugsEnum.HORA_INICIO_INSTALACIONES,
    )?.value || defaultSystemParamsValues.HORA_INICIO_INSTALACIONES;
  const endInstallHour =
    useParametrosSistemaStore(s => s.systemParametersArray).find(
      param => param?.slug === SystemParamsSlugsEnum.HORA_FIN_INSTALACIONES,
    )?.value || defaultSystemParamsValues.HORA_FIN_INSTALACIONES;

  useEffect(() => {
    if (!isMounted || isLoadingPlanificadores || isFetchingPlanificadores)
      return;

    ///* set available time slots -------
    // Obtén los planificadores de la respuesta de paginación
    const planificadores = planificadoresPagingRes?.data?.items || [];
    setPlanificadoresArray(planificadores);

    // Crea un array de horas entre la hora de inicio y la hora de fin en intervalos de 30 minutos
    const hoursArray: string[] = [];
    const startHour = parseInt(startInstallHour);
    const endHour = parseInt(endInstallHour);

    for (let i = startHour; i <= endHour; i++) {
      const hourStr = i.toString().padStart(2, '0');
      hoursArray.push(`${hourStr}:00:00`);
      if (i < endHour) {
        hoursArray.push(`${hourStr}:30:00`);
      }
    }

    // Crea un mapa de tiempo disponible excluyendo las horas del time_map de los planificadores
    const timeMapSet = new Set(
      planificadores.flatMap(pl => pl.time_map || []).map(tm => tm.hora),
    );
    const availableTimeMap = hoursArray.filter(hour => !timeMapSet.has(hour));

    // Filtra los slots disponibles entre la hora de inicio y la hora de fin considerando la fecha de instalación
    const finalAvailableTimeMap = availableTimeMap.filter(
      hora =>
        dayjs(`${watchedFechaInstalacion} ${hora}`).isAfter(dayjs()) &&
        dayjs(`${watchedFechaInstalacion} ${hora}`).isBefore(
          dayjs(`${watchedFechaInstalacion} ${endInstallHour}`),
        ),
    );

    setAvailableTimeMap(
      finalAvailableTimeMap.map(hora => ({ hora, uuid: uuidv4() })),
    );

    ///* available fleets by zone ------
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
    endInstallHour,
    setAvailableTimeMap,
    startInstallHour,
    watchedFechaInstalacion,
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

  const isCustomLoading =
    isLoadingPlanificadores ||
    isFetchingPlanificadores ||
    isLoadingFlotas ||
    isFetchingFlotas;
  useLoaders(isCustomLoading);
};
