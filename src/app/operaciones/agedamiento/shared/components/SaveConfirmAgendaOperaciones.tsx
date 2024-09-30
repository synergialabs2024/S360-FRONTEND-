import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Agendamiento,
  agendamientoOperacionesConfirmFormSchema,
  Preventa,
  SolicitudServicio,
  ToastWrapper,
} from '@/shared';
import { StepperBoxScene, useCustomStepper } from '@/shared/components';
import { returnUrlAgendamientoOperacionesPage } from '../../pages/tables/AgendamientosMainPage';
import {
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
  };

const SaveConfirmAgendaOperaciones: React.FC<
  SaveConfirmAgendaOperacionesProps
> = ({ agendamiento, title }) => {
  ///* hooks ---------------------
  const navigate = useNavigate();

  // stepper
  const { activeStep, disableNextStepBtn, handleBack, handleNext } =
    useCustomStepper({
      steps,
    });

  ///* form ---------------------
  const form = useForm<SaveConfirmAgendaOperaciones>({
    resolver: yupResolver(agendamientoOperacionesConfirmFormSchema) as any,
    defaultValues: {},
  });
  const { handleSubmit, reset } = form;

  ///* handlers ---------------------
  const onSave = (data: SaveConfirmAgendaOperaciones) => {
    console.log(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!agendamiento?.id) return;

    const { solicitud_servicio_data, preventa_data, ...rest } =
      agendamiento || {};

    reset({
      ...rest,
      ...solicitud_servicio_data,
      ...preventa_data,
      planName: preventa_data?.plan_internet_data?.name,

      // zona: solicitud_servicio_data?.zona_data?.id!,
    } as unknown as SaveConfirmAgendaOperaciones);
  }, [agendamiento, reset]);

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
      onSave={handleSubmit(onSave, () => {
        console.log({ errors: form.formState.errors });
        ToastWrapper.error('Faltan campos requeridos');
      })}
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
    </StepperBoxScene>
  );
};

export default SaveConfirmAgendaOperaciones;
