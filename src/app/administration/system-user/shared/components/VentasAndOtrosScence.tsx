import { UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Tab } from '@mui/material';

import {
  useFetchAreas,
  useFetchCanalVentas,
  useFetchCentroCostos,
  useFetchDepartamentos,
} from '@/actions/app';
import {
  a11yProps,
  FormTabsOnly,
  CustomTabPanel,
  NestedTabsScene,
  CustomAutocomplete,
  CustomAutocompleteArrString,
} from '@/shared/components';
import {
  Area,
  useLoaders,
  useTabsOnly,
  CanalVenta,
  CentroCosto,
  ToastWrapper,
  Departamento,
  gridSizeMdLg6,
  SystemUserItem,
  UserRolesEnumChoice,
  USER_ROLES_ARRAY_CHOICES,
  USER_OTHER_ROLES_ARRAY_CHOICES,
} from '@/shared';
import { SaveFormData } from './SaveSystemUser';

export type VentasAndOtrosScenceProps = {
  form: UseFormReturn<SaveFormData>;
  systemUserItem?: SystemUserItem;
};

type RoleFieldsMappingKeys =
  | UserRolesEnumChoice.ADMINISTRADOR
  | UserRolesEnumChoice.COORDINADOR
  | UserRolesEnumChoice.SUPERVISOR
  | UserRolesEnumChoice.AGENTE
  | UserRolesEnumChoice.GERENCIA;

const roleFieldsMapping: Record<
  RoleFieldsMappingKeys,
  { area: boolean; departamento: boolean; canal_venta: boolean }
> = {
  [UserRolesEnumChoice.ADMINISTRADOR]: {
    area: true,
    departamento: false,
    canal_venta: false,
  },
  [UserRolesEnumChoice.COORDINADOR]: {
    area: true,
    departamento: true,
    canal_venta: false,
  },
  [UserRolesEnumChoice.SUPERVISOR]: {
    area: true,
    departamento: true,
    canal_venta: true,
  },
  [UserRolesEnumChoice.AGENTE]: {
    area: true,
    departamento: true,
    canal_venta: true,
  },
  [UserRolesEnumChoice.GERENCIA]: {
    area: false,
    departamento: false,
    canal_venta: false,
  },
};

const VentasAndOtrosScence: React.FC<VentasAndOtrosScenceProps> = ({
  form,
  systemUserItem,
}) => {
  const { tabValue, handleTabChange } = useTabsOnly();

  const [fieldVisibility, setFieldVisibility] = useState({
    area: false,
    departamento: false,
    canal_venta: false,
  });

  const {
    formState: { errors },
  } = form;

  const watchedRole = form.watch('role');
  const watchedCentroCosto = form.watch('centro_costo');
  const watchedArea = form.watch('area');
  const watchedDepartamento = form.watch('departamento');

  useEffect(() => {
    const roleFields = roleFieldsMapping[
      watchedRole as keyof typeof roleFieldsMapping
    ] || {
      area: false,
      departamento: false,
      canal_venta: false,
    };

    setFieldVisibility(roleFields);
    // Reset form fields when role changes
    form.reset({
      ...form.getValues(),
      area: roleFields.area ? form.getValues().area : undefined,
      departamento: roleFields.departamento
        ? form.getValues().departamento
        : undefined,
      canal_venta: roleFields.canal_venta
        ? form.getValues().canal_venta
        : undefined,
    });
  }, [form, watchedRole]);

  const {
    data: centroCostosPagingRes,
    isLoading: isLoadingCentroCostos,
    isRefetching: isRefetchingCentroCostos,
  } = useFetchCentroCostos({
    params: {
      page_size: 1000,
    },
  });
  const {
    data: areaPagingRes,
    isLoading: isLoadingAreas,
    isRefetching: isRefetchingAreas,
  } = useFetchAreas({
    enabled: !!watchedCentroCosto,
    params: {
      centro_costo: watchedCentroCosto,
      page_size: 726,
    },
  });
  const {
    data: departamentoPagingRes,
    isLoading: isLoadingDepartamentos,
    isRefetching: isRefetchingDepartamentos,
  } = useFetchDepartamentos({
    enabled: !!watchedArea,
    params: {
      area: watchedArea,
      page_size: 1000,
    },
  });
  const {
    data: canalesVentaPagingRes,
    isLoading: isLoadingCanalesVenta,
    isRefetching: isRefetchingCanalesVenta,
  } = useFetchCanalVentas({
    enabled: !!watchedDepartamento,
    params: {
      page_size: 1000,
    },
  });

  // alerts no data | empty arr
  useEffect(() => {
    if (isLoadingAreas) return;
    if (
      form.getValues().role == UserRolesEnumChoice.ADMINISTRADOR ||
      form.getValues().role == UserRolesEnumChoice.COORDINADOR ||
      form.getValues().role == UserRolesEnumChoice.SUPERVISOR ||
      form.getValues().role == UserRolesEnumChoice.AGENTE
    ) {
      !areaPagingRes?.data?.items?.length &&
        ToastWrapper.warning('No se encontraron áreas disponibles');
    } else {
      return;
    }
  }, [
    areaPagingRes?.data?.items?.length,
    isLoadingAreas,
    form.getValues().role,
  ]);

  useEffect(() => {
    if (!systemUserItem) return;
    const { user } = systemUserItem;
    const userRole = user?.role; // choice

    if (userRole && userRole in roleFieldsMapping) {
      const roleFields = roleFieldsMapping[userRole as RoleFieldsMappingKeys];
      setFieldVisibility(roleFields);
      form.setValue('canal_venta', user?.canal_venta);
    }
  }, [form, systemUserItem]);

  const customLoader =
    isLoadingCanalesVenta ||
    isRefetchingCanalesVenta ||
    isLoadingDepartamentos ||
    isRefetchingDepartamentos ||
    isLoadingAreas ||
    isRefetchingAreas;
  useLoaders(customLoader);

  return (
    <>
      <NestedTabsScene
        tabs={
          <FormTabsOnly
            sxTabs={{ mb: 2 }}
            value={tabValue}
            onChange={handleTabChange}
          >
            <Tab label="Ventas" value={1} {...a11yProps(1)} />
            <Tab label="Otros" value={2} {...a11yProps(2)} />
          </FormTabsOnly>
        }
      >
        {/* ================= Ventas ================= */}
        <CustomTabPanel value={tabValue} index={1} ptGrid="0">
          <CustomAutocompleteArrString
            label="Rol de Usuario"
            name="role"
            control={form.control}
            defaultValue={form.getValues('role') || USER_ROLES_ARRAY_CHOICES[0]}
            options={USER_ROLES_ARRAY_CHOICES}
            isLoadingData={false}
            error={errors.role}
            helperText={errors.role?.message}
            size={gridSizeMdLg6}
            disableClearable
            onChangeValue={() => {
              form.reset({
                ...form.getValues(),
                area: undefined,
                departamento: undefined,
                canal_venta: undefined,
              });
            }}
          />
          <CustomAutocomplete<CentroCosto>
            label="Centro de Costo"
            name="centro_costo"
            // options
            options={centroCostosPagingRes?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().centro_costo}
            isLoadingData={isLoadingCentroCostos || isRefetchingCentroCostos}
            // vaidation
            control={form.control}
            error={errors.centro_costo}
            helperText={errors.centro_costo?.message}
            size={gridSizeMdLg6}
            disabled={false}
            required={false}
            onChangeValue={() => {
              form.setValue('area', undefined);
              form.setValue('departamento', undefined);
              form.setValue('canal_venta', undefined);
            }}
          />
          {fieldVisibility.area && (
            <CustomAutocomplete<Area>
              label="Area"
              name="area"
              options={areaPagingRes?.data?.items || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().area}
              isLoadingData={isLoadingAreas}
              control={form.control}
              error={errors.area}
              helperText={errors.area?.message}
              size={gridSizeMdLg6}
              onChangeValue={() => {
                form.setValue('departamento', undefined);
                form.setValue('canal_venta', undefined);
              }}
            />
          )}
          {fieldVisibility.departamento && (
            <CustomAutocomplete<Departamento>
              label="Departamento"
              name="departamento"
              options={departamentoPagingRes?.data?.items || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().departamento}
              isLoadingData={isLoadingDepartamentos}
              control={form.control}
              error={errors.departamento}
              helperText={errors.departamento?.message}
              size={gridSizeMdLg6}
            />
          )}
          {fieldVisibility.canal_venta && (
            <CustomAutocomplete<CanalVenta>
              label="Canal de Venta"
              name="canal_venta"
              options={canalesVentaPagingRes?.data?.items || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().canal_venta}
              isLoadingData={isLoadingCanalesVenta || isRefetchingCanalesVenta}
              control={form.control}
              error={errors.canal_venta}
              helperText={errors.canal_venta?.message}
              size={gridSizeMdLg6}
            />
          )}
        </CustomTabPanel>

        {/* ================= Otros ================= */}
        <CustomTabPanel value={tabValue} index={2} ptGrid="0">
          <CustomAutocompleteArrString
            label="Otros"
            name="x"
            options={USER_OTHER_ROLES_ARRAY_CHOICES}
            isLoadingData={false}
            control={form.control}
            size={gridSizeMdLg6}
            error={errors.role}
            helperText={errors.role?.message}
          />
        </CustomTabPanel>
      </NestedTabsScene>
    </>
  );
};

export default VentasAndOtrosScence;
