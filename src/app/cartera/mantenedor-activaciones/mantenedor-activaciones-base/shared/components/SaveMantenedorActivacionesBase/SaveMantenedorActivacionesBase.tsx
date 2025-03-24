/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { gridSizeMdLg12, gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  CustomAutocomplete,
  CustomNumberTextField,
  CustomTextField,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  getKeysFormErrorsMessage,
  MOTIVO_BASE_MANTENEDOR_ACTIVACION_BASE_ARRAY_CHOICES,
  MotivoRubroAdicional,
  ToastWrapper,
  useLoaders,
  YES_NO_ARRAY_CHOICES,
} from '@/shared';
import { useUiConfirmModalStore } from '@/store/ui';
import { useFetchMotivoRubroAdicionals } from '@/actions/app';
import { mantenedorActivacionBaseFormSchema } from '@/shared/utils/validation-schemas/app/cartera/mantenedor-activaciones/mantenedor-activacion-base.schema';
import {
  CreateMantenedorActivacionBaseParamsBase,
  useCreateMantenedorActivacionBase,
  useUpdateMantenedorActivacionBase,
} from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion-base.actions';
import { MantenedorActivacionBase } from '@/shared/interfaces/app/cartera/mantenedor-activaciones';
import { useEffect } from 'react';
import { returnUrlMantenedorActivacionesBasePage } from '../../../pages/tables/MantenedorActivacionesBaseByStatePage';

export interface SaveMantenedorActivacionesBaseProps {
  title: string;
  mantenedorActivacionBase?: MantenedorActivacionBase;
}
type SaveFormData = CreateMantenedorActivacionBaseParamsBase & {
  valor: number | string;
  incluye_facturacion_string: string;
  incluye_notificacion_string: string;
};
const SaveMantenedorActivacionesBase: React.FC<
  SaveMantenedorActivacionesBaseProps
> = ({ title, mantenedorActivacionBase }) => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations ---------------------

  const createMantenedorActivacion = useCreateMantenedorActivacionBase({
    enableErrorNavigate: false,
    customOnSuccess: () => {
      navigate(returnUrlMantenedorActivacionesBasePage);
    },
    navigate,
    returnUrl: returnUrlMantenedorActivacionesBasePage,
  });

  const updateMantenedorActivacionMutation =
    useUpdateMantenedorActivacionBase<MantenedorActivacionBase>({
      navigate,
      returnUrl: returnUrlMantenedorActivacionesBasePage,
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
    resolver: yupResolver(mantenedorActivacionBaseFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedValor = form.watch('valor');
  //

  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const mantenedorActivacionBaseData: MantenedorActivacionBase = {
      motivo_base: data.motivo_base,
      code: data.code,
      incluye_facturacion: data.incluye_facturacion,
      incluye_notificacion: data.incluye_notificacion,
      motivo: data.motivo,
    };

    // Si tiempo_bloqueo tiene valor, lo añadimos al objeto, si es un string vacío lo omitimos
    if (data.tiempo_bloqueo) {
      mantenedorActivacionBaseData.tiempo_bloqueo = Number(data.tiempo_bloqueo);
    }

    // Hacemos lo mismo para tiempo_limite
    if (data.tiempo_limite) {
      mantenedorActivacionBaseData.tiempo_limite = Number(data.tiempo_limite);
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Mantenedor activaciones base',
      subtitle: '¿Está seguro que desea crear este registro?',
      onConfirm: () => {
        ///* upd
        if (mantenedorActivacionBase?.id) {
          updateMantenedorActivacionMutation.mutate({
            id: mantenedorActivacionBase.id!,
            data,
          });
          setConfirmDialogIsOpen(false);
          return;
        }

        createMantenedorActivacion.mutate(mantenedorActivacionBaseData);
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
    if (!mantenedorActivacionBase?.id) return;
    reset(mantenedorActivacionBase);
  }, [mantenedorActivacionBase, reset]);

  useEffect(() => {
    mantenedorActivacionBase?.incluye_facturacion
      ? form.setValue('incluye_facturacion_string', 'SI')
      : form.setValue('incluye_facturacion_string', 'NO');

    mantenedorActivacionBase?.incluye_notificacion
      ? form.setValue('incluye_notificacion_string', 'SI')
      : form.setValue('incluye_notificacion_string', 'NO');

    form.setValue(
      'valor',
      mantenedorActivacionBase?.motivo_data?.valor.toString()!,
    );
  }, [mantenedorActivacionBase, form]);

  const customLoader =
    isLoadingMotivoRubroAdicionals || isRefetchingMotivoRubroAdicionals;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMantenedorActivacionesBasePage)}
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
          label="Motivo Base"
          name="motivo_base"
          control={form.control}
          error={errors.motivo_base}
          helperText={errors.motivo_base?.message}
          options={MOTIVO_BASE_MANTENEDOR_ACTIVACION_BASE_ARRAY_CHOICES}
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

        <CustomTextFieldNoForm
          label="Monto facturacion"
          size={gridSizeMdLg6}
          value={watchedValor}
          disabled
        />

        <CustomTextField
          label="Codigo"
          name="code"
          control={form.control}
          defaultValue={form.getValues().code}
          error={errors.code}
          helperText={errors.code?.message}
          defaultHelperText="El código debe ser único"
          disabled={!!mantenedorActivacionBase?.id}
          size={gridSizeMdLg6}
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
      </>

      {/* ============= loaders ============= */}
    </SingleFormBoxScene>
  );
};
export default SaveMantenedorActivacionesBase;
