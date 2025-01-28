/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { gridSizeMdLg12, gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  CustomAutocomplete,
  CustomIdentificacionTextField,
  CustomScanLoad,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  InputAndBtnGridSpace,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  CreateSolicitudServicioParamsBase,
  useFetchPlanInternets,
  useGetClienteByIdentificacion,
  useGetLineaServicio,
} from '@/actions/app';
import {
  ContratoData,
  EstadoSolicitudServicioEnumChoice,
  getKeysFormErrorsMessage,
  IdentificationTypeEnumChoice,
  InternetPlanInternetTypeEnumChoice,
  PlanInternet,
  ToastWrapper,
} from '@/shared';
import { CiSearch } from 'react-icons/ci';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { cambioPlanFormSchema } from '@/shared/utils/validation-schemas/app/cartera/cambio-plan';

export interface SavePromesaPagoProps {
  title: string;
}
type SaveFormData = CreateSolicitudServicioParamsBase & {
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
};
const SaveCambioDomicilio: React.FC<SavePromesaPagoProps> = ({ title }) => {
  const navigate = useNavigate();
  const [isCheckingIdentificacion, setIsCheckingIdentificacion] =
    useState<boolean>(false);
  /*   const [cansearch, setCansearch] =
    useState<boolean>(false); */
  ///* form -----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(cambioPlanFormSchema) as any,
    defaultValues: {
      estado_solicitud: EstadoSolicitudServicioEnumChoice.INGRESADO,
      es_tercera_edad: false,
      es_discapacitado: false,
      es_cliente: false,
      tiene_cobertura: false,
      isFormBlocked: false,
      thereIsCoverage: false,
      thereAreNaps: false,
      tipo_identificacion: IdentificationTypeEnumChoice.CEDULA,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const watchedIdentification = form.watch('identificacion');
  const watchedIdentificationType = form.watch('tipo_identificacion');
  const watchedNumeroContrato = form.watch('numero_contrato');
  //
  const watchedPlanInternet = form.watch('plan_internet');
  console.log(watchedPlanInternet);
  const { data: dataCliente } = useGetClienteByIdentificacion(
    watchedIdentification!,
  );

  const { data: lineaServicio } = useGetLineaServicio(watchedNumeroContrato!);

  const onSave = async () => {
    console.log('watchedIdentificationType', watchedIdentificationType);
  };
  const { data: planInternetsPaging } = useFetchPlanInternets({
    params: {
      page_size: 600,
    },
  });
  console.log('planes de internet', planInternetsPaging);
  const handleFetchCedulaRucInfo = async (value: string) => {
    console.log('value', value);
    setIsCheckingIdentificacion(false);
    /* if (watchedIdentificationType === IdentificationTypeEnumChoice.CEDULA) {
      setIsCheckingIdentificacion(true);
      await Promise.all([
        searchCedulaMutation.mutateAsync({
          identificacion: value,
        }),
      ]);
  
      setIsCheckingIdentificacion(false);
    } else if (watchedIdentificationType === IdentificationTypeEnumChoice.RUC) {
      setIsCheckingIdentificacion(true);
      await Promise.all([
        searchCedulaMutation.mutateAsync({
          identificacion: value,
        }),
      ]);
      setIsCheckingIdentificacion(false);
    } */
  };

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate('')}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Errores en: ${keys}`);
      })}
      maxWidth="xl"
      gridSizeForm={gridSizeMdLg12}
    >
      <Grid item container {...gridSizeMdLg12} spacing={5}>
        <CustomTextFieldNoForm
          label="Tipo de identificación"
          value={IdentificationTypeEnumChoice.CEDULA}
          disabled
        />
        <InputAndBtnGridSpace
          inputNode={
            <CustomIdentificacionTextField
              label="Identificación"
              name="identificacion"
              control={form.control}
              selectedDocumentType={watchedIdentificationType}
              defaultValue={form.getValues('identificacion')}
              error={errors.identificacion}
              helperText={errors.identificacion?.message}
              onFetchCedulaRucInfo={async value => {
                await handleFetchCedulaRucInfo(value);
              }}
              disabled={!watchedIdentificationType}
              /* onChangeValue={value => {
              if (!value?.length) {
                clearForm();
              }
            }} */
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
            Array.isArray(dataCliente?.data)
              ? dataCliente.data.map(item => ({
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
            console.log(i);
          }}
        />
      </Grid>
      <CustomTextFieldNoForm
        label="Plan actual"
        size={gridSizeMdLg12}
        value={
          lineaServicio?.data?.contrato_data?.plan_internet_actual_data?.name
        }
        disabled
      />
      {/* ============= Nuevo Plan ============= */}
      <CustomTextFieldNoForm
        label="Tipo de plan"
        value={InternetPlanInternetTypeEnumChoice.HOGAR}
        disabled
      />
      <CustomAutocomplete<PlanInternet>
        label="Planes de internet"
        name="plan_internet"
        // options
        options={planInternetsPaging?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().plan_internet}
        isLoadingData={false}
        // vaidation
        control={form.control}
        error={errors.plan_internet}
        helperText={errors.plan_internet?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextFieldNoForm label="Adicional prox factura" />

      <CustomTypoLabel text="" />
      <Grid item container {...gridSizeMdLg12} spacing={2}>
        <CustomTypoLabel text="DETALLE DE PORPORCIONAL POR CAMBIO DE PLAN" />
        <CustomTextFieldNoForm
          size={gridSizeMdLg12}
          label="Precio plan actual"
          value={
            lineaServicio?.data?.contrato_data?.plan_internet_actual_data?.valor
          }
          disabled
          startAdornment="$"
        />
        <CustomTextFieldNoForm size={gridSizeMdLg12} label="Costo por dia" />
        <CustomTextFieldNoForm
          size={gridSizeMdLg12}
          label="Precio plan nuevo"
        />
        <CustomTextFieldNoForm
          size={gridSizeMdLg12}
          label="Costo por dia plan nuevo"
        />
      </Grid>
      <Grid item container {...gridSizeMdLg12} spacing={2}>
        <CustomTextFieldNoForm size={gridSizeMdLg12} label="Fecha pago" />

        <CustomTextFieldNoForm size={gridSizeMdLg12} label="Fecha de cambio" />
        <CustomTextFieldNoForm
          size={gridSizeMdLg12}
          label="Fecha de diferencia"
        />
        <CustomTextFieldNoForm size={gridSizeMdLg12} label="Porporcional" />
        <CustomTextFieldNoForm
          size={gridSizeMdLg12}
          label="Valor total en pagar en fecha de pago"
        />
      </Grid>

      {/* ============= loaders ============= */}
      <CustomScanLoad isOpen={isCheckingIdentificacion} name="cedula" />
    </SingleFormBoxScene>
  );
};
export default SaveCambioDomicilio;
