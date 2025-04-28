import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  CriterioMantenedorActivacionesFormSchema,
  getKeysFormErrorsMessage,
  gridSizeMdLg12,
  gridSizeMdLg6,
  LINEA_SERVICIO_ARRAY_CHOICES,
  LineaServicioEnumChoice,
  TIPO_RUBRO_ADICIONAL_MANTENEDOR_ARRAY_CHOICES,
  tipoRubroAdicionalMantenedorEnumChoice,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import { useEffect } from 'react';
import {
  CustomAutocompleteMultiple,
  CustomNumberTextField,
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import { returnUrlCriterioMantenedorActivacionesPage } from '../../../pages/tables/CriterioMantenedorActivacionesPage';
import { CriterioMantenedorActivacion } from '@/shared/interfaces/app/cartera/mantenedor-activaciones';
import {
  CreateCriterioMantenedorActivacionParamsBase,
  useCreateCriterioMantenedorActivacion,
  useFetchCriterioMantenedorActivaciones,
  useUpdateCriterioMantenedorActivacion,
} from '@/actions/app/cartera/buzon-tareas/parametros/criterio-mantenedor-activaciones';
import { useUiConfirmModalStore } from '@/store/ui';

export type SaveCriterioMantenedorActivacionesProps = {
  title: string;
  criterioMantenedorActivacion?: CriterioMantenedorActivacion;
};

type SaveFormData = CreateCriterioMantenedorActivacionParamsBase & {};

const SaveCriterioMantenedorActivaciones: React.FC<
  SaveCriterioMantenedorActivacionesProps
> = ({ title, criterioMantenedorActivacion }) => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(CriterioMantenedorActivacionesFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const watchedTipoMantenedorActivacion = form.watch(
    'tipo_mantenedor_activacion',
  );

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  ///* fetch data
  const {
    data: criterioMantenedorActivacionesGroupsPagingRes,
    isLoading: isLoadingsyCriterioMantenedorActivaciones,
    isRefetching: isRefetchingCriterioMantenedorActivaciones,
  } = useFetchCriterioMantenedorActivaciones({
    enabled: true,
    params: {
      page_size: 1000,
      state: true,
      tipo_mantenedor_activacion:
        tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_RECONEXIONES,
    },
  });

  ///* mutations ---------------------
  const createCriterioMantenedorActivacion =
    useCreateCriterioMantenedorActivacion({
      navigate,
      returnUrl: returnUrlCriterioMantenedorActivacionesPage,
      enableErrorNavigate: false,
    });

  const updateCriterioMantenedorActivacion =
    useUpdateCriterioMantenedorActivacion({
      navigate,
      returnUrl: returnUrlCriterioMantenedorActivacionesPage,
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (criterioMantenedorActivacion?.id) {
      updateCriterioMantenedorActivacion.mutate({
        id: criterioMantenedorActivacion.id!,
        data,
      });
      return;
    }

    console.log(data.dia_fin_range);
    if (
      data.tipo_mantenedor_activacion ===
        tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_ACTIVACIONES &&
      data.estados_linea_servicio.length === 0
    ) {
      ToastWrapper.warning(
        'Debe seleccionar al menos un estado de linea de servicio',
      );
      return;
    }
    ///* create
    setConfirmDialog({
      isOpen: true,
      title: 'Buzon de tarea',
      subtitle: '¿Está seguro que gestionar crear la tarea?',
      onConfirm: () => {
        data.dia_fin_range === 0
          ? createCriterioMantenedorActivacion.mutate({
            name: data.name,
            description: data.description,
            code: data.code,
            state: data.state,
            tipo_mantenedor_activacion: data.tipo_mantenedor_activacion,
            estados_linea_servicio: data.estados_linea_servicio,
            dia_inicio_range: data.dia_inicio_range,
          })
          : createCriterioMantenedorActivacion.mutate({
            name: data.name,
            description: data.description,
            code: data.code,
            state: data.state,
            tipo_mantenedor_activacion: data.tipo_mantenedor_activacion,
            estados_linea_servicio: data.estados_linea_servicio,
            dia_inicio_range: data.dia_inicio_range,
            dia_fin_range: data.dia_fin_range,
          });
        setConfirmDialogIsOpen(false);
      },
    });
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!criterioMantenedorActivacion?.id) return;
    reset(criterioMantenedorActivacion);
  }, [criterioMantenedorActivacion, reset]);

  const customLoader =
    isLoadingsyCriterioMantenedorActivaciones ||
    isRefetchingCriterioMantenedorActivaciones;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCriterioMantenedorActivacionesPage)}
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

      <CustomTextField
        label="Codigo"
        name="code"
        control={form.control}
        defaultValue={form.getValues().code}
        error={errors.code}
        helperText={errors.code?.message}
        size={gridSizeMdLg6}
        disabled={!!criterioMantenedorActivacion?.id}
      />

      <CustomTextArea
        label="Descripcion"
        name="description"
        control={form.control}
        defaultValue={form.getValues().description}
        error={errors.description}
        helperText={errors.description?.message}
      />

      <SelectArrayString
        label="Tipo rubro adicional"
        name="tipo_mantenedor_activacion"
        control={form.control}
        error={errors.tipo_mantenedor_activacion}
        helperText={errors.tipo_mantenedor_activacion?.message}
        defaultValue={form.getValues('tipo_mantenedor_activacion')}
        options={TIPO_RUBRO_ADICIONAL_MANTENEDOR_ARRAY_CHOICES}
        gridSize={gridSizeMdLg12}
        onChangeValue={() => {
          form.setValue(
            'dia_inicio_range',
            criterioMantenedorActivacionesGroupsPagingRes?.data?.items?.[0]
              ? criterioMantenedorActivacionesGroupsPagingRes?.data?.items?.[0]
                .dia_fin_range
              : 31,
          );
          form.setValue('estados_linea_servicio', []);
          form.setValue('dia_fin_range', 0);
        }}
      />

      {watchedTipoMantenedorActivacion ===
      tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_ACTIVACIONES ? (
          <>
            <CustomAutocompleteMultiple<any>
              label="Estado linea de servicio"
              name="estados_linea_servicio"
              textFieldKey="nombre"
              valueKey="value"
              actualValueKey="value"
              // options
              options={LINEA_SERVICIO_ARRAY_CHOICES.filter(
                item =>
                  item === LineaServicioEnumChoice.ACTIVO ||
                item === LineaServicioEnumChoice.SUSPENDIDO,
              ).map(item => ({
                label: item,
                value: item,
              }))}
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
              helperText={errors.estados_linea_servicio?.message}
              onlyActualValueKey
              required={false}
              size={gridSizeMdLg12}
            />
          </>
        ) : (
          <></>
        )}

      {/* <CustomDatePicker
        label="Fecha para promesa de pago"
        name="fecha_promesa_pago"
        control={form.control}
        defaultValue={form.getValues().fecha_promesa_pago}
        error={errors.fecha_promesa_pago}
        helperText={errors.fecha_promesa_pago?.message}
        size={gridSizeMdLg6}
        minDate={dayjs()}
        maxDate={
          mantenedorActivacionesPagingRes?.data?.items?.[0]
            ?.mantenedor_base_data?.tiempo_limite
            ? dayjs()
                .add(
                  mantenedorActivacionesPagingRes?.data?.items?.[0]
                    ?.mantenedor_base_data?.tiempo_limite!,
                  'day',
                )
                .format('YYYY-MM-DD')
            : undefined
        }
      /> */}

      {watchedTipoMantenedorActivacion ===
        tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_RECONEXIONES &&
      !isLoadingsyCriterioMantenedorActivaciones &&
      !isRefetchingCriterioMantenedorActivaciones ? (
          <>
            <CustomNumberTextField
              label="Dia inicio"
              name="dia_inicio_range"
              size={gridSizeMdLg6}
              control={form.control}
              defaultValue={
                criterioMantenedorActivacionesGroupsPagingRes?.data?.items?.[0]
                  ? criterioMantenedorActivacionesGroupsPagingRes?.data
                    ?.items?.[0].dia_fin_range
                  : 31
              }
              error={errors.dia_inicio_range}
              helperText={errors.dia_inicio_range?.message}
              disabled
            />

            <CustomNumberTextField
              label="Dia fin"
              name="dia_fin_range"
              size={gridSizeMdLg6}
              control={form.control}
              defaultValue={form.getValues().dia_fin_range}
              error={errors.dia_fin_range}
              helperText={errors.dia_fin_range?.message}
              min={
                criterioMantenedorActivacionesGroupsPagingRes?.data?.items?.[0]
                  ? criterioMantenedorActivacionesGroupsPagingRes?.data
                    ?.items?.[0].dia_fin_range
                  : 31
              }
            />
          </>
        ) : (
          <></>
        )}

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveCriterioMantenedorActivaciones;
