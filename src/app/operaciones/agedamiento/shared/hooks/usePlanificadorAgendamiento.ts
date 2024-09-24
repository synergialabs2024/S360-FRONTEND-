import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import {
  InstallScheduleCacheData,
  useFetchFlotas,
  useFetchPlanificadors,
} from '@/actions/app';
import { getCacheRedis } from '@/actions/shared';
import { useSocket } from '@/context/SocketContext';
import {
  CacheResponse,
  defaultSystemParamsValues,
  HTTPResStatusCodeEnum,
  Planificador,
  SystemParamsSlugsEnum,
  TimeMapPlanificador,
  useLoaders,
} from '@/shared';
import { reorderOptionsPks } from '@/shared/helpers';
import {
  useAgendamientoVentasStore,
  useParametrosSistemaStore,
} from '@/store/app';
import { useAuthStore } from '@/store/auth';
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
  const watchedFleet = form.watch('flota');

  ///* global state ============================
  const setAvailableFleetsByZonePks = useAgendamientoVentasStore(
    s => s.setAvailableFleetsByZonePks,
  );
  const setAvailableTimeMap = useAgendamientoVentasStore(
    s => s.setAvailableTimeMap,
  );
  const preventa = useAgendamientoVentasStore(s => s.activePreventa);
  const setSelectedDate = useAgendamientoVentasStore(s => s.setSelectedDate);
  const userId = useAuthStore(s => s.user?.id);
  const setIsComponentBlocked = useAgendamientoVentasStore(
    s => s.setIsComponentBlocked,
  );
  const setSelectedHour = useAgendamientoVentasStore(s => s.setSelectedHour);

  //* effects ------------------------
  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);
  // upd selected date to have value in ConfirmInstallScheduleVentasModal
  useEffect(() => {
    if (!isMounted || !watchedFechaInstalacion) return;

    setSelectedDate(watchedFechaInstalacion);
  }, [isMounted, setSelectedDate, watchedFechaInstalacion]);

  ///* socket ============================
  const socket = useSocket();

  // fetch data -------------
  const {
    data: planificadoresPagingRes,
    isLoading: isLoadingPlanificadores,
    isFetching: isRefetchingPlanificadores,
  } = useFetchPlanificadors({
    enabled: isMounted && !!watchedFleet && !!watchedFechaInstalacion,
    params: {
      page_size: 900,
      flota: watchedFleet,
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
    isRefetching: isRefetchingFlotas,
  } = useFetchFlotas({
    enabled: isMounted && !!preventa?.solicitud_servicio_data?.zona,
    params: {
      zonas: preventa?.solicitud_servicio_data?.zona! as any, // filter by pk not [pk]
      page_size: 900,
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
    (async () => {
      if (!isMounted || isLoadingPlanificadores || isRefetchingPlanificadores)
        return;

      ///* set available time slots -------
      // Obtén los planificadores de la respuesta de paginación
      const planificadores = planificadoresPagingRes?.data?.items || [];
      // setPlanificadoresArray(planificadores);

      // Crea un array de horas entre la hora de inicio y la hora de fin en intervalos de 2h
      const hoursArray: string[] = [];
      const startHour = parseInt(startInstallHour);
      const endHour = parseInt(endInstallHour);

      for (let i = startHour; i <= endHour; i += 2) {
        const hourStr = i.toString().padStart(2, '0');
        hoursArray.push(`${hourStr}:00:00`);
      }

      // check cache --------
      let cacheData: InstallScheduleCacheData | null = null;
      const res = await getCacheRedis<CacheResponse<InstallScheduleCacheData>>({
        key: cackeKey!,
        showErrorToast: false,
      });
      if (res?.status === HTTPResStatusCodeEnum.OK || res?.data) {
        cacheData = res.data as unknown as InstallScheduleCacheData;
        console.log('cacheData', cacheData);
        setIsComponentBlocked(true);
        setSelectedHour((res.data as any)?.selectedHour);
      }

      // Crea un mapa de tiempo disponible excluyendo las horas del time_map de los planificadores
      const timeMapArray: TimeMapPlanificador[] = planificadores.flatMap(
        pl => pl.time_map || [],
      );
      const nownToValidate = dayjs().format();
      const availableTimeMap = hoursArray.filter(hour => {
        // si el cacheData?.userId = userId, no se filtra la hora que sea igual al cacheData?.selectedHour aunque esté en timeMapArray
        if (cacheData?.userId === userId && cacheData?.selectedHour === hour) {
          return true;
        }

        // validar el block_until (timestamp). Si el block_until es mayor al timestamp actual, se bloquea la hora, es decir se filtra y no se muestra
        const blockUntil = timeMapArray.find(
          tm => tm.hora === hour,
        )?.block_until;
        if (blockUntil) {
          const formattedBlockUntil = dayjs(blockUntil).format();
          console.log('--------------blockUntil --------------', {
            blockUntil: !!blockUntil && dayjs(blockUntil).format(),
            formattedBlockUntil,
            hour,
            nownToValidate,
          });

          if (dayjs(nownToValidate).isBefore(formattedBlockUntil)) return false;

          return true;
        }

        return !timeMapArray.find(tm => tm.hora === hour);
      });

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
      if (isLoadingFlotas || isRefetchingFlotas) return;
      setAvailableFleetsByZonePks(
        reorderOptionsPks({
          optionsPks:
            flotasPagingRes?.data?.items
              .map(item => item.id)
              .filter((id): id is number => id !== undefined) || [],
          flotaPk: preventa?.flota || 0,
        }),
      );
    })();
  }, [
    isMounted,
    isLoadingPlanificadores,
    isRefetchingPlanificadores,
    planificadoresPagingRes,
    isLoadingFlotas,
    isRefetchingFlotas,
    flotasPagingRes,
    setAvailableFleetsByZonePks,
    endInstallHour,
    setAvailableTimeMap,
    startInstallHour,
    watchedFechaInstalacion,
    watchedFleet,
    preventa?.flota,
    cackeKey,
    userId,
    setIsComponentBlocked,
    setSelectedHour,
  ]);

  useEffect(() => {
    if (!socket || !isMounted || !watchedFleet) return;

    // register fleet -------
    socket.emit('register_fleet', watchedFleet);
    // console.log('-------------- register_fleet --------------', {
    //   fleet: watchedFleet,
    // });

    // listen fleet schedule -------
    socket.on('receive_fleet_schedule', (dayPlanificador: Planificador) => {
      if (dayPlanificador?.flota !== watchedFleet) return;

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
  }, [isMounted, socket, setAvailableTimeMap, watchedFleet]);

  const isCustomLoading =
    isLoadingPlanificadores ||
    isRefetchingPlanificadores ||
    isLoadingFlotas ||
    isRefetchingFlotas;
  useLoaders(isCustomLoading);

  // no return anything 'cause each hook import is a side effect (2 registers fleet)
};
