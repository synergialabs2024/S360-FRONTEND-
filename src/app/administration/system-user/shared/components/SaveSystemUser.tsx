import { yupResolver } from '@hookform/resolvers/yup';
import { Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import {
  CreateUserProfileData,
  useCreateSystemUser,
  useFetchAreas,
  useFetchCanalVentas,
  useFetchCargos,
  useFetchCiudades,
  useFetchDepartamentos,
  useFetchPaises,
  useFetchProvincias,
  useFetchSectores,
  useFetchSystemGroups,
  useFetchZonas,
  useUpdateSystemUser,
} from '@/actions/app';
import {
  a11yProps,
  CustomAutocomplete,
  CustomAutocompleteArrString,
  CustomCellphoneTextField,
  CustomIdentificacionTextField,
  CustomNumberTextField,
  CustomPasswordTextField,
  CustomTabPanel,
  CustomTextArea,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  FormTabsOnly,
  InputAndBtnGridSpace,
  SampleCheckbox,
  TabsFormBoxScene,
} from '@/shared/components';
import {
  EMPLOYEE_TYPE_ARRAY_CHOICES,
  IDENTIFICATION_TYPE_ARRAY_CHOICES,
  USER_ROLES_ARRAY_CHOICES,
  UserRolesEnumChoice,
} from '@/shared/constants/app';
import { gridSize, gridSizeMdLg6 } from '@/shared/constants/ui';
import { useLoaders, useTabsOnly } from '@/shared/hooks';
import {
  Area,
  CanalVenta,
  Cargo,
  Ciudad,
  Departamento,
  Pais,
  Provincia,
  Sector,
  SystemGroup,
  SystemUserItem,
  Zona,
} from '@/shared/interfaces';
import { systemUserFormSchema } from '@/shared/utils';
import { ToastWrapper } from '@/shared/wrappers';
import { useUiConfirmModalStore } from '@/store/ui';
import { returnUrlSystemUserPage } from '../../pages/tables/SystemUserPage';

export type SaveSystemUserProps = {
  title: string;
  systemUserItem?: SystemUserItem;
};

type SaveFormData = CreateUserProfileData & {
  create_employee?: boolean; // handle create employee
  isEdit: boolean; // yuo validation password
};

const AVAILABLE_VENETAS_ROLE = [
  UserRolesEnumChoice.SUPERVISOR,
  UserRolesEnumChoice.AGENTE,
];

const SaveSystemUser: React.FC<SaveSystemUserProps> = ({
  title,
  systemUserItem,
}) => {
  ///* hooks ----------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* local state ----------------
  const [canWritePassword, setCanWritePassword] = useState<boolean>(true);
  const [canSelectCanalVenta, setCanSelectCanalVenta] =
    useState<boolean>(false);

  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* form ----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(systemUserFormSchema) as any,
    defaultValues: {
      isEdit: false,
      create_employee: false,
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const watchedCreateEmployee = form.watch('create_employee');
  const watchedIdentificationType = form.watch('tipo_identificacion');
  const watchedIsEdit = form.watch('isEdit');
  const watchedArea = form.watch('area');
  const whatchedIsEdit = form.watch('isEdit');

  ///* fetch data ----------------
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
    params: {
      page_size: 1000,
    },
  });
  const {
    data: systemGroupsPagingRes,
    isLoading: isSystemGroupsLoading,
    isRefetching: isSystemGroupsRefetching,
  } = useFetchSystemGroups({
    params: {
      page_size: 1000,
    },
  });
  const {
    data: cargosPagingRes,
    isLoading: isLoadingCargos,
    isRefetching: isRefetchingCargos,
  } = useFetchCargos({
    enabled: !!watchedCreateEmployee,
    params: {
      page_size: 1000,
    },
  });
  const watchedCountry = form.watch('pais');
  const watchedProvincia = form.watch('provincia');
  const watchedCiudad = form.watch('ciudad');
  const watchedZona = form.watch('zona');
  const {
    data: paisesPagingRes,
    isLoading: isLoadingPaises,
    isRefetching: isRefetchingPaises,
  } = useFetchPaises({
    enabled: !!watchedCreateEmployee,
    params: {
      page_size: 1000,
    },
  });
  const {
    data: provinciasPagingRes,
    isLoading: isLoadingProvincias,
    isRefetching: isRefetchingProvincias,
  } = useFetchProvincias({
    enabled: !!watchedCountry && !!watchedCreateEmployee,
    params: {
      pais: watchedCountry,
      page_size: 1000,
    },
  });
  const {
    data: ciudadesPagingRes,
    isLoading: isLoadingCiudades,
    isRefetching: isRefetchingCiudades,
  } = useFetchCiudades({
    enabled: !!watchedProvincia && !!watchedCreateEmployee,
    params: {
      provincia: watchedProvincia,
      page_size: 1000,
    },
  });
  const {
    data: zonasPagingRes,
    isLoading: isLoadingZonas,
    isRefetching: isRefetchingZonas,
  } = useFetchZonas({
    enabled: !!watchedCiudad && !!watchedCreateEmployee,
    params: {
      ciudad: watchedCiudad,
      page_size: 1000,
    },
  });
  const {
    data: sectoresPagingRes,
    isLoading: isLoadingSectores,
    isRefetching: isRefetchingSectores,
  } = useFetchSectores({
    enabled: !!watchedZona && !!watchedCreateEmployee,
    params: {
      zona: watchedZona,
      page_size: 1000,
    },
  });

  ///* mutation ----------------
  const createUser = useCreateSystemUser<CreateUserProfileData>({
    navigate,
    returnUrl: returnUrlSystemUserPage,
  });
  const updUser = useUpdateSystemUser<CreateUserProfileData>({
    navigate,
    returnUrl: returnUrlSystemUserPage,
  });

  ///* handlers ----------------
  const onSave = (data: SaveFormData) => {
    const { password, ...rest } = data;
    console.log(data);

    //* upd
    if (systemUserItem) {
      updUser.mutate({
        id: systemUserItem?.user?.id!,
        data: {
          ...rest,
          ...(password && { password }),
          groups: data.groups ? [+data.groups] : [],
          create_employee: !!watchedCreateEmployee,
        },
      });
      return;
    }

    //* create
    createUser.mutate({
      ...data,
      groups: data.groups ? [+data.groups] : [],
      create_employee: !!watchedCreateEmployee,
    });
  };

  ///* effects ----------------
  useEffect(() => {
    if (!systemUserItem) return;
    const { user, employee } = systemUserItem;
    const createEmployee = !!employee;
    const userRole = user?.role; // choice

    form.reset({
      ...user,
      create_employee: createEmployee,
      ...(employee && { ...employee }),
      groups: user.groups?.at(0) as any,
      isEdit: true,
    });

    setCanSelectCanalVenta(AVAILABLE_VENETAS_ROLE.includes(userRole!));
    setCanWritePassword(false);
  }, [form, systemUserItem]);

  // alerts no data | empty arr
  useEffect(() => {
    if (!watchedCountry || isLoadingProvincias || isRefetchingProvincias)
      return;

    !provinciasPagingRes?.data?.items?.length &&
      ToastWrapper.warning(
        'No se encontraron provincias para el país seleccionado',
      );

    if (!watchedProvincia || isLoadingCiudades || isRefetchingCiudades) return;
    !ciudadesPagingRes?.data?.items?.length &&
      ToastWrapper.warning(
        'No se encontraron ciudades para la provincia seleccionada',
      );

    if (!watchedCiudad || isLoadingZonas || isRefetchingZonas) return;
    !zonasPagingRes?.data?.items?.length &&
      ToastWrapper.warning(
        'No se encontraron zonas para la ciudad seleccionada',
      );
  }, [
    watchedProvincia,
    watchedCiudad,
    watchedZona,
    watchedCountry,
    isLoadingProvincias,
    isRefetchingProvincias,
    provinciasPagingRes?.data?.items,
    isLoadingCiudades,
    isRefetchingCiudades,
    ciudadesPagingRes?.data?.items,
    isLoadingZonas,
    isRefetchingZonas,
    zonasPagingRes?.data?.items,
  ]);

  // alerts no data | empty arr
  useEffect(() => {
    if (isLoadingAreas) return;
    !areaPagingRes?.data?.items?.length &&
      ToastWrapper.warning('No se encontraron áreas disponibles');

    if ((isLoadingCargos || isRefetchingCargos) && !!watchedCreateEmployee)
      return;
    !cargosPagingRes?.data?.items?.length &&
      watchedCreateEmployee &&
      ToastWrapper.warning(
        'No se encontraron cargos disponibles para el empleado',
      );

    if (isLoadingCanalesVenta || isRefetchingCanalesVenta) return;
    !canalesVentaPagingRes?.data?.items?.length &&
      ToastWrapper.warning('No se encontraron canales de venta disponibles');
  }, [
    areaPagingRes?.data?.items?.length,
    canalesVentaPagingRes?.data?.items?.length,
    cargosPagingRes?.data?.items?.length,
    isLoadingAreas,
    isLoadingCanalesVenta,
    isLoadingCargos,
    isRefetchingCanalesVenta,
    isRefetchingCargos,
    watchedArea,
    watchedCreateEmployee,
  ]);

  const customLoader =
    isLoadingAreas ||
    isRefetchingAreas ||
    isLoadingDepartamentos ||
    isRefetchingDepartamentos ||
    isSystemGroupsLoading ||
    isSystemGroupsRefetching ||
    isRefetchingCanalesVenta ||
    isLoadingCanalesVenta ||
    isLoadingCargos ||
    isRefetchingCargos ||
    isLoadingPaises ||
    isRefetchingPaises ||
    isLoadingProvincias ||
    isRefetchingProvincias ||
    isLoadingCiudades ||
    isRefetchingCiudades ||
    isLoadingZonas ||
    isRefetchingZonas ||
    isLoadingSectores ||
    isRefetchingSectores;
  useLoaders(customLoader);

  return (
    <TabsFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSystemUserPage)}
      onSave={handleSubmit(onSave, () => {
        console.log('error', errors);
        ToastWrapper.error('Faltan campos requeridos por completar');
      })}
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Datos Usuario" value={1} {...a11yProps(1)} />

          {watchedCreateEmployee && (
            <Tab label="Datos Empleado" value={2} {...a11yProps(2)} />
          )}
        </FormTabsOnly>
      }
    >
      {/* ======================== User and Groups ======================== */}
      <CustomTabPanel index={1} value={tabValue}>
        {/* -------- User Form -------- */}
        <CustomTypoLabel text="Información Personal" />
        <>
          <CustomAutocompleteArrString
            label="Tipo de identificación"
            name="tipo_identificacion"
            control={form.control}
            defaultValue={form.getValues('tipo_identificacion')}
            options={IDENTIFICATION_TYPE_ARRAY_CHOICES}
            isLoadingData={false}
            error={errors.tipo_identificacion}
            helperText={errors.tipo_identificacion?.message}
            size={gridSizeMdLg6}
            disableClearable
            onChangeValue={() => {
              form.setValue('identificacion', '');
              form.setValue('razon_social', '');
            }}
          />
          <InputAndBtnGridSpace
            inputNode={
              <CustomIdentificacionTextField
                label="Identificación"
                name="identificacion"
                control={form.control}
                selectedDocumentType={watchedIdentificationType}
                defaultValue={form.getValues('identificacion')}
                error={errors.identificacion}
                helperText={errors.identificacion?.message}
                onFetchCedulaRucInfo={value => {
                  alert(value);
                }}
                disabled={!watchedIdentificationType}
              />
            }
            btnLabel="Buscar"
            iconBtn={<CiSearch />}
            onClick={() => {
              alert('search');
            }}
          />

          <CustomTextField
            label="Razón social"
            name="razon_social"
            control={form.control}
            defaultValue={form.getValues().razon_social}
            error={errors.razon_social}
            helperText={errors.razon_social?.message}
          />
          <CustomTextField
            label="Correo Electrónico"
            name="email"
            control={form.control}
            defaultValue={form.getValues().email}
            error={errors.email}
            helperText={errors.email?.message}
            type="email"
          />

          <CustomTextField
            label="Username"
            name="username"
            control={form.control}
            defaultValue={form.getValues().username}
            error={errors.username}
            helperText={errors.username?.message}
            size={gridSizeMdLg6}
            ignoreTransform
          />
          <InputAndBtnGridSpace
            inputNode={
              <CustomPasswordTextField
                label="Contraseña"
                name="password"
                defaultValue={form.getValues().password}
                control={form.control}
                errors={errors?.password}
                helperText={errors?.password?.message}
                disabled={!canWritePassword}
              />
            }
            showIconBtn={watchedIsEdit}
            btnLabel="Cambiar Contraseña"
            iconBtn={<MdEdit />}
            onClick={() => {
              !canWritePassword &&
                setConfirmDialog({
                  isOpen: true,
                  title: 'Cambiar Contraseña',
                  subtitle:
                    '¿Está seguro que desea cambiar la contraseña de este usuario?',
                  onConfirm: () => {
                    setCanWritePassword(true);
                    setConfirmDialogIsOpen(false);
                  },
                });
            }}
          />

          {/* ---------- FK ---------- */}
          <CustomAutocomplete<Area>
            label="Area"
            name="area"
            // options
            options={areaPagingRes?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().area}
            isLoadingData={isLoadingAreas}
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
            options={departamentoPagingRes?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().departamento}
            isLoadingData={isLoadingDepartamentos}
            // vaidation
            control={form.control}
            error={errors.departamento}
            helperText={errors.departamento?.message}
            size={gridSizeMdLg6}
          />
          <CustomAutocompleteArrString
            label="Rol de Usuario"
            name="role"
            control={form.control}
            defaultValue={form.getValues('role')}
            options={USER_ROLES_ARRAY_CHOICES}
            isLoadingData={false}
            error={errors.role}
            helperText={errors.role?.message}
            size={gridSizeMdLg6}
            disableClearable
            onChangeValue={role => {
              const canSelectCanalVenta = AVAILABLE_VENETAS_ROLE.includes(role);
              setCanSelectCanalVenta(canSelectCanalVenta);
            }}
          />

          {/* ----------- canal ventas ----------- */}
          <>
            {canSelectCanalVenta && (
              <CustomAutocomplete<CanalVenta>
                label="Canal de Venta"
                name="canal_venta"
                // options
                options={canalesVentaPagingRes?.data?.items || []}
                valueKey="name"
                actualValueKey="id"
                defaultValue={form.getValues().canal_venta}
                isLoadingData={isLoadingCanalesVenta}
                // vaidation
                control={form.control}
                error={errors.canal_venta}
                helperText={errors.canal_venta?.message}
                required={false}
                size={gridSizeMdLg6}
              />
            )}

            <SampleCheckbox
              label="¿Crear Empleado?"
              name="create_employee"
              control={form.control}
              defaultValue={!!form.getValues().create_employee}
              size={canSelectCanalVenta ? gridSizeMdLg6 : gridSize}
              onChangeValue={v => {
                !!v && ToastWrapper.info('Complete los datos del empleado');
              }}
              disabled={
                (!!systemUserItem && !!systemUserItem?.create_employee) ||
                !!whatchedIsEdit
              }
              onClickDisabled={() => {
                ToastWrapper.warning(
                  'Una vez creado el usuario no podrá gestionar el empleado desde este módulo',
                );
              }}
            />
          </>
        </>

        {/* -------- Groups -------- */}
        <CustomTypoLabel
          text="Grupo (Opcional)"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <>
          <CustomAutocomplete<SystemGroup>
            label="Grupo"
            name="groups"
            // options
            options={systemGroupsPagingRes?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().groups as any}
            isLoadingData={isSystemGroupsLoading || isSystemGroupsRefetching}
            // vaidation
            control={form.control}
            error={!!errors.groups}
            helperText={errors.groups?.message}
          />
        </>
      </CustomTabPanel>

      {/* ======================== Employee ======================== */}
      <CustomTabPanel index={2} value={tabValue}>
        <>
          {/* -------- Cargo -------- */}
          <CustomTypoLabel text="Cargo en la Empresa" />
          <CustomAutocomplete<Cargo>
            label="Cargo"
            name="cargo"
            // options
            options={cargosPagingRes?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().cargo}
            isLoadingData={isLoadingCargos || isRefetchingCargos}
            // vaidation
            control={form.control}
            error={errors.cargo}
            helperText={errors.cargo?.message}
            size={gridSizeMdLg6}
            disabled={watchedIsEdit}
          />
          <CustomAutocompleteArrString
            label="Tipo de Empleado"
            name="tipo_empleado"
            control={form.control}
            defaultValue={form.getValues('tipo_empleado')}
            options={EMPLOYEE_TYPE_ARRAY_CHOICES}
            isLoadingData={false}
            error={errors.tipo_empleado}
            helperText={errors.tipo_empleado?.message}
            size={gridSizeMdLg6}
            disabled={watchedIsEdit}
            disableClearable
          />
          <CustomNumberTextField
            label="Salario"
            name="salary"
            control={form.control}
            defaultValue={form.getValues().salary}
            error={errors.salary}
            helperText={errors.salary?.message}
            size={gridSizeMdLg6}
            disabled={watchedIsEdit}
            customType="currency"
            min={0}
          />
        </>
        <>
          <CustomTypoLabel
            text="Información de Contacto"
            pt={CustomTypoLabelEnum.ptMiddlePosition}
          />
          <CustomCellphoneTextField
            label="Teléfono 1"
            name="phone_1"
            control={form.control}
            defaultValue={form.getValues().phone_1}
            error={errors.phone_1}
            helperText={errors.phone_1?.message}
            disabled={watchedIsEdit}
          />
          <CustomCellphoneTextField
            label="Teléfono 2"
            name="phone_2"
            control={form.control}
            defaultValue={form.getValues().phone_2}
            error={errors.phone_2}
            helperText={errors.phone_2?.message}
            size={gridSizeMdLg6}
            disabled={watchedIsEdit}
          />
          <CustomCellphoneTextField
            label="Teléfono 3"
            name="phone_3"
            control={form.control}
            defaultValue={form.getValues().phone_3}
            error={errors.phone_3}
            helperText={errors.phone_3?.message}
            size={gridSizeMdLg6}
            disabled={watchedIsEdit}
            required={false}
          />

          {/* ----------- Location ----------- */}
          <>
            <CustomAutocomplete<Pais>
              label="País"
              name="pais"
              // options
              options={paisesPagingRes?.data?.items || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().pais}
              isLoadingData={isLoadingPaises || isRefetchingPaises}
              // vaidation
              control={form.control}
              error={errors.pais}
              helperText={errors.pais?.message}
              disabled={watchedIsEdit}
              onChangeValue={() => {
                form.reset({
                  ...form.getValues(),
                  provincia: undefined,
                  ciudad: undefined,
                  zona: undefined,
                  sector: undefined,
                });
              }}
            />
            <CustomAutocomplete<Provincia>
              label="Provincia"
              name="provincia"
              // options
              options={provinciasPagingRes?.data?.items || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().provincia}
              isLoadingData={isLoadingProvincias || isRefetchingProvincias}
              // vaidation
              control={form.control}
              error={errors.provincia}
              helperText={errors.provincia?.message}
              size={gridSizeMdLg6}
              disabled={watchedIsEdit}
              onChangeValue={() => {
                form.reset({
                  ...form.getValues(),
                  ciudad: undefined,
                  zona: undefined,
                  sector: undefined,
                });
              }}
            />
            <CustomAutocomplete<Ciudad>
              label="Ciudad"
              name="ciudad"
              // options
              options={ciudadesPagingRes?.data?.items || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().ciudad}
              isLoadingData={isLoadingCiudades || isRefetchingCiudades}
              // vaidation
              control={form.control}
              error={errors.ciudad}
              helperText={errors.ciudad?.message}
              size={gridSizeMdLg6}
              disabled={watchedIsEdit}
              onChangeValue={() => {
                form.reset({
                  ...form.getValues(),
                  zona: undefined,
                  sector: undefined,
                });
              }}
            />
            <CustomAutocomplete<Zona>
              label="Zona"
              name="zona"
              // options
              options={zonasPagingRes?.data?.items || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().zona}
              isLoadingData={isLoadingZonas || isRefetchingZonas}
              // vaidation
              control={form.control}
              error={errors.zona}
              helperText={errors.zona?.message}
              size={gridSizeMdLg6}
              disabled={watchedIsEdit}
              onChangeValue={() => {
                form.reset({
                  ...form.getValues(),
                  sector: undefined,
                });
              }}
            />
            <CustomAutocomplete<Sector>
              label="Sector"
              name="sector"
              // options
              options={sectoresPagingRes?.data?.items || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().sector}
              isLoadingData={isLoadingSectores || isRefetchingSectores}
              // vaidation
              control={form.control}
              error={errors.sector}
              helperText={errors.sector?.message}
              size={gridSizeMdLg6}
              disabled={watchedIsEdit}
            />
          </>

          <CustomTextArea
            label="Dirección"
            name="address"
            control={form.control}
            defaultValue={form.getValues().address}
            error={errors.address}
            helperText={errors.address?.message}
            disabled={watchedIsEdit}
          />
        </>
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SaveSystemUser;
