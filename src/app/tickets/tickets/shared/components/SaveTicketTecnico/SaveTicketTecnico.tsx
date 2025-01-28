import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { returnUrlTicketsCrear } from '../../../pages/tables/TicketsPage';
import {
  ApiResponse,
  BucketKeyTicketEnumChoice,
  BucketTypeEnumChoice,
  ContratoData,
  FindByIdentification,
  getKeysFormErrorsMessage,
  gridSizeMdLg6,
  IdentificationTypeEnumChoice,
  ToastWrapper,
  TURNOS_TICKETS_ARRAY_CHOICES,
  useLoaders,
  useUploadImageGeneric,
} from '@/shared';
import { useEffect, useState } from 'react';
import {
  CustomAutocomplete,
  CustomDatePicker,
  CustomIdentificacionTextField,
  CustomScanLoad,
  CustomTextArea,
  CustomTextField,
  InputAndBtnGridSpace,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';

import { CiSearch } from 'react-icons/ci';
import { ticketFormSchema } from '@/shared/utils/validation-schemas/app/tickets/ticket.schema';
import {
  CreateSolTicket,
  CreateTicketParamsBase,
  TicketTSQEnum,
  useFetchAsuntos,
  useFetchOrigenes,
  useSearchCedulaMutation,
} from '@/actions/app/tickets';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import { ClienteExist } from '@/shared/interfaces/app/comercial/solicitud-servicio/client-mikrowisp.interface';
import { ServicesAlertModal } from '@/app/comercial/solicitud-servicio/shared/components';
import { Grid } from '@mui/material';
import { Asunto, Origen } from '@/shared/interfaces/app/ticket';
import DocsSaveFotosOpenTicket from '../SaveFotosOpenTicket/DocsSaveFotosOpenTicket';
import { useGenericPOST } from '@/actions/shared';
import { uploadFileToBucket } from '@/actions/statics-api';

export type SaveTicketTecnicoProps = {
  title: string;
  onClose?: () => void;
  ticket?: Ticket;
};

type SaveFormData = CreateTicketParamsBase & {
  // helper
  isFormBlocked?: boolean;
  isValidIdentificacion?: boolean;
  numero_contrato: string;
};

const SaveTicketTecnico: React.FC<SaveTicketTecnicoProps> = ({
  title,
  ticket,
}) => {
  const navigate = useNavigate();

  ///* local state -----------------
  const [isCheckingIdentificacion, setIsCheckingIdentificacion] =
    useState<boolean>(false);
  const [clientData] = useState<ClienteExist | null>(null);

  const [aplicaRestriccionCiudadano, setAplicaRestriccionCiudadano] =
    useState<boolean>(false);
  const [isExtranjeroCedulado, setIsExtranjeroCedulado] =
    useState<boolean>(false);

  const [isDefuncion] = useState<boolean>(false);

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(ticketFormSchema) as any,
    defaultValues: {
      tipo_identificacion: IdentificationTypeEnumChoice.CEDULA,
      // reset es cliente modal alert
      es_cliente: false,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const watchedIdentificationType = form.watch('tipo_identificacion');
  const watchedIdentification = form.watch('identificacion');
  const watchedIsFormBlocked = form.watch('isFormBlocked');
  const watchedIsCliente = form.watch('es_cliente');

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

  ///* mutations ---------------------

  const searchCedulaMutation = useSearchCedulaMutation();

  ///* handlers ---------------------

  const {
    UploadImageDropZoneComponent,
    image1: viviendaImg,
    setImage1: setViviendaImg,
    image2: opcionalImg,
    setImage2: setOpcionalImg,
  } = useUploadImageGeneric();

  // handlers ------------

  const clearForm = () => {
    form.reset({
      ...form.getValues(),
      origen_ticket: undefined,
      asunto_ticket: undefined,
      numero_contrato: '',
      razon_social: '',
      coordenadas: '',
      franja_horaria: '',
      fecha_sugerida_visita: '',
      zona: '',
      telefono: '',
      celular_adicional: '',
      nap: '',
      valor_a_cobrar: '',
      detalle_adicional_ticket: '',
      url_foto_vivienda: '',
      url_foto_opcional: '',
    });

    setAplicaRestriccionCiudadano(false);
    setIsExtranjeroCedulado(false);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!ticket?.id) return;
    reset(ticket);
  }, [ticket, reset]);

  const [cedulaData, setCedulaData] =
    useState<ApiResponse<FindByIdentification> | null>(null);

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

  useEffect(() => {
    if (searchCedulaMutation.data) {
      console.log(searchCedulaMutation.data); // Manejar los datos cuando estén disponibles
    }
  }, [searchCedulaMutation.data]);

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
        form.setValue(
          'razon_social',
          contrato.solicitud_servicio_data.razon_social,
        );

        form.setValue(
          'coordenadas',
          contrato.solicitud_servicio_data.coordenadas,
        );

        form.setValue('telefono', contrato.solicitud_servicio_data.celular);

        form.setValue('zona', contrato.zona_data.name);
        form.setValue('celular_adicional', contrato.celular_adicional);
        form.setValue('nap', contrato.nap_data.name);
      } else {
        console.log('No se encontró el contrato con el número especificado.');
      }
    }
  }, [numeroContrato, cedulaData, form]);

  const requestUpdOT = useGenericPOST<CreateSolTicket, Ticket>(
    '/ticket-tecnico/',
    TicketTSQEnum.TICKETS,
    {
      customMessageToast: 'Ticket creado con éxito',
      navigate,
      returnUrl: returnUrlTicketsCrear,
      customOnSuccess() {
        navigate(returnUrlTicketsCrear);
      },
    },
  );

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

    await requestUpdOT.mutate({
      url_foto_vivienda: viviendaUrl?.streamUlr || '',
      url_foto_opcional: opcionalUrl?.streamUlr || '',
      linea_servicio: parseInt(data?.numero_contrato),
      origen_ticket: data.origen_ticket,
      asunto_ticket: data.asunto_ticket,
      detalle_adicional_ticket: data.detalle_adicional_ticket,
      fecha_sugerida_visita: data.fecha_sugerida_visita,
      franja_horaria: data.franja_horaria,
    });
  };

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlTicketsCrear)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
      disableSubmitBtn={
        watchedIsFormBlocked ||
        // !watchedIsValidIdentificacion ||
        (aplicaRestriccionCiudadano && isExtranjeroCedulado) ||
        isDefuncion
      }
    >
      <Grid item container>
        <ServicesAlertModal
          clientData={clientData}
          watchedIsCliente={watchedIsCliente!}
        />
      </Grid>
      <InputAndBtnGridSpace
        inputNode={
          <CustomIdentificacionTextField
            label="Identificación"
            name="identificacion"
            control={form.control}
            selectedDocumentType={watchedIdentificationType!}
            error={errors.identificacion}
            helperText={errors.identificacion?.message}
            onFetchCedulaRucInfo={async value => {
              console.log('value', value);
              await handleFetchCedulaRucInfo(value);
            }}
            disabled={!watchedIdentificationType}
            onChangeValue={value => {
              if (!value?.length || value.length === 10) {
                clearForm();
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
            watchedIdentificationType == IdentificationTypeEnumChoice.CEDULA &&
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
          setNumeroContrato(i.numero_contrato);
        }}
      />

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
            name="razon_social"
            control={form.control}
            defaultValue={form.getValues().razon_social}
            error={errors.razon_social}
            helperText={errors.razon_social?.message}
            size={gridSizeMdLg6}
            disabled
          />

          <CustomTextField
            label={'Coordenadas'}
            name="coordenadas"
            control={form.control}
            defaultValue={form.getValues().razon_social}
            error={errors.razon_social}
            helperText={errors.razon_social?.message}
            size={gridSizeMdLg6}
            disabled
          />

          <CustomTextField
            label={'Zona'}
            name="zona"
            control={form.control}
            defaultValue={form.getValues().zona}
            error={errors.zona}
            helperText={errors.zona?.message}
            size={gridSizeMdLg6}
            disabled
          />

          <CustomTextField
            label={'Telefono'}
            name="telefono"
            control={form.control}
            defaultValue={form.getValues().telefono}
            error={errors.telefono}
            helperText={errors.telefono?.message}
            size={gridSizeMdLg6}
            disabled
          />

          <CustomTextField
            label={'Celular adicional'}
            name="celular_adicional"
            control={form.control}
            defaultValue={form.getValues().celular_adicional}
            error={errors.celular_adicional}
            helperText={errors.celular_adicional?.message}
            size={gridSizeMdLg6}
            disabled
          />

          <CustomTextField
            label={'Caja'}
            name="nap"
            control={form.control}
            defaultValue={form.getValues().nap}
            error={errors.nap}
            helperText={errors.nap?.message}
            size={gridSizeMdLg6}
            disabled
          />

          <CustomAutocomplete<Origen>
            label="Origen"
            name="origen_ticket"
            valueKey="name"
            actualValueKey="id"
            control={form.control}
            defaultValue={form.getValues().origen_ticket}
            options={origenesPaginatedRes?.data.items || []}
            isLoadingData={isLoadingOrigenes}
            error={errors.origen_ticket}
            helperText={errors.origen_ticket?.message}
            size={gridSizeMdLg6}
          />

          <CustomAutocomplete<Asunto>
            label="Asunto"
            name="asunto_ticket"
            valueKey="name"
            actualValueKey="id"
            control={form.control}
            defaultValue={form.getValues().asunto_ticket}
            options={asuntosPaginatedRes?.data.items || []}
            isLoadingData={isLoadingAsuntos}
            error={errors.asunto_ticket}
            helperText={errors.asunto_ticket?.message}
            size={gridSizeMdLg6}
            onChangeRawValue={e => {
              form.setValue('valor_a_cobrar', e.valor_cobrar.toString());
            }}
          />

          <CustomTextField
            label={'Valor a cobrar'}
            name="valor_a_cobrar"
            control={form.control}
            defaultValue={form.getValues().valor_a_cobrar}
            error={errors.valor_a_cobrar}
            helperText={errors.valor_a_cobrar?.message}
            disabled
          />

          <SelectArrayString
            label="Franja Horaria"
            name="franja_horaria"
            control={form.control}
            defaultValue={form.getValues().franja_horaria}
            error={errors.franja_horaria}
            helperText={errors.franja_horaria?.message}
            options={TURNOS_TICKETS_ARRAY_CHOICES}
            gridSize={gridSizeMdLg6}
          />

          <CustomDatePicker
            label="Fecha Sugerida Visita"
            name="fecha_sugerida_visita"
            control={form.control}
            defaultValue={form.getValues().fecha_sugerida_visita ?? ''}
            error={errors.fecha_sugerida_visita}
            helperText={errors.fecha_sugerida_visita?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextArea
            label={'Detalle Adicional Ticket'}
            name="detalle_adicional_ticket"
            control={form.control}
            defaultValue={form.getValues().detalle_adicional_ticket}
            error={errors.detalle_adicional_ticket}
            helperText={errors.detalle_adicional_ticket?.message}
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
        </>
      )}

      {/* ============= loaders ============= */}
      <CustomScanLoad isOpen={isCheckingIdentificacion} name="cedula" />
    </SingleFormBoxScene>
  );
};

export default SaveTicketTecnico;
