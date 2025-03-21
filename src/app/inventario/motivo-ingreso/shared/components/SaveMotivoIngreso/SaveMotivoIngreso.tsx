import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  gridSizeMdLg6,
  MotivoIngreso,
  PermissionsEnum,
  motivoIngresoFormSchema,
} from '@/shared';
import {
  useCreateMotivoIngreso,
  useUpdateMotivoIngreso,
  CreateMotivoIngresoParamsBase,
} from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { CustomTextField, SingleFormBoxScene } from '@/shared/components';
import { returnUrlMotivoIngresoPages } from '../../../pages/tables/MotivoIngresoPages';

export interface SaveMotivoIngresoProps {
  title: string;
  motivoingreso?: MotivoIngreso;
}

type SaveFormData = CreateMotivoIngresoParamsBase & {};

const SaveMotivoIngreso: React.FC<SaveMotivoIngresoProps> = ({
  title,
  motivoingreso,
}) => {
  useCheckPermission(PermissionsEnum.inventario_view_motivoingreso);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(motivoIngresoFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createMotivoIngresoMutation = useCreateMotivoIngreso({
    navigate,
    returnUrl: returnUrlMotivoIngresoPages,
    enableErrorNavigate: false,
  });
  const updateMotivoIngresoMutation =
    useUpdateMotivoIngreso<CreateMotivoIngresoParamsBase>({
      navigate,
      returnUrl: returnUrlMotivoIngresoPages,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (motivoingreso?.id) {
      updateMotivoIngresoMutation.mutate({ id: motivoingreso.id!, data });
      return;
    }

    ///* create
    createMotivoIngresoMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!motivoingreso?.id) return;
    reset(motivoingreso);
  }, [motivoingreso, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMotivoIngresoPages)}
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
        disabled={!!motivoingreso?.id}
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

export default SaveMotivoIngreso;
