import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateGrupoIPv6ParamsBase,
  useCreateGrupoIPv6,
  useFetchBrass,
  useUpdateGrupoIPv6,
} from '@/actions/app';
import {
  IP_USES_TYPE_ARRAY_CHOICES,
  PermissionsEnum,
  Router,
  ToastWrapper,
  useLoaders,
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
import { Brass, GrupoIPv6 } from '@/shared/interfaces';
import { getKeysFormErrorsMessage, grupoIPv6FormSchema } from '@/shared/utils';
import { returnUrlGruposIPv6Page } from '../../../pages/tables/GruposIPv6Page';

export interface SaveGrupoIPv6Props {
  title: string;
  grupoipv6?: GrupoIPv6;
}

type SaveFormData = CreateGrupoIPv6ParamsBase & {
  routers: Router[];
};

const SaveGrupoIPv6: React.FC<SaveGrupoIPv6Props> = ({ title, grupoipv6 }) => {
  useCheckPermission(PermissionsEnum.infraestructura_view_router);

  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(grupoIPv6FormSchema) as any,
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

  ///* fetch data ---------------------
  // const {
  //   data: routersPagingRes,
  //   isLoading: isLoadingRouters,
  //   isRefetching: isRefetchingRouters,
  // } = useFetchRouters({
  //   params: {
  //     tiene_grupo_ipv6: false,
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

  ///* mutations ---------------------
  const createGrupoIPv6Mutation = useCreateGrupoIPv6<CreateGrupoIPv6ParamsBase>(
    {
      navigate,
      returnUrl: returnUrlGruposIPv6Page,
      enableErrorNavigate: false,
    },
  );
  const updateGrupoIPv6Mutation = useUpdateGrupoIPv6<CreateGrupoIPv6ParamsBase>(
    {
      navigate,
      returnUrl: returnUrlGruposIPv6Page,
    },
  );

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    console.log('data', data);
    if (!isValid) return;

    ///* upd
    if (grupoipv6?.id) {
      const { routers, ...rest } = data;

      updateGrupoIPv6Mutation.mutate({
        id: grupoipv6.id!,
        data: {
          name: rest.name,
          state: rest.state,
          ipv_6: rest.ipv_6,
          cidr: rest.cidr,
          tipo_uso: rest.tipo_uso,

          ...((!grupoipv6?.routers_data?.length && {
            routers: routers.map(router => router.id),
          }) as any),
        },
      });
      return;
    }

    ///* create
    createGrupoIPv6Mutation.mutate({
      ...data,
      routers: data.routers.map(router => router.id),
    });
  };

  ///* columns ---------------------
  // const { routersDataColumnsIPs } = useColumnsRouters();

  ///* effects ---------------------
  useEffect(() => {
    if (!grupoipv6?.id) return;
    const routers = grupoipv6.routers_data;

    reset({
      ...grupoipv6,
      routers,
    });
  }, [grupoipv6, reset]);
  const isLoadingCustom = isLoadingBrass || isRefetchingBrass;
  useLoaders(isLoadingCustom);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlGruposIPv6Page)}
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
        name="ipv_6"
        control={form.control}
        defaultValue={form.getValues().ipv_6}
        error={errors.ipv_6}
        helperText={errors.ipv_6?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomNumberTextField
        label="Máscara"
        name="cidr"
        control={form.control}
        defaultValue={form.getValues().cidr}
        error={errors.cidr}
        helperText={errors.cidr?.message}
        size={gridSizeMdLg6}
        min={0}
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
          disabled={!!grupoipv6?.id}
        />
      </>

      <>
        {/* ==================== ROUTER ==================== */}
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
          disabled={!!grupoipv6?.id && !!grupoipv6?.routers_data?.length}
        />
        <SampleCheckbox
          label="state"
          name="state"
          control={form.control}
          defaultValue={form.getValues().state}
          size={gridSizeMdLg6}
          isState
        /> */}

        {/* --------- routers table --------- */}
        {/* <CustomMinimalTable<Router>
          columns={routersDataColumnsIPs}
          data={watchedRouters || []}
          enablePagination
        /> */}
      </>
    </SingleFormBoxScene>
  );
};

export default SaveGrupoIPv6;
