import {
  useFetchAreas,
  useFetchCanalVentas,
  useFetchDepartamentos,
} from '@/actions/app';
import {
  Area,
  CanalVenta,
  Departamento,
  gridSizeMdLg6,
  SystemUserItem,
  ToastWrapper,
  useLoaders,
  USER_OTHER_ROLES_ARRAY_CHOICES,
  USER_ROLES_ARRAY_CHOICES,
  UserRolesEnumChoice,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomAutocomplete,
  CustomAutocompleteArrString,
  CustomTabPanel,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';
import { Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form'; // Importar el tipo UseFormReturn
import { SaveFormData } from './SaveSystemUser';

export type VentasAndOtrosScenceProps = {
  form: UseFormReturn<SaveFormData>;
  systemUserItem?: SystemUserItem;
};

const roleFieldsMapping = {
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

  useEffect(() => {
    const roleFields = roleFieldsMapping[
      watchedRole as UserRolesEnumChoice
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
    data: areaPagingRes,
    isLoading: isLoadingAreas,
    isRefetching: isRefetchingAreas,
  } = useFetchAreas({
    params: {
      page_size: 726,
    },
  });
  const {
    data: canalesVentaPagingRes,
    isLoading: isLoadingCanalesVenta,
    isRefetching: isRefetchingCanalesVenta,
  } = useFetchCanalVentas({
    params: {
      page_size: 1000,
    },
  });
  const {
    data: departamentoPagingRes,
    isLoading: isLoadingDepartamentos,
    isRefetching: isRefetchingDepartamentos,
  } = useFetchDepartamentos({
    enabled: fieldVisibility.area,
    params: {
      area: form.getValues().area,
      page_size: 1000,
    },
  });

  // alerts no data | empty arr
  useEffect(() => {
    if (isLoadingAreas) return;
    !areaPagingRes?.data?.items?.length &&
      ToastWrapper.warning('No se encontraron áreas disponibles');
  }, [areaPagingRes?.data?.items?.length, isLoadingAreas]);

  useEffect(() => {
    if (!systemUserItem) return;
    const { user } = systemUserItem;
    const userRole = user?.role; // choice
    if (userRole) {
      const roleFields = roleFieldsMapping[userRole];
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
