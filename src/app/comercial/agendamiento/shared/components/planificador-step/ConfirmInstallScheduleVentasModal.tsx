import dayjs from 'dayjs';
import { UseFormReturn } from 'react-hook-form';

import {
  CacheBaseKeysPreventaEnum,
  COUNTDOWN_AGENDA_VENTAS_ID,
  InstallScheduleCacheData,
  TempBlockPlanificadorData,
  usePostPlanificador,
} from '@/actions/app';
import { useSetCacheRedis } from '@/actions/shared';
import { Planificador, TimerAgendamientoCacheEnum } from '@/shared';
import { CustomConfirmDialogProps } from '@/shared/components';
import { ToastSeverityEnum } from '@/shared/interfaces/ui/alerts.interface';
import { useAgendamientoVentasStore } from '@/store/app';
import { useAuthStore } from '@/store/auth';
import { useGenericCountdownStore } from '@/store/ui';
import type { SaveFormDataAgendaVentas } from '../SaveAgendamiento/SaveAgendamiento';

export type ConfirmInstallScheduleVentasModalProps = {
  isOpen: boolean;
  onClose: () => void;

  preventaId: number;
  preventaUUID: string;
  cackeKeyBase: CacheBaseKeysPreventaEnum;
  form: UseFormReturn<SaveFormDataAgendaVentas>;
};

const ConfirmInstallScheduleVentasModal: React.FC<
  ConfirmInstallScheduleVentasModalProps
> = ({ isOpen, onClose, form, preventaId, preventaUUID }) => {
  ///* form ---------------------
  const watchFechaInstalacion = form.watch('fecha_instalacion');
  const watchFlota = form.watch('flota');

  ///* global state ---------------------
  const selectedHour = useAgendamientoVentasStore(s => s.selectedHour);
  const user = useAuthStore(s => s.user);
  const startTimer = useGenericCountdownStore(s => s.start);
  const setIsComponentBlocked = useAgendamientoVentasStore(
    s => s.setIsComponentBlocked,
  );

  // handlers --------
  const onSucessTempBlock = async (data: Planificador) => {
    const selectedHourUUID = data.time_map?.find(
      t => t.hora === selectedHour,
    )?.uuid;

    /// set cache ------------
    await setCache.mutateAsync({
      key: `${CacheBaseKeysPreventaEnum.HORARIO_INSTALACION_AGENDA_VENTAS}_${preventaUUID}`,
      value: {
        selectedDate: watchFechaInstalacion,
        selectedHour: selectedHour!,
        selectedHourUUID,

        flotaId: watchFlota!,
        userId: user?.id!,
        preventaId,
        limitDate: dayjs()
          .add(TimerAgendamientoCacheEnum.initialAgendamientoMinutes, 'minutes')
          .format(),
      },
    });

    // start timer ------------
    startTimer(
      COUNTDOWN_AGENDA_VENTAS_ID,
      TimerAgendamientoCacheEnum.initialAgendamientoSeconds,

      // custom clear cb
      async () => {
        useGenericCountdownStore.getState().clearAll();
        setIsComponentBlocked(false);
        await setCacheClear.mutateAsync({
          key: `${CacheBaseKeysPreventaEnum.HORARIO_INSTALACION_AGENDA_VENTAS}_${preventaUUID}`,
          value: null,
        });
      },
    );

    onClose();
    setIsComponentBlocked(true);
  };

  ///* mutations ---------------------
  const setCache = useSetCacheRedis<InstallScheduleCacheData>({
    customMessageToast: 'Horario de instalación apartado durante 10 minutos',
  });
  const setCacheClear = useSetCacheRedis<null>({
    customMessageToast: 'Tiempo agotado, seleccione nuevamente el horario',
    customMessageSuccessSeverityToast: ToastSeverityEnum.info,
  });
  const tempBlockHourPlanificador =
    usePostPlanificador<TempBlockPlanificadorData>(
      {
        enableToast: false,
        customOnSuccess: data => {
          console.log('tempBlockHourPlanificador', { data });
          onSucessTempBlock(data as Planificador);
        },
      },
      '/slot/',
    );

  ///* handlers ---------------------
  const onSave = async () => {
    await tempBlockHourPlanificador.mutateAsync({
      fecha: watchFechaInstalacion,
      flota: watchFlota!,
      time_map: [
        {
          hora: selectedHour!,
          preventa: preventaId,
          user: user?.id,
          motivo: 'Bloqueo temporal de horario de instalación',
        },
      ],
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <CustomConfirmDialogProps
      open={isOpen}
      title="Confirmar Horario de Instalación"
      subtitle="¿Está seguro de que desea agendar la instalación en este horario?"
      text2="Una vez seleccionado este horario, no podrá ser modificado durante los próximos 10 minutos y el horario se bloqueará hasta entonces."
      confirmTextBtn="Sí, confirmar horario"
      onClose={handleClose}
      onConfirm={onSave}
    />
  );
};

export default ConfirmInstallScheduleVentasModal;
