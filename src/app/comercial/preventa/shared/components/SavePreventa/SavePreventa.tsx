/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsSendCheckFill } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoMdTrash } from 'react-icons/io';
import { MdAddCircle, MdChangeCircle, MdOutlineTextsms } from 'react-icons/md';
import { RiMailSendFill } from 'react-icons/ri';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

import {
  CreatePreventaParamsBase,
  useCreateOtpCode,
  useCreatePreventa,
  useFetchEntidadFinancieras,
  useFetchMetodoPagos,
  useFetchPlanInternets,
  useFetchSectores,
  useFetchTarjetas,
  useFetchZonas,
  useGetZoneByCoords,
} from '@/actions/app';
import {
  CodigoOtp,
  EntidadFinanciera,
  IdentificationTypeEnumChoice,
  INTERNET_PLAN_INTERNET_TYPE_ARRAY_CHOICES,
  INTERNET_SERVICE_TYPE_ARRAY_CHOICES,
  MetodoPago,
  MetodoPagoEnumUUID,
  Nullable,
  OtpStatesEnumChoice,
  PARENTESCO_TYPE_ARRAY_CHOICES,
  PlanInternet,
  REFERIDO_TYPE_ARRAY_CHOICES,
  ReferidoTypeEnumChoice,
  Sector,
  Tarjeta,
  TIPO_CUENTA_BANCARIA_ARRAY_CHOICES,
  ToastWrapper,
  useLoaders,
  useUploadImageGeneric,
} from '@/shared';
import {
  ChipModelState,
  CustomAutocomplete,
  CustomAutocompleteArrString,
  CustomCardAlert,
  CustomCellphoneTextField,
  CustomCoordsTextField,
  CustomIdentificacionTextField,
  CustomNumberTextField,
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
  TabTexLabelCustomSpace,
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
import { preventaFormSchema, validarCedulaEcuador } from '@/shared/utils';
import { usePreventaStore } from '@/store/app';
import { useGenericCountdownStore } from '@/store/ui';
import { returnUrlPreventasPage } from '../../../pages/tables/PreventasMainPage';
import CountDownOTPPReventa from './CountDownOTPPReventa';

export interface SavePreventaProps {
  title: React.ReactNode;
  solicitudServicio?: SolicitudServicio;
}

type SaveFormData = CreatePreventaParamsBase &
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
  };

const steps = ['Datos generales', 'Ubicación', 'Servicio', 'Documentos'];

const SavePreventa: React.FC<SavePreventaProps> = ({
  title,
  solicitudServicio,
}) => {
  ///* hooks ---------------------
  const navigate = useNavigate();
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
  } = useUploadImageGeneric();

  ///* local state -------------------
  const [showReferidosPart, setShowReferidosPart] = useState<boolean>(false);
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);

  // otp ------
  const [canChangeCelular, setCanChangeCelular] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState('');
  // const [otpRespData, setOtpRespData] = useState<CodigoOtp | null>(null);

  const setIsOTPGenerated = usePreventaStore(s => s.setIsOTPGenerated);
  const isOTPGenerated = usePreventaStore(s => s.isOTPGenerated);

  const startTimer = useGenericCountdownStore(s => s.start);

  ///* stepper ---------------------
  const { activeStep, disableNextStepBtn, handleBack, handleNext } =
    useCustomStepper({
      steps,
    });

  ///* form --------------------------
  const form = useForm<SaveFormData>({
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
  const watchedIdentificationRefiere = form.watch('identificacion_refiere');
  const watchedThereAreClientRefiere = form.watch('thereAreClientRefiere');

  const watchedZone = form.watch('zona');
  const watchedThereIsCoverage = form.watch('thereIsCoverage');
  const watchedThereAreNaps = form.watch('thereAreNaps');

  const watchedRawPaymentMethod = form.watch('rawPaymentMethod');

  const watchedServiceType = form.watch('tipo_servicio');
  const watchedServicePlan = form.watch('tipo_plan');

  const watchedCelular = form.watch('celular');
  const watchedEstadoOtp = form.watch('estadoOtp');

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
    enabled: !!watchedServiceType && !!watchedServicePlan,
    params: {
      page_size: 900,
      tipo_servicio: watchedServiceType,
      tipo_plan: watchedServicePlan,
    },
  });

  // mutation handlers ------
  const onSuccessOtpGen = (resData: CodigoOtp) => {
    console.log('resData', resData);
    // setOtpRespData(resData);
    setIsOTPGenerated(true);
    startTimer(600);
  };

  ///* mutations ---------------------
  const createPreventaMutation = useCreatePreventa({
    navigate,
    returnUrl: returnUrlPreventasPage,
    enableErrorNavigate: false,
  });

  const createOTP = useCreateOtpCode({
    enableNavigate: false,
    customMessageToast: 'Código OTP generado correctamente',
    customOnSuccess(resData) {
      onSuccessOtpGen(resData as CodigoOtp);
    },
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

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

    ///* create
    createPreventaMutation.mutate(data);
  };

  const handleFetchClienteByCedula = async (value: string) => {
    // TODO: fetch client data:
    console.log('handleFetchCedulaRucInfo', value);
    form.reset({
      ...form.getValues(),
      thereAreClientRefiere: true,
      clienteRefiere: 'Cliente Refiere',
      celularRefiere: '0999999999',
      direccionRefiere: 'Dirección Refiere',
      es_referido: true,
    });
  };
  const onClearCedula = () => {
    form.reset({
      ...form.getValues(),
      thereAreClientRefiere: false,
      identificacion_refiere: '',
      clienteRefiere: '',
      celularRefiere: '',
      direccionRefiere: '',
      es_referido: false,
    });
  };
  const onClearFlotaRefiere = () => {
    form.reset({
      ...form.getValues(),
      thereAreClientRefiere: false,
      es_referido: false,
    });
  };
  const onTrashReferidosPart = () => {
    onClearCedula();
    onClearFlotaRefiere();
    form.setValue('es_referido', false);
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

    createOTP.mutateAsync({
      celular: watchedCelular,
      identificacion: form.getValues().identificacion!,
    });
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!solicitudServicio?.id) return;

    reset({
      ...solicitudServicio,
      estadoOtp: solicitudServicio?.codigo_otp_data?.estado_otp || null,
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
    });
  }, [
    zonaByCoordsRes,
    isLoadingZonaByCoords,
    isRefetchingZonaByCoords,
    form,
    latLng?.lat,
    latLng?.lng,
  ]);
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
      ToastWrapper.error(
        'No se encontraron planes de internet para la combinación de tipos de servicio y plan seleccionados',
      );
  }, [
    isLoadingPlanInternets,
    isRefetchingPlanInternets,
    planInternetsPaging?.data?.items?.length,
    watchedServicePlan,
    watchedServiceType,
  ]);

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
      onCancel={() => navigate(returnUrlPreventasPage)}
      onSave={handleSubmit(onSave, () => {
        ToastWrapper.error('Faltan campos por requeridos');
        console.log(errors);
      })}
    >
      {/* ========================= Datos Generales ========================= */}
      {activeStep === 0 && (
        <>
          <CustomTypoLabel text="Datos Cliente" />

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
          <CustomTextField
            label="Identificación"
            name="identificacion"
            control={form.control}
            defaultValue={form.getValues().identificacion}
            error={errors.identificacion}
            helperText={errors.identificacion?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Razon social"
            name="razon_social"
            control={form.control}
            defaultValue={form.getValues().razon_social}
            error={errors.razon_social}
            helperText={errors.razon_social?.message}
            disabled
          />

          <CustomTextField
            label="Fecha nacimiento"
            name="fecha_nacimiento"
            control={form.control}
            defaultValue={form.getValues().fecha_nacimiento}
            error={errors.fecha_nacimiento}
            helperText={errors.fecha_nacimiento?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomNumberTextField
            label="Edad"
            name="edad"
            control={form.control}
            defaultValue={form.getValues().edad}
            error={errors.edad}
            helperText={errors.edad?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Email"
            name="email"
            type="email"
            control={form.control}
            defaultValue={form.getValues().email}
            error={errors.email}
            helperText={errors.email?.message}
            disabled
          />

          {/* ============= Persona Referencia ============= */}
          <>
            <CustomTypoLabel
              text="Persona Referencia"
              pt={CustomTypoLabelEnum.ptMiddlePosition}
            />
            <CustomTextField
              label="Nombre Persona Referencia"
              name="nombre_persona_referencia"
              control={form.control}
              defaultValue={form.getValues().nombre_persona_referencia}
              error={errors.nombre_persona_referencia}
              helperText={errors.nombre_persona_referencia?.message}
            />
            <SelectTextFieldArrayString
              label="Parentesco Referencia"
              name="parentesco_referencia"
              textFieldKey="parentesco_referencia"
              // options
              options={PARENTESCO_TYPE_ARRAY_CHOICES}
              defaultValue={form.getValues()?.parentesco_referencia || ''}
              // errors
              control={form.control}
              error={form.formState.errors.parentesco_referencia}
              helperText={form.formState.errors.parentesco_referencia?.message}
              gridSize={gridSizeMdLg6}
            />
            <CustomCellphoneTextField
              label="Celular Referencia"
              name="celular_adicional"
              control={form.control}
              defaultValue={form.getValues().celular_adicional}
              error={errors.celular_adicional}
              helperText={errors.celular_adicional?.message}
              size={gridSizeMdLg6}
            />
          </>

          {/* ============= Sistema Referidos ============= */}
          <>
            <TabTexLabelCustomSpace
              textContent="Sistema Referidos"
              showCustomRightSpace={true}
              customRightSpace={
                <SingleIconButton
                  newCustomButton
                  color={!showReferidosPart ? 'primary' : 'error'}
                  startIcon={
                    showReferidosPart ? <IoMdTrash /> : <MdAddCircle />
                  }
                  label={showReferidosPart ? 'REMOVER' : 'AGREGAR'}
                  variant="text"
                  onClick={() => {
                    setShowReferidosPart(prev => !prev);
                    if (!showReferidosPart) {
                      onTrashReferidosPart();
                    }
                  }}
                />
              }
            />
            {showReferidosPart && (
              <>
                <SelectTextFieldArrayString
                  label="Tipo referido"
                  name="tipo_referido"
                  textFieldKey="tipo_referido"
                  // options
                  options={REFERIDO_TYPE_ARRAY_CHOICES}
                  defaultValue={form.getValues()?.tipo_referido || ''}
                  // errors
                  control={form.control}
                  error={form.formState.errors.tipo_referido}
                  helperText={form.formState.errors.tipo_referido?.message}
                  gridSize={gridSizeMdLg6}
                  onChangeValue={() => {
                    onClearCedula();
                    onClearFlotaRefiere();
                  }}
                />
                {!watchedTipoReferido && <span className="spacer" />}

                <>
                  {watchedTipoReferido === ReferidoTypeEnumChoice.CLIENTE ? (
                    <>
                      <InputAndBtnGridSpace
                        inputNode={
                          <CustomIdentificacionTextField
                            label="Identificación"
                            name="identificacion_refiere"
                            control={form.control}
                            selectedDocumentType={
                              IdentificationTypeEnumChoice.CEDULA
                            }
                            defaultValue={form.getValues(
                              'identificacion_refiere',
                            )}
                            error={errors.identificacion_refiere}
                            helperText={errors.identificacion_refiere?.message}
                            onFetchCedulaRucInfo={async value => {
                              await handleFetchClienteByCedula(value);
                            }}
                            onClear={() => {
                              onClearCedula();
                            }}
                          />
                        }
                        btnLabel="Buscar"
                        iconBtn={<CiSearch />}
                        onClick={() => {
                          if (
                            !watchedIdentificationRefiere ||
                            watchedIdentificationRefiere?.length < 10 ||
                            !validarCedulaEcuador(watchedIdentificationRefiere)
                          )
                            return ToastWrapper.warning(
                              'Ingrese un número de cédula válido',
                            );

                          handleFetchClienteByCedula(
                            watchedIdentificationRefiere,
                          );
                        }}
                      />
                      <>
                        {watchedThereAreClientRefiere && (
                          <>
                            <CustomTextField
                              label="Cliente refiere"
                              name="clienteRefiere"
                              control={form.control}
                              defaultValue={form.getValues().clienteRefiere}
                              error={errors.clienteRefiere}
                              helperText={errors.clienteRefiere?.message}
                              disabled
                              size={gridSizeMdLg6}
                            />
                            <CustomCellphoneTextField
                              label="Celular refiere"
                              name="celularRefiere"
                              control={form.control}
                              defaultValue={form.getValues().celularRefiere}
                              error={errors.celularRefiere}
                              helperText={errors.celularRefiere?.message}
                              disabled
                              size={gridSizeMdLg6}
                            />
                            <CustomTextField
                              label="Dirección refiere"
                              name="direccionRefiere"
                              control={form.control}
                              defaultValue={form.getValues().direccionRefiere}
                              error={errors.direccionRefiere}
                              helperText={errors.direccionRefiere?.message}
                              disabled
                            />
                          </>
                        )}
                      </>
                    </>
                  ) : watchedTipoReferido === ReferidoTypeEnumChoice.FLOTA ? (
                    <>FLOTA AUTOCOMPLETE</>
                  ) : null}
                </>
              </>
            )}
          </>
        </>
      )}

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
            <CustomTypoLabel text="Plan de Internet" />

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
            />
            <CustomAutocomplete<PlanInternet>
              label="Plan de internet"
              name="plan_internet"
              // options
              options={planInternetsPaging?.data?.items || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().plan_internet}
              isLoadingData={
                isLoadingPlanInternets || isRefetchingPlanInternets
              }
              // vaidation
              control={form.control}
              error={errors.plan_internet}
              helperText={errors.plan_internet?.message}
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
              {!isOTPGenerated ? (
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
                      {!watchedEstadoOtp && (
                        <SingleIconButton
                          label="Cambiar Número"
                          startIcon={<MdChangeCircle />}
                          color="info"
                          variant="outlined"
                          onClick={() => {
                            setCanChangeCelular(true);
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item>
                      {/* no opt set */}
                      {!watchedEstadoOtp ? (
                        <CustomSingleButton
                          label="Enviar Código"
                          startIcon={<MdOutlineTextsms />}
                          color="secondary"
                          onClick={handlePhoneVerification}
                        />
                      ) : watchedEstadoOtp === OtpStatesEnumChoice.PENDIENTE ? (
                        <ChipModelState
                          label="CÓDIGO ENVIADO"
                          color="success"
                          alignItems="center"
                          justifyContent="center"
                          sxChip={{
                            fontWeight: 600,
                            width: '100%',
                          }}
                        />
                      ) : watchedEstadoOtp ===
                        OtpStatesEnumChoice.VERIFICADO ? (
                        <CustomSingleButton
                          label="Número Verificado"
                          startIcon={<RiMailSendFill />}
                          color="success"
                          // sxBtn={{
                          //   color: 'white', // text
                          //   backgroundColor: '#3891A6', // bg
                          //   ':hover': {
                          //     backgroundColor: '#237a8e',
                          //   },
                          // }}
                          disabled
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <CountDownOTPPReventa celular={watchedCelular!} />

                  <>
                    <Grid
                      item
                      xs={12}
                      container
                      spacing={3}
                      alignItems="center"
                    >
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

                      <Grid item xs={12} md={4} container spacing={2}>
                        <CustomSingleButton
                          label="Verificar Código"
                          startIcon={<BsSendCheckFill />}
                          color="success"
                          variant="outlined"
                          sxBtn={{
                            width: '100%',
                          }}
                          onClick={async () => {
                            if (!otpValue || otpValue.length < 6)
                              return ToastWrapper.warning(
                                'Ingrese un código OTP válido',
                              );

                            // await validateCodigoOTP.mutateAsync({
                            //   codigo: otpValue,
                            //   solicitud_servicio: preventa?.solicitud_servicio!,
                            // });
                          }}
                          gridSizeBtn={gridSizeMdLg6}
                        />
                      </Grid>
                    </Grid>
                  </>
                </>
              )}
            </>
          </>

          {/* ============= Docs ============= */}
          <>
            <CustomTypoLabel
              text="Documentos Adjuntos"
              pt={CustomTypoLabelEnum.ptMiddlePosition}
            />

            <UploadImageDropZoneComponent
              buttonLabel="Foto cédula frontal"
              selectedImage={cedulaFrontalImg}
              setSelectedImage={setCedulaFrontalImg}
            />
            <UploadImageDropZoneComponent
              buttonLabel="Foto cédula trasera"
              selectedImage={cedulaPosteriorImg}
              setSelectedImage={setCedulaPosteriorImg}
            />

            {watchedRawPaymentMethod?.uuid === MetodoPagoEnumUUID.DEBITO ? (
              <UploadImageDropZoneComponent
                buttonLabel="Foto cuenta bancaria"
                selectedImage={documentoCuentaBancariaImg}
                setSelectedImage={setDocumentoCuentaBancairaImg}
              />
            ) : watchedRawPaymentMethod?.uuid === MetodoPagoEnumUUID.CREDITO ? (
              <UploadImageDropZoneComponent
                buttonLabel="Foto tarjeta crédito"
                selectedImage={documentoTarjetaCreditoImg}
                setSelectedImage={setDocumentoTarjetaCreditoImg}
              />
            ) : null}
          </>
        </>
      )}

      {/* ============= Others ============= */}
      {activeStep === 15 && (
        <>
          <CustomTextField
            label="Url foto documento cuenta"
            name="url_foto_documento_cuenta"
            control={form.control}
            defaultValue={form.getValues().url_foto_documento_cuenta}
            error={errors.url_foto_documento_cuenta}
            helperText={errors.url_foto_documento_cuenta?.message}
            size={gridSizeMdLg6}
          />
        </>
      )}
    </StepperBoxScene>
  );
};

export default SavePreventa;
