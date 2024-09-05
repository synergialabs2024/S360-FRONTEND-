/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { FaMapLocationDot } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import {
  CreateSolicitudDesbloqueoVentasData,
  CreateSolicitudServicioParamsBase,
  useCreateSolicitudDesbloqueoVentas,
  useCreateSolicitudServicio,
  useFetchPaises,
  useFetchSectores,
  useFetchZonas,
  useGetZoneByCoords,
  useValidateCedulaSolService,
  ValidateIdentificacionParams,
} from '@/actions/app';
import { returnUrlPreventasPage } from '@/app/comercial/preventa/pages/tables/PreventasMainPage';
import { handleAxiosError, Sector, ToastWrapper, useLoaders } from '@/shared';
import {
  CustomAutocomplete,
  CustomAutocompleteArrString,
  CustomCardAlert,
  CustomCellphoneTextField,
  CustomCoordsTextField,
  CustomDatePicker,
  CustomIdentificacionTextField,
  CustomNumberTextField,
  CustomTextArea,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  InputAndBtnGridSpace,
  MapModalComponent,
  SampleCheckbox,
  SingleFormBoxScene,
  SingleIconButton,
} from '@/shared/components';
import {
  EstadoSolicitudServicioEnumChoice,
  GeneralModelStatesEnumChoice,
  IDENTIFICATION_TYPE_ARRAY_CHOICES,
  IdentificationTypeEnumChoice,
  SalesModelsEnumChoice,
  SalesStatesActionsEnumChoice,
} from '@/shared/constants/app';
import {
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  gridSizeMdLg4,
  gridSizeMdLg6,
} from '@/shared/constants/ui';
import { calcAge } from '@/shared/helpers';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import {
  HTTPResStatusCodeEnum,
  Pais,
  SolicitudServicio,
} from '@/shared/interfaces';
import { CedulaCitizen } from '@/shared/interfaces/consultas-api/cedula-citizen.interface';
import { solicitudServicioFormSchema } from '@/shared/utils';
import { useUiConfirmModalStore } from '@/store/ui';
import { returnUrlSolicitudsServicioPage } from '../../../pages/tables/SolicitudesServicioMainPage';

export interface SaveSolicitudServicioProps {
  title: string;
  solicitudservicio?: SolicitudServicio;
}

type SaveFormData = CreateSolicitudServicioParamsBase & {
  // helper
  isFormBlocked?: boolean;
  isValidIdentificacion?: boolean;

  cityName?: string;
  provinceName?: string;
  zoneName?: string;
  thereIsCoverage?: boolean;
  thereAreNaps?: boolean;
};

const SaveSolicitudServicio: React.FC<SaveSolicitudServicioProps> = ({
  title,
  solicitudservicio,
}) => {
  const navigate = useNavigate();

  ///* local state -----------------
  const [openMapModal, setOpenMapModal] = useState(false);

  ///* global state -----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* form -----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudServicioFormSchema) as any,
    defaultValues: {
      estado_solicitud: EstadoSolicitudServicioEnumChoice.INGRESADO,
      es_tercera_edad: false,
      es_discapacitado: false,
      es_cliente: false,
      tiene_cobertura: false,

      isFormBlocked: false,
      thereIsCoverage: false,
      thereAreNaps: false,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedIdentificationType = form.watch('tipo_identificacion');
  const watchedIdentification = form.watch('identificacion');
  const watchedIsFormBlocked = form.watch('isFormBlocked');
  const watchedIsValidIdentificacion = form.watch('isValidIdentificacion');
  const watchedZone = form.watch('zona');
  const watchedThereIsCoverage = form.watch('thereIsCoverage');
  const watchedThereAreNaps = form.watch('thereAreNaps');

  const {
    Map,
    latLng,
    napsByCoords,
    isLoadingNaps,
    isRefetchingNaps,
    setLatLng,
  } = useMapComponent({
    form,
    initialCoords: solicitudservicio?.id ? solicitudservicio.coordenadas : '',
    enableFetchNaps: true,
  });
  useLocationCoords({
    isEditting: !!solicitudservicio?.id,
    form,
    setLatLng,
  });

  ///* fetch data -----------------
  const {
    data: paisesPaging,
    isLoading: isLoadingPaises,
    isRefetching: isRefetchingPaises,
  } = useFetchPaises({
    params: {
      page_size: 200,
    },
  });
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

  // handlers ------------
  const onSuccessSearchCedula = (cedulaCitizen: CedulaCitizen) => {
    const correctFechaNacimiento = dayjs(
      cedulaCitizen?.fechaNacimiento,
      'DD/MM/YYYY',
    ).format('YYYY-MM-DD');
    const currentCountry = paisesPaging?.data.items.find(
      country => country.nationality === cedulaCitizen?.nacionalidad,
    );

    form.reset({
      ...form.getValues(),
      razon_social: cedulaCitizen?.fullName,
      es_discapacitado: cedulaCitizen?.esDiscapacitado,
      es_tercera_edad: cedulaCitizen?.esTerceraEdad,
      fecha_nacimiento: correctFechaNacimiento,
      edad: cedulaCitizen?.edad,
      direccion: cedulaCitizen?.domicilio,
      isFormBlocked: false,
      isValidIdentificacion: true,

      pais: currentCountry?.id,
      nacionalidad: cedulaCitizen?.nacionalidad,

      // TODO: get data from equifax
      categoria_score_desicion: 'A',
      valor_maximo: '1000',
      valor_minimo: '500',
      score_inclusion: '600',
      score_sobreendeudamiento: '9999',
      score_servicios: '700',
      rango_capacidad_pago: 'A',
    });
  };
  const onErrorSearchCedula = (err: any) => {
    const status = err?.response?.status;
    const data = err?.response?.data?.data;
    const createdAt = dayjs(data?.created_at);
    const blockedUntil = dayjs(data?.block_until);
    const now = dayjs();
    const hoursBlocked = now.diff(createdAt, 'hours');
    const minutesBlocked = now.diff(createdAt, 'minutes') || 1;
    const timeBlocked = minutesBlocked > 60 ? hoursBlocked : minutesBlocked;

    // sri api is down
    if (status === HTTPResStatusCodeEnum.EXTERNAL_SERVER_ERROR) {
      ToastWrapper.warning(
        'Servicio de consulta de cédula no disponible en este momento. Ingresa los datos manualmente',
      );
      form.reset({
        ...form.getValues(),
        isFormBlocked: false,
        isValidIdentificacion: true,
      });
      // solicitud_servicio in process
    } else if (status === HTTPResStatusCodeEnum.CONFLICTS_OR_ACTIVE_SESSION) {
      if (blockedUntil) {
        setConfirmDialog({
          isOpen: true,
          title: 'Prospecto existente',
          subtitle: `Prospecto registrado hace ${timeBlocked} ${
            minutesBlocked > 60 ? 'horas' : 'minutos'
          }. Para poderlo ingresar en un nuevo proceso debe solicitar desbloqueo o esperar hasta ${blockedUntil.format('DD/MM/YYYY HH:mm')}. 
        ¿Desea solicitar desbloqueo?`,
          onConfirm: () => {
            setConfirmDialogIsOpen(false);
            useCreateSolUnblockSolServiceMutation.mutate({
              modelo: SalesModelsEnumChoice.SOLICITUD_SERVICIO,
              modelo_id: data.solicitud_servicio_id,
              modelo_estado:
                SalesStatesActionsEnumChoice.SOLICITUD_DESBLOQUEO_ESPERA,
              solicitud_desbloqueo_estado: GeneralModelStatesEnumChoice.ESPERA,
            });
          },
          confirmTextBtn: 'Solicitar desbloqueo',
          cancelTextBtn: 'Cerrar',
        });
      }
    } else {
      form.reset({
        isFormBlocked: true,
      });
      handleAxiosError(err);
    }
  };
  const onSuccessCreateSolService = (data: SolicitudServicio) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Solicitud de servicio creada',
      subtitle: `La solicitud de servicio ${data.numero_referencia} ha sido creada con éxito. ¿Desea continuar con la preventa?`,
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlPreventasPage}/crear/${data.uuid}`);
      },
      confirmTextBtn: 'SI, CONTINUAR',
      cancelTextBtn: 'CERRAR',
      onClose: () => {
        setConfirmDialogIsOpen(false);
        navigate(returnUrlSolicitudsServicioPage);
      },
    });
  };
  ///* mutations -----------------
  const createSolicitudServicioMutation = useCreateSolicitudServicio({
    // navigate,
    // returnUrl: returnUrlSolicitudsServicioPage,
    enableErrorNavigate: false,
    customOnSuccess: data => {
      onSuccessCreateSolService(data as SolicitudServicio);
    },
  });
  const useSearchCedulaMutation =
    useValidateCedulaSolService<ValidateIdentificacionParams>({
      enableErrorNavigate: false,
      customOnSuccess: data => {
        onSuccessSearchCedula(data as CedulaCitizen);
      },
      customOnError: err => {
        onErrorSearchCedula(err);
      },
    });

  const useCreateSolUnblockSolServiceMutation =
    useCreateSolicitudDesbloqueoVentas<CreateSolicitudDesbloqueoVentasData>({
      // navigate,
      // returnUrl: returnUrlSolicitudsServicioPage,
      enableErrorNavigate: false,
    });

  const handleFetchCedulaRucInfo = async (value: string) => {
    if (watchedIdentificationType === IdentificationTypeEnumChoice.CEDULA) {
      await useSearchCedulaMutation.mutateAsync({
        identificacion: value,
      });
    } else if (watchedIdentificationType === IdentificationTypeEnumChoice.RUC) {
      // await useSearchRucMutation.mutateAsync({
      //   ruc: value,
      // });
    }
  };

  ///* handlers -----------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* not blocking alert (coverage)
    if (!watchedThereIsCoverage || !watchedThereAreNaps) {
      const keyMessage = !watchedThereIsCoverage ? 'cobertura' : 'cajas';
      setConfirmDialog({
        isOpen: true,
        title: `Ubicación sin ${keyMessage}`,
        subtitle: `Esta solicitud de servicio no tiene ${keyMessage} en las coordenadas ingresadas. En este punto puede continuar con la creación de la solicitud de servicio, sin embargo, no podrá crear la preventa hasta que se tenga ${keyMessage} en las coordenadas ingresadas.`,
        onConfirm: () => {
          setConfirmDialogIsOpen(false);

          ///* create
          createSolicitudServicioMutation.mutate({
            ...data,
            tiene_cobertura: !!watchedThereIsCoverage && !!watchedThereAreNaps,
          });

          return;
        },
        confirmTextBtn: 'COMPRENDIDO, CONTINUAR',
        cancelTextBtn: 'CERRAR',
        onClose: () => {
          setConfirmDialogIsOpen(false);
        },
      });
    } else {
      ///* create
      createSolicitudServicioMutation.mutate({
        ...data,
        tiene_cobertura: !!watchedThereIsCoverage && !!watchedThereAreNaps,
      });
    }
  };

  const clearForm = () => {
    form.reset({
      ...form.getValues(),
      razon_social: '',
      es_discapacitado: false,
      es_tercera_edad: false,
      fecha_nacimiento: '',
      edad: undefined,
      direccion: '',
      identificacion: '',
      tiene_cobertura: false,
      categoria_score_desicion: '',
      email: '',
      celular: '',
      score_inclusion: '',
      score_servicios: '',
      score_sobreendeudamiento: '',
      rango_capacidad_pago: '',
      valor_maximo: '',
      valor_minimo: '',
      es_cliente: false,
      estado_solicitud: EstadoSolicitudServicioEnumChoice.INGRESADO,
      plan_sugerido: undefined,
      isValidIdentificacion: false, // helper

      pais: undefined,
      nacionalidad: '',
    });
  };

  ///* effects -----------------
  useEffect(() => {
    if (!solicitudservicio?.id) return;
    reset(solicitudservicio);
  }, [solicitudservicio, reset]);

  // set zone to up
  useEffect(() => {
    if (!latLng?.lat || !latLng?.lng) return;

    if (isLoadingZonaByCoords || isRefetchingZonaByCoords) return;
    const zone = zonaByCoordsRes?.data;
    if (!zone) {
      ToastWrapper.warning(
        `No se encontraron zonas con cobertura para las coordenadas ${
          latLng?.lat
        }, ${latLng?.lng}`,
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
      ToastWrapper.warning(
        'No se encontraron NAPs disponibles para las coordenadas ingresadas',
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
    isLoadingPaises ||
    isRefetchingPaises ||
    isLoadingZonas ||
    isRefetchingZonas ||
    isLoadingZonaByCoords ||
    isRefetchingZonaByCoords ||
    isLoadingSectores ||
    isRefetchingSectores ||
    isLoadingNaps ||
    isRefetchingNaps;
  useLoaders(isCustomLoading);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSolicitudsServicioPage)}
      onSave={handleSubmit(onSave, () => {
        console.log('error', errors);
        ToastWrapper.error('Faltan campos requeridos');
      })}
      disableSubmitBtn={watchedIsFormBlocked || !watchedIsValidIdentificacion}
    >
      <CustomAutocompleteArrString
        label="Tipo de identificación"
        name="tipo_identificacion"
        control={form.control}
        defaultValue={form.getValues('tipo_identificacion')}
        options={IDENTIFICATION_TYPE_ARRAY_CHOICES}
        isLoadingData={false}
        error={errors.tipo_identificacion}
        helperText={errors.tipo_identificacion?.message}
        size={gridSizeMdLg6}
        disableClearable
        onChangeValue={() => {
          clearForm();
        }}
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
            onChangeValue={value => {
              if (!value?.length) {
                clearForm();
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

      <CustomTextField
        label={
          watchedIdentificationType === IdentificationTypeEnumChoice.RUC
            ? 'Razón social'
            : 'Nombre y Apellido'
        }
        name="razon_social"
        control={form.control}
        defaultValue={form.getValues().razon_social}
        error={errors.razon_social}
        helperText={errors.razon_social?.message}
      />
      <CustomDatePicker
        label="Fecha nacimiento"
        name="fecha_nacimiento"
        control={form.control}
        defaultValue={form.getValues().fecha_nacimiento}
        error={errors.fecha_nacimiento}
        helperText={errors.fecha_nacimiento?.message}
        size={gridSizeMdLg6}
        onChangeValue={value => {
          // 1997-05-10
          const age = calcAge(value);
          form.setValue('edad', age);
          // apply logic (planes,promos 3era edad, etc)
        }}
      />
      <CustomNumberTextField
        label="Edad"
        name="edad"
        control={form.control}
        defaultValue={form.getValues().edad}
        error={errors.edad}
        helperText={errors.edad?.message}
        size={gridSizeMdLg6}
        min={0}
        disabled
      />
      <CustomAutocomplete<Pais>
        label="Pais"
        name="pais"
        valueKey="name"
        actualValueKey="id"
        control={form.control}
        defaultValue={form.getValues().pais}
        options={paisesPaging?.data.items || []}
        isLoadingData={isCustomLoading}
        error={errors.pais}
        helperText={errors.pais?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocomplete<any>
        label="Nacionalidad"
        name="nacionalidad"
        valueKey="name"
        actualValueKey="name"
        control={form.control}
        defaultValue={form.getValues().pais}
        options={
          paisesPaging?.data?.items?.map(country => ({
            name: country.nationality,
          })) || []
        }
        isLoadingData={isCustomLoading}
        error={errors.pais}
        helperText={errors.pais?.message}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="Es tercera edad"
        name="es_tercera_edad"
        control={form.control}
        defaultValue={form.getValues().es_tercera_edad}
        size={gridSizeMdLg4}
        disabled
      />
      <SampleCheckbox
        label="Es discapacitado"
        name="es_discapacitado"
        control={form.control}
        defaultValue={form.getValues().es_discapacitado}
        size={gridSizeMdLg4}
        disabled
      />
      <SampleCheckbox
        label="Es cliente"
        name="es_cliente"
        control={form.control}
        defaultValue={form.getValues().es_cliente}
        size={gridSizeMdLg4}
        disabled
      />

      <CustomTextField
        label="Email"
        name="email"
        type="email"
        control={form.control}
        defaultValue={form.getValues().email}
        error={errors.email}
        helperText={
          errors.email
            ? errors.email?.message
            : 'Ingrese un correo válido al que se enviará el contrato'
        }
        size={gridSizeMdLg6}
      />
      <CustomCellphoneTextField
        label="Celular"
        name="celular"
        control={form.control}
        defaultValue={form.getValues().celular}
        error={errors.celular}
        helperText={errors.celular?.message}
        size={gridSizeMdLg6}
      />

      {/* ------------- location ------------- */}
      <>
        <CustomTypoLabel
          text="Ubicación"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <InputAndBtnGridSpace
          mainGridSize={gridSize}
          inputGridSize={gridSizeMdLg11}
          inputNode={
            <CustomCoordsTextField
              label="Coordenadas"
              name="coordenadas"
              control={form.control}
              defaultValue={form.getValues().coordenadas}
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

      {/* ------------- Equifax ------------- */}
      <>
        <CustomTypoLabel
          text="Equifax"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <CustomTextField
          label="Categoria score desicion"
          name="categoria_score_desicion"
          control={form.control}
          defaultValue={form.getValues().categoria_score_desicion}
          error={errors.categoria_score_desicion}
          helperText={errors.categoria_score_desicion?.message}
          size={gridSizeMdLg6}
          disabled
        />
        <CustomTextField
          label="Valor maximo"
          name="valor_maximo"
          control={form.control}
          defaultValue={form.getValues().valor_maximo}
          error={errors.valor_maximo}
          helperText={errors.valor_maximo?.message}
          size={gridSizeMdLg6}
          disabled
        />
        <CustomTextField
          label="Valor minimo"
          name="valor_minimo"
          control={form.control}
          defaultValue={form.getValues().valor_minimo}
          error={errors.valor_minimo}
          helperText={errors.valor_minimo?.message}
          size={gridSizeMdLg6}
          disabled
        />
        <CustomTextField
          label="Score inclusion"
          name="score_inclusion"
          control={form.control}
          defaultValue={form.getValues().score_inclusion}
          error={errors.score_inclusion}
          helperText={errors.score_inclusion?.message}
          size={gridSizeMdLg6}
          disabled
        />
        <CustomTextField
          label="Score sobreendeudamiento"
          name="score_sobreendeudamiento"
          control={form.control}
          defaultValue={form.getValues().score_sobreendeudamiento}
          error={errors.score_sobreendeudamiento}
          helperText={errors.score_sobreendeudamiento?.message}
          size={gridSizeMdLg6}
          disabled
        />
        <CustomTextField
          label="Score servicios"
          name="score_servicios"
          control={form.control}
          defaultValue={form.getValues().score_servicios}
          error={errors.score_servicios}
          helperText={errors.score_servicios?.message}
          size={gridSizeMdLg6}
          disabled
        />
        <CustomTextField
          label="Rango capacidad pago"
          name="rango_capacidad_pago"
          control={form.control}
          defaultValue={form.getValues().rango_capacidad_pago}
          error={errors.rango_capacidad_pago}
          helperText={errors.rango_capacidad_pago?.message}
          disabled
        />
      </>
    </SingleFormBoxScene>
  );
};

export default SaveSolicitudServicio;
