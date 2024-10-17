import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateOnusConfiguradaParamsBase,
  useCreateOnusConfigurada,
  useUpdateOnusConfigurada,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { OnusConfiguradaFormSchema } from '@/shared/utils';
import { OnusConfigurada } from '@/shared/interfaces/app/netconnect';
import { returnUrlOnusConfiguradasPage } from '../../../pages/tables/OnusConfiguradasPage';

export interface SaveOnusConfiguradaProps {
  title: string;
  onusConfigurada?: OnusConfigurada;
}

type SaveFormData = CreateOnusConfiguradaParamsBase & {};

const SaveOnusConfigurada: React.FC<SaveOnusConfiguradaProps> = ({
  title,
  onusConfigurada,
}) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(OnusConfiguradaFormSchema) as any,
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
  const createOnusConfiguradaMutation = useCreateOnusConfigurada({
    navigate,
    returnUrl: returnUrlOnusConfiguradasPage,
    enableErrorNavigate: false,
  });
  const updateOnusConfiguradaMutation =
    useUpdateOnusConfigurada<CreateOnusConfiguradaParamsBase>({
      navigate,
      returnUrl: returnUrlOnusConfiguradasPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (onusConfigurada?.id) {
      updateOnusConfiguradaMutation.mutate({ id: onusConfigurada.id!, data });
      return;
    }

    ///* create
    createOnusConfiguradaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!onusConfigurada?.id) return;
    reset(onusConfigurada);
  }, [onusConfigurada, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlOnusConfiguradasPage)}
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

export default SaveOnusConfigurada;
