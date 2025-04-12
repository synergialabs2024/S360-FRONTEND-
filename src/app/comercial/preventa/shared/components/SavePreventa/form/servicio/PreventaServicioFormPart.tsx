/* eslint-disable indent */
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';

import { useConsultarEquifax, useFetchPlanInternets } from '@/actions/app';
import {
  ClasificacionPlanesScoreBuroEnumChoice,
  EquifaxEdentificationType,
  gridSizeMdLg6,
  HTTPResStatusCodeEnum,
  IdentificationTypeEnumChoice,
  INTERNET_PLAN_INTERNET_TYPE_ARRAY_CHOICES,
  INTERNET_SERVICE_TYPE_ARRAY_CHOICES_VENTAHOME,
  PlanInternet,
  SolicitudServicio,
  ToastWrapper,
  validarCedulaEcuador,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import {
  ChipModelState,
  CustomAutocomplete,
  CustomAutocompleteArrString,
  CustomCardAlert,
  CustomScanLoad,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  InputAndBtnGridSpace,
} from '@/shared/components';
import { EquifaxServicioCedula } from '@/shared/interfaces/consultas-api';
import { usePreventaStore } from '@/store/app';
import { PromocionPreventaFormPart } from '../../promocion';
import type { SaveFormDataPreventa } from '../../SavePreventa';
import { EquiposVentaPreventaPartStep } from '../equipos';
import PaymentMethodPreventaFormPart from './PaymentMethodPreventaFormPart';

export type PreventaServicioFormPartProps = {
  form: UseFormReturn<SaveFormDataPreventa>;
  solicitudServicio: SolicitudServicio;

  showEquiposPart: boolean;
  setShowEquiposPart: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreventaServicioFormPart: React.FC<PreventaServicioFormPartProps> = ({
  form,
  solicitudServicio,
  showEquiposPart,
  setShowEquiposPart,
}) => {
  ///* local state -----------------
  const [isCheckingIdentificacionEquifax, setIsCheckingIdentificacionEquifax] =
    useState<boolean>(false);

  ///* global state -----------------
  const setScoreServicio = usePreventaStore(s => s.setScoreServicio);
  const suggestedPlansBuroKey = usePreventaStore(s => s.suggestedPlansBuroKey);
  const setSuggestedPlansBuroKey = usePreventaStore(
    s => s.setSuggestedPlansBuroKey,
  );
  const alreadyConsultedEquifax = usePreventaStore(
    s => s.alreadyConsultedEquifax,
  );
  const setAlreadyConsultedEquifax = usePreventaStore(
    s => s.setAlreadyConsultedEquifax,
  );

  ///* form -----------------
  const { errors } = form.formState;

  const watchedIdentification = form.watch('identificacion');
  const watchedIdentificationType = form.watch('tipo_identificacion');

  // plan internet ---
  const watchedServiceType = form.watch('tipo_servicio');
  const watchedServicePlan = form.watch('tipo_plan');
  const watchedSuggestedPlansBuro = form.watch('plan_sugerido_buro');

  ///* fetch data ----------------------------
  // internet service ---
  const {
    data: planInternetsPaging,
    isLoading: isLoadingPlanInternets,
    isRefetching: isRefetchingPlanInternets,
  } = useFetchPlanInternets({
    enabled:
      !!watchedServiceType &&
      !!watchedServicePlan &&
      !!watchedSuggestedPlansBuro &&
      !!alreadyConsultedEquifax,
    params: {
      page_size: 900,
      tipo_servicio: watchedServiceType,
      tipo_plan: watchedServicePlan,
      clasificacion_score_buro: watchedSuggestedPlansBuro, // only filters
    },
  });

  // --------------------
  const handleConsultaEquifax = async () => {
    const identificationType =
      watchedIdentificationType === IdentificationTypeEnumChoice.CEDULA
        ? EquifaxEdentificationType.CEDULA
        : watchedIdentificationType === IdentificationTypeEnumChoice.RUC
          ? EquifaxEdentificationType.RUC
          : EquifaxEdentificationType.CEDULA;

    setIsCheckingIdentificacionEquifax(true);
    await consultarEquifax.mutateAsync({
      identificacion: watchedIdentification!,
      tipo_identificacion: identificationType,
      solicitud_servicio: solicitudServicio?.id!,
    });
    setIsCheckingIdentificacionEquifax(false);
    setAlreadyConsultedEquifax(true);
  };
  const onSuccessEquifax = async (data: EquifaxServicioCedula) => {
    const suggestedPlansKey =
      data?.plan_sugerido?.map(plan => plan.planSugerido) || [];

    setSuggestedPlansBuroKey(suggestedPlansKey);
    const scoreServicio = data?.score_servicios?.decision || '';
    form.reset({
      ...form.getValues(),
      rango_capacidad_pago: data.plan_sugerido?.[0]?.rangoCapacidadDePago || '',
      score_servicios: scoreServicio || '',
      plan_sugerido_buro: suggestedPlansKey.join(','),
      score_sobreendeudamiento: data.score_sobreendeudamiento.decision || '',
      planes_sugeridos_buro:
        suggestedPlansKey as ClasificacionPlanesScoreBuroEnumChoice[],
    });
    setIsCheckingIdentificacionEquifax(false);
    setScoreServicio(scoreServicio);
  };
  const onErrorEquifax = async (err: any) => {
    if (err?.response?.status === HTTPResStatusCodeEnum.EXTERNAL_SERVER_ERROR) {
      ToastWrapper.error(
        'El servicio de consulta de buro de crédito no está disponible en este momento',
      );
    } else {
      handleAxiosError(err);
    }
    setIsCheckingIdentificacionEquifax(false);
    return ToastWrapper.warning(
      'No se podrá continuar con la preventa hasta que vuelva a estar operativo el servicio de consulta de buro de crédito',
    );

    // // // Ahora SI bloquea la venta totalmente el equifax -------
    // const suggestedPlansBuroKey = [
    //   ClasificacionPlanesScoreBuroEnumChoice.BASICO,
    // ];

    // setAlreadyConsultedEquifax(true);
    // setSuggestedPlansBuroKey(suggestedPlansBuroKey);
    // form.reset({
    //   ...form.getValues(),
    //   rango_capacidad_pago: '0-150',
    //   score_servicios: 'E',
    //   plan_sugerido_buro: suggestedPlansBuroKey.join(','),
    //   score_sobreendeudamiento: 'E',
    //   planes_sugeridos_buro: suggestedPlansBuroKey,
    // });
    // setIsCheckingIdentificacionEquifax(false);
    // setScoreServicio('E');
  };

  ///* mutations -----------------
  const consultarEquifax = useConsultarEquifax({
    customOnSuccess: data => {
      onSuccessEquifax(data as EquifaxServicioCedula);
    },
    customOnError: err => {
      onErrorEquifax(err);
    },
  });

  ///* effects -----------------
  // internet service
  useEffect(() => {
    if (
      isLoadingPlanInternets ||
      isRefetchingPlanInternets ||
      !watchedServiceType ||
      !watchedServicePlan
    )
      return;

    !planInternetsPaging?.data?.items?.length &&
      alreadyConsultedEquifax &&
      ToastWrapper.error(
        'No se encontraron planes de internet para la combinación de tipos de servicio y plan seleccionados',
      );
  }, [
    alreadyConsultedEquifax,
    isLoadingPlanInternets,
    isRefetchingPlanInternets,
    planInternetsPaging?.data?.items?.length,
    watchedServicePlan,
    watchedServiceType,
  ]);

  return (
    <>
      <>
        <CustomTypoLabel
          text="Consulta buró de crédito"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <CustomTextField
          label="Tipo identificación"
          name="tipo_identificacion"
          control={form.control}
          defaultValue={form.getValues().tipo_identificacion}
          error={errors.tipo_identificacion}
          helperText={errors.tipo_identificacion?.message}
          disabled
          size={gridSizeMdLg6}
        />
        <InputAndBtnGridSpace
          inputNode={
            <CustomTextField
              label="Identificación"
              name="identificacion"
              control={form.control}
              defaultValue={form.getValues().identificacion}
              error={errors.identificacion}
              helperText={errors.identificacion?.message}
              disabled
            />
          }
          btnLabel="Buscar"
          iconBtn={<CiSearch />}
          disabledBtn={
            watchedIdentificationType === IdentificationTypeEnumChoice.PASAPORTE
          }
          onClick={() => {
            if (
              !validarCedulaEcuador(watchedIdentification!) &&
              watchedIdentificationType === IdentificationTypeEnumChoice.CEDULA
            ) {
              ToastWrapper.warning(
                'El número de cédula ingresado no es válido',
              );
              return;
            }
            handleConsultaEquifax();
          }}
        />
      </>

      <>
        <CustomTypoLabel
          text="Plan de Internet"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <CustomAutocompleteArrString
          label="Tipo de servicio"
          name="tipo_servicio"
          options={INTERNET_SERVICE_TYPE_ARRAY_CHOICES_VENTAHOME}
          isLoadingData={false}
          control={form.control}
          defaultValue={form.getValues().tipo_servicio}
          error={errors.tipo_servicio}
          helperText={errors.tipo_servicio?.message}
          size={gridSizeMdLg6}
          onChangeValue={() => {
            // reset related fields
            form.setValue('plan_internet', '' as any);
          }}
        />
        {/* <CustomTextFieldNoForm
          label="Tipo de servicio"
          value={InternetServiceTypeEnumChoice.FIBRA}
          disabled
        /> */}
        {/* <CustomTextFieldNoForm
          label="Tipo de plan"
          value={InternetPlanInternetTypeEnumChoice.HOGAR}
          disabled
        /> */}
        <CustomAutocompleteArrString
          label="Tipo de plan"
          name="tipo_plan"
          options={INTERNET_PLAN_INTERNET_TYPE_ARRAY_CHOICES}
          isLoadingData={false}
          control={form.control}
          defaultValue={form.getValues().tipo_plan}
          error={errors.tipo_plan}
          helperText={errors.tipo_plan?.message}
          size={gridSizeMdLg6}
          onChangeValue={() => {
            // reset related fields
            form.setValue('plan_internet', '' as any);
          }}
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
          disabled={
            !watchedServicePlan ||
            !watchedServiceType ||
            !alreadyConsultedEquifax
          }
          onChangeValue={() => {
            form.setValue('selectedPromoOptions', []);
          }}
        />
        <Grid
          item
          container
          {...gridSizeMdLg6}
          justifyContent="center"
          alignItems="flex-end"
          spacing={1}
        >
          {!suggestedPlansBuroKey?.length && (
            <CustomCardAlert
              sizeType="small"
              alertMessage="Consultar Equifax para ver los planes"
              alertSeverity="info"
            />
          )}

          {suggestedPlansBuroKey?.map((plan, index) => (
            <Grid item key={index}>
              <ChipModelState label={plan} color="info" />
            </Grid>
          ))}
        </Grid>
      </>

      {/* -------------- Equipos Venta -------------- */}
      <EquiposVentaPreventaPartStep
        solicitudServicio={solicitudServicio!}
        showEquiposPart={showEquiposPart}
        setShowEquiposPart={setShowEquiposPart}
      />

      {/* -------------- Payment Methods -------------- */}
      <PaymentMethodPreventaFormPart form={form} />

      {/* -------------- Promociones -------------- */}
      <>
        <CustomTypoLabel
          text="Promociones"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <PromocionPreventaFormPart form={form} />
      </>

      <CustomScanLoad isOpen={isCheckingIdentificacionEquifax} name="cedula" />
    </>
  );
};

export default PreventaServicioFormPart;
