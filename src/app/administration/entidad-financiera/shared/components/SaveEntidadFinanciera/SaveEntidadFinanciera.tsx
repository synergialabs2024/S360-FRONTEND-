import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateEntidadFinancieraParamsBase,
  useCreateEntidadFinanciera,
  useUpdateEntidadFinanciera,
} from '@/actions/app';
import {
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg12 } from '@/shared/constants/ui';
import { EntidadFinanciera } from '@/shared/interfaces';
import { entidadFinancieraFormSchema } from '@/shared/utils';
import { returnUrlEntidadesFinancieraPage } from '../../../pages/tables/EntidadesFinancieraPage';

export interface SaveEntidadFinancieraProps {
  title: string;
  entidadfinanciera?: EntidadFinanciera;
}

type SaveFormData = CreateEntidadFinancieraParamsBase & {};

const SaveEntidadFinanciera: React.FC<SaveEntidadFinancieraProps> = ({
  title,
  entidadfinanciera,
}) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(entidadFinancieraFormSchema) as any,
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
  const createEstadoFinancieraMutation = useCreateEntidadFinanciera({
    navigate,
    returnUrl: returnUrlEntidadesFinancieraPage,
    enableErrorNavigate: false,
  });
  const updateEntidadFinancieraMutation =
    useUpdateEntidadFinanciera<CreateEntidadFinancieraParamsBase>({
      navigate,
      returnUrl: returnUrlEntidadesFinancieraPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (entidadfinanciera?.id) {
      updateEntidadFinancieraMutation.mutate({
        id: entidadfinanciera.id!,
        data,
      });
      return;
    }

    ///* create
    createEstadoFinancieraMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!entidadfinanciera?.id) return;
    reset(entidadfinanciera);
  }, [entidadfinanciera, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlEntidadesFinancieraPage)}
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

export default SaveEntidadFinanciera;
