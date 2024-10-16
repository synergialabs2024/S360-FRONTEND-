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
  useAgendamientoOperacionesStore,
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
  const watchedZone = form.watch('zona');

  ///* global state ============================
  const setAvailableFleetsByZonePks = useAgendamientoVentasStore(
    s => s.setAvailableFleetsByZonePks,
  );
  const setFleetsByZoneLimitData = useAgendamientoVentasStore(
    s => s.setFleetsByZoneLimitData,
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

  // agenda pyl
  const setEdittingSchedule = useAgendamientoOperacionesStore(
    s => s.setIsEdittingSchedule,
  );

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
    enabled: isMounted && !!watchedZone,
    params: {
      zonas: watchedZone! as any, // filter by pk not [pk]
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

  // Función helper para calcular los slots disponibles
  const calculateAvailableTimeSlots = (
    cacheData: Nullable<InstallScheduleCacheData>,
    timeMapArray: TimeMapPlanificador[],
    startInstallHour: string,
    endInstallHour: string,
    watchedFechaInstalacion: string,
    userId: number,
  ) => {
    // Generación del array de horas
    const hoursArray: string[] = [];
    const startHour = parseInt(startInstallHour);
    const endHour = parseInt(endInstallHour);

    for (let i = startHour; i <= endHour; i += 2) {
      const hourStr = i.toString().padStart(2, '0');
      hoursArray.push(`${hourStr}:00:00`);
    }

    // Obtenemos el tiempo actual para validaciones
    const nowToValidate = dayjs().format();

    // Filtramos las horas disponibles
    const availableTimeMap = hoursArray.filter(hour => {
      // Validación del cacheData -> usuario y hora seleccionada
      if (cacheData?.userId === userId && cacheData?.selectedHour === hour) {
        return true;
      }

      // Validación de block_until
      const blockUntil = timeMapArray.find(tm => tm.hora === hour)?.block_until;
      if (blockUntil) {
        const formattedBlockUntil = dayjs(blockUntil).format();
        if (dayjs(nowToValidate).isBefore(formattedBlockUntil)) return false;
        return true;
      }

      // Validación del estado
      const state = timeMapArray.find(tm => tm.hora === hour)?.estado;
      if (state === SlotAgendamientoEstadosEnumChoice.DESBLOQUEADO) return true;

      // Si no está bloqueado, se incluye
      return !timeMapArray.find(tm => tm.hora === hour);
    });

    // Filtrado basado en la fecha seleccionada y rango de horas
    const finalAvailableTimeMap1 = availableTimeMap.filter(
      hora =>
        dayjs(`${watchedFechaInstalacion} ${hora}`).isAfter(dayjs()) &&
        dayjs(`${watchedFechaInstalacion} ${hora}`).isBefore(
          dayjs(`${watchedFechaInstalacion} ${endInstallHour}`),
        ),
    );

    // Filtrado adicional para excluir slots sin espacio en las próximas 1h30min
    const finalAvailableTimeMap2 = finalAvailableTimeMap1.filter(hora => {
      const nextLimitHour = dayjs(`${watchedFechaInstalacion} ${hora}`)
        .add(1, 'hour')
        .add(30, 'minute')
        .format('HH:mm:ss');

      // Verificamos si no hay slots ocupados en el intervalo
      if (
        !timeMapArray.find(
          tm =>
            tm.hora >= hora &&
            tm.hora <= nextLimitHour &&
            tm.estado &&
            tm?.estado !== SlotAgendamientoEstadosEnumChoice.DESBLOQUEADO,
        )
      ) {
        return true;
      }

      return false;
    });

    // Retornamos el array final de horas disponibles
    return finalAvailableTimeMap2.map(hora => ({ hora, uuid: uuidv4() }));
  };

  useEffect(() => {
    (async () => {
      if (!isMounted || isLoadingPlanificadores || isRefetchingPlanificadores)
        return;

      // Obtén los planificadores de la respuesta de paginación
      const planificadores = planificadoresPagingRes?.data?.items || [];

      // Crea un array de time_map a partir de los planificadores
      const timeMapArray: TimeMapPlanificador[] = planificadores.flatMap(
        pl => pl.time_map || [],
      );

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

        setEdittingSchedule(true); // agenda pyl

        form.setValue('fecha_instalacion', (res.data as any)?.selectedDate);
        form.setValue('flota', (res.data as any)?.flotaId);
        form.setValue('hora_instalacion', (res.data as any)?.selectedHour);
        form.setValue('rawFlota', (res.data as any)?.rawFlota);

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
      } else {
        // TODO: validate this
        setCachedData(null);
        setIsComponentBlocked(false);
        setSelectedHour('');
        setEdittingSchedule(false); // agenda pyl
      }

      // Calculamos las horas disponibles utilizando la función helper
      const availableSlots = calculateAvailableTimeSlots(
        cacheData,
        timeMapArray,
        startInstallHour,
        endInstallHour,
        watchedFechaInstalacion,
        userId!,
      );

      setAvailableTimeMap(availableSlots);

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
      setFleetsByZoneLimitData(
        flotasPagingRes?.data?.items
          ?.map(fleet => ({
            name: fleet?.name,
            id: fleet?.id,
            state: fleet?.state,
            auxiliar_data: fleet?.auxiliar_data,
            lider_data: fleet?.lider_data,
            uuid: fleet?.uuid,
            zonas: fleet?.zonas,
          }))
          .filter(Boolean) || [],
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

    // listen fleet schedule -------
    socket.on('receive_fleet_schedule', (dayPlanificador: Planificador) => {
      if (dayPlanificador?.flota !== watchedFleet) return;
      const cachedData: Nullable<InstallScheduleCacheData> =
        useAgendamientoVentasStore.getState().cachedData;

      const timeMapArray: TimeMapPlanificador[] =
        dayPlanificador?.time_map || [];

      // Calculamos las horas disponibles utilizando la función helper
      const availableSlots = calculateAvailableTimeSlots(
        cachedData,
        timeMapArray,
        startInstallHour,
        endInstallHour,
        watchedFechaInstalacion,
        userId!,
      );

      setAvailableTimeMap(availableSlots);

      console.log('-------------- receive_fleet_schedule --------------', {
        planificador: dayPlanificador,
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
    startInstallHour,
    endInstallHour,
  ]);

  const isCustomLoading =
    isLoadingPlanificadores ||
    isRefetchingPlanificadores ||
    isLoadingFlotas ||
    isRefetchingFlotas;
  useLoaders(isCustomLoading);
};
