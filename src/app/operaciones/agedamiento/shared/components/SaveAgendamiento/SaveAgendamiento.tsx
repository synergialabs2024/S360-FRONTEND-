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
import {
  CustomDatePicker,
  CustomNumberTextField,
  CustomTextField,
  StepperBoxScene,
  useCustomStepper,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { Preventa, SolicitudServicio } from '@/shared/interfaces';
import { agendamientoFormSchema } from '@/shared/utils';
import { returnUrlAgendamientosPage } from '../../../pages/tables/AgendamientosPage';
import { GeneralDataSaveAgendaVentaStep } from './form';
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

const steps = ['Datos generales', 'Ubicación', 'Servicio', 'Documentos'];

const SaveAgendamiento: React.FC<SaveAgendamientoProps> = ({
  title,
  preventa,
}) => {
  ///* hooks ---------------------
  const navigate = useNavigate();

  ///* stepper ---------------------
  const { activeStep, disableNextStepBtn, handleBack, handleNext } =
    useCustomStepper({
      steps,
    });

  ///* local state -------------------

  ///* form ---------------------
  const form = useForm<SaveFormDataAgendaVentas>({
    resolver: yupResolver(agendamientoFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
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
  }, [preventa, reset]);

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

      {/* ========================= Ubicación ========================= */}
      {activeStep === 1 && (
        <UbicacionSaveAgendaStep form={form} preventa={preventa!} />
      )}

      {/* ========================= Service ========================= */}
      {activeStep === 2 && (
        <ServiceSaveAgendaStep form={form} preventa={preventa!} />
      )}

      {activeStep === 100 && (
        <>
          <CustomDatePicker
            label="Fecha instalacion"
            name="fecha_instalacion"
            control={form.control}
            defaultValue={form.getValues().fecha_instalacion}
            error={errors.fecha_instalacion}
            helperText={errors.fecha_instalacion?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Hora instalacion"
            name="hora_instalacion"
            control={form.control}
            defaultValue={form.getValues().hora_instalacion}
            error={errors.hora_instalacion}
            helperText={errors.hora_instalacion?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Distancia nap"
            name="distancia_nap"
            control={form.control}
            defaultValue={form.getValues().distancia_nap}
            error={errors.distancia_nap}
            helperText={errors.distancia_nap?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Observacion rechazo"
            name="observacion_rechazo"
            control={form.control}
            defaultValue={form.getValues().observacion_rechazo}
            error={errors.observacion_rechazo}
            helperText={errors.observacion_rechazo?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Numero comprobante"
            name="numero_comprobante"
            control={form.control}
            defaultValue={form.getValues().numero_comprobante}
            error={errors.numero_comprobante}
            helperText={errors.numero_comprobante?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Url foto comprobante"
            name="url_foto_comprobante"
            control={form.control}
            defaultValue={form.getValues().url_foto_comprobante}
            error={errors.url_foto_comprobante}
            helperText={errors.url_foto_comprobante?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Descripcion pago"
            name="descripcion_pago"
            control={form.control}
            defaultValue={form.getValues().descripcion_pago}
            error={errors.descripcion_pago}
            helperText={errors.descripcion_pago?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Estado pago"
            name="estado_pago"
            control={form.control}
            defaultValue={form.getValues().estado_pago}
            error={errors.estado_pago}
            helperText={errors.estado_pago?.message}
            size={gridSizeMdLg6}
          />

          <CustomNumberTextField
            label="Linea servicio"
            name="linea_servicio"
            control={form.control}
            defaultValue={form.getValues().linea_servicio}
            error={errors.linea_servicio}
            helperText={errors.linea_servicio?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Solicitud servicio"
            name="solicitud_servicio"
            control={form.control}
            defaultValue={form.getValues().solicitud_servicio}
            error={errors.solicitud_servicio}
            helperText={errors.solicitud_servicio?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Preventa"
            name="preventa"
            control={form.control}
            defaultValue={form.getValues().preventa}
            error={errors.preventa}
            helperText={errors.preventa?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Flota"
            name="flota"
            control={form.control}
            defaultValue={form.getValues().flota}
            error={errors.flota}
            helperText={errors.flota?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Nap"
            name="nap"
            control={form.control}
            defaultValue={form.getValues().nap}
            error={errors.nap}
            helperText={errors.nap?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="User gestiona"
            name="user_gestiona"
            control={form.control}
            defaultValue={form.getValues().user_gestiona}
            error={errors.user_gestiona}
            helperText={errors.user_gestiona?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Area"
            name="area"
            control={form.control}
            defaultValue={form.getValues().area}
            error={errors.area}
            helperText={errors.area?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Departamento"
            name="departamento"
            control={form.control}
            defaultValue={form.getValues().departamento}
            error={errors.departamento}
            helperText={errors.departamento?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Canal venta"
            name="canal_venta"
            control={form.control}
            defaultValue={form.getValues().canal_venta}
            error={errors.canal_venta}
            helperText={errors.canal_venta?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Vendedor"
            name="vendedor"
            control={form.control}
            defaultValue={form.getValues().vendedor}
            error={errors.vendedor}
            helperText={errors.vendedor?.message}
            size={gridSizeMdLg6}
            min={0}
          />
        </>
      )}
    </StepperBoxScene>
  );
};

export default SaveAgendamiento;
