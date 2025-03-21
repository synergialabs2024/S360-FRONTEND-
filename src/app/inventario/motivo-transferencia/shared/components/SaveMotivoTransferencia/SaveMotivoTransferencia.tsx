import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  gridSizeMdLg6,
  MotivoTransferencia,
  PermissionsEnum,
  motivoTransferenciaFormSchema,
} from '@/shared';
import {
  useCreateMotivoTransferencia,
  useUpdateMotivoTransferencia,
  CreateMotivoTransferenciaParamsBase,
} from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { CustomTextField, SingleFormBoxScene } from '@/shared/components';
import { returnUrlMotivoTransferenciaPages } from '../../../pages/tables/MotivoTransferenciaPages';

export interface SaveMotivoTransferenciaProps {
  title: string;
  motivotransferencia?: MotivoTransferencia;
}

type SaveFormData = CreateMotivoTransferenciaParamsBase & {};

const SaveMotivoTransferencia: React.FC<SaveMotivoTransferenciaProps> = ({
  title,
  motivotransferencia,
}) => {
  useCheckPermission(PermissionsEnum.inventario_view_motivotransferencia);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(motivoTransferenciaFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createMotivoTransferenciaMutation = useCreateMotivoTransferencia({
    navigate,
    returnUrl: returnUrlMotivoTransferenciaPages,
    enableErrorNavigate: false,
  });
  const updateMotivoTransferenciaMutation =
    useUpdateMotivoTransferencia<CreateMotivoTransferenciaParamsBase>({
      navigate,
      returnUrl: returnUrlMotivoTransferenciaPages,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (motivotransferencia?.id) {
      updateMotivoTransferenciaMutation.mutate({
        id: motivotransferencia.id!,
        data,
      });
      return;
    }

    ///* create
    createMotivoTransferenciaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!motivotransferencia?.id) return;
    reset(motivotransferencia);
  }, [motivotransferencia, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMotivoTransferenciaPages)}
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
        disabled={!!motivotransferencia?.id}
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

export default SaveMotivoTransferencia;
