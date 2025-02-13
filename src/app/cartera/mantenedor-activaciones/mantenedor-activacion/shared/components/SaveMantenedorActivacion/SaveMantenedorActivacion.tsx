/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { gridSizeMdLg12, gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  CustomAutocomplete,
  CustomNumberTextField,
  CustomTextField,
  CustomTypoLabel,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  getKeysFormErrorsMessage,
  MotivoRubroAdicional,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import { useUiConfirmModalStore } from '@/store/ui';
import { returnUrlMantenedorActivacionesPage } from '../../../pages/forms/MantenedorActivacionPage';
import { useFetchMotivoRubroAdicionals } from '@/actions/app';
import {
  CreateMantenedorActivacionParamsBase,
  useCreateMantenedorActivacion,
} from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion.actions';
import { CriterioMantenedorActivacion } from '@/shared/interfaces/app/cartera/mantenedor-activaciones';
import { useFetchCriterioMantenedorActivaciones } from '@/actions/app/cartera/buzon-tareas/parametros/criterio-mantenedor-activaciones';
import ActivacionesMantenedorActivacionesBase from './form/activaciones/ActivacionesMantenedorActivacionesBase';
import { mantenedorActivacionFormSchema } from '@/shared/utils/validation-schemas/app/cartera/mantenedor-activaciones/mantenedor-activacion.schema';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app';

export interface SaveMantenedorActivacionProps {
  title: string;
}
type SaveFormData = CreateMantenedorActivacionParamsBase & {
  valor: number | string;
};
const SaveMantenedorActivacion: React.FC<SaveMantenedorActivacionProps> = ({
  title,
}) => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations ---------------------

  const createMantenedorActivacion = useCreateMantenedorActivacion({
    enableErrorNavigate: false,
    customOnSuccess: () => {
      navigate(returnUrlMantenedorActivacionesPage);
    },
    navigate,
    returnUrl: returnUrlMantenedorActivacionesPage,
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
    data: criterioMantenedorActivacionesPagingRes,
    isLoading: isLoadingCriterioMantenedorActivaciones,
    isRefetching: isRefetchingCriterioMantenedorActivaciones,
  } = useFetchCriterioMantenedorActivaciones({
    params: {
      page_size: 1000,
    },
  });

  ///* form -----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(mantenedorActivacionFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;
  //

  const {
    items: mantenedorActivaciones,
    clearOneRecord: clearAllServiciosInternetSelecStore,
  } = useTypedGenericInventoryStore<any>(
    GenericInventoryStoreKey.mantenedorActivaciones,
  );

  const onSave = async (data: SaveFormData) => {
    console.log('data.criterio', data.criterio);

    const mantenedorActivacionesId =
      mantenedorActivaciones.length > 0 ? mantenedorActivaciones[0].id : null;

    if (!mantenedorActivacionesId) {
      ToastWrapper.warning('Debe seleccionar un item de activacion');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Mantenedor activaciones',
      subtitle: '¿Está seguro que desea crear este registro?',
      onConfirm: () => {
        createMantenedorActivacion.mutate({
          criterio: data.criterio,
          mantenedor_base: mantenedorActivacionesId,
          motivo: data.motivo,
          code: data.code,
          state: data.state,
          permitido_en_anio: data.permitido_en_anio,
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
    isLoadingCriterioMantenedorActivaciones ||
    isRefetchingCriterioMantenedorActivaciones;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => {
        navigate(returnUrlMantenedorActivacionesPage);
        clearAllServiciosInternetSelecStore();
      }}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Errores en: ${keys}`);
      })}
      maxWidth="xl"
      gridSizeForm={gridSizeMdLg12}
    >
      <>
        <CustomTypoLabel text="Datos de solicitud" />

        <CustomAutocomplete<CriterioMantenedorActivacion>
          label="Criterio"
          name="criterio"
          valueKey="name"
          actualValueKey="id"
          control={form.control}
          defaultValue={form.getValues().criterio}
          options={criterioMantenedorActivacionesPagingRes?.data.items || []}
          isLoadingData={isLoadingMotivoRubroAdicionals}
          error={errors.criterio}
          helperText={errors.criterio?.message}
          size={gridSizeMdLg12}
        />

        <>
          <ActivacionesMantenedorActivacionesBase />
        </>

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
          label="Permitido en el anio"
          name="permitido_en_anio"
          size={gridSizeMdLg6}
          control={form.control}
          defaultValue={form.getValues().permitido_en_anio}
          error={errors.permitido_en_anio}
          helperText={errors.permitido_en_anio?.message}
          min={1}
          max={12}
        />

        <SampleCheckbox
          label="state"
          name="state"
          control={form.control}
          defaultValue={form.getValues().state}
          isState
          size={gridSizeMdLg6}
        />
      </>

      {/* ============= loaders ============= */}
    </SingleFormBoxScene>
  );
};
export default SaveMantenedorActivacion;
