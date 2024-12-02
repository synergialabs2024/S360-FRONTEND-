import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateGrupoIPv4ParamsBase,
  useCreateGrupoIPv4,
  useFetchBrass,
  useUpdateGrupoIPv4,
} from '@/actions/app';
import {
  IP_USES_TYPE_ARRAY_CHOICES,
  PermissionsEnum,
  Router,
  ToastWrapper,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomNumberTextField,
  CustomTextField,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { Brass, GrupoIPv4 } from '@/shared/interfaces';
import { getKeysFormErrorsMessage, grupoIPv4FormSchema } from '@/shared/utils';
import { returnUrlGruposIPv4Page } from '../../../pages/tables/GruposIPv4Page';

export interface SaveGrupoIPv4Props {
  title: string;
  grupoipv4?: GrupoIPv4;
}

type SaveFormData = CreateGrupoIPv4ParamsBase & {
  routers: Router[];
};

const SaveGrupoIPv4: React.FC<SaveGrupoIPv4Props> = ({ title, grupoipv4 }) => {
  useCheckPermission(PermissionsEnum.infraestructura_view_router);

  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(grupoIPv4FormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  // const watchedRouters = form.watch('routers');

  ///* mutations ---------------------
  const createGrupoIPv4Mutation = useCreateGrupoIPv4<CreateGrupoIPv4ParamsBase>(
    {
      navigate,
      returnUrl: returnUrlGruposIPv4Page,
      enableErrorNavigate: false,
    },
  );
  const updateGrupoIPv4Mutation = useUpdateGrupoIPv4<CreateGrupoIPv4ParamsBase>(
    {
      navigate,
      returnUrl: returnUrlGruposIPv4Page,
    },
  );

  ///* fetch data ---------------------
  // const {
  //   data: routersPagingRes,
  //   isLoading: isLoadingRouters,
  //   isRefetching: isRefetchingRouters,
  // } = useFetchRouters({
  //   params: {
  //     tiene_grupo_ipv4: false,
  //     page_size: 1500,
  //   },
  // });
  const {
    data: brassPagingRes,
    isLoading: isLoadingBrass,
    isRefetching: isRefetchingBrass,
  } = useFetchBrass({
    params: {
      page_size: 1500,
    },
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (grupoipv4?.id) {
      const { routers: routers_data, ...rest } = data;
      updateGrupoIPv4Mutation.mutate({
        id: grupoipv4.id!,
        data: {
          name: rest.name,
          state: rest.state,
          ipv_4: rest.ipv_4,
          cidr: rest.cidr,
          tipo_uso: rest.tipo_uso,

          ...((!grupoipv4?.routers_data?.length && {
            routers: routers_data?.map(router => router?.id),
          }) as any),
        },
      });
      return;
    }

    ///* create
    createGrupoIPv4Mutation.mutate({
      ...data,
      routers: data.routers?.map(router => router.id) || null,
    });
  };

  ///* columns ---------------------
  // const { routersDataColumnsIPs } = useColumnsRouters();

  ///* effects ---------------------
  useEffect(() => {
    if (!grupoipv4?.id) return;
    const routers = grupoipv4?.routers_data || [];

    reset({
      ...grupoipv4,
      routers,
    });
  }, [grupoipv4, reset]);

  // const isCustomLoading = isLoadingRouters || isRefetchingRouters;
  // useLoaders(isCustomLoading);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlGruposIPv4Page)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
        size={gridSizeMdLg6}
      />
      <SelectArrayString
        label="Tipo de uso"
        name="tipo_uso"
        control={form.control}
        error={errors.tipo_uso}
        helperText={errors.tipo_uso?.message}
        defaultValue={form.getValues('tipo_uso')}
        options={IP_USES_TYPE_ARRAY_CHOICES}
      />

      <CustomTextField
        label="Red"
        name="ipv_4"
        control={form.control}
        defaultValue={form.getValues().ipv_4}
        error={errors.ipv_4}
        helperText={errors.ipv_4?.message}
        size={gridSizeMdLg6}
      />
      <CustomNumberTextField
        label="Máscara"
        name="cidr"
        control={form.control}
        defaultValue={form.getValues().cidr}
        error={errors.cidr}
        helperText={errors.cidr?.message}
        size={gridSizeMdLg6}
        min={16}
        max={32}
      />

      <>
        <CustomAutocomplete<Brass>
          label="Brass"
          name="brass"
          textFieldKey="name"
          valueKey="name"
          actualValueKey="id"
          // options
          options={brassPagingRes?.data?.items || []}
          defaultValue={form.getValues('brass')}
          isLoadingData={isLoadingBrass || isRefetchingBrass}
          // errors
          control={form.control}
          error={errors.routers as any}
          helperText={
            errors.routers?.message ||
            'Una vez guardado, no se podrá cambiar el brass.'
          }
          required={false}
          disabled={!!grupoipv4?.id}
        />
      </>

      <>
        {/* =============== BRASS =============== */}
        {/* <CustomAutocompleteMultiple<Router>
          label="Routers"
          name="routers"
          textFieldKey="name"
          valueKey="name"
          actualValueKey="id"
          // options
          options={routersPagingRes?.data?.items || []}
          isLoadingData={isLoadingRouters || isRefetchingRouters}
          // errors
          control={form.control}
          error={errors.routers as any}
          helperText={
            errors.routers?.message ||
            'Una vez asignado el pool de IP al router, no se podrá modificar.'
          }
          required={false}
          size={gridSizeMdLg6}
          disabled={!!grupoipv4?.id && !!grupoipv4?.routers_data?.length}
        />
        <SampleCheckbox
          label="state"
          name="state"
          control={form.control}
          defaultValue={form.getValues().state}
          size={gridSizeMdLg6}
          isState
        /> */}
      </>

      {/* --------- routers table --------- */}
      {/* <CustomMinimalTable<Router>
        columns={routersDataColumnsIPs}
        data={watchedRouters || []}
        enablePagination
      /> */}
    </SingleFormBoxScene>
  );
};

export default SaveGrupoIPv4;
