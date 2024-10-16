import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateProvinciaParams,
  useCreateProvincia,
  useFetchPaises,
  useUpdateProvincia,
} from '@/actions/app';
import {
  CustomAutocomplete,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { useLoaders } from '@/shared/hooks';
import { Pais, PermissionsEnum, Provincia } from '@/shared/interfaces';
import { provinciaFormSchema } from '@/shared/utils';
import { returnUrlProvinciasPage } from '../../../pages/tables/ProvinciasPage';
import { useCheckPermission } from '@/shared/hooks/auth';

export interface SaveProvinciaProps {
  title: string;
  provincia?: Provincia;
}

type SaveFormData = CreateProvinciaParams & {};

const SaveProvincia: React.FC<SaveProvinciaProps> = ({ title, provincia }) => {
  useCheckPermission(PermissionsEnum.administration_view_pais);
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(provinciaFormSchema) as any,
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

  ///* fetch data
  const {
    data: countriesPagingRes,
    isLoading: isLoadingCountries,
    isRefetching: isRefetchingCountries,
  } = useFetchPaises({
    params: {
      page_size: 100,
    },
  });

  ///* mutations
  const createProvinciaMutation = useCreateProvincia({
    navigate,
    returnUrl: returnUrlProvinciasPage,
    enableErrorNavigate: false,
  });
  const updateProvinciaMutation = useUpdateProvincia<CreateProvinciaParams>({
    navigate,
    returnUrl: returnUrlProvinciasPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (provincia?.id) {
      updateProvinciaMutation.mutate({ id: provincia.id!, data });
      return;
    }

    ///* create
    createProvinciaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!provincia?.id) return;
    reset(provincia);
  }, [provincia, reset]);
  useLoaders(isLoadingCountries || isRefetchingCountries);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlProvinciasPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Name"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Pais>
        label="Pais"
        name="pais"
        // options
        options={countriesPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().pais}
        isLoadingData={isLoadingCountries || isRefetchingCountries}
        disabled={isLoadingCountries || isRefetchingCountries}
        // vaidation
        control={form.control}
        error={errors.pais}
        helperText={errors.pais?.message}
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

export default SaveProvincia;
