import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  AgendamientoTSQEnum,
  CacheBaseKeysPreventaEnum,
  RecoordinarAgendaData,
} from '@/actions/app';
import { useGenericPATCH, useSetCacheRedis } from '@/actions/shared';
import { usePlanificadorAgendamiento } from '@/app/comercial/agendamiento/shared/hooks';
import { returnUrlSolicitudsRecoordinacionAgendaPage } from '@/app/operaciones/solicitud-recoordinacion-agenda/pages/tables/SolicitudsRecoordinacionAgendaMainPage';
import {
  Agendamiento,
  agendamientoOperacionesConfirmFormSchema,
  Flota,
  getKeysFormErrorsMessage,
  Preventa,
  SolicitudServicio,
  ToastWrapper,
} from '@/shared';
import {
  CustomSingleButton,
  StepperBoxScene,
  useCustomStepper,
} from '@/shared/components';
import { useAgendamientoVentasStore } from '@/store/app';
import {
  GeneralDataConfirmAgendaStep,
  RejectSolRecoordinacionModal,
  ServiceCoordinationConfirmAgendaStep,
} from './form';

export type SaveConfirmAgendaOperacionesProps = {
  agendamiento: Agendamiento;
  title: React.ReactNode;
  solicitudRecoordinacion: string;
};

const steps = ['Datos generales', 'Servicio y Coordinación'];

export type SaveConfirmAgendaOperaciones = Partial<SolicitudServicio> &
  Partial<Preventa> &
  Partial<Agendamiento> & {
    thereIsCoverage?: boolean;
    thereAreNaps?: boolean;

    planName?: string;

    rawFlota?: Flota;
    flotaUUID?: string;
  };

const SaveConfirmAgendaOperaciones: React.FC<
  SaveConfirmAgendaOperacionesProps
> = ({ agendamiento, title, solicitudRecoordinacion }) => {
  ///* hooks ---------------------
  const navigate = useNavigate();
  const cackeKey = `${CacheBaseKeysPreventaEnum.HORARIO_INSTALACION_AGENDA_OPERACIONES}_${agendamiento?.uuid!}`;

  ///* local state ---------------------
  const [openModaReject, setOpenModalReject] = useState(false);

  // stepper
  const { activeStep, disableNextStepBtn, handleBack, handleNext } =
    useCustomStepper({
      steps,
    });

  ///* global state ---------------------
  const setActivePreventa = useAgendamientoVentasStore(
    s => s.setActivePreventa,
  );

  ///* form ---------------------
  const form = useForm<SaveConfirmAgendaOperaciones>({
    resolver: yupResolver(agendamientoOperacionesConfirmFormSchema) as any,
    defaultValues: {},
  });
  const { handleSubmit, reset } = form;
  usePlanificadorAgendamiento({
    cackeKey,
    form: form as any,
  });

  ///* mutations ---------------------
  const recoordinarAgenda = useGenericPATCH<
    RecoordinarAgendaData,
    Agendamiento
  >(
    `/agendamiento/recoordinar/${agendamiento?.id!}/`,
    AgendamientoTSQEnum.AGENDAMIENTOS,
    {
      customMessageToast: 'Agendamiento recoordinado con éxito',
      navigate,
      returnUrl: returnUrlSolicitudsRecoordinacionAgendaPage,
      customOnSuccess() {
        setCache.mutate({
          key: cackeKey,
          value: null,
        });
      },
    },
  );

  const setCache = useSetCacheRedis({
    enableToast: false,
  });

  ///* handlers ---------------------
  const onSave = (data: SaveConfirmAgendaOperaciones) => {
    // validate date
    const savedFechaInstall = dayjs(agendamiento?.fecha_instalacion).format(
      'YYYY-MM-DD',
    );
    const savedHoraInstall = agendamiento?.hora_instalacion;

    if (
      agendamiento?.flota_data?.id === data.flota &&
      savedFechaInstall === data.fecha_instalacion &&
      savedHoraInstall === data.hora_instalacion
    ) {
      ToastWrapper.error(
        'No se puede guardar la misma fecha y hora de instalación',
      );
      return;
    }

    recoordinarAgenda.mutate({
      fecha_instalacion: data.fecha_instalacion!,
      hora_instalacion: data.hora_instalacion!,
      flota: data.flota!,
      solicitud_recoordinacion: solicitudRecoordinacion,
    });
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!agendamiento?.id) return;

    const { solicitud_servicio_data, preventa_data, ...rest } =
      agendamiento || {};

    setActivePreventa(preventa_data!); // usePlanificadorAgendamiento

    reset({
      ...rest,
      ...solicitud_servicio_data,
      ...preventa_data,
      planName: preventa_data?.plan_internet_data?.name,

      preventa: preventa_data?.id!,
      flota: agendamiento?.flota_data?.id!,
      rawFlota: agendamiento?.flota_data,
      flotaUUID: agendamiento?.flota_data?.uuid!,
      nap: agendamiento?.nap!,

      // observacion_llamada: agendamiento?.observacion_llamada || '',
      // zona: solicitud_servicio_data?.zona_data?.id!, // rompe todo y nose xq
    } as unknown as SaveConfirmAgendaOperaciones);
  }, [agendamiento, reset, setActivePreventa]);

  return (
    <StepperBoxScene
      titleNode={title}
      // steps
      steps={steps}
      activeStep={activeStep}
      handleNext={handleNext}
      handleBack={handleBack}
      disableNextStepBtn={disableNextStepBtn}
      // action btns
      onCancel={() => navigate(returnUrlSolicitudsRecoordinacionAgendaPage)}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Faltan campos requeridos: ${keys}`);
      })}
      // custom buttons
      customSpaceButton={
        <>
          <CustomSingleButton
            label="Rechazar solicitud"
            variant="text"
            color="error"
            onClick={() => {
              setOpenModalReject(true);
            }}
            sxBtn={{
              ml: 0.8,
            }}
          />
        </>
      }
    >
      {/* ========================= Datos Generales ========================= */}
      {activeStep === 0 && (
        <GeneralDataConfirmAgendaStep
          form={form}
          agendamiento={agendamiento!}
        />
      )}

      {/* ========================= Servicio y Coordinacion ========================= */}
      {activeStep === 1 && (
        <ServiceCoordinationConfirmAgendaStep
          form={form}
          agendamiento={agendamiento!}
        />
      )}

      {/* =============== modals =============== */}
      <RejectSolRecoordinacionModal
        open={openModaReject}
        onClose={() => setOpenModalReject(false)}
        solicitudRecoordinacionUUID={solicitudRecoordinacion!}
        keyCache={cackeKey}
      />

      {/* <AgendaOpeRequestUpdate
        open={openModalUpd}
        onClose={() => setOpenModalUpd(false)}
        agendamiento={agendamiento!}
      /> */}
    </StepperBoxScene>
  );
};

export default SaveConfirmAgendaOperaciones;
