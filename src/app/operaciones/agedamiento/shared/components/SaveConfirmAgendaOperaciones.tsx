import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CacheBaseKeysPreventaEnum } from '@/actions/app';
import { usePlanificadorAgendamiento } from '@/app/comercial/agendamiento/shared/hooks';
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
import { returnUrlAgendamientoOperacionesPage } from '../../pages/tables/AgendamientosMainPage';
import {
  AgendaOpeRequestUpdate,
  GeneralDataConfirmAgendaStep,
  ServiceCoordinationConfirmAgendaStep,
} from './form';

export type SaveConfirmAgendaOperacionesProps = {
  agendamiento: Agendamiento;
  title: React.ReactNode;
};

const steps = ['Datos generales', 'Servicio y Coordinación'];

export type SaveConfirmAgendaOperaciones = Partial<SolicitudServicio> &
  Partial<Preventa> &
  Partial<Agendamiento> & {
    thereIsCoverage?: boolean;
    thereAreNaps?: boolean;

    planName?: string;

    rawFlota?: Flota;
  };

const SaveConfirmAgendaOperaciones: React.FC<
  SaveConfirmAgendaOperacionesProps
> = ({ agendamiento, title }) => {
  ///* hooks ---------------------
  const navigate = useNavigate();

  ///* local state ---------------------
  const [openModalUpd, setOpenModalUpd] = useState<boolean>(false);

  // stepper
  const { activeStep, disableNextStepBtn, handleBack, handleNext } =
    useCustomStepper({
      steps,
      // TODO: remove this
      // initialStep: 1,
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
    cackeKey: `${CacheBaseKeysPreventaEnum.HORARIO_INSTALACION_AGENDA_OPERACIONES}_${agendamiento?.uuid!}`,
    form: form as any,
  });

  ///* handlers ---------------------
  const onSave = (data: SaveConfirmAgendaOperaciones) => {
    console.log(data);
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
      nap: agendamiento?.nap!,

      observacion_llamada: agendamiento?.observacion_llamada || '',

      // zona: solicitud_servicio_data?.zona_data?.id!, // rome todo y nose xq
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
      onCancel={() => navigate(returnUrlAgendamientoOperacionesPage)}
      onSave={handleSubmit(onSave, errors => {
        console.log({ errors });

        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Faltan campos requeridos: ${keys}`);
      })}
      // custom buttons
      customSpaceButton={
        <>
          <CustomSingleButton
            label="Solicitar actualización"
            variant="text"
            color="warning"
            onClick={() => setOpenModalUpd(true)}
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
      <AgendaOpeRequestUpdate
        open={openModalUpd}
        onClose={() => setOpenModalUpd(false)}
        agendamiento={agendamiento!}
      />
    </StepperBoxScene>
  );
};

export default SaveConfirmAgendaOperaciones;
