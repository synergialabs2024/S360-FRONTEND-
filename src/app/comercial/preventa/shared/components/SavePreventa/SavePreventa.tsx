/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
import { Grid, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsSendCheckFill } from 'react-icons/bs';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoMdSend, IoMdUnlock } from 'react-icons/io';
import { MdChangeCircle, MdOutlineTextsms } from 'react-icons/md';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

import {
  CreatePreventaParamsBase,
  getSolicitudServicio,
  RequestUnlockOtpCodeParams,
  useCreateOtpCode,
  useCreatePreventa,
  useFetchSectores,
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
import {
  uploadFileToBucket,
  UploadFileToBucketReturn,
} from '@/actions/statics-api';
import {
  BucketKeyNameEnumChoice,
  BucketTypeEnumChoice,
  CodigoOtp,
  MetodoPago,
  MetodoPagoEnumUUID,
  Nullable,
  OtpStatesEnumChoice,
  Sector,
  TimerSolicitudServicioEnum,
  ToastWrapper,
  useLoaders,
  useUploadImageGeneric,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import {
  CustomAutocomplete,
  CustomCardAlert,
  CustomCellphoneTextField,
  CustomCoordsTextField,
  CustomScanLoad,
  CustomSingleButton,
  CustomTextArea,
  CustomTextField,
  CustomTypoLabel,
  InputAndBtnGridSpace,
  MapModalComponent,
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
import {
  PlanInternet,
  PreventaPromocionSelectedOptions,
  SolicitudServicio,
} from '@/shared/interfaces';
import {
  formatCountDownTimer,
  getKeysFormErrorsMessage,
  preventaFormSchema,
  sanitizeDataForSend,
  sanitizeDataResetForm,
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
import { EquipoVentasDetalle, PreventaServicioFormPart } from './form';
import { EquiposSeleccionadosProductoType } from './form/equipos/EquiposSeleccionadosPreventa';

import { SelectedEqPromoctionType } from '@/app/comercial/promocion/shared/components/SavePromocion/SavePromocion';

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

    // helpers ----------------
    rawPlanInternet?: PlanInternet;

    // promociones ----------------
    // to safe selected options after unmount in PromocionPreventaFormPart
    selectedPromoOptions?: SelectedEqPromoctionType[];
    selectedPromoPremioUuid?: string;
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
    image5: viviendaImg,
    setImage5: setViviendaImg,
    image6: planillaServicioBasicoImg,
    setImage6: setPlanillaServicioBasicoImg,
  } = useUploadImageGeneric();

  ///* local state -------------------
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);
  const [isSupervisorUnlockingSent, setIsSupervisorUnlockingSent] =
    useState<boolean>(false);
  const [isCheckingCedula, setIsCheckingCedula] = useState<boolean>(false);

  const [showEquiposPart, setShowEquiposPart] = useState<boolean>(false);

  // otp ------
  const [canChangeCelular, setCanChangeCelular] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState('');

  const isComponentBlocked = usePreventaStore(s => s.isComponentBlocked);
  const setIsComponentBlocked = usePreventaStore(s => s.setIsComponentBlocked);
  const setCachedOtpData = usePreventaStore(s => s.setCachedOtpData);
  const clearAllPreventaStore = usePreventaStore(s => s.clearAll);

  const startTimer = useGenericCountdownStore(s => s.start);
  const clearAllTimers = useGenericCountdownStore(s => s.clearAll);
  const countdownNewOtpValue = useGenericCountdownStore(
    s => s.counters[countdownIdNewOtpPreventa]?.count,
  );

  // equipos venta -----------------
  const {
    items: equiposSeleccionados,
    clearOneRecord: clearAllEquiposSelecStore,
    clearAllStore,
  } = useTypedGenericInventoryStore<EquiposSeleccionadosProductoType>(
    GenericInventoryStoreKey.equiposVentaPreventa,
  );
  const selectedCuotas = usePreventaStore(s => s.selectedCuotas);

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
      initialStep: 0,
    });

  ///* global state ---------------------
  const alreadyConsultedEquifax = usePreventaStore(
    s => s.alreadyConsultedEquifax,
  );

  ///* form --------------------------
  const form = useForm<SaveFormDataPreventa>({
    resolver: yupResolver(preventaFormSchema) as any,
    defaultValues: {
      thereAreClientRefiere: false,
      es_referido: false,
      estadoOtp: null,

      // tipo_plan: InternetPlanInternetTypeEnumChoice.HOGAR,
      // tipo_servicio: InternetServiceTypeEnumChoice.FIBRA,

      selectedPromoOptions: [],
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const watchedZone = form.watch('zona');
  const watchedThereIsCoverage = form.watch('thereIsCoverage');
  const watchedThereAreNaps = form.watch('thereAreNaps');

  const watchedRawPaymentMethod = form.watch('rawPaymentMethod');

  // promociones
  const watchedIs3raEdad = form.watch('es_tercera_edad');

  const watchedCelular = form.watch('celular');
  const watchedEstadoOtp = form.watch('estadoOtp');

  const watchedPlanInternet = form.watch('plan_internet');

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
      direccion_referencia,
      tiene_cobertura,
      ...rest
    } = updatedSolServicio || {};

    reset({
      ...prevForm,
      ...rest,
      estadoOtp:
        updatedSolServicio?.codigos_otp_data?.at(0)?.estado_otp || null,

      email: prevForm.email,
      // tipo_plan: InternetPlanInternetTypeEnumChoice.HOGAR,
      // tipo_servicio: InternetServiceTypeEnumChoice.FIBRA,
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
      clearAllEquiposSelecStore();
      clearAllStore();
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

    // --------------------
    if (!alreadyConsultedEquifax) {
      ToastWrapper.error(
        'No se ha realizado la consulta al servicio del buró de crédito.',
      );
      return;
    }
    // --------------------

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
    if (!viviendaImg)
      return ToastWrapper.error('La foto de la vivienda es requerida');
    if (watchedIs3raEdad && !planillaServicioBasicoImg)
      return ToastWrapper.error(
        'La foto de la planilla de servicio básico es requerida para personas de la tercera edad',
      );

    // upload images ----
    // setIsCheckingCedula(true);
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

    let planillaPhotoObj: UploadFileToBucketReturn =
      {} as UploadFileToBucketReturn;
    if (watchedIs3raEdad) {
      planillaPhotoObj = await uploadFileToBucket({
        file: planillaServicioBasicoImg!,
        file_name: BucketKeyNameEnumChoice.PLANILLA_SERVICIOS,
        bucketDir: BucketTypeEnumChoice.IMAGES_PLANILLA_SERVICIOS,
      });
    }
    let documentoCuentaBancariaObj: UploadFileToBucketReturn =
      {} as UploadFileToBucketReturn;
    if (watchedRawPaymentMethod?.uuid === MetodoPagoEnumUUID.DEBITO) {
      documentoCuentaBancariaObj = await uploadFileToBucket({
        file: documentoCuentaBancariaImg!,
        file_name: BucketKeyNameEnumChoice.DOCUMENTO_CUENTA_BANCARIA,
        bucketDir: BucketTypeEnumChoice.IMAGES_DOCUMENTO_BANCARIOS,
      });
    }

    // equipos venta ------------
    const detalleEquipos: EquipoVentasDetalle[] = equiposSeleccionados?.map(
      equipo => ({
        cantidad: equipo?.usedQuantity?.toFixed(2),
        codigo: equipo?.codigo!,
        cuotas: selectedCuotas,
        series: [],
      }),
    );
    const sanitizedDataToSend = sanitizeDataForSend(data);

    // promociones ------------
    const selectedPromoOptions = data?.selectedPromoOptions || [];
    const formattedSelectedPromoOptions: PreventaPromocionSelectedOptions[] =
      selectedPromoOptions.map(opt => ({
        codigo: opt?.codigo as string,
        nombre: opt?.nombre as string,
        selected_item_uuid: opt?.selectedUuidItem as string,
        promocion_uuid: opt?.promocionUuid as string,
      }));

    // create ----------------
    const actualDataToSend = {
      ...sanitizedDataToSend,
      solicitud_servicio: solicitudServicio?.id!,
      url_foto_cedula_frontal: cedulaFrontalUrl?.streamUlr || '',
      url_foto_cedula_trasera: cedulaPosteriorUrl?.streamUlr || '',
      url_foto_vivienda: viviendaUrl?.streamUlr || '',
      equipos_venta_detalle: detalleEquipos,

      url_foto_planilla: planillaPhotoObj?.streamUlr || '',
      url_foto_documento_cuenta: documentoCuentaBancariaObj?.streamUlr || '',

      promocion_items_selected: formattedSelectedPromoOptions,
      ...(data?.selectedPromoPremioUuid
        ? { promocion_premio_selected: data?.selectedPromoPremioUuid }
        : {}),
    };
    // console.log({ actualDataToSend });
    // return;
    await createPreventaMutation.mutateAsync(actualDataToSend);
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
      solicitud_servicio: solicitudServicio?.id!,
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
      solicitud_servicio: solicitudServicio?.id!,
    });
  };

  ///* promociones ---------------------
  const { clearAllStore: clearAllStoreEquiposPromocion } =
    useTypedGenericInventoryStore<SelectedEqPromoctionType>(
      GenericInventoryStoreKey.equiposPromocion,
    );

  ///* effects ---------------------
  useEffect(() => {
    if (!solicitudServicio?.id) return;

    const sanitizedSolicitudServicio = sanitizeDataResetForm(solicitudServicio);

    reset({
      ...sanitizedSolicitudServicio,
      estadoOtp: solicitudServicio?.codigos_otp_data?.at(0)?.estado_otp || null,

      // tipo_plan: InternetPlanInternetTypeEnumChoice.HOGAR,
      // tipo_servicio: InternetServiceTypeEnumChoice.FIBRA,

      selectedPromoOptions: [],
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

  // clear all timers when unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
      setIsComponentBlocked(false);
      clearAllPreventaStore();
      clearAllStoreEquiposPromocion();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCustomLoading =
    isRefetchingNaps ||
    isLoadingNaps ||
    isLoadingZonas ||
    isRefetchingZonas ||
    isLoadingZonaByCoords ||
    isRefetchingZonaByCoords ||
    isLoadingSectores ||
    isRefetchingSectores;
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
        clearAllEquiposSelecStore();
      }}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        // console.log('keys', { errors });
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
                      canDragMarker
                      setLatLng={setLatLng}
                      // coverage -------
                      showCoverage
                      coverageZones={zonasPaging?.data?.items || []}
                      showNaps
                      naps={napsByCoords || []}
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
                onChangeValue={() => {
                  form.setValue('selectedPromoOptions', []);
                  if (watchedPlanInternet) {
                    form.setValue('rawPaymentMethod', undefined);
                    form.setValue('metodo_pago', '' as any);
                  }
                }}
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
            name="direccion_referencia"
            control={form.control}
            defaultValue={form.getValues().direccion_referencia}
            error={errors.direccion_referencia}
            helperText={errors.direccion_referencia?.message}
          />

          {watchedThereAreNaps ? (
            <CustomCardAlert
              sizeType="small"
              alertMessage={`Cajas disponibles. La mas cercana está a aprox. ${
                napsByCoords?.at(0)?.max_polygon_distance ||
                napsByCoords?.at(0)?.distance
              }m`}
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
        <PreventaServicioFormPart
          form={form}
          solicitudServicio={solicitudServicio}
          showEquiposPart={showEquiposPart}
          setShowEquiposPart={setShowEquiposPart}
        />
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
            // documentoTarjetaCreditoImg={documentoTarjetaCreditoImg}
            setCedulaFrontalImg={setCedulaFrontalImg}
            setCedulaPosteriorImg={setCedulaPosteriorImg}
            setDocumentoCuentaBancairaImg={setDocumentoCuentaBancairaImg}
            // setDocumentoTarjetaCreditoImg={setDocumentoTarjetaCreditoImg}
            setViviendaImg={setViviendaImg}
            planillaServicioBasicoImg={planillaServicioBasicoImg}
            setPlanillaServicioBasicoImg={setPlanillaServicioBasicoImg}
          />
        </>
      )}

      {/* ========================= loaders ========================= */}
      <CustomScanLoad isOpen={isCheckingCedula} name="archivo" />
    </StepperBoxScene>
  );
};

export default SavePreventa;
