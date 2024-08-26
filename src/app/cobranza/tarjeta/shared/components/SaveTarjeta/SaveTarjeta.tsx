import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateTarjetaParamsBase,
  useCreateTarjeta,
  useUpdateTarjeta,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { Tarjeta } from '@/shared/interfaces';
import { tarjetaFormSchema } from '@/shared/utils';
import { returnUrlTarjetasPage } from '../../../pages/tables/TarjetasPage';

export interface SaveTarjetaProps {
  title: string;
  tarjeta?: Tarjeta;
}

type SaveFormData = CreateTarjetaParamsBase & {};

const SaveTarjeta: React.FC<SaveTarjetaProps> = ({ title, tarjeta }) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(tarjetaFormSchema),
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
  const createTarjetaMutation = useCreateTarjeta({
    navigate,
    returnUrl: returnUrlTarjetasPage,
    enableErrorNavigate: false,
  });
  const updateTarjetaMutation = useUpdateTarjeta<CreateTarjetaParamsBase>({
    navigate,
    returnUrl: returnUrlTarjetasPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (tarjeta?.id) {
      updateTarjetaMutation.mutate({ id: tarjeta.id!, data });
      return;
    }

    ///* create
    createTarjetaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!tarjeta?.id) return;
    reset(tarjeta);
  }, [tarjeta, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlTarjetasPage)}
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

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveTarjeta;
