/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { gridSizeMdLg12, gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  CustomAutocomplete,
  CustomCardAlert,
  CustomIdentificacionTextField,
  CustomScanLoad,
  CustomTextArea,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  InputAndBtnGridSpace,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  ApiResponse,
  CANAL_REFERENCIA_MANTENEDORES_ARRAY_CHOICES,
  ContratoData,
  Departamento,
  FindByIdentificationWithDebt,
  getKeysFormErrorsMessage,
  IdentificationTypeEnumChoice,
  LineaServicio,
  ToastWrapper,
  useLoaders,
  YES_NO_ARRAY_CHOICES,
} from '@/shared';
import { CiSearch } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useSearchCedulaWithDebtMutation } from '@/actions/app/tickets';
import { useUiConfirmModalStore } from '@/store/ui';
import {
  CreateBuzonTareaParamsBase,
  useCreateBuzonTarea,
} from '@/actions/app/cartera/buzon-tareas';
import { useAuthStore } from '@/store/auth';
import { useFetchDepartamentos } from '@/actions/app';
import dayjs from 'dayjs';
import { useFetchTipoMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios';
import { useFetchSubtipoMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';
import {
  CausaMantenedorBeneficios,
  TipoMantenedorBeneficios,
} from '@/shared/interfaces/app/cartera/buzon-tareas/parametros';
import { SubtipoMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';
import { useFetchCausaMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/causa-mantenedor-beneficios';
import { buzonTareaFormSchema } from '@/shared/utils/validation-schemas/app/cartera/buzon-tareas/buzon-tareas.schema';
import { returnUrlBuzonTareasPage } from '../../../pages/tables/BuzonTareasPage';

export interface SaveBuzonTareasProps {
  title: string;
}
type SaveFormData = CreateBuzonTareaParamsBase & {
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
  //
};
const SaveBuzonTareas: React.FC<SaveBuzonTareasProps> = ({ title }) => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  const user = useAuthStore(s => s.user);

  ///* local state -----------------
  const [isCheckingIdentificacion, setIsCheckingIdentificacion] =
    useState<boolean>(false);

  const [cedulaData, setCedulaData] =
    useState<ApiResponse<FindByIdentificationWithDebt> | null>(null);

  const [numeroContrato, setNumeroContrato] = useState<string | undefined>(
    undefined,
  );

  const [fieldVisibility, setFieldVisibility] = useState(false);

  ///* form -----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(buzonTareaFormSchema) as any,
    defaultValues: {
      tipo_identificacion: IdentificationTypeEnumChoice.CEDULA,
    },
  });

  const watchedTipoTarea = form.watch('tipo_tarea');

  ///* mutations ---------------------

  const searchCedulaMutation = useSearchCedulaWithDebtMutation();

  const createBuzonTarea = useCreateBuzonTarea({
    navigate,
    returnUrl: returnUrlBuzonTareasPage,
    enableErrorNavigate: false,
    customOnSuccess: () => {},
  });

  //

  const {
    data: departamentoPagingRes,
    isLoading: isLoadingDepartamentos,
    isRefetching: isRefetchingDepartamentos,
  } = useFetchDepartamentos({
    params: {
      page_size: 1000,
    },
  });

  const {
    data: tipoMantenedorBeneficiosPaginatedRes,
    isLoading: isLoadingTipoMantenedorBeneficios,
    isRefetching: isRefetchingTipoMantenedorBeneficios,
  } = useFetchTipoMantenedorBeneficios({
    params: {
      page_size: 200,
    },
  });

  const {
    data: subtipoMantenedorBeneficiosPaginatedRes,
    isLoading: isLoadingSubtipoMantenedorBeneficios,
    isRefetching: isRefetchingSubtipoMantenedorBeneficios,
  } = useFetchSubtipoMantenedorBeneficios({
    enabled: fieldVisibility,
    params: {
      tipo_mantenedor_beneficio: Number(watchedTipoTarea),
      page_size: 200,
    },
  });

  const {
    data: causaMantenedorBeneficiosPaginatedRes,
    isLoading: isLoadingCausaMantenedorBeneficios,
    isRefetching: isRefetchingCausaMantenedorBeneficios,
  } = useFetchCausaMantenedorBeneficios({
    params: {
      page_size: 200,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const watchedIdentificationType = form.watch('tipo_identificacion');
  const watchedIdentification = form.watch('identificacion');
  const watchedErrorMessage = form.watch('error_message');
  //
  const watchedCedula = form.watch('cedula');
  const watchedTelefono = form.watch('telefono');
  const watchedCorreo = form.watch('correo');
  const watchedClienteName = form.watch('cliente_name');
  const watchedDeuda = form.watch('deuda');
  const watchedCategorizacionPerfil = form.watch('categorizacion_perfil');
  const watchedTiempoPermanencia = form.watch('tiempo_permancencia');
  const watchedTipoCliente = form.watch('tipo_cliente');
  //

  const onSave = async (data: SaveFormData) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Buzon de tarea',
      subtitle: '¿Está seguro que desea crear la tarea?',
      onConfirm: () => {
        createBuzonTarea.mutate({
          canal_referencia: data.canal_referencia,
          detalle_caso: data.detalle_caso,
          tipo_tarea: data.tipo_tarea,
          subtipo_tarea: data.subtipo_tarea,
          causa_tarea: data.causa_tarea,
          cliente: data.cliente,
          linea_servicio: data.linea_servicio,
          departamento_asignado: data.departamento_asignado,
          usuario_creacion: user?.id,
          aplica_beneficio_segun_perfil: data.aplica_beneficio_solucion,
        });
        setConfirmDialogIsOpen(false);
      },
    });
  };
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

  const clearForm = () => {
    form.reset({
      ...form.getValues(),
      numero_contrato: '',
      error_message: '',
      linea_servicio_data: undefined,
    });
  };

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
        form.setValue('deuda', contrato.deuda);
        form.setValue(
          'categorizacion_perfil',
          contrato.contrato_data.categorizacion_perfil,
        );
        form.setValue(
          'categorizacion_pagos',
          contrato.contrato_data.categorizacion_pagos,
        );
        form.setValue(
          'tiempo_permancencia',
          contrato.contrato_data.permanencia_contrato,
        );
        form.setValue(
          'tipo_cliente',
          contrato.contrato_data.plan_internet_actual_data.tipo_plan,
        );
      }
    }
  }, [numeroContrato, cedulaData?.data, form]);

  const customLoader =
    isLoadingTipoMantenedorBeneficios ||
    isRefetchingTipoMantenedorBeneficios ||
    isLoadingSubtipoMantenedorBeneficios ||
    isRefetchingSubtipoMantenedorBeneficios ||
    isLoadingCausaMantenedorBeneficios ||
    isRefetchingCausaMantenedorBeneficios ||
    isLoadingDepartamentos ||
    isRefetchingDepartamentos;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlBuzonTareasPage)}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Errores en: ${keys}`);
      })}
      maxWidth="xl"
      gridSizeForm={gridSizeMdLg12}
    >
      {!watchedErrorMessage ? (
        <></>
      ) : (
        <>
          <CustomCardAlert
            sizeType="medium"
            alertSeverity="info"
            alertTitle="ERROR"
            alertContentNode={<>{watchedErrorMessage}</>}
          />
        </>
      )}

      <>
        <CustomTypoLabel text="Datos de solicitud" />
        <CustomTextFieldNoForm
          label="Responsable"
          size={gridSizeMdLg6}
          value={user?.username}
          disabled
        />
        {/* ============= Nuevo Plan ============= */}
        <CustomTextFieldNoForm
          label="Fecha creacion"
          size={gridSizeMdLg6}
          value={dayjs().format('YYYY-MM-DD')}
          disabled
        />
        <CustomAutocomplete<Departamento>
          label="Departamento"
          name="departamento_asignado"
          valueKey="name"
          actualValueKey="id"
          control={form.control}
          defaultValue={form.getValues().departamento_asignado}
          options={departamentoPagingRes?.data.items || []}
          isLoadingData={isLoadingDepartamentos}
          error={errors.departamento_asignado}
          helperText={errors.departamento_asignado?.message}
          size={gridSizeMdLg6}
        />
        <CustomAutocomplete<TipoMantenedorBeneficios>
          label="Tipo de solicitud"
          name="tipo_tarea"
          valueKey="name"
          actualValueKey="id"
          control={form.control}
          defaultValue={form.getValues().tipo_tarea}
          options={tipoMantenedorBeneficiosPaginatedRes?.data.items || []}
          isLoadingData={isLoadingTipoMantenedorBeneficios}
          error={errors.tipo_tarea}
          helperText={errors.tipo_tarea?.message}
          size={gridSizeMdLg6}
          onChangeValue={e => {
            if (e) setFieldVisibility(true);
            form.setValue('subtipo_tarea', 0);
          }}
        />
        <CustomAutocomplete<SubtipoMantenedorBeneficios>
          label="Subtipo de solicitud"
          name="subtipo_tarea"
          valueKey="name"
          actualValueKey="id"
          control={form.control}
          defaultValue={form.getValues().subtipo_tarea}
          options={subtipoMantenedorBeneficiosPaginatedRes?.data.items || []}
          isLoadingData={isLoadingSubtipoMantenedorBeneficios}
          error={errors.subtipo_tarea}
          helperText={errors.subtipo_tarea?.message}
          size={gridSizeMdLg6}
        />
        <CustomAutocomplete<CausaMantenedorBeneficios>
          label="Causa de solicitud"
          name="causa_tarea"
          valueKey="name"
          actualValueKey="id"
          control={form.control}
          defaultValue={form.getValues().causa_tarea}
          options={causaMantenedorBeneficiosPaginatedRes?.data.items || []}
          isLoadingData={isLoadingSubtipoMantenedorBeneficios}
          error={errors.causa_tarea}
          helperText={errors.causa_tarea?.message}
          size={gridSizeMdLg6}
        />

        <SelectArrayString
          label="Aplica beneficio perfil"
          name="aplica_beneficio_segun_perfil"
          control={form.control}
          error={errors.aplica_beneficio_segun_perfil}
          helperText={errors.aplica_beneficio_segun_perfil?.message}
          options={YES_NO_ARRAY_CHOICES}
          gridSize={gridSizeMdLg6}
        />

        <SelectArrayString
          label="Canal de referencia"
          name="canal_referencia"
          control={form.control}
          error={errors.canal_referencia}
          helperText={errors.canal_referencia?.message}
          options={CANAL_REFERENCIA_MANTENEDORES_ARRAY_CHOICES}
          gridSize={gridSizeMdLg6}
        />

        <>
          <CustomTypoLabel text="Datos del cliente" />
          <Grid item container {...gridSizeMdLg12} spacing={2}>
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
                      clearForm();
                      setNumeroContrato(undefined);
                    }
                  }}
                />
              }
              btnLabel="Buscar"
              iconBtn={<CiSearch />}
              disabledBtn={
                watchedIdentificationType ===
                IdentificationTypeEnumChoice.PASAPORTE
              }
              onClick={() => {
                if (!watchedIdentification)
                  return ToastWrapper.warning(
                    'Ingrese un número de identificación válido',
                  );
                if (
                  watchedIdentificationType ==
                    IdentificationTypeEnumChoice.CEDULA &&
                  watchedIdentification?.length < 10
                )
                  return ToastWrapper.warning('Ingrese una cécula válida');
                if (
                  watchedIdentificationType ==
                    IdentificationTypeEnumChoice.RUC &&
                  watchedIdentification?.length < 13
                )
                  return ToastWrapper.warning('Ingrese RUC válido');

                handleFetchCedulaRucInfo(watchedIdentification);
              }}
            />
            <CustomAutocomplete<ContratoData>
              label="Contrato"
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
              label="Cédula/Ruc"
              size={gridSizeMdLg6}
              value={watchedCedula}
              disabled
            />

            <CustomTextFieldNoForm
              label="Telefono"
              size={gridSizeMdLg6}
              value={watchedTelefono}
              disabled
            />

            <CustomTextFieldNoForm
              label="Deuda"
              size={gridSizeMdLg6}
              value={watchedDeuda}
              disabled
            />

            <CustomTextFieldNoForm
              label="Correo"
              size={gridSizeMdLg6}
              value={watchedCorreo}
              disabled
            />

            <CustomTextFieldNoForm
              label="Tiempo de permanencia"
              size={gridSizeMdLg6}
              value={watchedTiempoPermanencia}
              disabled
            />

            <CustomTextFieldNoForm
              label="tipo de cliente"
              size={gridSizeMdLg6}
              value={watchedTipoCliente}
              disabled
            />

            <CustomTextFieldNoForm
              label="Categorizacion (Perfil)"
              size={gridSizeMdLg6}
              value={watchedCategorizacionPerfil}
              disabled
            />

            <CustomTextFieldNoForm
              label="Cliente"
              size={gridSizeMdLg6}
              value={watchedClienteName}
              disabled
            />

            <CustomTextArea
              label="Detalle de caso"
              name="detalle_caso"
              control={form.control}
              defaultValue={form.getValues().detalle_caso}
              error={errors.detalle_caso}
              helperText={errors.detalle_caso?.message}
              size={gridSizeMdLg12}
            />
          </Grid>
        </>
      </>

      {/* ============= loaders ============= */}
      <CustomScanLoad isOpen={isCheckingIdentificacion} name="cedula" />
    </SingleFormBoxScene>
  );
};
export default SaveBuzonTareas;
