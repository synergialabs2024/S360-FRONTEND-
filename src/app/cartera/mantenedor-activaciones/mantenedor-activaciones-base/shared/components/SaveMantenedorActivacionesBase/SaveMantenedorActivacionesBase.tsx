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
  CustomTextFieldNoForm,
  CustomTypoLabel,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  Departamento,
  getKeysFormErrorsMessage,
  MotivoRubroAdicional,
  ToastWrapper,
  useLoaders,
  YES_NO_ARRAY_CHOICES,
} from '@/shared';
import { useUiConfirmModalStore } from '@/store/ui';
import { returnUrlMantenedorActivacionesBasePage } from '../../../pages/forms/MantenedorActivacionesBasePage';
import {
  useFetchDepartamentos,
  useFetchMotivoRubroAdicionals,
} from '@/actions/app';
import { mantenedorActivacionBaseFormSchema } from '@/shared/utils/validation-schemas/app/cartera/mantenedor-activaciones/mantenedor-activacion-base.schema';
import {
  CreateMantenedorActivacionBaseParamsBase,
  useCreateMantenedorActivacionBase,
} from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion-base.actions';

export interface SaveMantenedorActivacionesBaseProps {
  title: string;
}
type SaveFormData = CreateMantenedorActivacionBaseParamsBase & {
  valor: number | string;
};
const SaveMantenedorActivacionesBase: React.FC<
  SaveMantenedorActivacionesBaseProps
> = ({ title }) => {
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

  const {
    data: motivoRubroAdicionalsPagingRes,
    isLoading: isLoadingMotivoRubroAdicionals,
    isRefetching: isRefetchingMotivoRubroAdicionals,
  } = useFetchMotivoRubroAdicionals({
    params: {
      page_size: 1000,
    },
  });

  const {
    data: departamentoPagingRes,
    isLoading: isLoadingDepartamentos,
    isRefetching: isRefetchingDepartamentos,
  } = useFetchDepartamentos({
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
    formState: { errors, isValid },
  } = form;
  const watchedValor = form.watch('valor');
  //

  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;
    console.log('data.code', data.code);
    setConfirmDialog({
      isOpen: true,
      title: 'Mantenedor activaciones',
      subtitle: '¿Está seguro que desea crear este registro?',
      onConfirm: () => {
        createMantenedorActivacion.mutate({
          code: data.code,
          tiempo_bloqueo: data.tiempo_bloqueo,
          tiempo_limite: data.tiempo_limite,
          incluye_facturacion: data.incluye_facturacion === 'SI' ? true : false,
          incluye_notificacion:
            data.incluye_notificacion === 'SI' ? true : false,
          usuarios_autorizados: data.usuarios_autorizados,
          motivo: data.motivo,
        });
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

  const customLoader =
    isLoadingMotivoRubroAdicionals ||
    isRefetchingMotivoRubroAdicionals ||
    isLoadingDepartamentos ||
    isRefetchingDepartamentos;
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
          size={gridSizeMdLg12}
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
          min={1}
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
          min={1}
          max={31}
        />

        <SelectArrayString
          label="Aplica descuento meses posteriores"
          name="incluye_facturacion"
          control={form.control}
          error={errors.incluye_facturacion}
          helperText={errors.incluye_facturacion?.message}
          options={YES_NO_ARRAY_CHOICES}
          gridSize={gridSizeMdLg6}
        />

        <SelectArrayString
          label="Aplica descuento meses posteriores"
          name="incluye_notificacion"
          control={form.control}
          error={errors.incluye_notificacion}
          helperText={errors.incluye_notificacion?.message}
          options={YES_NO_ARRAY_CHOICES}
          gridSize={gridSizeMdLg6}
        />

        {/* --------- DEPARTAMENTOS --------- */}
        <CustomAutocompleteMultiple<Departamento>
          label="Usuarios autorizados"
          name="usuarios_autorizados"
          textFieldKey="nombre"
          valueKey="name"
          actualValueKey="id"
          // options
          options={departamentoPagingRes?.data?.items || []}
          defaultValue={
            form.getValues().usuarios_autorizados?.length
              ? departamentoPagingRes?.data?.items?.filter(
                  (departamento: Departamento) =>
                    (form.getValues().usuarios_autorizados as any[])?.includes(
                      departamento?.id!,
                    ),
                )
              : []
          }
          isLoadingData={isLoadingDepartamentos || isRefetchingDepartamentos}
          // errors
          control={form.control}
          error={undefined}
          helperText={errors.usuarios_autorizados?.message}
          onlyActualValueKey
          required={false}
          size={gridSizeMdLg12}
        />
      </>

      {/* ============= loaders ============= */}
    </SingleFormBoxScene>
  );
};
export default SaveMantenedorActivacionesBase;
