/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
import { Grid, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsSendCheckFill } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoMdSend, IoMdUnlock } from 'react-icons/io';
import { MdChangeCircle, MdOutlineTextsms } from 'react-icons/md';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

import {
  CreatePreventaParamsBase,
  getSolicitudServicio,
  RequestUnlockOtpCodeParams,
  useConsultarEquifax,
  useCreateOtpCode,
  useCreatePreventa,
  useFetchEntidadFinancieras,
  useFetchMetodoPagos,
  useFetchPlanInternets,
  useFetchSectores,
  useFetchTarjetas,
  useFetchZonas,
  useGetZoneByCoords,
  useUpdateCodigoOtp,
  useValidateOtpCode,
} from '@/actions/app';
import { useSetCacheRedis, useUpdateCacheRedis } from '@/actions/shared';
import {
  ResendOtpDataCache,
  SetCodigoOtpInCacheData,
} from '@/actions/shared/cache-redis-types.interface';
import { uploadFileToBucket } from '@/actions/statics-api';
import {
  BucketKeyNameEnumChoice,
  BucketTypeEnumChoice,
  ClasificacionPlanesScoreBuroEnumChoice,
  CodigoOtp,
  EntidadFinanciera,
  EquifaxEdentificationType,
  HTTPResStatusCodeEnum,
  IdentificationTypeEnumChoice,
  INTERNET_PLAN_INTERNET_TYPE_ARRAY_CHOICES,
  INTERNET_SERVICE_TYPE_ARRAY_CHOICES,
  MetodoPago,
  MetodoPagoEnumUUID,
  Nullable,
  OtpStatesEnumChoice,
  PlanInternet,
  Sector,
  Tarjeta,
  TimerSolicitudServicioEnum,
  TIPO_CUENTA_BANCARIA_ARRAY_CHOICES,
  ToastWrapper,
  useLoaders,
  useUploadImageGeneric,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import {
  ChipModelState,
  CustomAutocomplete,
  CustomAutocompleteArrString,
  CustomCardAlert,
  CustomCellphoneTextField,
  CustomCoordsTextField,
  CustomScanLoad,
  CustomSingleButton,
  CustomTextArea,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  InputAndBtnGridSpace,
  MapModalComponent,
  SelectTextFieldArrayString,
  SingleIconButton,
  StepperBoxScene,
  useCustomStepper,
} from '@/shared/components';
import {
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  gridSizeMdLg6,
} from '@/shared/constants/ui';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import { SolicitudServicio } from '@/shared/interfaces';
import { EquifaxServicioCedula } from '@/shared/interfaces/consultas-api';
import {
  formatCountDownTimer,
  getKeysFormErrorsMessage,
  preventaFormSchema,
} from '@/shared/utils';
import {
  GenericInventoryStoreKey,
  usePreventaStore,
  useTypedGenericInventoryStore,
} from '@/store/app';
import { useGenericCountdownStore, useUiStore } from '@/store/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { returnUrlPreventasPage } from '../../../pages/tables/PreventasMainPage';
import { usePreventaOtpCounter } from '../../hooks';
import CountDownOTPPReventa from './CountDownOTPPReventa';
import DocsSavePreventaStep from './DocsSavePreventaStep';
import GeneralDataSavePreventaStep from './GeneralDataSavePreventaStep';
import ValidButton from './ValidButton';
import { EquiposVentaPreventaPartStep, EquipoVentasDetalle } from './form';
import { EquiposSeleccionadosTableType } from './form/equipos/EquiposSeleccionadosPreventa';

export interface SavePreventaProps {
  title: React.ReactNode;
  solicitudServicio: SolicitudServicio;
}

export type SaveFormDataPreventa = CreatePreventaParamsBase &
  Partial<SolicitudServicio> & {
    // helpers
    thereAreClientRefiere?: boolean;
    identificacion_refiere?: string;
    clienteRefiere?: string;
    celularRefiere?: string;
    direccionRefiere?: string;

    provinceName?: string;
    cityName?: string;
    zoneName?: string;
    thereIsCoverage?: boolean;
    thereAreNaps?: boolean;

    rawPaymentMethod?: MetodoPago;

    estadoOtp?: Nullable<OtpStatesEnumChoice>;

    // helpers
    tipoIdentificacion?: string;
  };

const steps = ['Datos generales', 'Ubicación', 'Servicio', 'Documentos'];

const countdownPreventaId = 'otpCountdownPreventa';
const countdownIdNewOtpPreventa = 'otpCountdownNewOtp';

const SavePreventa: React.FC<SavePreventaProps> = ({
  title,
  solicitudServicio,
}) => {
  const codigoOtpCacheLeyPreventa = `codigo_otp_preventa_${solicitudServicio?.uuid}`;

  ///* hooks ---------------------
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    UploadImageDropZoneComponent,
    image1: cedulaFrontalImg,
    setImage1: setCedulaFrontalImg,
    image2: cedulaPosteriorImg,
    setImage2: setCedulaPosteriorImg,
    image3: documentoCuentaBancariaImg,
    setImage3: setDocumentoCuentaBancairaImg,
    image4: documentoTarjetaCreditoImg,
    setImage4: setDocumentoTarjetaCreditoImg,
    image5: viviendaImg,
    setImage5: setViviendaImg,
  } = useUploadImageGeneric();

  ///* local state -------------------
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);
  const [isSupervisorUnlockingSent, setIsSupervisorUnlockingSent] =
    useState<boolean>(false);
  const [isCheckingCedula, setIsCheckingCedula] = useState<boolean>(false);

  const [suggestedPlansBuroKey, setSuggestedPlansBuroKey] = useState<string[]>(
    [],
  );
  const [isCheckingIdentificacionEquifax, setIsCheckingIdentificacionEquifax] =
    useState<boolean>(false);
  const [alreadyConsultedEquifax, setAlreadyConsultedEquifax] =
    useState<boolean>(false);

  // otp ------
  const [canChangeCelular, setCanChangeCelular] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState('');

  const isComponentBlocked = usePreventaStore(s => s.isComponentBlocked);
  const setIsComponentBlocked = usePreventaStore(s => s.setIsComponentBlocked);
  const setCachedOtpData = usePreventaStore(s => s.setCachedOtpData);
  const clearAllPreventaStore = usePreventaStore(s => s.clearAll);
  const setScoreServicio = usePreventaStore(s => s.setScoreServicio);

  const startTimer = useGenericCountdownStore(s => s.start);
  const clearAllTimers = useGenericCountdownStore(s => s.clearAll);
  const countdownNewOtpValue = useGenericCountdownStore(
    s => s.counters[countdownIdNewOtpPreventa]?.count,
  );

  // equipos venta -----------------
  const [showEquiposPart, setShowEquiposPart] = useState<boolean>(false);
  const { items: equiposSeleccionados } =
    useTypedGenericInventoryStore<EquiposSeleccionadosTableType>(
      GenericInventoryStoreKey.equiposVentaPreventa,
    );

  usePreventaOtpCounter({
    cackeKey: codigoOtpCacheLeyPreventa,
    counterIdOtp: countdownPreventaId,
    counterIdNewOtp: countdownIdNewOtpPreventa,
  });
  const setIsGlobalLoading = useUiStore(s => s.setIsGlobalLoading);

  ///* stepper ---------------------
  const { activeStep, disableNextStepBtn, handleBack, handleNext } =
    useCustomStepper({
      steps,
      // initialStep: 2,
    });

  ///* form --------------------------
  const form = useForm<SaveFormDataPreventa>({
    resolver: yupResolver(preventaFormSchema) as any,
    defaultValues: {
      thereAreClientRefiere: false,
      es_referido: false,
      estadoOtp: null,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedTipoReferido = form.watch('tipo_referido');

  const watchedZone = form.watch('zona');
  const watchedThereIsCoverage = form.watch('thereIsCoverage');
  const watchedThereAreNaps = form.watch('thereAreNaps');

  const watchedRawPaymentMethod = form.watch('rawPaymentMethod');

  const watchedServiceType = form.watch('tipo_servicio');
  const watchedServicePlan = form.watch('tipo_plan');

  const watchedCelular = form.watch('celular');
  const watchedEstadoOtp = form.watch('estadoOtp');

  const watchedIdentificationType = form.watch('tipoIdentificacion');
  const watchedIdentification = form.watch('identificacion');
  const watchedSuggestedPlansBuro = form.watch('plan_sugerido_buro');

  // map ---------------
  const {
    Map,
    latLng,
    napsByCoords,
    isLoadingNaps,
    isRefetchingNaps,
    setLatLng,
  } = useMapComponent({
    form,
    initialCoords: solicitudServicio?.id ? solicitudServicio.coordenadas : '',
    enableFetchNaps: true,
  });
  useLocationCoords({
    isEditting: !!solicitudServicio?.id,
    form,
    setLatLng,
  });

  ///* fetch data ---------------------
  const {
    data: zonasPaging,
    isLoading: isLoadingZonas,
    isRefetching: isRefetchingZonas,
  } = useFetchZonas({
    params: {
      page_size: 1200,
    },
  });
  const {
    data: zonaByCoordsRes,
    isLoading: isLoadingZonaByCoords,
    isRefetching: isRefetchingZonaByCoords,
  } = useGetZoneByCoords(
    {
      coords: `${latLng?.lat},${latLng?.lng}`,
    },
    !!latLng?.lat && !!latLng?.lng,
  );
  const {
    data: sectoresPaging,
    isLoading: isLoadingSectores,
    isRefetching: isRefetchingSectores,
  } = useFetchSectores({
    enabled: !!watchedZone,
    params: {
      page_size: 900,
      zona: watchedZone,
    },
  });

  // payment methods
  const {
    data: metodoPagosPaging,
    isLoading: isLoadingMetodoPagos,
    isRefetching: isRefetchingMetodoPagos,
  } = useFetchMetodoPagos({
    params: {
      page_size: 900,
    },
  });
  const {
    data: entidadFinancierasPaging,
    isLoading: isLoadingEntidadFinancieras,
    isRefetching: isRefetchingEntidadFinancieras,
  } = useFetchEntidadFinancieras({
    params: {
      page_size: 900,
    },
  });
  const {
    data: tarjetasPaging,
    isLoading: isLoadingTarjetas,
    isRefetching: isRefetchingTarjetas,
  } = useFetchTarjetas({
    params: {
      page_size: 900,
    },
  });

  // internet service
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

  // mutation handlers ------
  const onSuccessOtpGen = async (resData: CodigoOtp) => {
    // to render otp component
    setIsComponentBlocked(true);

    startTimer(
      countdownPreventaId,
      TimerSolicitudServicioEnum.initalOtpCountSeconds,
      // custom clear cb
      async () => {
        useGenericCountdownStore.getState().clearAll();
        setIsComponentBlocked(false);
      },
    );
    // new otp timer NOT clear all 'cause it's a new otp in the same 10 minutes
    startTimer(
      countdownIdNewOtpPreventa,
      TimerSolicitudServicioEnum.initialOtpRangeNewOtpSeconds,
    );

    await setCache.mutateAsync({
      key: codigoOtpCacheLeyPreventa,
      value: {
        // to calculate limit time and reset counter after each refresh
        limitTimeOtp: dayjs()
          .add(TimerSolicitudServicioEnum.initalOtpCountMinutes, 'minutes')
          .format(),
        limitTimeNewOtp: dayjs()
          .add(
            TimerSolicitudServicioEnum.initialOtpRangeNewOtpMinutes,
            'minutes',
          )
          .format(),

        otpData: resData,
      },
    });
  };
  const onSuccessNewOtpGen = async (resData: CodigoOtp) => {
    startTimer(
      countdownIdNewOtpPreventa,
      TimerSolicitudServicioEnum.initialOtpRangeNewOtpSeconds,
    );

    // opt cache
    const cachedOtpData = usePreventaStore.getState().cachedOtpData;

    await updateCache.mutateAsync({
      key: codigoOtpCacheLeyPreventa,
      value: {
        // to calculate limit time and reset counter after each refresh
        limitTimeOtp: cachedOtpData?.limitTimeOtp!,
        limitTimeNewOtp: dayjs()
          .add(
            TimerSolicitudServicioEnum.initialOtpRangeNewOtpMinutes,
            'minutes',
          )
          .format(),
        otpData: resData, // set new otp
      },
    });

    // allow send new unlock request to supervisor for the new otp
    setIsSupervisorUnlockingSent(false);
  };
  const onSuccessOtpValidation = async () => {
    clearAllTimers();
    setCanChangeCelular(false);
    setOtpValue('');
    setIsComponentBlocked(false);
    await setCache.mutateAsync({
      key: codigoOtpCacheLeyPreventa,
      value: null,
    });

    // reset form: no invalidate query 'cause invalidate doesn't return the updated data
    safeResetForm();
  };
  const onSuccessSetCacheOtp = (resData: SetCodigoOtpInCacheData) => {
    setCachedOtpData(resData);
  };

  const safeResetForm = async () => {
    const prevForm = form.getValues();
    setIsGlobalLoading(true);
    const res = await getSolicitudServicio(solicitudServicio?.uuid!);
    setIsGlobalLoading(false);
    const updatedSolServicio = res?.data;
    const {
      provincia,
      ciudad,
      zona,
      sector,
      coordenadas,
      direccion,
      tiene_cobertura,
      ...rest
    } = updatedSolServicio || {};

    reset({
      ...prevForm,
      ...rest,
      estadoOtp:
        updatedSolServicio?.codigos_otp_data?.at(-1)?.estado_otp || null,

      tipoIdentificacion: solicitudServicio?.tipo_identificacion,
    });
  };

  const handleSafeRefresh = async () => {
    await safeResetForm();
  };

  ///* mutations ---------------------
  const createPreventaMutation = useCreatePreventa<CreatePreventaParamsBase>({
    navigate,
    returnUrl: returnUrlPreventasPage,
    enableErrorNavigate: false,
    customOnSuccess: () => {
      clearAllTimers();
      setIsComponentBlocked(false);
      clearAllPreventaStore();
    },
    customOnError: err => {
      setIsCheckingCedula(false);
      handleAxiosError(err);
    },
  });

  const createOTP = useCreateOtpCode({
    enableNavigate: false,
    customMessageToast: 'Código OTP generado correctamente',
    customOnSuccess(resData) {
      onSuccessOtpGen(resData as CodigoOtp);
    },
  });
  const resetOtp = useCreateOtpCode({
    enableNavigate: false,
    customMessageToast: 'Código OTP regenerado correctamente',
    customOnSuccess(resData) {
      onSuccessNewOtpGen(resData as unknown as CodigoOtp);
    },
  });
  const setCache = useSetCacheRedis<SetCodigoOtpInCacheData>({
    enableToast: false,
    customOnSuccess: resData =>
      onSuccessSetCacheOtp(resData as unknown as SetCodigoOtpInCacheData),
  });
  const updateCache = useUpdateCacheRedis<ResendOtpDataCache>({
    enableToast: false,
    customOnSuccess: resData => {
      setCachedOtpData(resData as unknown as SetCodigoOtpInCacheData);
    },
  });
  const validateOtp = useValidateOtpCode({
    enableNavigate: false,
    customMessageToast: 'Código OTP validado correctamente',
    customOnSuccess: onSuccessOtpValidation,
  });
  const requestUnlockOtp = useUpdateCodigoOtp<RequestUnlockOtpCodeParams>({
    enableNavigate: false,
    customMessageToast:
      'Solicitud de verificación de código OTP enviada al supervisor',
    customOnSuccess: () => {
      setIsSupervisorUnlockingSent(true);
    },
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormDataPreventa) => {
    if (!isValid) return;
    if (
      !watchedEstadoOtp ||
      watchedEstadoOtp !== OtpStatesEnumChoice.VERIFICADO
    ) {
      ToastWrapper.error('El código OTP no ha sido verificado');
      return;
    }

    // validate images -----------
    if (!cedulaFrontalImg || !cedulaPosteriorImg)
      return ToastWrapper.error('Las fotos de la cédula son requeridas');
    if (
      !documentoCuentaBancariaImg &&
      watchedRawPaymentMethod?.uuid === MetodoPagoEnumUUID.DEBITO
    )
      return ToastWrapper.error(
        'La foto del documento de la cuenta bancaria es requerida cuando el método de pago es débito',
      );
    if (
      !documentoTarjetaCreditoImg &&
      watchedRawPaymentMethod?.uuid === MetodoPagoEnumUUID.CREDITO
    )
      return ToastWrapper.error(
        'La foto de la tarjeta de crédito es requerida cuando el método de pago es crédito',
      );
    if (!viviendaImg)
      return ToastWrapper.error('La foto de la vivienda es requerida');

    // upload images ----
    setIsCheckingCedula(true);
    const [cedulaFrontalUrl, cedulaPosteriorUrl, viviendaUrl] =
      await Promise.all([
        uploadFileToBucket({
          file: cedulaFrontalImg,
          file_name: BucketKeyNameEnumChoice.CEDULA_FRONTAL,
          bucketDir: BucketTypeEnumChoice.IMAGES_IDENTIFICACION,
        }),
        uploadFileToBucket({
          file: cedulaPosteriorImg,
          file_name: BucketKeyNameEnumChoice.CEDULA_POSTERIOR,
          bucketDir: BucketTypeEnumChoice.IMAGES_IDENTIFICACION,
        }),
        uploadFileToBucket({
          file: viviendaImg,
          file_name: BucketKeyNameEnumChoice.VIVIENDA,
          bucketDir: BucketTypeEnumChoice.IMAGES_VIVIENDA,
        }),
      ]);

    // equipos venta ------------
    const detalleEquipos: EquipoVentasDetalle[] = equiposSeleccionados?.map(
      equipo => ({
        cantidad: equipo?.usedQuantity?.toFixed(2),
        code: equipo?.producto_data?.codigo!,
        cuotas: equipo?.selectedCuotas!,
        series: [],
      }),
    );

    // create
    await createPreventaMutation.mutateAsync({
      ...data,
      solicitud_servicio: solicitudServicio?.id!,
      url_foto_cedula_frontal: cedulaFrontalUrl?.streamUlr || '',
      url_foto_cedula_trasera: cedulaPosteriorUrl?.streamUlr || '',
      url_foto_vivienda: viviendaUrl?.streamUlr || '',
      equipos_venta_detalle: detalleEquipos,
    });
    setIsCheckingCedula(false);
  };

  // // OPT ------
  const handlePhoneVerification = async () => {
    if (!watchedCelular) {
      ToastWrapper.warning('El campo celular es requerido');
      return;
    }
    const regexp = new RegExp('^(09)[0-9]{8}$');
    const isValidECNumber = regexp.test(watchedCelular);
    if (!isValidECNumber) {
      ToastWrapper.error('El número de celular ingresado no es válido');
      return;
    }

    await createOTP.mutateAsync({
      celular: watchedCelular,
      identificacion: form.getValues().identificacion!,
    });
  };
  const handleNewOtp = async () => {
    if (!watchedCelular) {
      ToastWrapper.warning('El campo celular es requerido');
      return;
    }

    resetOtp.mutateAsync({
      celular: watchedCelular,
      identificacion: form.getValues().identificacion!,
    });
  };

  // // Equifax ------
  const onSuccessEquifax = async (data: EquifaxServicioCedula) => {
    const suggestedPlansKey = data?.plan_sugerido?.map(
      plan => plan.planSugerido,
    ) || [ClasificacionPlanesScoreBuroEnumChoice.BASICO];

    setSuggestedPlansBuroKey(suggestedPlansKey);
    const scoreServicio = data.plan_sugerido?.[0]?.scoreServicios;
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
      ToastWrapper.warning(
        'Servicio de consulta de Equifax no disponible en este momento',
      );
    } else {
      handleAxiosError(err);
    }
    const suggestedPlansBuroKey = [
      ClasificacionPlanesScoreBuroEnumChoice.BASICO,
    ];

    setAlreadyConsultedEquifax(true);
    setSuggestedPlansBuroKey(suggestedPlansBuroKey);
    form.reset({
      ...form.getValues(),
      rango_capacidad_pago: '0-150',
      score_servicios: 'E',
      plan_sugerido_buro: suggestedPlansBuroKey.join(','),
      score_sobreendeudamiento: 'E',
      planes_sugeridos_buro: suggestedPlansBuroKey,
    });
    setIsCheckingIdentificacionEquifax(false);
    setScoreServicio('E');
  };

  const consultarEquifax = useConsultarEquifax({
    customOnSuccess: data => {
      onSuccessEquifax(data as EquifaxServicioCedula);
    },
    customOnError: err => {
      onErrorEquifax(err);
    },
  });

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

  ///* effects ---------------------
  useEffect(() => {
    if (!solicitudServicio?.id) return;

    reset({
      ...solicitudServicio,
      estadoOtp:
        solicitudServicio?.codigos_otp_data?.at(-1)?.estado_otp || null,

      tipoIdentificacion: solicitudServicio?.tipo_identificacion,
    });
  }, [solicitudServicio, reset]);

  // set zone to up
  useEffect(() => {
    if (!latLng?.lat || !latLng?.lng) return;

    if (isLoadingZonaByCoords || isRefetchingZonaByCoords) return;
    const zone = zonaByCoordsRes?.data;
    if (!zone) {
      ToastWrapper.error(
        'No se encontraron zonas con cobertura para las coordenadas proporcionadas',
      );
      form.reset({
        ...form.getValues(),
        thereIsCoverage: false,
        tiene_cobertura: false,
      });
      return;
    }
    form.reset({
      ...form.getValues(),
      zona: zone?.id,
      ciudad: zone?.ciudad_data?.id!,
      provincia: zone?.provincia_data?.id!,
      cityName: zone?.ciudad_data?.name,
      provinceName: zone?.provincia_data?.name,
      zoneName: zone?.name,
      thereIsCoverage: true,
      tiene_cobertura: true,
    });
  }, [
    zonaByCoordsRes,
    isLoadingZonaByCoords,
    isRefetchingZonaByCoords,
    form,
    latLng?.lat,
    latLng?.lng,
  ]);
  //// alerts
  // naps available
  useEffect(() => {
    if (!latLng?.lat || !latLng?.lng) return;
    if (isLoadingNaps || isRefetchingNaps) return;
    const thereAreNaps = !!napsByCoords?.length;
    if (!thereAreNaps) {
      form.reset({
        ...form.getValues(),
        thereAreNaps: false,
      });
      ToastWrapper.error(
        'No se encontraron cajas disponibles para las coordenadas ingresadas',
      );
    }
    form.reset({
      ...form.getValues(),
      thereAreNaps,
    });
  }, [
    napsByCoords,
    isLoadingNaps,
    isRefetchingNaps,
    form,
    latLng?.lat,
    latLng?.lng,
  ]);
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
  // payment methods, entidad financiera, tarjetas, flotas
  useEffect(() => {
    if (
      isLoadingMetodoPagos ||
      isRefetchingMetodoPagos ||
      isLoadingEntidadFinancieras ||
      isRefetchingEntidadFinancieras ||
      isLoadingTarjetas ||
      isRefetchingTarjetas
    )
      return;
    if (!watchedRawPaymentMethod || !watchedTipoReferido) return;

    // entidad financiera
    if (!entidadFinancierasPaging?.data?.items?.length)
      ToastWrapper.error(
        'No se encontraron entidades financieras para el método de pago seleccionado',
      );
    // tarjetas
    if (!tarjetasPaging?.data?.items?.length)
      ToastWrapper.error(
        'No se encontraron tarjetas para el método de pago seleccionado',
      );
  }, [
    entidadFinancierasPaging,
    isLoadingEntidadFinancieras,
    isLoadingMetodoPagos,
    isLoadingTarjetas,
    isRefetchingEntidadFinancieras,
    isRefetchingMetodoPagos,
    isRefetchingTarjetas,
    tarjetasPaging?.data?.items?.length,
    watchedRawPaymentMethod,
    watchedTipoReferido,
  ]);
  // clear all timers when unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
      setIsComponentBlocked(false);
    };
  }, [clearAllTimers, setIsComponentBlocked]);

  const isCustomLoading =
    isRefetchingNaps ||
    isLoadingNaps ||
    isLoadingZonas ||
    isRefetchingZonas ||
    isLoadingZonaByCoords ||
    isRefetchingZonaByCoords ||
    isLoadingSectores ||
    isRefetchingSectores ||
    isLoadingMetodoPagos ||
    isRefetchingMetodoPagos ||
    isLoadingEntidadFinancieras ||
    isRefetchingEntidadFinancieras ||
    isLoadingTarjetas ||
    isRefetchingTarjetas ||
    isLoadingPlanInternets ||
    isRefetchingPlanInternets;
  useLoaders(isCustomLoading);

  return (
    <StepperBoxScene
      titleNode={title}
      // steps
      steps={steps}
      activeStep={activeStep}
      handleNext={handleNext}
      handleBack={handleBack}
      disableNextStepBtn={disableNextStepBtn}
      // action btns
      onCancel={() => {
        navigate(returnUrlPreventasPage);
        clearAllTimers();
      }}
      onSave={handleSubmit(onSave, () => {
        console.log(errors);
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Faltan campos por requeridos: ${keys}`);
      })}
    >
      {/* ========================= Datos Generales ========================= */}
      {activeStep === 0 && <GeneralDataSavePreventaStep form={form} />}

      {/* ========================= Ubicación ========================= */}
      {activeStep === 1 && (
        <>
          <CustomTypoLabel text="Ubicación" />

          <InputAndBtnGridSpace
            mainGridSize={gridSize}
            inputGridSize={gridSizeMdLg11}
            inputNode={
              <CustomCoordsTextField
                label="Coordenadas"
                name="coordenadas"
                control={form.control}
                defaultValue={form.getValues().coordenadas || ''}
                error={errors.coordenadas}
                helperText={errors.coordenadas?.message}
                onChangeValue={(value, isValidCoords) => {
                  if (isValidCoords) {
                    const s = value.split(',');
                    setLatLng({ lat: s[0], lng: s[1] });
                  }
                }}
              />
            }
            btnLabel="Ver mapa"
            overrideBtnNode
            customBtnNode={
              <>
                <SingleIconButton
                  startIcon={<FaMapLocationDot />}
                  label={'Ver mapa'}
                  color={'primary'}
                  onClick={() => {
                    setOpenMapModal(true);
                  }}
                />

                <MapModalComponent
                  open={openMapModal}
                  onClose={() => {
                    setOpenMapModal(false);
                  }}
                  //
                  showCustomTitleNode
                  customTitleNode={
                    <Grid item container xs={12}>
                      <Typography variant="h4">
                        Ubicación | Coordenadas:{' '}
                        <span
                          style={{
                            fontSize: '0.93rem',
                            fontWeight: 400,
                          }}
                        >
                          {latLng?.lat}, {latLng?.lng}
                        </span>
                      </Typography>
                    </Grid>
                  }
                  minWidthModal="70%"
                  contentNodeOverride={
                    <Map
                      coordenadas={
                        latLng
                          ? {
                              lat: latLng.lat,
                              lng: latLng.lng,
                            }
                          : { lat: 0, lng: 0 }
                      }
                      canDragMarker={true}
                      setLatLng={setLatLng}
                      showCoverage
                      coverageZones={zonasPaging?.data?.items || []}
                    />
                  }
                />
              </>
            }
            btnGridSize={gridSizeMdLg1}
          />

          {watchedThereIsCoverage ? (
            <>
              <CustomAutocomplete<Sector>
                label="Sector"
                name="sector"
                // options
                options={sectoresPaging?.data?.items || []}
                valueKey="name"
                actualValueKey="id"
                defaultValue={form.getValues().sector}
                isLoadingData={isLoadingSectores || isRefetchingSectores}
                // vaidation
                control={form.control}
                error={errors.sector}
                helperText={errors.sector?.message}
              />
              <CustomTextField
                label="Zona"
                name="zoneName"
                control={form.control}
                defaultValue={form.getValues().zoneName}
                error={errors.zoneName}
                helperText={errors.zoneName?.message}
                disabled
              />
              <CustomTextField
                label="Ciudad"
                name="cityName"
                control={form.control}
                defaultValue={form.getValues().cityName}
                error={errors.cityName}
                helperText={errors.cityName?.message}
                size={gridSizeMdLg6}
                disabled
              />
              <CustomTextField
                label="Provincia"
                name="provinceName"
                control={form.control}
                defaultValue={form.getValues().provinceName}
                error={errors.provinceName}
                helperText={errors.provinceName?.message}
                size={gridSizeMdLg6}
                disabled
              />
            </>
          ) : (
            <>
              <CustomCardAlert
                sizeType="small"
                alertMessage="Ubicación sin cobertura"
                alertSeverity="error"
              />
            </>
          )}

          <CustomTextArea
            label="Dirección"
            name="direccion"
            control={form.control}
            defaultValue={form.getValues().direccion}
            error={errors.direccion}
            helperText={errors.direccion?.message}
          />

          {watchedThereAreNaps ? (
            <CustomCardAlert
              sizeType="small"
              alertMessage={`Cajas disponibles. La mas cercana está a aprox. ${napsByCoords?.at(0)?.distance}m`}
              alertSeverity="success"
            />
          ) : (
            <CustomCardAlert
              sizeType="small"
              alertMessage="No se encontraron cajas disponibles"
              alertSeverity="error"
            />
          )}
        </>
      )}

      {/* ========================= Service ========================= */}
      {activeStep === 2 && (
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
                watchedIdentificationType ===
                IdentificationTypeEnumChoice.PASAPORTE
              }
              onClick={() => {
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
              options={INTERNET_SERVICE_TYPE_ARRAY_CHOICES}
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
            />
            <Grid
              item
              container
              {...gridSizeMdLg6}
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              {suggestedPlansBuroKey?.map((plan, index) => (
                <Grid item key={index}>
                  <ChipModelState label={plan} color="info" />
                </Grid>
              ))}
            </Grid>
          </>

          <>
            <EquiposVentaPreventaPartStep
              solicitudServicio={solicitudServicio!}
              showEquiposPart={showEquiposPart}
              setShowEquiposPart={setShowEquiposPart}
            />
          </>

          <>
            <CustomTypoLabel
              text="Método de pago"
              pt={CustomTypoLabelEnum.ptMiddlePosition}
            />

            <CustomAutocomplete<MetodoPago>
              label="Método de pago"
              name="metodo_pago"
              // options
              options={metodoPagosPaging?.data?.items || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().metodo_pago}
              isLoadingData={isLoadingMetodoPagos || isRefetchingMetodoPagos}
              // vaidation
              control={form.control}
              error={errors.metodo_pago}
              helperText={errors.metodo_pago?.message}
              size={gridSizeMdLg6}
              onChangeValue={() => {
                // reset related fields
                form.setValue('entidad_financiera', '' as any);
                form.setValue('tipo_cuenta_bancaria', '' as any);
                form.setValue('numero_cuenta_bancaria', '');
                form.setValue('tarjeta', '' as any);
                form.setValue('numero_tarjeta_credito', '');
              }}
              onChangeRawValue={rawValue => {
                form.setValue('rawPaymentMethod', rawValue);
              }}
            />
            {watchedRawPaymentMethod?.uuid === MetodoPagoEnumUUID.DEBITO ? (
              <>
                <CustomAutocomplete<EntidadFinanciera>
                  label="Entidad financiera"
                  name="entidad_financiera"
                  // options
                  options={entidadFinancierasPaging?.data?.items || []}
                  valueKey="name"
                  actualValueKey="id"
                  defaultValue={form.getValues().entidad_financiera}
                  isLoadingData={
                    isLoadingEntidadFinancieras ||
                    isRefetchingEntidadFinancieras
                  }
                  // vaidation
                  control={form.control}
                  error={errors.entidad_financiera}
                  helperText={errors.entidad_financiera?.message}
                  size={gridSizeMdLg6}
                />
                <SelectTextFieldArrayString
                  label="Tipo cuenta bancaria"
                  name="tipo_cuenta_bancaria"
                  textFieldKey="tipo_cuenta_bancaria"
                  // options
                  options={TIPO_CUENTA_BANCARIA_ARRAY_CHOICES}
                  defaultValue={form.getValues()?.tipo_cuenta_bancaria || ''}
                  // errors
                  control={form.control}
                  error={form.formState.errors.tipo_cuenta_bancaria}
                  helperText={
                    form.formState.errors.tipo_cuenta_bancaria?.message
                  }
                  gridSize={gridSizeMdLg6}
                />
                <CustomTextField
                  label="Número cuenta bancaria"
                  name="numero_cuenta_bancaria"
                  control={form.control}
                  defaultValue={form.getValues().numero_cuenta_bancaria}
                  error={errors.numero_cuenta_bancaria}
                  helperText={errors.numero_cuenta_bancaria?.message}
                  onlyNumbers
                  maxLength={25}
                  size={gridSizeMdLg6}
                />
              </>
            ) : watchedRawPaymentMethod?.uuid === MetodoPagoEnumUUID.CREDITO ? (
              <>
                <CustomAutocomplete<Tarjeta>
                  label="Tarjeta de crédito"
                  name="tarjeta"
                  // options
                  options={tarjetasPaging?.data?.items || []}
                  valueKey="name"
                  actualValueKey="id"
                  defaultValue={form.getValues().tarjeta}
                  isLoadingData={
                    isLoadingEntidadFinancieras ||
                    isRefetchingEntidadFinancieras
                  }
                  // vaidation
                  control={form.control}
                  error={errors.tarjeta}
                  helperText={errors.tarjeta?.message}
                  size={gridSizeMdLg6}
                />
                <CustomTextField
                  label="Número tarjeta crédito"
                  name="numero_tarjeta_credito"
                  control={form.control}
                  defaultValue={form.getValues().numero_tarjeta_credito}
                  error={errors.numero_tarjeta_credito}
                  helperText={errors.numero_tarjeta_credito?.message}
                  onlyNumbers
                  maxLength={25}
                />
              </>
            ) : null}
          </>
        </>
      )}

      {/* ========================= OTP & docs ========================= */}
      {activeStep === 3 && (
        <>
          {/* ============= OPT ============= */}
          <>
            <CustomTypoLabel text="Generación de Código OTP" />

            <>
              {watchedEstadoOtp === OtpStatesEnumChoice.VERIFICADO ? (
                <>
                  <CustomCellphoneTextField
                    label="Celular"
                    name="celular"
                    control={form.control}
                    defaultValue={form.getValues().celular}
                    error={form.formState.errors.celular}
                    helperText={form.formState.errors.celular?.message}
                    size={gridSizeMdLg6}
                    disabled={!canChangeCelular}
                  />

                  <ValidButton
                    label="Número verificado"
                    gridSizeBtn={gridSizeMdLg6}
                  />
                </>
              ) : !isComponentBlocked ? (
                <>
                  <CustomCellphoneTextField
                    label="Celular"
                    name="celular"
                    control={form.control}
                    defaultValue={form.getValues().celular}
                    error={form.formState.errors.celular}
                    helperText={form.formState.errors.celular?.message}
                    size={gridSizeMdLg6}
                    disabled={!canChangeCelular}
                  />

                  {/* -------- buttons -------- */}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    container
                    spacing={3}
                    alignItems="center"
                  >
                    <Grid item>
                      {/* not set otp */}
                      {!isComponentBlocked && (
                        <SingleIconButton
                          label="Cambiar Número"
                          startIcon={<MdChangeCircle />}
                          color="info"
                          onClick={() => {
                            setCanChangeCelular(true);
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item>
                      {/* no opt set */}
                      {!isComponentBlocked && (
                        <CustomSingleButton
                          label="Enviar Código"
                          startIcon={<MdOutlineTextsms />}
                          color="secondary"
                          onClick={handlePhoneVerification}
                        />
                      )}
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  {/* ---------- OTP GLobal Timer ---------- */}
                  <CountDownOTPPReventa
                    celular={watchedCelular!}
                    countdownOtpId={countdownPreventaId}
                    showRefresh
                    onRefresh={handleSafeRefresh}
                  />

                  <Grid item xs={12} container spacing={3} alignItems="center">
                    {/* ---------- OTP input ---------- */}
                    <Grid
                      item
                      xs={12}
                      md={8}
                      sx={{
                        scrollBehavior: 'auto',
                        overflowX: 'auto',
                      }}
                    >
                      <OtpInput
                        value={otpValue}
                        onChange={setOtpValue}
                        numInputs={6}
                        inputType="tel" // to hide rows
                        inputStyle={{
                          height: '60px',
                          width: '60px',
                          borderRadius: '5px',
                          border: '0.5px solid gray',
                          fontSize: '25px',
                        }}
                        renderSeparator={
                          <span style={{ padding: '5px 10px' }} />
                        }
                        renderInput={props => <input {...props} />}
                      />
                    </Grid>

                    {/* ---------- OTP actions ---------- */}
                    <Grid
                      item
                      xs={12}
                      md={4}
                      container
                      direction="column"
                      spacing={2}
                      sx={{
                        width: '100%',
                      }}
                    >
                      <Grid item xs={12} container>
                        <Grid item xs={6}>
                          <CustomSingleButton
                            label="Verificar"
                            startIcon={<BsSendCheckFill />}
                            color="primary"
                            variant="outlined"
                            sxBtn={{}}
                            onClick={async () => {
                              if (!otpValue || otpValue.length < 6)
                                return ToastWrapper.warning(
                                  'Ingrese un código OTP válido',
                                );

                              await validateOtp.mutateAsync({
                                identificacion:
                                  form.getValues().identificacion!,
                                codigo_otp: otpValue!,
                              });
                            }}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <CustomSingleButton
                            label={
                              // if countdown is running show timer, else send new otp
                              (countdownNewOtpValue || 0) > 0
                                ? `${formatCountDownTimer(
                                    countdownNewOtpValue || 0,
                                  )}`
                                : 'Reenviar'
                            }
                            startIcon={<IoMdSend />}
                            color="info"
                            variant="outlined"
                            sxBtn={{
                              width: '100%',
                              textTransform: 'none',
                            }}
                            onClick={() => {
                              if ((countdownNewOtpValue || 0) > 0)
                                return ToastWrapper.warning(
                                  'Espere un momento para volver a enviar el código',
                                );

                              handleNewOtp();
                            }}
                            // disabled if countdownNewotp is running else enable
                            disabled={(countdownNewOtpValue || 0) > 0}
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <CustomSingleButton
                          label={
                            isSupervisorUnlockingSent
                              ? 'Solicitud Enviada'
                              : 'Solictar aprobación'
                          }
                          startIcon={<IoMdUnlock />}
                          color="warning"
                          variant="outlined"
                          justifyContent="center"
                          sxBtn={{
                            color: theme.palette.warning.dark,
                            borderColor: theme.palette.warning.dark,
                            width: '100%',
                          }}
                          onClick={async () => {
                            if (isSupervisorUnlockingSent)
                              return ToastWrapper.warning(
                                'Ya se ha enviado una solicitud de desbloqueo al supervisor',
                              );

                            const otpCacheData =
                              usePreventaStore.getState().cachedOtpData;

                            requestUnlockOtp.mutate({
                              id: otpCacheData?.otpData?.id!,
                              data: {
                                estado_otp:
                                  OtpStatesEnumChoice.ESPERA_APROBACION,
                              },
                            });
                          }}
                          disabled={isSupervisorUnlockingSent}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
            </>
          </>

          {/* ============= Docs ============= */}
          <DocsSavePreventaStep
            form={form}
            solicitudServicioId={solicitudServicio?.id!}
            UploadImageDropZoneComponent={UploadImageDropZoneComponent}
            cedulaFrontalImg={cedulaFrontalImg}
            cedulaPosteriorImg={cedulaPosteriorImg}
            viviendaImg={viviendaImg}
            documentoCuentaBancariaImg={documentoCuentaBancariaImg}
            documentoTarjetaCreditoImg={documentoTarjetaCreditoImg}
            setCedulaFrontalImg={setCedulaFrontalImg}
            setCedulaPosteriorImg={setCedulaPosteriorImg}
            setDocumentoCuentaBancairaImg={setDocumentoCuentaBancairaImg}
            setDocumentoTarjetaCreditoImg={setDocumentoTarjetaCreditoImg}
            setViviendaImg={setViviendaImg}
          />
        </>
      )}

      {/* ========================= loaders ========================= */}
      <CustomScanLoad isOpen={isCheckingCedula} name="archivo" />
      <CustomScanLoad isOpen={isCheckingIdentificacionEquifax} name="cedula" />
    </StepperBoxScene>
  );
};

export default SavePreventa;
