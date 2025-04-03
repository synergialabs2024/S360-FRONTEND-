/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  gridSizeMdLg12,
  gridSizeMdLg6,
  TABLE_CONSTANTS,
} from '@/shared/constants/ui';
import {
  CustomAutocomplete,
  CustomDatePicker,
  CustomIdentificacionTextField,
  CustomScanLoad,
  CustomTable,
  CustomTextArea,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  InputAndBtnGridSpace,
  SingleFormBoxScene,
} from '@/shared/components';
import { promesapagoFormSchema } from '@/shared/utils/validation-schemas/app/cartera/promesa-pago';
import { returnUrlPromesaPagoPage } from '../../../pages/tables/PromesaPagoByStatePage';
import {
  CreatePromesaPagoParamsBase,
  useCreatePromesaPago,
  useFetchPromesasPago,
} from '@/actions/app/cartera/promesa-pago/promesa-pago.actions';
import { CiSearch } from 'react-icons/ci';
import {
  ApiResponse,
  ContratoData,
  emptyCellOneLevel,
  FindByIdentification,
  formatDateWithTimeCell,
  getKeysFormErrorsMessage,
  IdentificationTypeEnumChoice,
  LineaServicio,
  motivoBaseMantenedorActivacionBaseEnumChoice,
  ToastWrapper,
  useLoaders,
  useTableServerSideFiltering,
} from '@/shared';
import { useEffect, useMemo, useState } from 'react';
import { useSearchCedulaWithDebtMutation } from '@/actions/app/tickets';
import dayjs from 'dayjs';
import { useAuthStore } from '@/store/auth';
import { useFetchMantenedorActivaciones } from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion.actions';
import { PromesaPago } from '@/shared/interfaces/app/cartera/promesa-pago/promesa-pago.interface';
import { MRT_ColumnDef } from 'material-react-table';
import { useUiConfirmModalStore } from '@/store/ui';
export interface SavePromesaPagoProps {
  title: string;
  promesaPago?: PromesaPago;
}

type SaveFormData = CreatePromesaPagoParamsBase & {
  tipo_identificacion: string;
  identificacion: string;
  linea_servicio_data?: LineaServicio;
  error_message: string;
  numero_contrato: string;
  //
  cedula: string;
  telefono: string;
  cliente_name: string;
  correo: string;
  status_servicio: string;
  num_contrato: number;
  cliente: number;
  categorizacion_perfil: string;
};

const SavePromesaPago: React.FC<SavePromesaPagoProps> = ({
  title,
  promesaPago,
}) => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const navigate = useNavigate();
  ///* global state
  const user = useAuthStore(s => s.user);
  ///* local state -----------------
  const [isCheckingIdentificacion, setIsCheckingIdentificacion] =
    useState<boolean>(false);

  const [cedulaData, setCedulaData] =
    useState<ApiResponse<FindByIdentification> | null>(null);

  const [numeroContrato, setNumeroContrato] = useState<string | undefined>(
    undefined,
  );

  // server side filters - colums table
  const { columnFilters, setColumnFilters } = useTableServerSideFiltering();

  ///* mutations ---------------------

  const searchCedulaMutation = useSearchCedulaWithDebtMutation();

  const createPromesaPago = useCreatePromesaPago({
    enableErrorNavigate: false,
    customOnSuccess: () => {
      navigate(returnUrlPromesaPagoPage);
    },
    navigate,
    returnUrl: returnUrlPromesaPagoPage,
  });

  ///* form -----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(promesapagoFormSchema) as any,
    defaultValues: {
      tipo_identificacion: IdentificationTypeEnumChoice.CEDULA,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const watchedIdentificationType = form.watch('tipo_identificacion');
  const watchedIdentification = form.watch('identificacion');
  //
  const watchedTelefono = form.watch('telefono');
  const watchedClienteName = form.watch('cliente_name');
  const watchedStatusServicio = form.watch('status_servicio');
  //
  const watchedLineaServicio = form.watch('linea_servicio');
  const watchedNumContrato = form.watch('num_contrato');
  const watchedCliente = form.watch('cliente');
  const watchedCategorizacionPerfil = form.watch('categorizacion_perfil');

  const handleFetchCedulaRucInfo = async (value: string) => {
    if (watchedIdentificationType === IdentificationTypeEnumChoice.CEDULA) {
      setIsCheckingIdentificacion(true);
      try {
        const response = await searchCedulaMutation.mutateAsync({
          identificacion: value,
        });
        // Respuesta
        setCedulaData(response ?? null);
      } catch (error) {
        // Manejo de errores si la mutación falla
        ToastWrapper.error('Error al obtener los datos');
      } finally {
        setIsCheckingIdentificacion(false);
      }
    } else if (watchedIdentificationType === IdentificationTypeEnumChoice.RUC) {
      setIsCheckingIdentificacion(true);
      try {
        const response = await searchCedulaMutation.mutateAsync({
          identificacion: value,
        });
        // Respuesta
        setCedulaData(response ?? null);
      } catch (error) {
        // Manejo de errores si la mutación falla
        ToastWrapper.error('Error al obtener los datos');
      } finally {
        setIsCheckingIdentificacion(false);
      }
    }
  };

  const onSave = async (data: SaveFormData) => {
    console.log('watchedLineaServicio', watchedLineaServicio);
    console.log('data.observacion', data.observacion);
    console.log('data.fecha_promesa_pago', data.fecha_promesa_pago);
    setConfirmDialog({
      isOpen: true,
      title: 'Mantenedor activaciones',
      subtitle: '¿Está seguro que desea crear este registro?',
      onConfirm: () => {
        createPromesaPago.mutate({
          linea_servicio: watchedLineaServicio,
          observacion: data.observacion,
          fecha_promesa_pago: data.fecha_promesa_pago,
        });
        clearForm();
        setConfirmDialogIsOpen(false);
      },
    });
  };

  const clearForm = () => {
    form.reset({
      ...form.getValues(),
      cedula: '',
      telefono: '',
      correo: '',
      cliente_name: '',
      linea_servicio: 0,
      status_servicio: '',
      num_contrato: 0,
      numero_contrato: '',
      cliente: 0,
      categorizacion_perfil: '',
      observacion: '',
      fecha_promesa_pago: '',
    });
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!promesaPago?.id) return;
    reset(promesaPago);
  }, [promesaPago, reset]);

  useEffect(() => {
    if (Array.isArray(cedulaData?.data)) {
      if (cedulaData.data.length === 0) {
        ToastWrapper.error('No existen lineas para la cedula digitada');
      }

      const contrato = cedulaData.data.find(
        item => item.contrato_data.numero_contrato === numeroContrato,
      );

      if (contrato) {
        form.setValue(
          'cedula',
          contrato.solicitud_servicio_data.identificacion,
        );
        form.setValue('telefono', contrato.solicitud_servicio_data.celular);
        form.setValue('correo', contrato.solicitud_servicio_data.email);
        form.setValue(
          'cliente_name',
          contrato.solicitud_servicio_data.razon_social,
        );
        form.setValue(
          'linea_servicio',
          contrato.solicitud_servicio_data.linea_servicio,
        );
        form.setValue('status_servicio', contrato.estado_linea);
        form.setValue('num_contrato', contrato.contrato_data.id);
        form.setValue('cliente', contrato.contrato_data.cliente);
        form.setValue(
          'categorizacion_perfil',
          contrato.contrato_data.categorizacion_perfil,
        );
      }
    }
  }, [numeroContrato, cedulaData?.data, form]);

  const {
    data: mantenedorActivacionesPagingRes,
    isLoading: isLoadingMantenedorActivaciones,
    isRefetching: isRefetchingMantenedorActivaciones,
  } = useFetchMantenedorActivaciones({
    params: {
      page_size: 1,
      state: true,
      motivo_base: motivoBaseMantenedorActivacionBaseEnumChoice.PROMESA_DE_PAGO,
    },
  });

  const {
    data: promesasPagoPagingRes,
    isLoading: isLoadingPromesasPago,
    isRefetching: isRefetchingPromesasPago,
  } = useFetchPromesasPago({
    enabled: !!watchedLineaServicio,
    params: {
      page_size: 1000,
      cliente: watchedCliente,
      contrato: watchedNumContrato,
      linea_servicio: watchedLineaServicio,
    },
  });

  const customLoader =
    isLoadingMantenedorActivaciones || isRefetchingMantenedorActivaciones;
  useLoaders(customLoader);

  ///* columns
  const columns = useMemo<MRT_ColumnDef<PromesaPago>[]>(
    () => [
      {
        accessorKey: 'estado_promesa',
        header: 'ESTADO PROMESA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_promesa'),
      },
      {
        accessorKey: 'estado_linea_al_registrar',
        header: 'ESTADO LINEA AL REGISTRAR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_linea_al_registrar'),
      },
      {
        accessorKey: 'created_at',
        header: 'FECHA CREACION',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      {
        accessorKey: 'fecha_promesa_pago',
        header: 'FECHA PROMESA PAGO',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'fecha_promesa_pago'),
      },
      {
        accessorKey: 'observacion',
        header: 'OBSERVACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'observacion'),
      },
    ],
    [],
  );

  useEffect(() => {
    console.log(
      'mantenedorActivacionesPagingRes',
      mantenedorActivacionesPagingRes,
    );
    console.log(
      'mantenedorActivacionesPagingRes?.data?.items?.[0]?.mantenedor_base_data?.tiempo_limite',
      mantenedorActivacionesPagingRes?.data?.items?.[0]?.mantenedor_base_data
        ?.tiempo_limite,
    );
  });
  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlPromesaPagoPage)}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Errores en: ${keys}`);
      })}
      maxWidth="xl"
      gridSizeForm={gridSizeMdLg12}
    >
      <CustomTextFieldNoForm
        label="Fecha de registro de promesa de pago"
        size={gridSizeMdLg6}
        value={dayjs().format('YYYY-MM-DD')}
        disabled
      />
      <CustomTextFieldNoForm
        label="Responsable de registro"
        size={gridSizeMdLg6}
        value={user?.username}
        disabled
      />
      <InputAndBtnGridSpace
        inputNode={
          <CustomIdentificacionTextField
            label="Cliente"
            name="identificacion"
            control={form.control}
            selectedDocumentType={watchedIdentificationType!}
            error={errors.identificacion}
            helperText={errors.identificacion?.message}
            onFetchCedulaRucInfo={async value => {
              await handleFetchCedulaRucInfo(value);
            }}
            disabled={!watchedIdentificationType}
            onChangeValue={value => {
              if (!value?.length || value.length === 10) {
                // clearForm();
                setNumeroContrato(undefined);
              }
              clearForm();
            }}
          />
        }
        btnLabel="Buscar"
        iconBtn={<CiSearch />}
        disabledBtn={
          watchedIdentificationType === IdentificationTypeEnumChoice.PASAPORTE
        }
        onClick={() => {
          if (!watchedIdentification)
            return ToastWrapper.warning(
              'Ingrese un número de identificación válido',
            );
          if (
            watchedIdentificationType == IdentificationTypeEnumChoice.CEDULA &&
            watchedIdentification?.length < 10
          )
            return ToastWrapper.warning('Ingrese una cécula válida');
          if (
            watchedIdentificationType == IdentificationTypeEnumChoice.RUC &&
            watchedIdentification?.length < 13
          )
            return ToastWrapper.warning('Ingrese RUC válido');

          handleFetchCedulaRucInfo(watchedIdentification);
        }}
      />
      <CustomAutocomplete<ContratoData>
        label="Número de contrato"
        name="numero_contrato"
        options={
          Array.isArray(cedulaData?.data)
            ? cedulaData.data.map(item => ({
                ...item,
                numero_contrato: item?.contrato_data?.numero_contrato,
              }))
            : []
        }
        valueKey="numero_contrato"
        actualValueKey="uuid"
        defaultValue={form.getValues().numero_contrato}
        isLoadingData={false}
        // vaidation
        control={form.control}
        error={errors.numero_contrato}
        helperText={errors.numero_contrato?.message}
        size={gridSizeMdLg6}
        onChangeRawValue={i => {
          console.log('i.numero_contrato', i.numero_contrato);
          setNumeroContrato(i.numero_contrato);
        }}
      />
      <CustomTextFieldNoForm
        label="Nombre cliente"
        size={gridSizeMdLg6}
        value={watchedClienteName}
        disabled
      />
      <CustomTextFieldNoForm
        label="Teléfono"
        size={gridSizeMdLg6}
        value={watchedTelefono}
        disabled
      />
      <CustomTextFieldNoForm
        label="Calificacion de contrato"
        size={gridSizeMdLg6}
        value={watchedCategorizacionPerfil}
        disabled
      />
      <CustomTextFieldNoForm
        label="Status Servicio"
        size={gridSizeMdLg6}
        value={watchedStatusServicio}
        disabled
      />
      <CustomDatePicker
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
      />
      <CustomTextArea
        label="Observación"
        name="observacion"
        control={form.control}
        defaultValue={form.getValues().observacion}
        error={errors.observacion}
        helperText={errors.observacion?.message}
        size={gridSizeMdLg6}
      />

      <CustomTypoLabel text="Historial" />

      <>
        <CustomTable<PromesaPago>
          columns={columns}
          data={promesasPagoPagingRes?.data?.items || []}
          isLoading={isLoadingPromesasPago}
          isRefetching={isRefetchingPromesasPago}
          // // filters - server side
          enableManualFiltering={true}
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
          // // search
          enableGlobalFilter={false}
          // // pagination
          /* pagination={pagination}
        onPaging={setPagination} */
          rowCount={promesasPagoPagingRes?.data?.meta?.count}
          // // actions
          actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        />
      </>

      {/* <CustomTextFieldNoForm label="Promesa registradas" />
      <CustomTextFieldNoForm label="Pago a tiempo" />
      <CustomTypoLabel text="Informacion de pago posterior a promesa" />
      <CustomTextFieldNoForm label="Monto pago" />
      <CustomTextFieldNoForm label="Comprobando pago" />
      <CustomTextFieldNoForm label="Canal pago" /> */}
      {/* ============= loaders ============= */}
      <CustomScanLoad isOpen={isCheckingIdentificacion} name="cedula" />
    </SingleFormBoxScene>
  );
};

export default SavePromesaPago;
