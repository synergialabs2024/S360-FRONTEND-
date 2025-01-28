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
  CustomTextFieldNoForm,
  CustomTypoLabel,
  InputAndBtnGridSpace,
  SingleFormBoxScene,
} from '@/shared/components';
import { useFetchPlanInternets } from '@/actions/app';
import {
  ApiResponse,
  ContratoData,
  FindByIdentification,
  formatDate,
  getKeysFormErrorsMessage,
  IdentificationTypeEnumChoice,
  InternetPlanInternetTypeEnumChoice,
  LineaServicio,
  PlanInternet,
  SolicitudServicio,
  ToastWrapper,
} from '@/shared';
import { CiSearch } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { cambioPlanFormSchema } from '@/shared/utils/validation-schemas/app/cartera/cambio-plan/cambio-plan.schema';
import { useSearchCedulaMutation } from '@/actions/app/tickets';
import {
  CreateCambioPlanParamsBase,
  useCreateCambioPlan,
  useGetCambioPlanComputeValores,
} from '@/actions/app/cartera/cambio-plan/cambio-plan.actions';
import { returnUrlCambioPlanPage } from '../../../pages/tables/CambioPlanByStatePage';
import { CambioPlanComputeValores } from '@/shared/interfaces/app/cartera';
import dayjs from 'dayjs';
import { useUiConfirmModalStore } from '@/store/ui';

export interface SavePromesaPagoProps {
  title: string;
}
type SaveFormData = CreateCambioPlanParamsBase & {
  // helper
  isFormBlocked?: boolean;
  isValidIdentificacion?: boolean;
  numero_contrato: string;
  cityName?: string;
  provinceName?: string;
  zoneName?: string;
  thereIsCoverage?: boolean;
  thereAreNaps?: boolean;
  tipo_servicio?: string;
  tipo_plan?: string;
  plan_internet?: string;

  //

  tipo_identificacion?: string;
  identificacion?: string;
  es_cliente?: boolean;
  solicitud_servicio_data?: SolicitudServicio;
  plan_actual?: string;
  precio_plan_actual?: string;
  linea_servicio_data?: LineaServicio;
  cambio_plan_compute_valores_data?: CambioPlanComputeValores;
  plan_nuevo_id: number;
  error_message: string;
  valores_positivos: boolean;
};
const SaveCambioPlan: React.FC<SavePromesaPagoProps> = ({ title }) => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* local state -----------------
  const [isCheckingIdentificacion, setIsCheckingIdentificacion] =
    useState<boolean>(false);

  const [cedulaData, setCedulaData] =
    useState<ApiResponse<FindByIdentification> | null>(null);

  const [numeroContrato, setNumeroContrato] = useState<string | undefined>(
    undefined,
  );

  ///* mutations ---------------------

  const searchCedulaMutation = useSearchCedulaMutation();
  const getCambioPlanComputeValores = useGetCambioPlanComputeValores({
    enableErrorNavigate: false,
    customOnSuccess: (data?: any) => {
      form.setValue(
        'cambio_plan_compute_valores_data',
        data?.data as CambioPlanComputeValores,
      );
      form.setValue('error_message', '');
    },
    customOnError: (error?: any) => {
      form.setValue('error_message', error.response.data.message);
    },
  });

  const createCambioPlan = useCreateCambioPlan({
    enableErrorNavigate: false,
    customOnSuccess: () => {
      navigate(returnUrlCambioPlanPage);
    },
    navigate,
    returnUrl: returnUrlCambioPlanPage,
  });

  ///* form -----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(cambioPlanFormSchema) as any,
    defaultValues: {
      tipo_identificacion: IdentificationTypeEnumChoice.CEDULA,
      isFormBlocked: false,
      thereIsCoverage: false,
      thereAreNaps: false,
      es_cliente: false,
      valores_positivos: false,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const watchedIdentificationType = form.watch('tipo_identificacion');
  const watchedIdentification = form.watch('identificacion');
  const watchedPlanActual = form.watch('plan_actual');
  const watchedPlanNuevoId = form.watch('plan_nuevo_id');
  const watchedValoresPositivos = form.watch('valores_positivos');
  const watchedLineaServicio = form.watch('linea_servicio_data');
  const watchedcambioPlanComputeValores = form.watch(
    'cambio_plan_compute_valores_data',
  );
  const watchedErrorMessage = form.watch('error_message');
  //

  const onSave = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cambiar plan',
      subtitle: '¿Está seguro que desea cambiar este plan?',
      onConfirm: () => {
        createCambioPlan.mutate({
          plan_internet_nuevo: watchedPlanNuevoId,
          linea_servicio: watchedLineaServicio?.contrato_data?.id,
        });
        setConfirmDialogIsOpen(false);
      },
    });
  };
  const { data: planInternetsPaging } = useFetchPlanInternets({
    params: {
      page_size: 600,
    },
  });
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
      valores_positivos: false,
      cambio_plan_compute_valores_data: undefined,
      solicitud_servicio_data: undefined,
      plan_actual: undefined,
      precio_plan_actual: undefined,
      linea_servicio_data: undefined,
      plan_nuevo_id: undefined,
    });
  };

  const cambioPlanComputeValoresFunction = (planInternetNuevo: number) => {
    getCambioPlanComputeValores.mutate({
      plan_internet_nuevo: planInternetNuevo,
      linea_servicio: watchedLineaServicio?.contrato_data?.id,
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

      form.setValue('linea_servicio_data', contrato);

      if (contrato) {
        form.setValue(
          'plan_actual',
          contrato.contrato_data.plan_internet_actual_data.name,
        );
        form.setValue(
          'precio_plan_actual',
          contrato.contrato_data.plan_internet_actual_data.valor,
        );

        if (
          Number(watchedPlanNuevoId) >
          Number(contrato?.contrato_data?.plan_internet_actual_data?.id)
        ) {
          form.setValue('valores_positivos', true);
        } else {
          form.setValue('valores_positivos', false);
        }
      }
    }
  }, [numeroContrato, cedulaData?.data, form, watchedPlanNuevoId]);

  const roundToTwoDecimals = (value: number) => {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  };

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
      <Grid item container {...gridSizeMdLg12} spacing={5}>
        <InputAndBtnGridSpace
          inputNode={
            <CustomIdentificacionTextField
              label="Identificación"
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
            watchedIdentificationType === IdentificationTypeEnumChoice.PASAPORTE
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
              watchedIdentificationType == IdentificationTypeEnumChoice.RUC &&
              watchedIdentification?.length < 13
            )
              return ToastWrapper.warning('Ingrese RUC válido');

            handleFetchCedulaRucInfo(watchedIdentification);
          }}
        />
        <CustomAutocomplete<ContratoData>
          label="Línea de servicio"
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
      </Grid>

      {numeroContrato === undefined || watchedLineaServicio === undefined ? (
        <></>
      ) : (
        <>
          <CustomTextFieldNoForm
            label="Plan actual"
            size={gridSizeMdLg6}
            value={watchedPlanActual}
            disabled
          />
          {/* ============= Nuevo Plan ============= */}
          <CustomTextFieldNoForm
            label="Tipo de plan"
            size={gridSizeMdLg6}
            value={InternetPlanInternetTypeEnumChoice.HOGAR}
            disabled
          />
          <CustomAutocomplete<PlanInternet>
            label="Plan a cambiar"
            name="plan_nuevo_id"
            // options
            options={planInternetsPaging?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={''}
            isLoadingData={false}
            // vaidation
            onChangeValue={value => {
              form.setValue('plan_nuevo_id', value);
              cambioPlanComputeValoresFunction(value);
            }}
            control={form.control}
            error={errors.plan_internet}
            helperText={errors.plan_internet?.message}
            size={watchedValoresPositivos ? gridSizeMdLg6 : gridSizeMdLg12}
          />

          {watchedValoresPositivos ? (
            <>
              <CustomTextFieldNoForm
                label="Adicional prox factura"
                value={watchedcambioPlanComputeValores?.diff_prices}
                disabled
              />
            </>
          ) : (
            <></>
          )}

          {!watchedcambioPlanComputeValores ? (
            <></>
          ) : (
            <>
              <CustomTypoLabel text="" />
              <Grid item container {...gridSizeMdLg12} spacing={2}>
                <CustomTypoLabel text="DETALLE DE PORPORCIONAL POR CAMBIO DE PLAN" />
                <CustomTypoLabel text="PLAN ACTUAL" />
                <CustomTextFieldNoForm
                  size={gridSizeMdLg6}
                  label="Precio plan actual (Valor base)"
                  value={watchedcambioPlanComputeValores?.current_plan.valor}
                  startAdornment="$"
                  disabled
                />
                <CustomTextFieldNoForm
                  size={gridSizeMdLg6}
                  label="Precio plan actual (Incl. Iva)"
                  value={
                    watchedcambioPlanComputeValores?.current_plan.valor_total
                  }
                  startAdornment="$"
                  disabled
                />
                <CustomTextFieldNoForm
                  size={gridSizeMdLg6}
                  label="Costo por dia (Plan actual)"
                  value={(
                    Number(
                      watchedcambioPlanComputeValores?.current_plan.valor_total,
                    ) / 30
                  ).toFixed(2)}
                  startAdornment="$"
                  disabled
                />
                <CustomTypoLabel text="PLAN NUEVO" />
                <CustomTextFieldNoForm
                  size={gridSizeMdLg6}
                  label="Precio plan nuevo (Valor base)"
                  value={watchedcambioPlanComputeValores?.new_plan.valor}
                  startAdornment="$"
                  disabled
                />
                <CustomTextFieldNoForm
                  size={gridSizeMdLg6}
                  label="Precio plan nuevo(Incl. Iva)"
                  value={watchedcambioPlanComputeValores?.new_plan.valor_total}
                  startAdornment="$"
                  disabled
                />
                <CustomTextFieldNoForm
                  size={gridSizeMdLg6}
                  label="Costo por dia plan nuevo"
                  value={(
                    Number(
                      watchedcambioPlanComputeValores?.new_plan.valor_total,
                    ) / 30
                  ).toFixed(2)}
                  startAdornment="$"
                  disabled
                />
              </Grid>
              <CustomTypoLabel text="DETALLES ADICIONALES" />
              <Grid item container {...gridSizeMdLg12} spacing={2}>
                <CustomTextFieldNoForm
                  size={gridSizeMdLg6}
                  label="Fecha pago"
                  value={formatDate(
                    watchedcambioPlanComputeValores?.fecha_pago_rubro,
                  )}
                  startAdornment="$"
                  disabled
                />

                <CustomTextFieldNoForm
                  size={gridSizeMdLg6}
                  label="Fecha de cambio"
                  value={dayjs().format('YYYY-MM-DD')}
                  disabled
                />
                <CustomTextFieldNoForm
                  size={gridSizeMdLg6}
                  label="Dias de diferencia"
                  value={watchedcambioPlanComputeValores?.diff_days}
                  disabled
                />

                {watchedValoresPositivos ? (
                  <>
                    <CustomTextFieldNoForm
                      size={gridSizeMdLg6}
                      label="Porporcional"
                      value={
                        watchedcambioPlanComputeValores?.valor_proporcional
                      }
                      startAdornment="$"
                      disabled
                    />
                  </>
                ) : (
                  <></>
                )}
                <CustomTextFieldNoForm
                  size={gridSizeMdLg6}
                  label="Valor total en pagar en fecha de pago"
                  value={roundToTwoDecimals(
                    Number(watchedcambioPlanComputeValores?.new_plan.valor) *
                      1.15,
                  ).toFixed(2)}
                  disabled
                />
              </Grid>
            </>
          )}
        </>
      )}

      {/* ============= loaders ============= */}
      <CustomScanLoad isOpen={isCheckingIdentificacion} name="cedula" />
    </SingleFormBoxScene>
  );
};
export default SaveCambioPlan;
