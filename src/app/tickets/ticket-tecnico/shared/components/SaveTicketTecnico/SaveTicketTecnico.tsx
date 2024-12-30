import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { returnUrlTicketsCrear } from '../../../pages/tables/TicketTenicoPage';
import {
  ApiResponse,
  ContratoData,
  FindByIdentification,
  getKeysFormErrorsMessage,
  gridSizeMdLg6,
  IdentificationTypeEnumChoice,
  ToastWrapper,
  useIsMediaQuery,
  useLoaders,
  useUploadImageGeneric,
} from '@/shared';
import { useEffect, useState } from 'react';
import {
  CustomAutocomplete,
  CustomIdentificacionTextField,
  CustomScanLoad,
  CustomTextArea,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  InputAndBtnGridSpace,
  SingleFormBoxScene,
} from '@/shared/components';

import { CiSearch } from 'react-icons/ci';
import { ticketTecnicoFormSchema } from '@/shared/utils/validation-schemas/app/tickets/ticket-tecnico.schema';
import {
  CreateTicketParamsBase,
  useCreateTicket,
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
import { SingleImageModal } from '@/shared/components/ui';

export type SaveTicketTecnicoProps = {
  title: string;
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

  ///* global state -----------------

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(ticketTecnicoFormSchema) as any,
    defaultValues: {
      tipo_identificacion: IdentificationTypeEnumChoice.CEDULA,
      // reset es cliente modal alert
      es_cliente: false,
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
  const watchedIsCliente = form.watch('es_cliente');

  // const { data, isLoading, isRefetching } = useGetClientTicket(
  //   watchedIdentification!,
  // );

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

  const createAsuntoMutation = useCreateTicket({
    navigate,
    returnUrl: returnUrlTicketsCrear,
    enableErrorNavigate: false,
  });

  ///* handlers ---------------------

  // handlers ------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* create
    createAsuntoMutation.mutate(data);
  };

  const clearForm = () => {
    form.reset({
      ...form.getValues(),
      identificacion: '',
      origen: undefined,
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
        // Ahora puedes acceder a la respuesta
        setCedulaData(response ?? null);
        console.log(response); // Aquí obtienes la data
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

  const {
    UploadImageDropZoneComponent,
    image1: viviendaImg,
    setImage1: setViviendaImg,
    image2: opcionalImg,
    setImage2: setOpcionalImg,
  } = useUploadImageGeneric();

  const isMobile = useIsMediaQuery('sm');

  const titleAndImage = (title: string, imgUrl: string) => {
    return (
      <Grid item xs={isMobile ? 8 : 6} sx={isMobile ? { mb: 2 } : {}} pb={2}>
        <CustomTypoLabel
          text={title}
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <SingleImageModal
          image={{
            id: 1,
            imgUrl: imgUrl || '',
            title: title,
          }}
          widthPercentage={isMobile ? '100%' : '60%'}
        />
      </Grid>
    );
  };

  const [numeroContrato, setNumeroContrato] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (cedulaData?.data) {
      const contrato = cedulaData.data.find(
        item => item.contrato_data.numero_contrato === numeroContrato,
      );

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
  }, [numeroContrato, cedulaData]);

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
        !watchedIsValidIdentificacion ||
        (aplicaRestriccionCiudadano && isExtranjeroCedulado) ||
        isDefuncion
      }
    >
      <Grid item container>
        <ServicesAlertModal
          clientData={clientData}
          watchedIsCliente={watchedIsCliente}
        />
      </Grid>
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
              console.log('value', value);
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

      <CustomAutocomplete<ContratoData>
        label="Numero de contrato"
        name="numero contrato"
        // options
        options={
          cedulaData?.data?.map(item => ({
            ...item,
            numero_contrato: item?.contrato_data?.numero_contrato,
          })) || []
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
      />

      <CustomTextField
        label={'Coordenadas'}
        name="coordenadas"
        control={form.control}
        defaultValue={form.getValues().razon_social}
        error={errors.razon_social}
        helperText={errors.razon_social?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label={'Zona'}
        name="zona"
        control={form.control}
        defaultValue={form.getValues().zona}
        error={errors.zona}
        helperText={errors.zona?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label={'Telefono'}
        name="telefono"
        control={form.control}
        defaultValue={form.getValues().telefono}
        error={errors.telefono}
        helperText={errors.telefono?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label={'Celular adicional'}
        name="celular_adicional"
        control={form.control}
        defaultValue={form.getValues().celular_adicional}
        error={errors.celular_adicional}
        helperText={errors.celular_adicional?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label={'Caja'}
        name="nap"
        control={form.control}
        defaultValue={form.getValues().nap}
        error={errors.nap}
        helperText={errors.nap?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Origen>
        label="Origen"
        name="origen"
        valueKey="name"
        actualValueKey="id"
        control={form.control}
        defaultValue={form.getValues().origen}
        options={origenesPaginatedRes?.data.items || []}
        isLoadingData={isLoadingOrigenes}
        error={errors.origen}
        helperText={errors.origen?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Asunto>
        label="Asunto"
        name="asunto"
        valueKey="name"
        actualValueKey="id"
        control={form.control}
        defaultValue={form.getValues().asunto}
        options={asuntosPaginatedRes?.data.items || []}
        isLoadingData={isLoadingAsuntos}
        error={errors.asunto}
        helperText={errors.asunto?.message}
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
        viviendaImg={viviendaImg}
        setViviendaImg={setViviendaImg}
        viviendaImgLabel={titleAndImage(
          'Foto Vivienda Cliente',
          ticket?.url_foto_vivienda || '',
        )}
        // cedula no rostro
        opcionalImg={opcionalImg}
        setOpcionalImg={setOpcionalImg}
        opcionalImgLabel={titleAndImage(
          'Foto Opcional',
          ticket?.url_foto_opcional || '',
        )}
        UploadImageDropZoneComponent={UploadImageDropZoneComponent}
      />

      {/* ============= loaders ============= */}
      <CustomScanLoad isOpen={isCheckingIdentificacion} name="cedula" />
    </SingleFormBoxScene>
  );
};

export default SaveTicketTecnico;
