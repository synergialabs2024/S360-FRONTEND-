import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateTipoComprobanteParamsBase,
  useCreateTipoComprobante,
  useUpdateTipoComprobante,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { TipoComprobante } from '@/shared/interfaces';
import { tipoComprobanteFormSchema } from '@/shared/utils';
import { returnUrlTipoComprobantesPage } from '../../../pages/tables/TipoComprobantesPage';

export interface SaveTipoComprobanteProps {
  title: string;
  tipoComprobante?: TipoComprobante;
}

type SaveFormData = CreateTipoComprobanteParamsBase & {};

const SaveTipoComprobante: React.FC<SaveTipoComprobanteProps> = ({
  title,
  tipoComprobante,
}) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(tipoComprobanteFormSchema) as any,
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
  const createTipoComprobanteMutation = useCreateTipoComprobante({
    navigate,
    returnUrl: returnUrlTipoComprobantesPage,
    enableErrorNavigate: false,
  });
  const updateTipoComprobanteMutation =
    useUpdateTipoComprobante<CreateTipoComprobanteParamsBase>({
      navigate,
      returnUrl: returnUrlTipoComprobantesPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (tipoComprobante?.id) {
      updateTipoComprobanteMutation.mutate({ id: tipoComprobante.id!, data });
      return;
    }

    ///* create
    createTipoComprobanteMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!tipoComprobante?.id) return;
    reset(tipoComprobante);
  }, [tipoComprobante, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlTipoComprobantesPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
      />
      <CustomTextField
        label="Codigo"
        name="codigo"
        control={form.control}
        defaultValue={form.getValues().codigo}
        error={errors.codigo}
        helperText={errors.codigo?.message}
        size={gridSizeMdLg6}
        disabled={!!tipoComprobante?.id}
      />
      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveTipoComprobante;
