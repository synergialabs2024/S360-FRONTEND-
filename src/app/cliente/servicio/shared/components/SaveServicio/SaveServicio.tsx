import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CreateServicioBaseParams, useUpdateServicio } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  CustomNumberTextField,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { returnUrlServiciosPage } from '../../../pages/tables/ServiciosPage';
import {
  gridSizeMdLg6,
  PermissionsEnum,
  Servicio,
  servicioFormSchema,
} from '@/shared';

export interface SaveServicioProps {
  title: string;
  servicio?: Servicio;
}
type SaveFormData = CreateServicioBaseParams & {};

const SaveServicio: React.FC<SaveServicioProps> = ({ title, servicio }) => {
  useCheckPermission(PermissionsEnum.servicios_view_servicio);

  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(servicioFormSchema),
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const updateServicioMutation = useUpdateServicio<CreateServicioBaseParams>({
    navigate,
    returnUrl: returnUrlServiciosPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (servicio?.id) {
      updateServicioMutation.mutate({ id: servicio.id!, data });
      return;
    }
  };

  ///* effects
  useEffect(() => {
    if (!servicio?.id) return;
    reset(servicio);
  }, [servicio, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlServiciosPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="nombre"
        control={form.control}
        defaultValue={form.getValues().nombre}
        error={errors.nombre}
        helperText={errors.nombre?.message}
      />
      <CustomTextField
        label="Codigo"
        name="codigo"
        control={form.control}
        defaultValue={form.getValues().codigo}
        error={errors.codigo}
        helperText={errors.codigo?.message}
      />
      <CustomTextField
        label="Descripcion"
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        error={errors.descripcion}
        helperText={errors.descripcion?.message}
      />
      <CustomTextField
        label="Precio"
        name="precio"
        control={form.control}
        defaultValue={form.getValues().precio}
        error={errors.precio}
        helperText={errors.precio?.message}
      />
      <CustomNumberTextField
        label="Iva"
        name="iva"
        control={form.control}
        defaultValue={form.getValues().iva}
        error={errors.iva}
        helperText={errors.iva?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveServicio;
