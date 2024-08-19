import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreatePreventaParamsBase,
  useCreatePreventa,
  useUpdatePreventa,
} from '@/actions/app';
import {
  CustomNumberTextField,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { SolicitudServicio } from '@/shared/interfaces';
import { preventaFormSchema } from '@/shared/utils';
import { returnUrlPreventasPage } from '../../../pages/tables/PreventasMainPage';

export interface SavePreventaProps {
  title: string;
  solicitudServicio?: SolicitudServicio;
}

type SaveFormData = CreatePreventaParamsBase & {};

const SavePreventa: React.FC<SavePreventaProps> = ({
  title,
  solicitudServicio,
}) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(preventaFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createPreventaMutation = useCreatePreventa({
    navigate,
    returnUrl: returnUrlPreventasPage,
    enableErrorNavigate: false,
  });
  const updatePreventaMutation = useUpdatePreventa<CreatePreventaParamsBase>({
    navigate,
    returnUrl: returnUrlPreventasPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (solicitudServicio?.id) {
      updatePreventaMutation.mutate({ id: solicitudServicio.id!, data });
      return;
    }

    ///* create
    createPreventaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!solicitudServicio?.id) return;
    reset({
      ...solicitudServicio,
    });
  }, [solicitudServicio, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlPreventasPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <SampleCheckbox
        label="Es referido"
        name="es_referido"
        control={form.control}
        defaultValue={form.getValues().es_referido}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Cliente refiere"
        name="cliente_refiere"
        control={form.control}
        defaultValue={form.getValues().cliente_refiere}
        error={errors.cliente_refiere}
        helperText={errors.cliente_refiere?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Correo cliente refiere"
        name="correo_cliente_refiere"
        control={form.control}
        defaultValue={form.getValues().correo_cliente_refiere}
        error={errors.correo_cliente_refiere}
        helperText={errors.correo_cliente_refiere?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Tipo servicio"
        name="tipo_servicio"
        control={form.control}
        defaultValue={form.getValues().tipo_servicio}
        error={errors.tipo_servicio}
        helperText={errors.tipo_servicio?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Tipo plan"
        name="tipo_plan"
        control={form.control}
        defaultValue={form.getValues().tipo_plan}
        error={errors.tipo_plan}
        helperText={errors.tipo_plan?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Numero cuenta bancaria"
        name="numero_cuenta_bancaria"
        control={form.control}
        defaultValue={form.getValues().numero_cuenta_bancaria}
        error={errors.numero_cuenta_bancaria}
        helperText={errors.numero_cuenta_bancaria?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Costo instalacion"
        name="costo_instalacion"
        control={form.control}
        defaultValue={form.getValues().costo_instalacion}
        error={errors.costo_instalacion}
        helperText={errors.costo_instalacion?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Url foto cedula frontal"
        name="url_foto_cedula_frontal"
        control={form.control}
        defaultValue={form.getValues().url_foto_cedula_frontal}
        error={errors.url_foto_cedula_frontal}
        helperText={errors.url_foto_cedula_frontal?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Url foto cedula trasera"
        name="url_foto_cedula_trasera"
        control={form.control}
        defaultValue={form.getValues().url_foto_cedula_trasera}
        error={errors.url_foto_cedula_trasera}
        helperText={errors.url_foto_cedula_trasera?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Url foto documento cuenta"
        name="url_foto_documento_cuenta"
        control={form.control}
        defaultValue={form.getValues().url_foto_documento_cuenta}
        error={errors.url_foto_documento_cuenta}
        helperText={errors.url_foto_documento_cuenta?.message}
        size={gridSizeMdLg6}
      />

      <CustomNumberTextField
        label="Metodo pago"
        name="metodo_pago"
        control={form.control}
        defaultValue={form.getValues().metodo_pago}
        error={errors.metodo_pago}
        helperText={errors.metodo_pago?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Entidad financiera"
        name="entidad_financiera"
        control={form.control}
        defaultValue={form.getValues().entidad_financiera}
        error={errors.entidad_financiera}
        helperText={errors.entidad_financiera?.message}
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
    </SingleFormBoxScene>
  );
};

export default SavePreventa;
