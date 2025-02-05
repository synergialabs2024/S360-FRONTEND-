import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  gridSizeMdLg6,
  MotivoEgreso,
  PermissionsEnum,
  motivoEgresoFormSchema,
} from '@/shared';
import {
  useCreateMotivoEgreso,
  useUpdateMotivoEgreso,
  CreateMotivoEgresoParamsBase,
} from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { CustomTextField, SingleFormBoxScene } from '@/shared/components';
import { returnUrlMotivoEgresoPages } from '../../../pages/tables/MotivoEgresoPages';

export interface SaveMotivoEgresoProps {
  title: string;
  motivoegreso?: MotivoEgreso;
}

type SaveFormData = CreateMotivoEgresoParamsBase & {};

const SaveMotivoEgreso: React.FC<SaveMotivoEgresoProps> = ({
  title,
  motivoegreso,
}) => {
  useCheckPermission(PermissionsEnum.inventario_view_motivoegreso);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(motivoEgresoFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createMotivoEgresoMutation = useCreateMotivoEgreso({
    navigate,
    returnUrl: returnUrlMotivoEgresoPages,
    enableErrorNavigate: false,
  });
  const updateMotivoEgresoMutation =
    useUpdateMotivoEgreso<CreateMotivoEgresoParamsBase>({
      navigate,
      returnUrl: returnUrlMotivoEgresoPages,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (motivoegreso?.id) {
      updateMotivoEgresoMutation.mutate({ id: motivoegreso.id!, data });
      return;
    }

    ///* create
    createMotivoEgresoMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!motivoegreso?.id) return;
    reset(motivoegreso);
  }, [motivoegreso, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMotivoEgresoPages)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="nombre"
        control={form.control}
        defaultValue={form.getValues().nombre}
        error={errors.nombre}
        helperText={errors.nombre?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Codigo"
        name="codigo"
        control={form.control}
        defaultValue={form.getValues().codigo}
        error={errors.codigo}
        helperText={errors.codigo?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Descripcion"
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        error={errors.descripcion}
        helperText={errors.descripcion?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Tipo"
        name="tipo"
        control={form.control}
        defaultValue={form.getValues().tipo}
        error={errors.tipo}
        helperText={errors.tipo?.message}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveMotivoEgreso;
