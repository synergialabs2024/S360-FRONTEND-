/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { gridSizeMdLg12, gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  CustomAutocomplete,
  CustomDatePicker,
  CustomIdentificacionTextField,
  CustomScanLoad,
  CustomTextArea,
  CustomTextField,
  CustomTextFieldNoForm,
  InputAndBtnGridSpace,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  useFetchAsuntos,
  useFetchOrigenes,
  useGetZoneByCoords,
  useSearchCedulaMutation,
} from '@/actions/app';
import {
  ApiResponse,
  Asunto,
  BucketKeyTicketEnumChoice,
  BucketTypeEnumChoice,
  ContratoData,
  FindByIdentification,
  getKeysFormErrorsMessage,
  IdentificationTypeEnumChoice,
  Origen,
  ToastWrapper,
  TURNOS_TICKETS_ARRAY_CHOICES,
  useLoaders,
  useUploadImageGeneric,
} from '@/shared';
import { CiSearch } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import DocsSaveFotosOpenTicket from '@/app/tickets/tickets/shared/components/SaveFotosOpenTicket/DocsSaveFotosOpenTicket';
import {
  CreateCambioDomicilioParamsBase,
  useCreateCambioDomicilio,
} from '@/actions/app/cartera/cambio-domicilio';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { LocationZonePolygonFormPart } from '@/app/operaciones/agedamiento/shared/components/form';
import { uploadFileToBucket } from '@/actions/statics-api';
import { returnUrlCambioDomicilioPage } from '../../../pages/tables/CambioDomicilioByStatePage';
import { cambioDomicilioFormSchema } from '@/shared/utils/validation-schemas/app/cartera/cambio-domicilio';

export interface SavePromesaPagoProps {
  title: string;
}
type SaveFormData = CreateCambioDomicilioParamsBase & {
  // helper
  isFormBlocked?: boolean;
  isValidIdentificacion?: boolean;
  numero_contrato: string;
  cityName?: string;
  provinceName?: string;
  zoneName?: string;
  sectorName?: string;
  thereIsCoverage?: boolean;
  thereAreNaps?: boolean;
  tipo_servicio?: string;
  tipo_plan?: string;
  plan_internet?: string;
  //
  identificacion?: string;
  tipo_identificacion?: string;
  //
  sector?: number; // select
  //
  coordenadas: string; // to get factibilidad directly
  zona?: number;
  tiene_cobertura: boolean;
  direccion_referencia: string;
  ciudad?: number;
  provincia?: number;
  pais?: number;
  plan_sugerido_buro: string;
};
const SaveCambioDomicilio: React.FC<SavePromesaPagoProps> = ({ title }) => {
  ///* local state -------------------

  ///* mutations ---------------------

  const searchCedulaMutation = useSearchCedulaMutation();

  const navigate = useNavigate();
  const [isCheckingIdentificacion, setIsCheckingIdentificacion] =
    useState<boolean>(false);
  /*   const [cansearch, setCansearch] =
    useState<boolean>(false); */
  ///* form -----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(cambioDomicilioFormSchema) as any,
    defaultValues: {
      // estado_solicitud: EstadoSolicitudServicioEnumChoice.INGRESADO,
      // es_tercera_edad: false,
      // es_discapacitado: false,
      // es_cliente: false,
      // tiene_cobertura: false,
      // isFormBlocked: false,
      // thereIsCoverage: false,
      // thereAreNaps: false,
      // tipo_identificacion: IdentificationTypeEnumChoice.CEDULA,
      tipo_identificacion: IdentificationTypeEnumChoice.CEDULA,
      // reset es cliente modal alert
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const watchedIdentification = form.watch('identificacion');
  const watchedIdentificationType = form.watch('tipo_identificacion');

  const watchedCoors = form.watch('coordenadas');

  // map ---------------
  const { latLng, napsByCoords, isLoadingNaps, isRefetchingNaps, setLatLng } =
    useMapComponent({
      form,
      initialCoords: watchedCoors ? watchedCoors : '',
      enableFetchNaps: true,
    });
  useLocationCoords({
    isEditting: true,
    form,
    setLatLng,
  });

  ///* fetch data ---------------------

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

  ///* handlers ---------------------

  const {
    UploadImageDropZoneComponent,
    image1: viviendaImg,
    setImage1: setViviendaImg,
    image2: opcionalImg,
    setImage2: setOpcionalImg,
  } = useUploadImageGeneric();

  ///* fetch data ---------------------

  const {
    data: origenesPaginatedRes,
    isLoading: isLoadingOrigenes,
    isRefetching: isRefetchingOrigenes,
  } = useFetchOrigenes({
    params: {
      page_size: 200,
    },
  });

  const {
    data: asuntosPaginatedRes,
    isLoading: isLoadingAsuntos,
    isRefetching: isRefetchingAsunto,
  } = useFetchAsuntos({
    params: {
      page_size: 200,
    },
  });

  //

  const [cedulaData, setCedulaData] =
    useState<ApiResponse<FindByIdentification> | null>(null);
  const [numeroContrato, setNumeroContrato] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (Array.isArray(cedulaData?.data)) {
      console.log('cedulaData.data', cedulaData.data);

      if (cedulaData.data.length === 0) {
        ToastWrapper.error('No existen lineas para la cedula digitada');
      }

      const contrato = cedulaData.data.find(
        item => item.contrato_data.numero_contrato === numeroContrato,
      );

      console.log('contrato', contrato);

      if (contrato) {
        const ticketVisitaBody = {
          ...contrato.solicitud_servicio_data,
          celular_adicional: contrato.celular_adicional,
          telefono: contrato.solicitud_servicio_data.celular,
          zona: contrato.zona_data.name, // Actualizas solo la propiedad zona
          nap: contrato.nap_data.name,
        };
        form.setValue('ticket_visita_body', ticketVisitaBody);
        form.setValue('coordenadas', ticketVisitaBody.coordenadas);
      } else {
        console.log('No se encontró el contrato con el número especificado.');
      }
    }
  }, [numeroContrato, cedulaData, form]);

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

  const createSolUnblockSolServiceMutation = useCreateCambioDomicilio({
    enableErrorNavigate: false,
    customOnSuccess: () => {
      navigate(returnUrlCambioDomicilioPage);
    },
    navigate,
    returnUrl: returnUrlCambioDomicilioPage,
  });

  const requiredImages = [
    {
      label: 'Foto vivienda',
      image: viviendaImg,
      setImage: setViviendaImg,
      isRequired: true,
    },
    {
      label: 'Foto opcional',
      image: viviendaImg,
      setImage: setOpcionalImg,
      isRequired: false,
    },
  ];

  const onSave = async (data: SaveFormData) => {
    console.log('data', data);
    let atLeastOneImageUploaded = false;

    requiredImages.forEach(({ isRequired, image }) => {
      if (isRequired && image) {
        atLeastOneImageUploaded = true;
      }
    });

    if (!atLeastOneImageUploaded) {
      ToastWrapper.error('No se ha subido ninguna imagen requerida.');
      return;
    }

    const [viviendaUrl, opcionalUrl] = await Promise.all([
      uploadFileToBucket({
        file: viviendaImg!,
        file_name: BucketKeyTicketEnumChoice.FOTO_VIVIENDA,
        bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
      }),
      uploadFileToBucket({
        file: opcionalImg!,
        file_name: BucketKeyTicketEnumChoice.FOTO_OPCIONAL,
        bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
      }),
    ]);

    createSolUnblockSolServiceMutation.mutate({
      linea_servicio: data.ticket_visita_body.linea_servicio,
      ticket_visita_body: {
        url_foto_vivienda: viviendaUrl?.streamUlr || '',
        url_foto_opcional: opcionalUrl?.streamUlr || '',
        linea_servicio: parseInt(data?.numero_contrato),
        origen_ticket: data.ticket_visita_body.origen_ticket,
        asunto_ticket: data.ticket_visita_body.asunto_ticket,
        detalle_adicional_ticket:
          data.ticket_visita_body.detalle_adicional_ticket,
        fecha_sugerida_visita: data.ticket_visita_body.fecha_sugerida_visita,
        franja_horaria: data.ticket_visita_body.franja_horaria,
      },
      new_coordenadas: data.coordenadas,
      new_direccion_referencia: data.direccion_referencia,
      new_pais: data.ticket_visita_body.pais,
      new_provincia: data.provincia,
      new_ciudad: data.ciudad,
      new_zona: data.zona,
      new_sector: data.sector,
    });
  };

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
        setCedulaData(response ?? null);
        // Ahora puedes acceder a la respuesta
        console.log(searchCedulaMutation.data); // Aquí obtienes la data
      } catch (error) {
        // Manejo de errores si la mutación falla
        ToastWrapper.error('Error al obtener los datos');
      } finally {
        setIsCheckingIdentificacion(false);
      }
    }
  };

  const isCustomLoadingOrigenes = isLoadingOrigenes || isRefetchingOrigenes;
  useLoaders(isCustomLoadingOrigenes);

  const isCustomLoadingAsuntos = isLoadingAsuntos || isRefetchingAsunto;
  useLoaders(isCustomLoadingAsuntos);

  const isCustomLoading =
    isLoadingNaps ||
    isRefetchingNaps ||
    isRefetchingNaps ||
    isLoadingNaps ||
    isLoadingZonaByCoords ||
    isRefetchingZonaByCoords;
  useLoaders(isCustomLoading);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCambioDomicilioPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
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
              selectedDocumentType={watchedIdentificationType!}
              defaultValue={form.getValues().identificacion}
              error={errors.identificacion}
              helperText={errors.identificacion?.message}
              onFetchCedulaRucInfo={async value => {
                await handleFetchCedulaRucInfo(value);
              }}
              disabled={!watchedIdentificationType}
              onChangeValue={value => {
                if (!value?.length || value.length === 10) {
                  // clearForm();
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
              return ToastWrapper.warning('Ingrese una cédula válida');
            if (
              watchedIdentificationType == IdentificationTypeEnumChoice.RUC &&
              watchedIdentification?.length < 13
            )
              return ToastWrapper.warning('Ingrese RUC válido');
            handleFetchCedulaRucInfo(watchedIdentification);
          }}
        />
        <CustomAutocomplete<ContratoData>
          label="Numero de contrato"
          name="numero_contrato"
          // options
          options={
            Array.isArray(cedulaData?.data)
              ? cedulaData.data.map(item => ({
                  ...item,
                  numero_contrato: item?.contrato_data?.numero_contrato,
                }))
              : []
          }
          valueKey="numero_contrato"
          actualValueKey="id"
          defaultValue={form.getValues().numero_contrato}
          isLoadingData={false}
          // vaidation
          control={form.control}
          error={errors.numero_contrato}
          helperText={errors.numero_contrato?.message}
          size={gridSizeMdLg6}
          onChangeRawValue={i => {
            console.log(form.getValues().identificacion);
            setNumeroContrato(i.numero_contrato);
          }}
        />
      </Grid>

      {numeroContrato === undefined ? (
        <></>
      ) : (
        <>
          <CustomTextField
            label={
              watchedIdentificationType === IdentificationTypeEnumChoice.RUC
                ? 'Razón social'
                : 'Nombre y Apellido'
            }
            name="ticket_visita_body.razon_social"
            control={form.control}
            defaultValue={form.getValues().ticket_visita_body?.razon_social}
            error={errors.ticket_visita_body?.razon_social}
            helperText={errors.ticket_visita_body?.razon_social?.message}
            size={gridSizeMdLg6}
            disabled
          />

          <CustomTextField
            label={'Coordenadas'}
            name="ticket_visita_body.coordenadas"
            control={form.control}
            defaultValue={form.getValues().ticket_visita_body?.coordenadas}
            error={errors.ticket_visita_body?.coordenadas}
            helperText={errors.ticket_visita_body?.coordenadas?.message}
            size={gridSizeMdLg6}
            disabled
          />

          <CustomTextField
            label={'Zona'}
            name="ticket_visita_body.zona"
            control={form.control}
            defaultValue={form.getValues().ticket_visita_body?.zona}
            error={errors.ticket_visita_body?.zona}
            helperText={errors.ticket_visita_body?.zona?.message}
            size={gridSizeMdLg6}
            disabled
          />

          <CustomTextField
            label={'Telefono'}
            name="ticket_visita_body.telefono"
            control={form.control}
            defaultValue={form.getValues().ticket_visita_body?.telefono}
            error={errors.ticket_visita_body?.telefono}
            helperText={errors.ticket_visita_body?.message}
            size={gridSizeMdLg6}
            disabled
          />

          <CustomTextField
            label={'Celular adicional'}
            name="ticket_visita_body.celular_adicional"
            control={form.control}
            defaultValue={
              form.getValues().ticket_visita_body?.celular_adicional
            }
            error={errors.ticket_visita_body?.celular_adicional}
            helperText={errors.ticket_visita_body?.celular_adicional?.message}
            size={gridSizeMdLg6}
            disabled
          />

          <CustomTextField
            label={'Caja'}
            name="ticket_visita_body.nap"
            control={form.control}
            defaultValue={form.getValues().ticket_visita_body?.nap}
            error={errors.ticket_visita_body?.nap}
            helperText={errors.ticket_visita_body?.nap?.message}
            size={gridSizeMdLg6}
            disabled
          />

          <CustomAutocomplete<Origen>
            label="Origen"
            name="ticket_visita_body.origen_ticket"
            valueKey="name"
            actualValueKey="id"
            control={form.control}
            defaultValue={form.getValues().ticket_visita_body?.origen_ticket}
            options={origenesPaginatedRes?.data.items || []}
            isLoadingData={isLoadingOrigenes}
            error={errors.ticket_visita_body?.origen_ticket}
            helperText={errors.ticket_visita_body?.origen_ticket?.message}
            size={gridSizeMdLg6}
          />

          <CustomAutocomplete<Asunto>
            label="Asunto"
            name="ticket_visita_body.asunto_ticket"
            valueKey="name"
            actualValueKey="id"
            control={form.control}
            defaultValue={form.getValues().ticket_visita_body?.asunto_ticket}
            options={asuntosPaginatedRes?.data.items || []}
            isLoadingData={isLoadingAsuntos}
            error={errors.ticket_visita_body?.asunto_ticket}
            helperText={errors.ticket_visita_body?.asunto_ticket?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label={'Valor a cobrar'}
            name="ticket_visita_body.valor_a_cobrar"
            control={form.control}
            defaultValue={form.getValues().ticket_visita_body?.valor_a_cobrar}
            error={errors.ticket_visita_body?.valor_a_cobrar}
            helperText={errors.ticket_visita_body?.valor_a_cobrar?.message}
            disabled
          />

          <SelectArrayString
            label="Franja Horaria"
            name="ticket_visita_body.franja_horaria"
            control={form.control}
            defaultValue={form.getValues().ticket_visita_body?.franja_horaria}
            error={errors.ticket_visita_body?.franja_horaria}
            helperText={errors.ticket_visita_body?.franja_horaria?.message}
            options={TURNOS_TICKETS_ARRAY_CHOICES}
            gridSize={gridSizeMdLg6}
          />

          <CustomDatePicker
            label="Fecha Sugerida Visita"
            name="ticket_visita_body.fecha_sugerida_visita"
            control={form.control}
            defaultValue={
              form.getValues().ticket_visita_body?.fecha_sugerida_visita ?? ''
            }
            error={errors.ticket_visita_body?.fecha_sugerida_visita}
            helperText={
              errors.ticket_visita_body?.fecha_sugerida_visita?.message
            }
            size={gridSizeMdLg6}
          />

          <CustomTextArea
            label={'Detalle Adicional Ticket'}
            name="ticket_visita_body.detalle_adicional_ticket"
            control={form.control}
            defaultValue={
              form.getValues().ticket_visita_body?.detalle_adicional_ticket
            }
            error={errors.ticket_visita_body?.detalle_adicional_ticket}
            helperText={
              errors.ticket_visita_body?.detalle_adicional_ticket?.message
            }
          />

          {/* ============= Corrección Docs ============= */}
          <DocsSaveFotosOpenTicket
            UploadImageDropZoneComponent={UploadImageDropZoneComponent}
            viviendaImg={viviendaImg}
            setViviendaImg={setViviendaImg}
            // cedula no rostro
            opcionalImg={opcionalImg}
            setOpcionalImg={setOpcionalImg}
          />

          {/*  */}

          {/* ------------- location ------------- */}
          <Grid item container {...gridSizeMdLg12} spacing={2}>
            <LocationZonePolygonFormPart
              form={form}
              initialCoords={''}
              isEdit={false}
              // ptLabel={CustomTypoLabelEnum.ptMiddlePosition}
            />
          </Grid>
        </>
      )}

      {/* ============= loaders ============= */}
      <CustomScanLoad isOpen={isCheckingIdentificacion} name="cedula" />
    </SingleFormBoxScene>
  );
};
export default SaveCambioDomicilio;
