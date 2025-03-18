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
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  getKeysFormErrorsMessage,
  LineaServicioEnumChoice,
  MotivoRubroAdicional,
  SystemGroup,
  tipoRubroAdicionalMantenedorEnumChoice,
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
import {
  CriterioMantenedorActivacion,
  MantenedorActivacionBase,
} from '@/shared/interfaces/app/cartera/mantenedor-activaciones';
import { useFetchCriterioMantenedorActivaciones } from '@/actions/app/cartera/buzon-tareas/parametros/criterio-mantenedor-activaciones';
import ActivacionesMantenedorActivacionesBase from './form/activaciones/ActivacionesMantenedorActivacionesBase';
import { mantenedorActivacionFormSchema } from '@/shared/utils/validation-schemas/app/cartera/mantenedor-activaciones/mantenedor-activacion.schema';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app';
import { MantenedorActivacion } from '@/shared/interfaces/app/cartera/mantenedor-activaciones/mantenedor-activacion.interface';
import { useEffect } from 'react';
import { useFetchMantenedorActivacionesBase } from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion-base.actions';

export interface SaveMantenedorActivacionProps {
  title: string;
  mantenedorActivacion?: MantenedorActivacion;
}
type SaveFormData = CreateMantenedorActivacionParamsBase & {
  valor: number | string;
  //
  tipo_rubro_adicional: string;
  tipo_rubro_adicional_motivo: string;
  estados_linea_servicio: LineaServicioEnumChoice[];
  dia_inicio_range: number;
  dia_fin_range: number;
  //
  grupos_usuario_autorizados: SystemGroup[];
  codigo_motivo: string;
  motivo_base: string;
  motivo_base_id: number;
};

const SaveMantenedorActivacion: React.FC<SaveMantenedorActivacionProps> = ({
  title,
  mantenedorActivacion,
}) => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const { setItems } = useTypedGenericInventoryStore<MantenedorActivacionBase>(
    GenericInventoryStoreKey.mantenedorActivaciones,
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
    reset,
    formState: { errors },
  } = form;

  const watchedMotivo = form.watch('motivo');
  //
  const watchedTipoRubroAdicional = form.watch('tipo_rubro_adicional');
  const watchedDiaInicioRange = form.watch('dia_inicio_range');
  const watchedDiaFinRange = form.watch('dia_fin_range');
  const watchedTipoRubroAdicionalMotivo = form.watch(
    'tipo_rubro_adicional_motivo',
  );
  const watchedCode = form.watch('codigo_motivo');
  const watchedMotivoBaseId = form.watch('motivo_base_id');

  const {
    data: mantenedorActivacionesBasePagingRes,
    isLoading: isLoadingMantenedorActivacionesBase,
    isRefetching: isRefetchingMantenedorActivacionesBase,
  } = useFetchMantenedorActivacionesBase({
    params: {
      page_size: 1,
      id: watchedMotivoBaseId,
    },
  });

  const {
    items: mantenedorActivaciones,
    clearOneRecord: clearAllServiciosInternetSelecStore,
    clearAllStore,
  } = useTypedGenericInventoryStore<any>(
    GenericInventoryStoreKey.mantenedorActivaciones,
  );

  const onSave = async (data: SaveFormData) => {
    console.log(
      'mantenedorActivacionesBasePagingRes?.data.items[0].id;',
      mantenedorActivacionesBasePagingRes?.data.items[0].id,
    );
    console.log('data.criterio', data.criterio);

    const mantenedorActivacionesId =
      mantenedorActivaciones.length > 0 ? mantenedorActivaciones[0].id : null;

    if (!mantenedorActivacionesId) {
      ToastWrapper.warning('Debe seleccionar un item de activacion');
      return;
    }

    const mantenedorActivacionData: MantenedorActivacion = {
      criterio: data.criterio,
      mantenedor_base: mantenedorActivacionesId,
      motivo: data.motivo,
      code: data.code,
      state: data.state,
      motivo_base: data.motivo_base,
    };

    // Si permitido_en_anio tiene valor, lo añadimos al objeto, si es un string vacío lo omitimos
    if (data.permitido_en_anio) {
      mantenedorActivacionData.permitido_en_anio = Number(
        data.permitido_en_anio,
      );
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Mantenedor activaciones',
      subtitle: '¿Está seguro que desea crear este registro?',
      onConfirm: () => {
        createMantenedorActivacion.mutate(mantenedorActivacionData);
        clearForm();
        clearAllStore();
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
    if (!mantenedorActivacion?.id) return;
    reset(mantenedorActivacion);
  }, [mantenedorActivacion, reset]);

  ///* effects
  useEffect(() => {
    if (!mantenedorActivacion?.id) return;
    const eqP = mantenedorActivacion?.mantenedor_base_data;
    const items: any[] = [];
    items.push(eqP);
    console.log('eqP', eqP);

    setItems((items as any) || []);
    reset({
      ...mantenedorActivacion,
    });

    /* addSelectedItem({
      idKey: 'id',
      item: mantenedorActivacion?.mantenedor_base_data!,
      showToast: true,
    }); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mantenedorActivacion, reset]);

  const customLoader =
    isLoadingMotivoRubroAdicionals ||
    isRefetchingMotivoRubroAdicionals ||
    isLoadingCriterioMantenedorActivaciones ||
    isRefetchingCriterioMantenedorActivaciones ||
    isLoadingMantenedorActivacionesBase ||
    isRefetchingMantenedorActivacionesBase;
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

        <CustomTypoLabel text="Criterio" />

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
          onChangeRawValue={i => {
            form.setValue('tipo_rubro_adicional', i.tipo_mantenedor_activacion);
            form.setValue('estados_linea_servicio', i.estados_linea_servicio);
            form.setValue('dia_inicio_range', i.dia_inicio_range);
            form.setValue('dia_fin_range', i.dia_fin_range);
          }}
        />

        {watchedTipoRubroAdicional ===
        tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_ACTIVACIONES ? (
          <>
            <CustomAutocompleteMultiple<any>
              label="Estado linea de servicio"
              name="estados_linea_servicio"
              textFieldKey="nombre"
              valueKey="value"
              actualValueKey="value"
              // options
              options={[]}
              defaultValue={
                form.getValues().estados_linea_servicio?.length
                  ? form
                      .getValues()
                      .estados_linea_servicio.filter(
                        (estado: string) =>
                          estado === LineaServicioEnumChoice.ACTIVO ||
                          estado === LineaServicioEnumChoice.SUSPENDIDO,
                      )
                      .map((estado: string) => ({
                        label: estado,
                        value: estado,
                      }))
                  : []
              }
              isLoadingData={false}
              // errors
              control={form.control}
              error={undefined}
              helperText={undefined}
              onlyActualValueKey
              required={false}
              size={gridSizeMdLg12}
              disabled={true}
            />
          </>
        ) : (
          <>
            <CustomTextFieldNoForm
              label="Dia inicio"
              size={gridSizeMdLg6}
              value={watchedDiaInicioRange}
              disabled
            />
            <CustomTextFieldNoForm
              label="Dia fin"
              size={gridSizeMdLg6}
              value={watchedDiaFinRange}
              disabled
            />
          </>
        )}

        <CustomTypoLabel text="Motivo" />

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
            console.log('row', row);
            form.setValue('valor', row?.valor);
            form.setValue(
              'grupos_usuario_autorizados',
              row?.grupos_usuario_autorizados_data,
            );
            form.setValue(
              'tipo_rubro_adicional_motivo',
              row.tipo_rubro_adicional,
            );
            form.setValue('motivo_base', row.nombre);
            form.setValue('codigo_motivo', row.codigo);
            console.log('row.nombre', row.nombre);
          }}
        />

        {watchedTipoRubroAdicionalMotivo ===
        tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_ACTIVACIONES ? (
          <>
            <CustomTextFieldNoForm
              label="Codigo"
              size={gridSizeMdLg12}
              value={watchedCode}
              disabled
            />
            <CustomAutocompleteMultiple<any>
              label="Grupos Usuarios autorizados"
              name="grupos_usuario_autorizados"
              textFieldKey="name"
              valueKey="name"
              actualValueKey="id"
              // options
              options={[]}
              defaultValue={
                form.getValues().grupos_usuario_autorizados?.map(grupo => ({
                  id: grupo.id,
                  name: grupo.name,
                })) || []
              }
              isLoadingData={false}
              // errors
              control={form.control}
              error={undefined}
              helperText={undefined}
              onlyActualValueKey
              required={false}
              size={gridSizeMdLg12}
              disabled={true}
              limitTags={10}
              sxGridItem={{ marginTop: 2 }}
            />
          </>
        ) : watchedTipoRubroAdicionalMotivo ===
          tipoRubroAdicionalMantenedorEnumChoice.GENERAL ? (
          <>
            <CustomTextFieldNoForm
              label="Codigo"
              size={gridSizeMdLg12}
              value={watchedCode}
              disabled
            />
          </>
        ) : watchedTipoRubroAdicionalMotivo ===
          tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_RECONEXIONES ? (
          <>
            <CustomTextFieldNoForm
              label="Codigo"
              size={gridSizeMdLg12}
              value={watchedCode}
              disabled
            />
          </>
        ) : (
          <></>
        )}

        <>
          <ActivacionesMantenedorActivacionesBase
            motivoMantenedorActivacion={watchedMotivo}
          />
        </>

        <CustomTextField
          label="Codigo"
          name="code"
          size={gridSizeMdLg6}
          control={form.control}
          defaultValue={form.getValues().code}
          error={errors.code}
          helperText={errors.code?.message}
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
          defaultValue={form.getValues().state!}
          isState
          size={gridSizeMdLg6}
        />
      </>

      {/* ============= loaders ============= */}
    </SingleFormBoxScene>
  );
};
export default SaveMantenedorActivacion;
