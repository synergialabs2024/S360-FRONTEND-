import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateMetodoPagoParamsBase,
  useCreateMetodoPago,
  useUpdateMetodoPago,
} from '@/actions/app';
import {
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg12, MetodoPago, metodoPagoFormSchema } from '@/shared';
import { returnUrlMetodosPagoPage } from '../../../pages/tables/MetodosPagoPage';

export interface SaveMetodoPagoProps {
  title: string;
  metodopago?: MetodoPago;
}

type SaveFormData = CreateMetodoPagoParamsBase & {};

const SaveMetodoPago: React.FC<SaveMetodoPagoProps> = ({
  title,
  metodopago,
}) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(metodoPagoFormSchema) as any,
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
  const createMetodoPagoMutation = useCreateMetodoPago({
    navigate,
    returnUrl: returnUrlMetodosPagoPage,
    enableErrorNavigate: false,
  });
  const updateMetodoPagoMutation =
    useUpdateMetodoPago<CreateMetodoPagoParamsBase>({
      navigate,
      returnUrl: returnUrlMetodosPagoPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (metodopago?.id) {
      updateMetodoPagoMutation.mutate({
        id: metodopago.id!,
        data,
      });
      return;
    }

    ///* create
    createMetodoPagoMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!metodopago?.id) return;
    reset(metodopago);
  }, [metodopago, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMetodosPagoPage)}
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
      <CustomTextArea
        label="Descripción"
        name="description"
        control={form.control}
        defaultValue={form.getValues().description}
        error={errors.description}
        helperText={errors.description?.message}
        required={false}
      />
      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
        size={gridSizeMdLg12}
      />
    </SingleFormBoxScene>
  );
};

export default SaveMetodoPago;
