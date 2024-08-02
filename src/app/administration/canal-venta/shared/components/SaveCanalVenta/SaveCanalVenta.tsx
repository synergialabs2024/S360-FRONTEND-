import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateCanalVentaParamsBase,
  useCreateCanalVenta,
  useFetchEmpresas,
  useUpdateCanalVenta,
} from '@/actions/app';
import {
  CustomAutocomplete,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { useLoaders } from '@/shared/hooks';
import { CanalVenta, Empresa, PermissionsEnum } from '@/shared/interfaces';
import { canalVentaFormSchema } from '@/shared/utils';
import { returnUrlCanalesVentaPage } from '../../../pages/tables/CanalesVentaPage';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';

export interface SaveCanalVentaProps {
  title: string;
  canalventa?: CanalVenta;
}

type SaveFormData = CreateCanalVentaParamsBase & {};

const SaveCanalVenta: React.FC<SaveCanalVentaProps> = ({
  title,
  canalventa,
}) => {
  useCheckPermissionsArray([PermissionsEnum.administration_view_empresa]);

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(canalVentaFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* fetch data
  const {
    data: empresasPagingRes,
    isLoading: isLoadingEmpresas,
    isRefetching: isRefetchingEmpresas,
  } = useFetchEmpresas({
    params: {
      page_size: 600,
    },
  });

  ///* mutations
  const createCanalVentaMutation = useCreateCanalVenta({
    navigate,
    returnUrl: returnUrlCanalesVentaPage,
    enableErrorNavigate: false,
  });
  const updateCanalVentaMutation =
    useUpdateCanalVenta<CreateCanalVentaParamsBase>({
      navigate,
      returnUrl: returnUrlCanalesVentaPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (canalventa?.id) {
      updateCanalVentaMutation.mutate({ id: canalventa.id!, data });
      return;
    }

    ///* create
    createCanalVentaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!canalventa?.id) return;
    reset(canalventa);
  }, [canalventa, reset]);
  useLoaders(isLoadingEmpresas || isRefetchingEmpresas);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCanalesVentaPage)}
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
      <CustomAutocomplete<Empresa>
        label="Empresa"
        name="empresa"
        // options
        options={(empresasPagingRes?.data?.items as unknown as Empresa[]) || []}
        valueKey="razon_social"
        actualValueKey="id"
        defaultValue={form.getValues().empresa}
        isLoadingData={isLoadingEmpresas || isRefetchingEmpresas}
        // vaidation
        control={form.control}
        error={errors.empresa}
        helperText={errors.empresa?.message}
        size={gridSizeMdLg6}
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

export default SaveCanalVenta;
