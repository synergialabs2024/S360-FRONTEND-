/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateAgendamientoParamsBase,
  useCreateAgendamiento,
  useUpdateAgendamiento,
} from '@/actions/app';
import { StepperBoxScene, useCustomStepper } from '@/shared/components';
import { Preventa, SolicitudServicio } from '@/shared/interfaces';
import { agendamientoFormSchema } from '@/shared/utils';
import { useAgendamientoVentasStore } from '@/store/app';
import { returnUrlAgendamientosPage } from '../../../pages/tables/AgendamientosPage';
import { usePlanificadorAgendamiento } from '../../hooks';
import {
  AgendamientoSaveAgendaStep,
  GeneralDataSaveAgendaVentaStep,
} from './form';
import ServiceSaveAgendaStep from './form/ServiceSaveAgendaStep';
import UbicacionSaveAgendaStep from './form/UbicacionSaveAgendaStep';

export interface SaveAgendamientoProps {
  title: React.ReactNode;
  preventa?: Preventa;
}

export type SaveFormDataAgendaVentas = CreateAgendamientoParamsBase &
  Partial<SolicitudServicio> &
  Partial<Preventa> & {
    // helpers
    provinceName?: string;
    cityName?: string;
    zoneName?: string;
    sectorName?: string;
    planName?: string;
    entidadFinancieraName?: string;
    tarjetaName?: string;
    paymentMethodName?: string;
  };

const steps = ['Datos generales', 'Servicio y Ubicación', 'Agendamiento'];

const SaveAgendamiento: React.FC<SaveAgendamientoProps> = ({
  title,
  preventa,
}) => {
  ///* hooks ---------------------
  const navigate = useNavigate();
  usePlanificadorAgendamiento({
    cackeKey: 'planificadores',
  });

  ///* stepper ---------------------
  const { activeStep, disableNextStepBtn, handleBack, handleNext } =
    useCustomStepper({
      steps,
      initialStep: 2, // TODO: remove
    });

  ///* global state ---------------------
  const setActivePreventa = useAgendamientoVentasStore(
    s => s.setActivePreventa,
  );

  ///* form ---------------------
  const form = useForm<SaveFormDataAgendaVentas>({
    resolver: yupResolver(agendamientoFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = form;

  ///* fetch data ---------------------

  ///* mutations ---------------------
  const createAgendamientoMutation = useCreateAgendamiento({
    navigate,
    returnUrl: returnUrlAgendamientosPage,
    enableErrorNavigate: false,
  });
  const updateAgendamientoMutation =
    useUpdateAgendamiento<CreateAgendamientoParamsBase>({
      navigate,
      returnUrl: returnUrlAgendamientosPage,
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormDataAgendaVentas) => {
    if (!isValid) return;

    ///* upd
    if (preventa?.id) {
      updateAgendamientoMutation.mutate({ id: preventa.id!, data });
      return;
    }

    ///* create
    createAgendamientoMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!preventa?.id) return;
    const { solicitud_servicio_data, ...rest } = preventa || {};
    setActivePreventa(preventa);

    reset({
      ...rest,
      ...solicitud_servicio_data,

      sectorName: solicitud_servicio_data?.sector_data?.name,
      zoneName: solicitud_servicio_data?.zona_data?.name,
      cityName: solicitud_servicio_data?.ciudad_data?.name,
      provinceName: solicitud_servicio_data?.provincia_data?.name,
      planName: rest?.plan_internet_data?.name,
      entidadFinancieraName: rest?.entidad_financiera_data?.name,
      tarjetaName: rest?.tarjeta_data?.name,
      paymentMethodName: rest?.metodo_pago_data?.name,
    } as SaveFormDataAgendaVentas);
  }, [preventa, reset, setActivePreventa]);

  // const isLoading = false;
  // useLoaders(isLoading);

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
      onCancel={() => navigate(returnUrlAgendamientosPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      {activeStep === 0 && <GeneralDataSaveAgendaVentaStep form={form} />}

      {/* ========================= Ubicación & Service ========================= */}
      {activeStep === 1 && (
        <>
          <ServiceSaveAgendaStep form={form} preventa={preventa!} />

          <UbicacionSaveAgendaStep form={form} preventa={preventa!} />
        </>
      )}

      {/* ========================= Agendam - Planificador ========================= */}
      {activeStep === 2 && (
        <AgendamientoSaveAgendaStep form={form} preventa={preventa!} />
      )}
    </StepperBoxScene>
  );
};

export default SaveAgendamiento;
