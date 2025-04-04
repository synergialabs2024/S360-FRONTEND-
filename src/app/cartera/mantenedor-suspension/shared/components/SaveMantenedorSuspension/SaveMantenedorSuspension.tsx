/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { gridSizeMdLg12, gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  CustomAutocomplete,
  CustomAutocompleteMultiple,
  CustomNumberTextField,
  CustomTextField,
  CustomTypoLabel,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  CRITERIO_MANTENEDOR_SUSPENSION_ARRAY_CHOICES,
  getKeysFormErrorsMessage,
  MantenedorSuspension,
  mantenedorSuspensionBaseFormSchema,
  MotivoRubroAdicional,
  SystemGroup,
  ToastWrapper,
  useLoaders,
  YES_NO_ARRAY_CHOICES,
} from '@/shared';
import { useUiConfirmModalStore } from '@/store/ui';
import {
  useFetchMotivoRubroAdicionals,
  useFetchSystemGroups,
} from '@/actions/app';

import { useEffect } from 'react';

import {
  CreateMantenedorSuspensionParamsBase,
  useCreateMantenedorSuspension,
  useUpdateMantenedorSuspension,
} from '@/actions/app/cartera/mantenedor-suspension/mantenedor-suspension.actions';
import { returnUrlMantenedorSuspensionPage } from '../../../pages/tables/MantenedorSuspensionByStatePage';

export interface SaveMantenedorSuspensionProps {
  title: string;
  mantenedorSuspension?: MantenedorSuspension;
}
type SaveFormData = CreateMantenedorSuspensionParamsBase & {
  valor: number | string;
  incluye_facturacion_string: string;
  incluye_notificacion_string: string;
};
const SaveMantenedorSuspension: React.FC<SaveMantenedorSuspensionProps> = ({
  title,
  mantenedorSuspension,
}) => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations ---------------------

  const createMantenedorSuspension = useCreateMantenedorSuspension({
    enableErrorNavigate: false,
    customOnSuccess: () => {
      navigate(returnUrlMantenedorSuspensionPage);
    },
    navigate,
    returnUrl: returnUrlMantenedorSuspensionPage,
  });

  const updateMantenedorSuspensionMutation =
    useUpdateMantenedorSuspension<MantenedorSuspension>({
      navigate,
      returnUrl: returnUrlMantenedorSuspensionPage,
    });

  const {
    data: systemGroupsPagingRes,
    isLoading: isLoadingsyStemGroups,
    isRefetching: isRefetchingSystemGroups,
  } = useFetchSystemGroups({
    params: {
      page_size: 1000,
    },
  });

  const {
    data: motivoRubroAdicionalsPagingRes,
    isLoading: isLoadingMotivoRubroAdicionals,
    isRefetching: isRefetchingMotivoRubroAdicionals,
  } = useFetchMotivoRubroAdicionals({
    params: {
      page_size: 1000,
    },
  });

  ///* form -----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(mantenedorSuspensionBaseFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  //

  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    if (mantenedorSuspension?.id) {
      updateMantenedorSuspensionMutation.mutate({
        id: mantenedorSuspension.id!,
        data,
      });
      return;
    }

    const mantenedorSuspensionBaseData: MantenedorSuspension = {
      motivo: data.motivo,
      criterio: data.criterio,
      code: data.code,
      meses_suspension: data.meses_suspension,
      state: data.state,
      tiempo_bloqueo: data.tiempo_bloqueo,
      tiempo_limite: data.tiempo_limite,
      incluye_facturacion: data.incluye_facturacion,
      monto: data.monto,
      incluye_notificacion: data.incluye_notificacion,
      grupos_usuario_autorizados: data.grupos_usuario_autorizados,
    };

    // Si tiempo_bloqueo tiene valor, lo añadimos al objeto, si es un string vacío lo omitimos
    if (data.tiempo_bloqueo) {
      mantenedorSuspensionBaseData.tiempo_bloqueo = Number(data.tiempo_bloqueo);
    }

    // Hacemos lo mismo para tiempo_limite
    if (data.tiempo_limite) {
      mantenedorSuspensionBaseData.tiempo_limite = Number(data.tiempo_limite);
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Mantenedor suspension',
      subtitle: '¿Está seguro que desea crear este registro?',
      onConfirm: () => {
        createMantenedorSuspension.mutate(mantenedorSuspensionBaseData);
        clearForm();
        setConfirmDialogIsOpen(false);
      },
    });
  };

  const clearForm = () => {
    form.reset({
      ...form.getValues(),
    });
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!mantenedorSuspension?.id) return;
    reset(mantenedorSuspension);
  }, [mantenedorSuspension, reset]);

  useEffect(() => {
    mantenedorSuspension?.incluye_facturacion
      ? form.setValue('incluye_facturacion_string', 'SI')
      : form.setValue('incluye_facturacion_string', 'NO');

    mantenedorSuspension?.incluye_notificacion
      ? form.setValue('incluye_notificacion_string', 'SI')
      : form.setValue('incluye_notificacion_string', 'NO');
  }, [mantenedorSuspension, form]);

  const customLoader =
    isLoadingMotivoRubroAdicionals || isRefetchingMotivoRubroAdicionals;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMantenedorSuspensionPage)}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Errores en: ${keys}`);
      })}
      maxWidth="xl"
      gridSizeForm={gridSizeMdLg12}
    >
      <>
        <CustomTypoLabel text="Datos de solicitud" />

        <SelectArrayString
          label="Criterio"
          name="criterio"
          control={form.control}
          error={errors.criterio}
          helperText={errors.criterio?.message}
          options={CRITERIO_MANTENEDOR_SUSPENSION_ARRAY_CHOICES}
          gridSize={gridSizeMdLg6}
        />

        <CustomAutocomplete<MotivoRubroAdicional>
          label="Motivo"
          name="motivo"
          valueKey="nombre"
          actualValueKey="id"
          control={form.control}
          defaultValue={form.getValues().motivo}
          options={motivoRubroAdicionalsPagingRes?.data.items || []}
          isLoadingData={isLoadingMotivoRubroAdicionals}
          error={errors.motivo}
          helperText={errors.motivo?.message}
          size={gridSizeMdLg6}
          onChangeRawValue={row => {
            form.setValue('valor', row?.valor);
          }}
        />

        <CustomTextField
          label="Codigo"
          name="code"
          control={form.control}
          defaultValue={form.getValues().code}
          error={errors.code}
          helperText={errors.code?.message}
          defaultHelperText="El código debe ser único"
          disabled={!!mantenedorSuspension?.id}
          size={gridSizeMdLg12}
        />

        <CustomNumberTextField
          label="Monto"
          name="monto"
          control={form.control}
          defaultValue={form.getValues().monto}
          error={errors.monto}
          helperText={errors.monto?.message}
          min={-9999}
          size={gridSizeMdLg6}
        />

        <CustomNumberTextField
          label="Meses suspension"
          name="meses_suspension"
          size={gridSizeMdLg6}
          control={form.control}
          defaultValue={form.getValues().meses_suspension}
          error={errors.meses_suspension}
          helperText={errors.meses_suspension?.message}
          min={0}
          max={31}
        />

        <CustomNumberTextField
          label="Tiempo de bloqueo (dias)"
          name="tiempo_bloqueo"
          size={gridSizeMdLg6}
          control={form.control}
          defaultValue={form.getValues().tiempo_bloqueo}
          error={errors.tiempo_bloqueo}
          helperText={errors.tiempo_bloqueo?.message}
          min={0}
          max={31}
        />

        <CustomNumberTextField
          label="Tiempo limite (dias)"
          name="tiempo_limite"
          size={gridSizeMdLg6}
          control={form.control}
          defaultValue={form.getValues().tiempo_limite}
          error={errors.tiempo_limite}
          helperText={errors.tiempo_limite?.message}
          min={0}
          max={31}
        />

        <SelectArrayString
          label="Incluye Facturación"
          name="incluye_facturacion_string"
          control={form.control}
          error={errors.incluye_facturacion_string}
          helperText={errors.incluye_facturacion_string?.message}
          options={YES_NO_ARRAY_CHOICES}
          gridSize={gridSizeMdLg6}
          onChangeValue={e => {
            e === 'SI'
              ? form.setValue('incluye_facturacion', true)
              : form.setValue('incluye_facturacion', false);
          }}
        />

        <SelectArrayString
          label="Incluye Notificación"
          name="incluye_notificacion_string"
          control={form.control}
          error={errors.incluye_notificacion_string}
          helperText={errors.incluye_notificacion_string?.message}
          options={YES_NO_ARRAY_CHOICES}
          gridSize={gridSizeMdLg6}
          onChangeValue={e => {
            e === 'SI'
              ? form.setValue('incluye_notificacion', true)
              : form.setValue('incluye_notificacion', false);
          }}
        />

        <CustomAutocompleteMultiple<SystemGroup>
          label="Grupos Usuarios autorizados"
          name="grupos_usuario_autorizados"
          textFieldKey="nombre"
          valueKey="name"
          actualValueKey="id"
          // options
          options={systemGroupsPagingRes?.data?.items || []}
          defaultValue={
            form.getValues().grupos_usuario_autorizados?.length
              ? systemGroupsPagingRes?.data?.items?.filter(
                  (departamento: SystemGroup) =>
                    (
                      form.getValues().grupos_usuario_autorizados as any[]
                    )?.includes(departamento?.id!),
                )
              : []
          }
          isLoadingData={isLoadingsyStemGroups || isRefetchingSystemGroups}
          // errors
          control={form.control}
          error={undefined}
          helperText={errors.grupos_usuario_autorizados?.message}
          onlyActualValueKey
          required={false}
          size={gridSizeMdLg12}
        />
      </>

      {/* ============= loaders ============= */}
    </SingleFormBoxScene>
  );
};
export default SaveMantenedorSuspension;
