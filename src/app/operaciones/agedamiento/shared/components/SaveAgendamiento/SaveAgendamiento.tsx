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
import { Preventa } from '@/shared/interfaces';
import { agendamientoFormSchema } from '@/shared/utils';
import { returnUrlAgendamientosPage } from '../../../pages/tables/AgendamientosPage';

export interface SaveAgendamientoProps {
  title: React.ReactNode;
  preventa?: Preventa;
}

type SaveFormData = CreateAgendamientoParamsBase & {};

const steps = ['Datos generales', 'Ubicación', 'Servicio', 'Documentos'];

const SaveAgendamiento: React.FC<SaveAgendamientoProps> = ({
  title,
  preventa: agendamiento,
}) => {
  ///* hooks ---------------------
  const navigate = useNavigate();

  ///* stepper ---------------------
  const { activeStep, disableNextStepBtn, handleBack, handleNext } =
    useCustomStepper({
      steps,
    });

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(agendamientoFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

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
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (agendamiento?.id) {
      updateAgendamientoMutation.mutate({ id: agendamiento.id!, data });
      return;
    }

    ///* create
    createAgendamientoMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!agendamiento?.id) return;
    reset(agendamiento);
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
      onCancel={() => navigate(returnUrlAgendamientosPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
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
    </StepperBoxScene>
  );
};

export default SaveAgendamiento;
