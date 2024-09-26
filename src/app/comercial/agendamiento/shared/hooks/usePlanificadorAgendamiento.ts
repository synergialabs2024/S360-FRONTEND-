import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import {
  COUNTDOWN_AGENDA_VENTAS_ID,
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
  Nullable,
  Planificador,
  SlotAgendamientoEstadosEnumChoice,
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
import { useGenericCountdownStore } from '@/store/ui';
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
  const setCachedData = useAgendamientoVentasStore(s => s.setCachedData);
  const startTimer = useGenericCountdownStore(s => s.start);

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

      ///* set available time slots --------------------------
      // Obtén los planificadores de la respuesta de paginación
      const planificadores = planificadoresPagingRes?.data?.items || [];

      // Crea un array de horas entre la hora de inicio y la hora de fin en intervalos de 2h
      const hoursArray: string[] = [];
      const startHour = parseInt(startInstallHour);
      const endHour = parseInt(endInstallHour);

      for (let i = startHour; i <= endHour; i += 2) {
        const hourStr = i.toString().padStart(2, '0');
        hoursArray.push(`${hourStr}:00:00`);
      }

      ///* check cache --------------------------
      let cacheData: InstallScheduleCacheData | null = null;
      const res = await getCacheRedis<CacheResponse<InstallScheduleCacheData>>({
        key: cackeKey!,
        showErrorToast: false,
      });
      if (res?.status === HTTPResStatusCodeEnum.OK || res?.data) {
        cacheData = res.data as unknown as InstallScheduleCacheData;
        setCachedData(cacheData);
        setIsComponentBlocked(true);
        setSelectedHour((res.data as any)?.selectedHour);

        form.setValue('fecha_instalacion', (res.data as any)?.selectedDate);
        form.setValue('flota', (res.data as any)?.flotaId);
        form.setValue('hora_instalacion', (res.data as any)?.selectedHour);

        // start timer ------------
        const timerOtp = dayjs((res.data as any)?.limitDate).diff(
          dayjs(),
          'second',
        );

        startTimer(
          COUNTDOWN_AGENDA_VENTAS_ID,
          timerOtp,
          // custom clear cb
          async () => {
            useGenericCountdownStore.getState().clearAll();
            useAgendamientoVentasStore.getState().setCachedData(null);
            setIsComponentBlocked(false);
          },
        );
      }

      ///* Crea un mapa de tiempo disponible excluyendo las horas del time_map de los planificadores ---------------------------------------
      const timeMapArray: TimeMapPlanificador[] = planificadores.flatMap(
        pl => pl.time_map || [],
      );
      const nownToValidate = dayjs().format();
      const availableTimeMap = hoursArray.filter(hour => {
        // validate cacheData (userId and selectedHour) --------c
        if (cacheData?.userId === userId && cacheData?.selectedHour === hour) {
          return true;
        }

        // validate block_until (timestamp)
        const blockUntil = timeMapArray.find(
          tm => tm.hora === hour,
        )?.block_until;
        if (blockUntil) {
          const formattedBlockUntil = dayjs(blockUntil).format();
          if (dayjs(nownToValidate).isBefore(formattedBlockUntil)) return false;

          return true;
        }

        // if state is DESBLOQUEADO, no filter
        const state = timeMapArray.find(tm => tm.hora === hour)?.estado;
        if (state === SlotAgendamientoEstadosEnumChoice.DESBLOQUEADO)
          return true;

        return !timeMapArray.find(tm => tm.hora === hour);
      });

      // filter based on the selected date and the time range -----------
      const finalAvailableTimeMap1 = availableTimeMap.filter(
        hora =>
          dayjs(`${watchedFechaInstalacion} ${hora}`).isAfter(dayjs()) &&
          dayjs(`${watchedFechaInstalacion} ${hora}`).isBefore(
            dayjs(`${watchedFechaInstalacion} ${endInstallHour}`),
          ),
      );

      // filter slots that NO have a slot in the next 1h30min -----------
      const finalAvailableTimeMap2 = finalAvailableTimeMap1.filter(hora => {
        const nextLimitHour = dayjs(`${watchedFechaInstalacion} ${hora}`)
          .add(1, 'hour')
          .add(30, 'minute')
          .format('HH:mm:ss');

        // if there is NO slot between the current hour and the next 1h30min, return true
        if (
          !timeMapArray.find(
            tm =>
              tm.hora >= hora &&
              tm.hora <= nextLimitHour &&
              tm.estado !== SlotAgendamientoEstadosEnumChoice.DESBLOQUEADO,
          )
        ) {
          return true;
        }

        return false;
      });

      setAvailableTimeMap(
        finalAvailableTimeMap2.map(hora => ({ hora, uuid: uuidv4() })),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setCachedData,
    startTimer,
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
      const cachedData: Nullable<InstallScheduleCacheData> =
        useAgendamientoVentasStore.getState().cachedData;

      // filter becoming time slots from time_map
      const currentAvailableTimeMap =
        useAgendamientoVentasStore.getState().availableTimeMap;
      if (!currentAvailableTimeMap) return;
      const newTimeMap = currentAvailableTimeMap.filter(timeSlot => {
        // si el cacheData?.userId = userId, no se filtra la hora que sea igual al cacheData?.selectedHour aunque esté en timeMapArray
        if (
          cachedData?.userId === userId &&
          cachedData?.selectedHour === timeSlot.hora
        ) {
          return true;
        }

        // validar el block_until (timestamp). Si el block_until es mayor al timestamp actual, se bloquea la hora, es decir se filtra y no se muestra
        const blockUntil = dayPlanificador.time_map?.find(
          tm => tm.hora === timeSlot.hora,
        )?.block_until;
        if (blockUntil) {
          const formattedBlockUntil = dayjs(blockUntil).format();
          if (dayjs().isBefore(formattedBlockUntil)) return false;

          return true;
        }

        // if state is DESBLOQUEADO, no filter
        const state = dayPlanificador.time_map?.find(
          tm => tm.hora === timeSlot.hora,
        )?.estado;
        if (state === SlotAgendamientoEstadosEnumChoice.DESBLOQUEADO)
          return true;

        return !dayPlanificador.time_map?.find(
          planificadorTimeSlot => planificadorTimeSlot.hora === timeSlot.hora,
        );
      });

      // filter slots that NO have a slot in the next 1h30min -----------
      const newFinalTimeMap = newTimeMap.filter(hora => {
        const nextLimitHour = dayjs(`${watchedFechaInstalacion} ${hora}`)
          .add(1, 'hour')
          .add(30, 'minute')
          .format('HH:mm:ss');

        // if there is NO slot between the current hour and the next 1h30min, return true
        if (
          !dayPlanificador.time_map?.find(
            tm =>
              tm.hora >= hora?.hora &&
              tm.hora <= nextLimitHour &&
              tm.estado !== SlotAgendamientoEstadosEnumChoice.DESBLOQUEADO,
          )
        ) {
          return true;
        }

        return false;
      });

      setAvailableTimeMap(newFinalTimeMap || []);

      console.log('-------------- receive_fleet_schedule --------------', {
        planificador: dayPlanificador,
        cachedData,
        newFinalTimeMap,
      });
    });

    return () => {
      socket.off('receive_fleet_schedule');
    };
  }, [
    isMounted,
    socket,
    setAvailableTimeMap,
    watchedFleet,
    userId,
    watchedFechaInstalacion,
  ]);

  const isCustomLoading =
    isLoadingPlanificadores ||
    isRefetchingPlanificadores ||
    isLoadingFlotas ||
    isRefetchingFlotas;
  useLoaders(isCustomLoading);

  // no return anything 'cause each hook import is a side effect (2 registers fleet)
};
