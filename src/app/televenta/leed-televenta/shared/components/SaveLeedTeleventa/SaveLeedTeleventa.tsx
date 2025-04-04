import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  CreateLeedTeleventaParamsBase,
  useCreateLeedteleventa,
  useFetchAreas,
  useFetchCanalVentas,
  useFetchDepartamentos,
  useFetchPlanInternets,
  useUpdateLeedteleventa,
} from '@/actions/app';
import {
  Area,
  CanalVenta,
  Departamento,
  gridSizeMdLg6,
  LeedTeleventa,
  leedteleventaFormSchema,
  PermissionsEnum,
  PlanInternet,
  useLoaders,
} from '@/shared';
import { CustomAutocomplete, SingleFormBoxScene } from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlLeedTeleventaPage } from '../../../pages/tables/LeedTeleventaPages';

export interface SaveLeedTeleventaProps {
  title: string;
  leedTeleventa?: LeedTeleventa;
}

type SaveFormData = CreateLeedTeleventaParamsBase & {};

const SaveLeedTeleventa: React.FC<SaveLeedTeleventaProps> = ({
  title,
  leedTeleventa,
}) => {
  useCheckPermission(PermissionsEnum.televentas_view_leedteleventa);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(leedteleventaFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* fetch data
  const {
    data: planInternetPagingRes,
    isLoading: isLoadingPlanInternet,
    isRefetching: isRefetchingPlanInternet,
  } = useFetchPlanInternets({
    params: {
      page_size: 1000,
    },
  });
  const {
    data: areaPagingRes,
    isLoading: isLoadingArea,
    isRefetching: isRefetchingArea,
  } = useFetchAreas({
    params: {
      page_size: 1000,
    },
  });
  const {
    data: departamentosPagingRes,
    isLoading: isLoadingDepartamento,
    isRefetching: isRefetchingDepartamento,
  } = useFetchDepartamentos({
    params: {
      page_size: 1000,
    },
  });
  const {
    data: canalVentaPagingRes,
    isLoading: isLoadingCanalVenta,
    isRefetching: isRefetchingCanalVenta,
  } = useFetchCanalVentas({
    params: {
      page_size: 1000,
    },
  });

  ///* mutations
  const createLeedTeleventaMutation = useCreateLeedteleventa({
    navigate,
    returnUrl: returnUrlLeedTeleventaPage,
    enableErrorNavigate: false,
  });
  const updateLeedTeleventaMutation =
    useUpdateLeedteleventa<CreateLeedTeleventaParamsBase>({
      navigate,
      returnUrl: returnUrlLeedTeleventaPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (leedTeleventa?.id) {
      updateLeedTeleventaMutation.mutate({ id: leedTeleventa.id!, data });
      return;
    }

    ///* create
    createLeedTeleventaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!leedTeleventa?.id) return;
    reset(leedTeleventa);
  }, [leedTeleventa, reset]);

  const customLoader =
    isLoadingPlanInternet ||
    isRefetchingPlanInternet ||
    isLoadingArea ||
    isRefetchingArea ||
    isLoadingDepartamento ||
    isRefetchingDepartamento ||
    isLoadingCanalVenta ||
    isRefetchingCanalVenta;

  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlLeedTeleventaPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomAutocomplete<PlanInternet>
        label="Plan Internet"
        name="plan_internet"
        // options
        options={planInternetPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().plan_internet}
        isLoadingData={isLoadingPlanInternet || isRefetchingPlanInternet}
        // vaidation
        control={form.control}
        error={errors.plan_internet}
        helperText={errors.plan_internet?.message}
      />
      <CustomAutocomplete<Area>
        label="Area"
        name="area"
        // options
        options={areaPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().area}
        isLoadingData={isLoadingArea || isRefetchingArea}
        // vaidation
        control={form.control}
        error={errors.area}
        helperText={errors.area?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocomplete<Departamento>
        label="Departamento"
        name="departamento"
        // options
        options={departamentosPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().departamento}
        isLoadingData={isLoadingDepartamento || isRefetchingDepartamento}
        // vaidation
        control={form.control}
        error={errors.departamento}
        helperText={errors.departamento?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocomplete<CanalVenta>
        label="Canal Venta"
        name="canal_venta"
        // options
        options={canalVentaPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().canal_venta}
        isLoadingData={isLoadingCanalVenta || isRefetchingCanalVenta}
        // vaidation
        control={form.control}
        error={errors.canal_venta}
        helperText={errors.canal_venta?.message}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveLeedTeleventa;
