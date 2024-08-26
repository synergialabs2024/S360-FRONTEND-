/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { IoMdTrash } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import {
  CreatePreventaParamsBase,
  useCreatePreventa,
  useFetchEntidadFinancieras,
  useFetchMetodoPagos,
  useFetchSectores,
  useFetchZonas,
  useGetZoneByCoords,
  useUpdatePreventa,
} from '@/actions/app';
import {
  EntidadFinanciera,
  IdentificationTypeEnumChoice,
  MetodoPago,
  MetodoPagoEnumUUID,
  PARENTESCO_TYPE_ARRAY_CHOICES,
  REFERIDO_TYPE_ARRAY_CHOICES,
  ReferidoTypeEnumChoice,
  Sector,
  TIPO_CUENTA_BANCARIA_ARRAY_CHOICES,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomCardAlert,
  CustomCellphoneTextField,
  CustomCoordsTextField,
  CustomIdentificacionTextField,
  CustomNumberTextField,
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
import { Grid, Typography } from '@mui/material';
import { FaMapLocationDot } from 'react-icons/fa6';
import { returnUrlPreventasPage } from '../../../pages/tables/PreventasMainPage';

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
  };

const steps = ['Datos generales', 'Ubicación', 'Servicio', 'Documentos'];

const SavePreventa: React.FC<SavePreventaProps> = ({
  title,
  solicitudServicio,
}) => {
  const navigate = useNavigate();

  ///* local state -------------------
  const [showReferidosPart, setShowReferidosPart] = useState<boolean>(false);
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);

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

  ///* mutations ---------------------
  const createPreventaMutation = useCreatePreventa({
    navigate,
    returnUrl: returnUrlPreventasPage,
    enableErrorNavigate: false,
  });
  const updatePreventaMutation = useUpdatePreventa<CreatePreventaParamsBase>({
    navigate,
    returnUrl: returnUrlPreventasPage,
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (solicitudServicio?.id) {
      updatePreventaMutation.mutate({ id: solicitudServicio.id!, data });
      return;
    }

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

  ///* effects ---------------------
  useEffect(() => {
    if (!solicitudServicio?.id) return;

    reset({
      ...solicitudServicio,
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
    isRefetchingEntidadFinancieras;
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
          <CustomTypoLabel text="Método de pago" />

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
                  isLoadingEntidadFinancieras || isRefetchingEntidadFinancieras
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
                helperText={form.formState.errors.tipo_cuenta_bancaria?.message}
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
              {/* TODO: */}
              <CustomAutocomplete<EntidadFinanciera>
                label="Entidad financiera"
                name="entidad_financiera"
                // options
                options={entidadFinancierasPaging?.data?.items || []}
                valueKey="name"
                actualValueKey="id"
                defaultValue={form.getValues().entidad_financiera}
                isLoadingData={
                  isLoadingEntidadFinancieras || isRefetchingEntidadFinancieras
                }
                // vaidation
                control={form.control}
                error={errors.entidad_financiera}
                helperText={errors.entidad_financiera?.message}
                size={gridSizeMdLg6}
              />
            </>
          ) : null}
        </>
      )}

      {/* ============= Others ============= */}
      {activeStep === 15 && (
        <>
          <CustomTextField
            label="Tipo servicio"
            name="tipo_servicio"
            control={form.control}
            defaultValue={form.getValues().tipo_servicio}
            error={errors.tipo_servicio}
            helperText={errors.tipo_servicio?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Tipo plan"
            name="tipo_plan"
            control={form.control}
            defaultValue={form.getValues().tipo_plan}
            error={errors.tipo_plan}
            helperText={errors.tipo_plan?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Numero cuenta bancaria"
            name="numero_cuenta_bancaria"
            control={form.control}
            defaultValue={form.getValues().numero_cuenta_bancaria}
            error={errors.numero_cuenta_bancaria}
            helperText={errors.numero_cuenta_bancaria?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Costo instalacion"
            name="costo_instalacion"
            control={form.control}
            defaultValue={form.getValues().costo_instalacion}
            error={errors.costo_instalacion}
            helperText={errors.costo_instalacion?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Url foto cedula frontal"
            name="url_foto_cedula_frontal"
            control={form.control}
            defaultValue={form.getValues().url_foto_cedula_frontal}
            error={errors.url_foto_cedula_frontal}
            helperText={errors.url_foto_cedula_frontal?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Url foto cedula trasera"
            name="url_foto_cedula_trasera"
            control={form.control}
            defaultValue={form.getValues().url_foto_cedula_trasera}
            error={errors.url_foto_cedula_trasera}
            helperText={errors.url_foto_cedula_trasera?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Url foto documento cuenta"
            name="url_foto_documento_cuenta"
            control={form.control}
            defaultValue={form.getValues().url_foto_documento_cuenta}
            error={errors.url_foto_documento_cuenta}
            helperText={errors.url_foto_documento_cuenta?.message}
            size={gridSizeMdLg6}
          />

          <CustomNumberTextField
            label="Metodo pago"
            name="metodo_pago"
            control={form.control}
            defaultValue={form.getValues().metodo_pago}
            error={errors.metodo_pago}
            helperText={errors.metodo_pago?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Entidad financiera"
            name="entidad_financiera"
            control={form.control}
            defaultValue={form.getValues().entidad_financiera}
            error={errors.entidad_financiera}
            helperText={errors.entidad_financiera?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Solicitud servicio"
            name="solicitud_servicio"
            control={form.control}
            defaultValue={form.getValues().solicitud_servicio}
            error={errors.solicitud_servicio}
            helperText={errors.solicitud_servicio?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Area"
            name="area"
            control={form.control}
            defaultValue={form.getValues().area}
            error={errors.area}
            helperText={errors.area?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Departamento"
            name="departamento"
            control={form.control}
            defaultValue={form.getValues().departamento}
            error={errors.departamento}
            helperText={errors.departamento?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Canal venta"
            name="canal_venta"
            control={form.control}
            defaultValue={form.getValues().canal_venta}
            error={errors.canal_venta}
            helperText={errors.canal_venta?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Vendedor"
            name="vendedor"
            control={form.control}
            defaultValue={form.getValues().vendedor}
            error={errors.vendedor}
            helperText={errors.vendedor?.message}
            size={gridSizeMdLg6}
            min={0}
          />
        </>
      )}
    </StepperBoxScene>
  );
};

export default SavePreventa;
