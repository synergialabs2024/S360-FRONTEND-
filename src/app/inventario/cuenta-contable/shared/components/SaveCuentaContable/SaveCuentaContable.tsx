import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  CuentaContable,
  gridSizeMdLg6,
  PermissionsEnum,
  cuentaContableFormSchema,
  ToastWrapper,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  useCreateCuentaContable,
  useFetchCuentaContables,
  useUpdateCuentaContable,
  CreateCuentaContableParamsBase,
} from '@/actions/app';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlCuentaContablePage } from '../../../pages/tables/CuentaContablePages';

export interface SaveCuentaContableProps {
  title: string;
  cuenta_contable?: CuentaContable;
}

type SaveFormData = CreateCuentaContableParamsBase & {
  tiene_cuenta_padre?: boolean;
};

const SaveCuentaContable: React.FC<SaveCuentaContableProps> = ({
  title,
  cuenta_contable,
}) => {
  useCheckPermission(PermissionsEnum.contabilidad_view_cuentacontable);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(cuentaContableFormSchema) as any,
    defaultValues: {
      estado: true,
      tiene_cuenta_padre: false,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const watchedTieneCuentaPadre = form.watch('tiene_cuenta_padre');
  const watchedCuentaPadre = form.watch('cuenta_padre');

  ///* fetch data
  const {
    data: cuentaContablePagingRes,
    isLoading: isLoadingPaises,
    isRefetching: isRefetchingPaises,
  } = useFetchCuentaContables({
    params: {
      page_size: 1000,
    },
  });

  ///* mutations
  const createCuentaContableMutation = useCreateCuentaContable({
    navigate,
    returnUrl: returnUrlCuentaContablePage,
    enableErrorNavigate: false,
  });
  const updateCuentaContableMutation =
    useUpdateCuentaContable<CreateCuentaContableParamsBase>({
      navigate,
      returnUrl: returnUrlCuentaContablePage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    // Si tiene_cuenta_padre es true pero no seleccionó cuenta_padre
    if (watchedTieneCuentaPadre && !watchedCuentaPadre) {
      ToastWrapper.error('Debes elegir una Cuenta Padre');
      return;
    }

    // Si la cuenta seleccionada como padre es la misma cuenta actual
    if (
      watchedCuentaPadre === cuenta_contable?.id &&
      cuenta_contable?.created_at
    ) {
      ToastWrapper.error('Cuenta Padre no puede elegirse a sí mismo');
      form.setValue('tiene_cuenta_padre', !!form.getValues('cuenta_padre'));
      return;
    }

    delete data.tiene_cuenta_padre;

    ///* update
    if (cuenta_contable?.id) {
      updateCuentaContableMutation.mutate({ id: cuenta_contable.id!, data });
      return;
    }

    ///* create
    createCuentaContableMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!cuenta_contable?.id) return;
    reset(cuenta_contable);
  }, [cuenta_contable, reset]);

  useEffect(() => {
    form.setValue('tiene_cuenta_padre', !!form.getValues('cuenta_padre'));
  }, [form]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCuentaContablePage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="nombre"
        control={form.control}
        defaultValue={form.getValues().nombre}
        error={errors.nombre}
        helperText={errors.nombre?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Codigo"
        name="codigo"
        control={form.control}
        defaultValue={form.getValues().codigo}
        error={errors.codigo}
        helperText={errors.codigo?.message}
        size={gridSizeMdLg6}
        disabled={!!cuenta_contable?.id}
      />
      <CustomTextArea
        label="Descripción"
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        error={errors.descripcion}
        helperText={errors.descripcion?.message}
        required={false}
      />
      <SampleCheckbox
        label="estado"
        name="estado"
        control={form.control}
        defaultValue={form.getValues().estado}
        size={gridSizeMdLg6}
        isState
      />
      <SampleCheckbox
        label="¿Tiene Cuenta Padre?"
        name="tiene_cuenta_padre"
        control={form.control}
        defaultValue={form.getValues().estado}
        size={gridSizeMdLg6}
      />
      {watchedTieneCuentaPadre ? (
        <CustomAutocomplete<CuentaContable>
          label="Cuenta Padre"
          name="cuenta_padre"
          // Filtra las opciones
          options={
            cuentaContablePagingRes?.data?.items.filter(item => {
              if (cuenta_contable?.id) {
                return item.id !== cuenta_contable?.id;
              }
              return true;
            }) || []
          }
          valueKey="nombre"
          actualValueKey="id"
          defaultValue={Number(form.getValues().cuenta_padre)}
          isLoadingData={isLoadingPaises || isRefetchingPaises}
          // validación
          control={form.control}
          error={errors.cuenta_padre}
          helperText={errors.cuenta_padre?.message}
          required={false}
          onChangeValue={value => form.setValue('cuenta_padre', Number(value))}
        />
      ) : null}
    </SingleFormBoxScene>
  );
};

export default SaveCuentaContable;
