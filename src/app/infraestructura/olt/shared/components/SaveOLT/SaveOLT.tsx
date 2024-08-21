import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CreateOLTParamsBase, useCreateOLT, useUpdateOLT } from '@/actions/app';
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
  Sector,
  Zona,
} from '@/shared/interfaces';
import { oLTFormSchema } from '@/shared/utils';
import { returnUrlOLTsPage } from '../../../pages/tables/OLTsPage';

export interface SaveOLTProps {
  title: string;
  olt?: OLT;
}

type SaveFormData = CreateOLTParamsBase & {};

const SaveOLT: React.FC<SaveOLTProps> = ({ title, olt }) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(oLTFormSchema) as any,
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
  const createOLTMutation = useCreateOLT({
    navigate,
    returnUrl: returnUrlOLTsPage,
    enableErrorNavigate: false,
  });
  const updateOLTMutation = useUpdateOLT<CreateOLTParamsBase>({
    navigate,
    returnUrl: returnUrlOLTsPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (olt?.id) {
      updateOLTMutation.mutate({ id: olt.id!, data });
      return;
    }

    ///* create
    createOLTMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!olt?.id) return;
    reset(olt);
  }, [olt, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlOLTsPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Name"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
      />

      <CustomTextField
        label="Direccion"
        name="direccion"
        control={form.control}
        defaultValue={form.getValues().direccion}
        error={errors.direccion}
        helperText={errors.direccion?.message}
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
        label="Descripcion"
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        error={errors.descripcion}
        helperText={errors.descripcion?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Puerto"
        name="puerto"
        control={form.control}
        defaultValue={form.getValues().puerto}
        error={errors.puerto}
        helperText={errors.puerto?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Hostname"
        name="hostname"
        control={form.control}
        defaultValue={form.getValues().hostname}
        error={errors.hostname}
        helperText={errors.hostname?.message}
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
        label="User"
        name="user"
        control={form.control}
        defaultValue={form.getValues().user}
        error={errors.user}
        helperText={errors.user?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Pppoe"
        name="pppoe"
        control={form.control}
        defaultValue={form.getValues().pppoe}
        error={errors.pppoe}
        helperText={errors.pppoe?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Ip pppoe"
        name="ip_pppoe"
        control={form.control}
        defaultValue={form.getValues().ip_pppoe}
        error={errors.ip_pppoe}
        helperText={errors.ip_pppoe?.message}
        size={gridSizeMdLg6}
      />

      <CustomNumberTextField
        label="Nodo"
        name="nodo"
        control={form.control}
        defaultValue={form.getValues().nodo}
        error={errors.nodo}
        helperText={errors.nodo?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Pais"
        name="pais"
        control={form.control}
        defaultValue={form.getValues().pais}
        error={errors.pais}
        helperText={errors.pais?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Provincia"
        name="provincia"
        control={form.control}
        defaultValue={form.getValues().provincia}
        error={errors.provincia}
        helperText={errors.provincia?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Ciudad"
        name="ciudad"
        control={form.control}
        defaultValue={form.getValues().ciudad}
        error={errors.ciudad}
        helperText={errors.ciudad?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Zona"
        name="zona"
        control={form.control}
        defaultValue={form.getValues().zona}
        error={errors.zona}
        helperText={errors.zona?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomNumberTextField
        label="Sector"
        name="sector"
        control={form.control}
        defaultValue={form.getValues().sector}
        error={errors.sector}
        helperText={errors.sector?.message}
        size={gridSizeMdLg6}
        min={0}
      />
      <CustomAutocomplete<Nodo>
        label="Nodo"
        name="nodo"
        // options
        options={[] || []}
        valueKey="name"
        defaultValue={form.getValues().nodo}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.nodo}
        helperText={errors.nodo?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Pais>
        label="Pais"
        name="pais"
        // options
        options={[] || []}
        valueKey="name"
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
        defaultValue={form.getValues().sector}
        isLoadingData={false} // TODO: add loading
        // vaidation
        control={form.control}
        error={errors.sector}
        helperText={errors.sector?.message}
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
    </SingleFormBoxScene>
  );
};

export default SaveOLT;
