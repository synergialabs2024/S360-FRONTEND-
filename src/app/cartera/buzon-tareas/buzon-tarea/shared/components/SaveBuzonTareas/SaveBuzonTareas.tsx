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
  CustomTextAreaNoForm,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  InputAndBtnGridSpace,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  ApiResponse,
  ContratoData,
  Departamento,
  FindByIdentification,
  getKeysFormErrorsMessage,
  IdentificationTypeEnumChoice,
  LineaServicio,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import { CiSearch } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { cambioPlanFormSchema } from '@/shared/utils/validation-schemas/app/cartera/cambio-plan/cambio-plan.schema';
import { useSearchCedulaMutation } from '@/actions/app/tickets';
import { useCreateCambioPlan } from '@/actions/app/cartera/cambio-plan/cambio-plan.actions';
import { useUiConfirmModalStore } from '@/store/ui';
import { returnUrlCambioPlanPage } from '../../../pages/forms/BuzonTareasPage';
import { CreateBuzonTareaParamsBase } from '@/actions/app/cartera/buzon-tareas';
import { useAuthStore } from '@/store/auth';
import { useFetchDepartamentos } from '@/actions/app';
import dayjs from 'dayjs';
import { useFetchTipoMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios';
import { useFetchSubtipoMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';
import { TipoMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros';
import { SubtipoMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';

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
    useState<ApiResponse<FindByIdentification> | null>(null);

  const [numeroContrato, setNumeroContrato] = useState<string | undefined>(
    undefined,
  );

  const [fieldVisibility, setFieldVisibility] = useState(false);

  ///* form -----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(cambioPlanFormSchema) as any,
    defaultValues: {
      tipo_identificacion: IdentificationTypeEnumChoice.CEDULA,
    },
  });

  const watchedTipoTarea = form.watch('tipo_tarea');

  ///* mutations ---------------------

  const searchCedulaMutation = useSearchCedulaMutation();
  const createCambioPlan = useCreateCambioPlan({
    enableErrorNavigate: false,
    customOnSuccess: () => {
      navigate(returnUrlCambioPlanPage);
    },
    navigate,
    returnUrl: returnUrlCambioPlanPage,
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
    handleSubmit,
    formState: { errors },
  } = form;
  const watchedIdentificationType = form.watch('tipo_identificacion');
  const watchedIdentification = form.watch('identificacion');
  const watchedLineaServicio = form.watch('linea_servicio_data');
  const watchedErrorMessage = form.watch('error_message');
  //
  const watchedCedula = form.watch('cedula');
  const watchedTelefono = form.watch('telefono');
  const watchedCorreo = form.watch('correo');
  //

  const onSave = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cambiar plan',
      subtitle: '¿Está seguro que desea cambiar este plan?',
      onConfirm: () => {
        createCambioPlan.mutate({
          linea_servicio: watchedLineaServicio?.contrato_data?.id,
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
        form.setValue('correo', contrato.solicitud_servicio_data.email);
      }
    }
  }, [numeroContrato, cedulaData?.data, form]);

  const customLoader =
    isLoadingTipoMantenedorBeneficios ||
    isRefetchingTipoMantenedorBeneficios ||
    isLoadingSubtipoMantenedorBeneficios ||
    isRefetchingSubtipoMantenedorBeneficios ||
    isLoadingDepartamentos ||
    isRefetchingDepartamentos;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCambioPlanPage)}
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
          name="tipo_mantenedor_beneficio"
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
            form.setValue('subtipo_tarea', '');
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
        <CustomTextFieldNoForm
          label="Aplica para beneficio segun perfil?"
          size={gridSizeMdLg6}
          value={''}
          disabled
        />

        <CustomTextFieldNoForm
          label="Canal de referencia"
          size={gridSizeMdLg6}
          value={''}
          disabled
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
              value={''}
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
              value={''}
              disabled
            />

            <CustomTextFieldNoForm
              label="tipo de cliente"
              size={gridSizeMdLg6}
              value={''}
              disabled
            />

            <CustomTextFieldNoForm
              label="Categorizacion (Perfil)"
              size={gridSizeMdLg6}
              value={''}
              disabled
            />

            <CustomTextFieldNoForm
              label="Cliente"
              size={gridSizeMdLg6}
              value={''}
              disabled
            />

            <CustomTextAreaNoForm
              label="Detalles del caso"
              size={gridSizeMdLg6}
              value={''}
              disabled
            />

            <CustomTextAreaNoForm
              label="Respuesta de caso"
              size={gridSizeMdLg6}
              value={''}
              disabled
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
