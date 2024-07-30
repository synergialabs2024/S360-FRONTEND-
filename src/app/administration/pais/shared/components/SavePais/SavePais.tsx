import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreatePaisBaseParams,
  useCreatePais,
  useUpdatePais,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { Pais } from '@/shared/interfaces';
import { paisFormSchema } from '@/shared/utils';
import { returnUrlPaisesPage } from '../../../pages/tables/PaisesPage';

export interface SavePaisProps {
  title: string;
  pais?: Pais;
}

type SaveFormData = CreatePaisBaseParams & {};

const SavePais: React.FC<SavePaisProps> = ({ title, pais }) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(paisFormSchema),
    defaultValues: {
      state: true,
      has_coverage: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createPaisMutation = useCreatePais<CreatePaisBaseParams>({
    navigate,
    returnUrl: returnUrlPaisesPage,
    enableErrorNavigate: false,
  });
  const updatePaisMutation = useUpdatePais<CreatePaisBaseParams>({
    navigate,
    returnUrl: returnUrlPaisesPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (pais?.id) {
      updatePaisMutation.mutate({ id: pais.id!, data });
      return;
    }

    console.log('lllllllllllllllll');
    ///* create
    createPaisMutation.mutate(data);
    console.log('2222222222');
  };

  ///* effects
  useEffect(() => {
    if (!pais?.id) return;
    reset(pais);
  }, [pais, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlPaisesPage)}
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
        label="Código ISO"
        name="iso_code"
        control={form.control}
        defaultValue={form.getValues().iso_code}
        error={errors.iso_code}
        helperText={errors.iso_code?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Nacionalidad"
        name="nationality"
        control={form.control}
        defaultValue={form.getValues().nationality}
        error={errors.nationality}
        helperText={errors.nationality?.message}
        size={gridSizeMdLg6}
      />
      <SampleCheckbox
        label="Tiene cobertura"
        name="has_coverage"
        control={form.control}
        defaultValue={form.getValues().has_coverage}
        size={gridSizeMdLg6}
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

export default SavePais;
