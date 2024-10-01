import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateRouterParamsBase,
  useCreateRouter,
  useUpdateRouter,
} from '@/actions/app';
import {
  CustomAutocomplete,
  CustomNumberTextField,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  Ciudad,
  Nodo,
  OLT,
  Pais,
  Provincia,
  Router,
  Sector,
  Zona,
} from '@/shared/interfaces';
import { routerFormSchema } from '@/shared/utils';
import { returnUrlRoutersPage } from '../../../pages/tables/RoutersPage';

export interface SaveRouterProps {
  title: string;
  router?: Router;
}

type SaveFormData = CreateRouterParamsBase & {};

const SaveRouter: React.FC<SaveRouterProps> = ({ title, router }) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(routerFormSchema) as any,
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
  const createRouterMutation = useCreateRouter({
    navigate,
    returnUrl: returnUrlRoutersPage,
    enableErrorNavigate: false,
  });
  const updateRouterMutation = useUpdateRouter<CreateRouterParamsBase>({
    navigate,
    returnUrl: returnUrlRoutersPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (router?.id) {
      updateRouterMutation.mutate({ id: router.id!, data });
      return;
    }

    ///* create
    createRouterMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!router?.id) return;
    reset(router);
  }, [router, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlRoutersPage)}
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

      <CustomTextField
        label="Ip"
        name="ip"
        control={form.control}
        defaultValue={form.getValues().ip}
        error={errors.ip}
        helperText={errors.ip?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Username"
        name="username"
        control={form.control}
        defaultValue={form.getValues().username}
        error={errors.username}
        helperText={errors.username?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Password"
        name="password"
        control={form.control}
        defaultValue={form.getValues().password}
        error={errors.password}
        helperText={errors.password?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Usuario api"
        name="usuario_api"
        control={form.control}
        defaultValue={form.getValues().usuario_api}
        error={errors.usuario_api}
        helperText={errors.usuario_api?.message}
        size={gridSizeMdLg6}
      />

      <CustomNumberTextField
        label="Puerto api"
        name="puerto_api"
        control={form.control}
        defaultValue={form.getValues().puerto_api}
        error={errors.puerto_api}
        helperText={errors.puerto_api?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomTextField
        label="Clave api"
        name="clave_api"
        control={form.control}
        defaultValue={form.getValues().clave_api}
        error={errors.clave_api}
        helperText={errors.clave_api?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Direccion"
        name="direccion"
        control={form.control}
        defaultValue={form.getValues().direccion}
        error={errors.direccion}
        helperText={errors.direccion?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Coordenadas"
        name="coordenadas"
        control={form.control}
        defaultValue={form.getValues().coordenadas}
        error={errors.coordenadas}
        helperText={errors.coordenadas?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Tipo router"
        name="tipo_router"
        control={form.control}
        defaultValue={form.getValues().tipo_router}
        error={errors.tipo_router}
        helperText={errors.tipo_router?.message}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
      />

      <CustomAutocomplete<Nodo>
        label="Nodo"
        name="nodo"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().nodo}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.nodo}
        helperText={errors.nodo?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<OLT>
        label="Olt"
        name="olt"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().olt}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.olt}
        helperText={errors.olt?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Pais>
        label="Pais"
        name="pais"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().pais}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.pais}
        helperText={errors.pais?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Provincia>
        label="Provincia"
        name="provincia"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().provincia}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.provincia}
        helperText={errors.provincia?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Ciudad>
        label="Ciudad"
        name="ciudad"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().ciudad}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.ciudad}
        helperText={errors.ciudad?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Zona>
        label="Zona"
        name="zona"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().zona}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.zona}
        helperText={errors.zona?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Sector>
        label="Sector"
        name="sector"
        // options
        options={[] || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().sector}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.sector}
        helperText={errors.sector?.message}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveRouter;
