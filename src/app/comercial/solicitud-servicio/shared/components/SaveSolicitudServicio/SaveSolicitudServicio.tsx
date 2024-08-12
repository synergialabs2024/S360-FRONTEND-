/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { MdEditLocationAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import {
  CreateSolicitudServicioParamsBase,
  useCreateSolicitudServicio,
  useUpdateSolicitudServicio,
  useValidateCedulaSolService,
  ValidateIdentificacionParams,
} from '@/actions/app';
import { ToastWrapper } from '@/shared';
import {
  CustomAutocompleteArrString,
  CustomCellphoneTextField,
  CustomCoordsTextField,
  CustomDatePicker,
  CustomIdentificacionTextField,
  CustomNumberTextField,
  CustomTextField,
  InputAndBtnGridSpace,
  MapModalComponent,
  SampleCheckbox,
  SingleFormBoxScene,
  SingleIconButton,
} from '@/shared/components';
import {
  EstadoSolicitudServicioEnumChoice,
  IDENTIFICATION_TYPE_ARRAY_CHOICES,
  IdentificationTypeEnumChoice,
} from '@/shared/constants/app';
import {
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  gridSizeMdLg4,
  gridSizeMdLg6,
} from '@/shared/constants/ui';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import { SolicitudServicio } from '@/shared/interfaces';
import { CedulaCitizen } from '@/shared/interfaces/consultas-api/cedula-citizen.interface';
import { solicitudServicioFormSchema } from '@/shared/utils';
import { useUiConfirmModalStore } from '@/store/ui';
import { returnUrlSolicitudsServicioPage } from '../../../pages/tables/SolicitudesServicioMainPage';

export interface SaveSolicitudServicioProps {
  title: string;
  solicitudservicio?: SolicitudServicio;
}

type SaveFormData = CreateSolicitudServicioParamsBase & {};

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
      linea_servicio: 1,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedIdentificationType = form.watch('tipo_identificacion');
  const watchedIdentification = form.watch('identificacion');
  const watchedCoords = form.watch('coordenadas');

  const { Map, latLng, setLatLng } = useMapComponent({
    form,
    initialCoords: solicitudservicio?.id
      ? solicitudservicio.coordenadas
      : watchedCoords,
  });
  useLocationCoords({
    form,
    setLatLng,
  });

  // handlers ------------
  const onSuccessSearchCedula = (cedulaCitizen: CedulaCitizen) => {
    const correctFechaNacimiento = dayjs(
      cedulaCitizen?.fechaNacimiento,
      'DD/MM/YYYY',
    ).format('YYYY-MM-DD');

    form.reset({
      ...form.getValues(),
      razon_social: cedulaCitizen?.fullName,
      es_discapacitado: cedulaCitizen?.esDiscapacitado,
      es_tercera_edad: cedulaCitizen?.esTerceraEdad,
      fecha_nacimiento: correctFechaNacimiento,
      edad: cedulaCitizen?.edad,
      direccion: cedulaCitizen?.domicilio,

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
    const data = err?.response?.data?.data;
    const createdAt = dayjs(data?.created_at);
    const blockedUntil = dayjs(data?.block_until);
    const now = dayjs();
    const hoursBlocked = now.diff(createdAt, 'hours');
    const minutesBlocked = now.diff(createdAt, 'minutes');
    const timeBlocked = minutesBlocked > 60 ? hoursBlocked : minutesBlocked;

    // solicitud_servicio in process
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
          alert('solicitud desbloqueo');
          // TODO: solicitud desbloqueo
        },
        confirmTextBtn: 'Solicitar desbloqueo',
        cancelTextBtn: 'Cerrar',
      });
    }
  };
  ///* mutations -----------------
  const createSolicitudServicioMutation = useCreateSolicitudServicio({
    navigate,
    returnUrl: returnUrlSolicitudsServicioPage,
    enableErrorNavigate: false,
  });
  const updateSolicitudServicioMutation =
    useUpdateSolicitudServicio<CreateSolicitudServicioParamsBase>({
      navigate,
      returnUrl: returnUrlSolicitudsServicioPage,
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

    ///* upd
    if (solicitudservicio?.id) {
      updateSolicitudServicioMutation.mutate({
        id: solicitudservicio.id!,
        data,
      });
      return;
    }

    ///* create
    createSolicitudServicioMutation.mutate(data);
  };

  ///* effects -----------------
  useEffect(() => {
    if (!solicitudservicio?.id) return;
    reset(solicitudservicio);
  }, [solicitudservicio, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSolicitudsServicioPage)}
      onSave={handleSubmit(onSave, () => {
        console.log('error', errors);
        ToastWrapper.error('Faltan campos requeridos');
      })}
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
          form.setValue('identificacion', '');
          form.setValue('razon_social', '');
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
        label="Razon social"
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
        onChangeValue={() => {
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
        helperText={errors.email?.message}
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
      <CustomTextField
        label="Dirección"
        name="direccion"
        control={form.control}
        defaultValue={form.getValues().direccion}
        error={errors.direccion}
        helperText={errors.direccion?.message}
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
              startIcon={<MdEditLocationAlt />}
              label={'Ver mapa'}
              color={'default' as any}
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
                />
              }
            />
          </>
        }
        btnGridSize={gridSizeMdLg1}
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
    </SingleFormBoxScene>
  );
};

export default SaveSolicitudServicio;
