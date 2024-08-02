import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CreateParametroSistemaParamsBase,
  useCreateParametroSistema,
  useUpdateParametroSistema,
} from '@/actions/app';
import {
  CustomAutocompleteArrString,
  CustomDatePicker,
  CustomNumberTextField,
  CustomTextArea,
  CustomTextField,
  CustomTimeClockPicker,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  SYSTEM_PARAMETER_BOOLEAN_TYPE_ARRAY_CHOICES,
  SYSTEM_PARAMETER_TYPE_ARRAY_CHOICES,
} from '@/shared/constants/app';
import { ParametroSistema, PermissionsEnum } from '@/shared/interfaces';
import { parametro_sistemaFormSchema } from '@/shared/utils';
import { returnUrlParamestrosSistemasPage } from '../../../pages/tables/ParametrosSistemasPage';
import { gridSizeMdLg12, gridSizeMdLg6 } from '@/shared/constants/ui';
import { useCheckPermission } from '@/shared/hooks/auth';

export interface SaveParametroSistemaProps {
  title: string;
  parametro_sistema?: ParametroSistema;
}

type SaveFormData = CreateParametroSistemaParamsBase & {};

const SaveParametroSistema: React.FC<SaveParametroSistemaProps> = ({
  title,
  parametro_sistema,
}) => {
  useCheckPermission(PermissionsEnum.administration_view_parametrosistema);
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(parametro_sistemaFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = form;

  ///* mutations
  const createParametroSistemaMutation = useCreateParametroSistema({
    navigate,
    returnUrl: returnUrlParamestrosSistemasPage,
    enableErrorNavigate: false,
  });
  const updateParametroSistemaMutation =
    useUpdateParametroSistema<CreateParametroSistemaParamsBase>({
      navigate,
      returnUrl: returnUrlParamestrosSistemasPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (parametro_sistema?.id) {
      updateParametroSistemaMutation.mutate({
        id: parametro_sistema.id!,
        data,
      });
      return;
    }

    ///* create
    createParametroSistemaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!parametro_sistema?.id) return;
    reset(parametro_sistema);
  }, [parametro_sistema, reset]);

  /// * ADITIONAL
  let valorComponente;
  let sizeComponente;
  const tipoType = watch('type');
  switch (tipoType) {
    case 'TEXTO':
      sizeComponente = gridSizeMdLg6;
      valorComponente = (
        <CustomTextField
          label="VALOR"
          name="value"
          control={form.control}
          defaultValue={form.getValues().value}
          error={errors.value}
          helperText={errors.value?.message}
          size={gridSizeMdLg6}
        />
      );
      break;
    case 'NUMERICO':
      sizeComponente = gridSizeMdLg6;
      valorComponente = (
        <CustomNumberTextField
          label="VALOR"
          name="value"
          control={form.control}
          defaultValue={form.getValues().value}
          error={errors.value}
          helperText={errors.value?.message}
          min={0}
          size={gridSizeMdLg6}
        />
      );
      break;
    case 'FECHA':
      sizeComponente = gridSizeMdLg6;
      valorComponente = (
        <CustomDatePicker
          label="VALOR"
          name="value"
          control={form.control}
          defaultValue={form.getValues().value}
          error={errors.value}
          helperText={errors.value?.message}
          size={gridSizeMdLg6}
        />
      );
      break;
    case 'HORA':
      sizeComponente = gridSizeMdLg6;
      valorComponente = (
        <CustomTimeClockPicker
          label="VALUE"
          name="value"
          control={form.control}
          defaultValue={form.getValues().value}
          error={errors.value}
          helperText={errors.value?.message}
          onChangeValue={time => {
            console.log(time);
          }}
          size={gridSizeMdLg6}
        />
      );
      break;
    case 'BOOLEANO':
      sizeComponente = gridSizeMdLg6;
      valorComponente = (
        <CustomAutocompleteArrString
          label="Valor"
          name="value"
          options={SYSTEM_PARAMETER_BOOLEAN_TYPE_ARRAY_CHOICES}
          isLoadingData={false}
          control={form.control}
          defaultValue={form.getValues().value}
          error={errors.value}
          helperText={errors.value?.message}
          size={gridSizeMdLg6}
        />
      );
      break;
    case 'JSON':
    case 'ARRAY':
    case 'MODELO':
      sizeComponente = gridSizeMdLg6;
      valorComponente = (
        <CustomTextArea
          label="VALOR"
          name="value"
          control={form.control}
          defaultValue={form.getValues().value}
          error={errors.value}
          helperText={errors.value?.message}
          required={false}
          preventUpper
          size={gridSizeMdLg6}
        />
      );
      break;
    default:
      sizeComponente = gridSizeMdLg12;
      valorComponente = null;
  }

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlParamestrosSistemasPage)}
      onSave={handleSubmit(onSave, () => {})}
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
      <CustomTextField
        label="SLUG"
        name="slug"
        control={form.control}
        defaultValue={form.getValues().slug}
        error={errors.slug}
        helperText={errors.slug?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocompleteArrString
        label="Tipo"
        name="type"
        options={SYSTEM_PARAMETER_TYPE_ARRAY_CHOICES}
        isLoadingData={false}
        control={form.control}
        defaultValue={form.getValues().type}
        error={errors.type}
        helperText={errors.type?.message}
        onChangeValue={() => {
          form.setValue('value', '');
        }}
        size={sizeComponente}
      />
      {valorComponente}
      <CustomTextArea
        label="Descripción"
        name="description"
        control={form.control}
        defaultValue={form.getValues().description}
        error={errors.description}
        helperText={errors.description?.message}
        required={false}
      />
      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveParametroSistema;
