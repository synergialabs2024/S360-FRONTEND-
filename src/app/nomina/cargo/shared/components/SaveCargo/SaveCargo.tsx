import {
  CreateCargoParams,
  useCreateCargo,
  useUpdateCargo,
} from '@/actions/app';
import { Cargo } from '@/shared/interfaces';
import { cargoFormSchema } from '@/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { returnUrlCargosPage } from '../../../pages/tables/CargosPage';
import { useEffect } from 'react';
import {
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';

export interface SaveCargoProps {
  title: string;
  cargo?: Cargo;
}

type SaveFormData = CreateCargoParams & {};

const SaveCargo: React.FC<SaveCargoProps> = ({ title, cargo }) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(cargoFormSchema) as any,
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
  const createCargoMutation = useCreateCargo({
    navigate,
    returnUrl: returnUrlCargosPage,
    enableErrorNavigate: false,
  });
  const updateCargoMutation = useUpdateCargo<CreateCargoParams>({
    navigate,
    returnUrl: returnUrlCargosPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (cargo?.id) {
      updateCargoMutation.mutate({ id: cargo.id!, data });
      return;
    }

    ///* create
    createCargoMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!cargo?.id) return;
    reset(cargo);
  }, [cargo, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCargosPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
        //size={gridSizeMdLg6}
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

export default SaveCargo;
