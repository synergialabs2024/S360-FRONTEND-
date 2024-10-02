/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

import {
  CreateSolicitudDesbloqueoVentasData,
  CreateSolicitudServicioParamsBase,
  useCreateSolicitudDesbloqueoVentas,
  useCreateSolicitudServicio,
  useFetchPaises,
  useValidateCedulaSolService,
  ValidateIdentificacionParams,
} from '@/actions/app';
import { returnUrlPreventasPage } from '@/app/comercial/preventa/pages/tables/PreventasMainPage';
import { LocationZonePolygonFormPart } from '@/app/operaciones/agedamiento/shared/components/form';
import { handleAxiosError, ToastWrapper, useLoaders } from '@/shared';
import {
  CustomAutocomplete,
  CustomAutocompleteArrString,
  CustomCardAlert,
  CustomCellphoneTextField,
  CustomDatePicker,
  CustomIdentificacionTextField,
  CustomNumberTextField,
  CustomScanLoad,
  CustomTextField,
  CustomTypoLabelEnum,
  InputAndBtnGridSpace,
  SampleCheckbox,
  SingleFormBoxScene,
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
  gridSizeMdLg4,
  gridSizeMdLg6,
  gridSizeMdLg8,
} from '@/shared/constants/ui';
import { calcAge, calcIsTerceraEdad } from '@/shared/helpers';
import {
  HTTPResStatusCodeEnum,
  Pais,
  SolicitudServicio,
} from '@/shared/interfaces';
import { CedulaCitizen } from '@/shared/interfaces/consultas-api/cedula-citizen.interface';
import { solicitudServicioFormSchema } from '@/shared/utils';
import { useUiConfirmModalStore } from '@/store/ui';
import { Grid } from '@mui/material';
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
  const [isCheckingIdentificacion, setIsCheckingIdentificacion] =
    useState<boolean>(false);

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
  const watchedThereIsCoverage = form.watch('thereIsCoverage');
  const watchedThereAreNaps = form.watch('thereAreNaps');
  const watchedIsTerceraEdad = form.watch('es_tercera_edad');
  const watchedIsCliente = form.watch('es_cliente');

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
    });
  };
  const onErrorSearchCedula = (err: any) => {
    const status = err?.response?.status;
    const data = err?.response?.data?.data;
    const isPreventaBlocked = !!data?.preventa_id;
    const isSolictudServicioBlocked = !!data?.solicitud_servicio_id;
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
        if (isSolictudServicioBlocked) {
          setConfirmDialog({
            isOpen: true,
            title: 'Prospecto existente',
            subtitle: `Prospecto registrado hace ${timeBlocked} ${
              minutesBlocked > 60 ? 'horas' : 'minutos'
            }. Para poderlo ingresar en un nuevo proceso debe solicitar desbloqueo o esperar hasta ${blockedUntil.format('DD/MM/YYYY HH:mm')}. 
        ¿Desea solicitar desbloqueo?`,
            onConfirm: () => {
              setConfirmDialogIsOpen(false);
              createSolUnblockSolServiceMutation.mutate({
                modelo: SalesModelsEnumChoice.SOLICITUD_SERVICIO,
                modelo_id: data.solicitud_servicio_id,
                modelo_estado:
                  SalesStatesActionsEnumChoice.SOLICITUD_DESBLOQUEO_ESPERA,
                solicitud_desbloqueo_estado:
                  GeneralModelStatesEnumChoice.ESPERA,
              });
            },
            confirmTextBtn: 'Solicitar desbloqueo',
            cancelTextBtn: 'Cerrar',
          });
        } else if (isPreventaBlocked) {
          // new sol_serv not required, just change vendedor q solicita reasignacion
          setConfirmDialog({
            isOpen: true,
            title: 'Prospecto en preventa',
            subtitle: `Preventa registrada hace ${timeBlocked} ${
              minutesBlocked > 60 ? 'horas' : 'minutos'
            }. Para poderlo ingresar en un nuevo proceso debe solicitar la reasignación de la preventa o esperar hasta ${blockedUntil.format('DD/MM/YYYY HH:mm')}.
        ¿Desea solicitar la reasignación?`,
            onConfirm: () => {
              setConfirmDialogIsOpen(false);
              createSolUnblockSolServiceMutation.mutate({
                modelo: SalesModelsEnumChoice.PREVENTA,
                modelo_id: data.preventa_id,
                modelo_estado:
                  SalesStatesActionsEnumChoice.PREVENTA_REASIGNACION_ESPERA,
                solicitud_desbloqueo_estado:
                  GeneralModelStatesEnumChoice.ESPERA,
              });
            },
            confirmTextBtn: 'Solicitar reasignación',
            cancelTextBtn: 'Cerrar',
          });
        }
      }
    } else if (status === HTTPResStatusCodeEnum.CLIENTE_EXISTS_IN_DB) {
      ToastWrapper.info(err?.response?.data?.message);
      form.reset({
        ...form.getValues(),
        es_cliente: true,
      });
    } else {
      form.reset({
        isFormBlocked: true,
      });
      handleAxiosError(err);
    }
    setIsCheckingIdentificacion(false);
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
  const searchCedulaMutation =
    useValidateCedulaSolService<ValidateIdentificacionParams>({
      enableErrorNavigate: false,
      customOnSuccess: data => {
        onSuccessSearchCedula(data as CedulaCitizen);
      },
      customOnError: err => {
        onErrorSearchCedula(err);
      },
    });

  const createSolUnblockSolServiceMutation =
    useCreateSolicitudDesbloqueoVentas<CreateSolicitudDesbloqueoVentasData>({
      // navigate,
      // returnUrl: returnUrlSolicitudsServicioPage,
      enableErrorNavigate: false,
    });

  const handleFetchCedulaRucInfo = async (value: string) => {
    if (watchedIdentificationType === IdentificationTypeEnumChoice.CEDULA) {
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
        // consultarEquifax.mutateAsync({
        //   identificacion: value,
        //   tipo_identificacion: EquifaxEdentificationType.RUC,
        // }),
        // await useSearchRucMutation.mutateAsync({
        //   ruc: value,
        // })
      ]);
      setIsCheckingIdentificacion(false);
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
      email: '',
      celular: '',
      es_cliente: false,
      estado_solicitud: EstadoSolicitudServicioEnumChoice.INGRESADO,
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

  const isCustomLoading = isLoadingPaises || isRefetchingPaises;
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
      <>
        {watchedIsCliente && (
          <CustomCardAlert
            sizeType="small"
            alertMessage={'El cliente ya existe'}
            alertSeverity="info"
          />
        )}
      </>

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
          form.setValue('es_tercera_edad', calcIsTerceraEdad(value));

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

      <Grid item container xs={12} justifyContent="flex-end">
        <Grid item {...gridSizeMdLg8}>
          {!!watchedIsTerceraEdad && (
            <CustomCardAlert
              sizeType="small"
              alertMessage={'El cliente es de tercera edad'}
              alertSeverity="info"
            />
          )}
        </Grid>

        <SampleCheckbox
          label="Es discapacitado"
          name="es_discapacitado"
          control={form.control}
          defaultValue={form.getValues().es_discapacitado}
          size={gridSizeMdLg4}
          justifyContent="flex-end"
        />
      </Grid>

      {/* ------------- location ------------- */}
      <LocationZonePolygonFormPart
        form={form}
        initialCoords={''}
        isEdit={false}
        ptLabel={CustomTypoLabelEnum.ptMiddlePosition}
      />

      {/* ============= loaders ============= */}
      <CustomScanLoad isOpen={isCheckingIdentificacion} name="cedula" />
    </SingleFormBoxScene>
  );
};

export default SaveSolicitudServicio;
