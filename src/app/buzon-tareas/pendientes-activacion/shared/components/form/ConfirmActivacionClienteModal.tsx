import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
  LineaServicioTSQEnum,
  RejectInstalacionOTData,
  useFetchMotivoRubroAdicionals,
} from '@/actions/app';
import { useGenericPATCH, useGenericPOST } from '@/actions/shared';
import {
  activacionClienteFormSchema,
  getKeysFormErrorsMessage,
  gridSizeMdLg12,
  LineaServicio,
  motivoBaseMantenedorActivacionBaseEnumChoice,
  MotivoRubroAdicional,
  tipoRubroAdicionalMantenedorEnumChoice,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomDatePicker,
  CustomTextArea,
  ScrollableDialogProps,
} from '@/shared/components';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useFetchMantenedorActivaciones } from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion.actions';
import { useFetchMantenedorActivacionesBase } from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion-base.actions';

interface CreateSolRecoordinacionAgendaResponse {
  aplica_reconexion?: boolean;
  aplica_activacion?: boolean;
}

type SaveFormData = {
  linea_servicio: number;
};

export type ConfirmActivacionClienteModalProps = {
  open: boolean;
  onClose: () => void;
  serviceLine: LineaServicio;
  returnUrl: string;
};

type FormData = RejectInstalacionOTData & {
  motivo: number;
  motivo_name: string;
  observacion: string;
  fecha_promesa_pago: string;
};

const ConfirmActivacionClienteModal: React.FC<
  ConfirmActivacionClienteModalProps
> = ({ onClose, open, serviceLine, returnUrl }) => {
  const createSolRecoordinacionAgenda = useGenericPOST<
    SaveFormData,
    CreateSolRecoordinacionAgendaResponse
  >('/activacion-internet/calculate/details/', 'calculate-details', {
    customMessageToast:
      'Se ha solicitado la aprobacion manual de la preventa con éxito',
    overrideOnError: false,
    customOnSuccess() {},
    customOnError() {},
  });

  ///* hooks ---------------------
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<FormData>({
    resolver: yupResolver(activacionClienteFormSchema) as any,
  });

  const watchedMotivoName = form.watch('motivo_name');

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  ///* fetch data ---------------------
  const {
    data: motivosRubroAdicionalPagingRes,
    isLoading: isLoadingMotivosRubroAdicional,
    isRefetching: isRefetchingMotivosRubroAdicional,
  } = useFetchMotivoRubroAdicionals({
    params: {
      page_size: 1000,
      tipo_rubro_adicional:
        createSolRecoordinacionAgenda?.data?.data?.aplica_reconexion === true
          ? tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_RECONEXIONES
          : createSolRecoordinacionAgenda?.data?.data?.aplica_activacion ===
              true
            ? tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_ACTIVACIONES
            : tipoRubroAdicionalMantenedorEnumChoice.GENERAL,
    },
  });

  const {
    data: mantenedorActivacionesBasePagingRes,
    isLoading: isLoadingMantenedorActivacionesBase,
    isRefetching: isRefetchingMantenedorActivacionesBase,
  } = useFetchMantenedorActivacionesBase({
    params: {
      page_size: 1,
      motivo_base: motivoBaseMantenedorActivacionBaseEnumChoice.PROMESA_DE_PAGO,
    },
  });

  const {
    data: mantenedorActivacionesPagingRes,
    isLoading: isLoadingMantenedorActivaciones,
    isRefetching: isRefetchingMantenedorActivaciones,
  } = useFetchMantenedorActivaciones({
    params: {
      page_size: 1000,
      id: mantenedorActivacionesBasePagingRes?.data.items[0].id,
      state: true,
    },
  });

  ///* mutations ---------------------
  const prerejectInstalacionAsignada = useGenericPATCH(
    `/linea-servicio/reactivate/${serviceLine?.id!}/`,
    LineaServicioTSQEnum.LINEASERVICIO,
    {
      customMessageToast: 'Activacion realizada con éxito',
      navigate,
      returnUrl: returnUrl,
      customOnSuccess() {
        handleClose();
      },
    },
  );

  ///* handlers ---------------------
  const onSave = (data: FormData) => {
    if (
      watchedMotivoName ===
      motivoBaseMantenedorActivacionBaseEnumChoice.PROMESA_DE_PAGO
    ) {
      prerejectInstalacionAsignada.mutate({
        motivo_reactivacion: data.motivo,
        promesa_pago_body: {
          linea_servicio: serviceLine.id,
          observacion: data.observacion,
          fecha_promesa_pago: data.fecha_promesa_pago,
        },
      });
    } else {
      prerejectInstalacionAsignada.mutate({
        motivo_reactivacion: data.motivo,
      });
    }
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  ///* effects ---------------------
  const isLoading =
    isLoadingMantenedorActivacionesBase ||
    isRefetchingMantenedorActivacionesBase ||
    isLoadingMotivosRubroAdicional ||
    isRefetchingMotivosRubroAdicional ||
    isLoadingMantenedorActivaciones ||
    isRefetchingMantenedorActivaciones;

  useEffect(() => {
    if (isLoading || !open) return;
    if (!motivosRubroAdicionalPagingRes?.data?.items?.length) {
      ToastWrapper.error('No se encontraron motivos de rechazo');
    }
  }, [isLoading, motivosRubroAdicionalPagingRes, open]);

  useEffect(() => {
    if (open) {
      createSolRecoordinacionAgenda.mutate({
        linea_servicio: serviceLine.id,
      });
    }
  }, [open]); // Dependencia del open

  useLoaders(isLoading);

  if (!open) return null;

  return (
    <ScrollableDialogProps
      open={open}
      title={`Activar cliente ${serviceLine?.cliente_data?.razon_social} con contrato ${serviceLine?.contrato_data?.numero_contrato}`}
      width="60%"
      onConfirm={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Campos requeridos: ${keys}`);
      })}
      onClose={handleClose}
      cancelTextBtn="Cerrar"
      contentNode={
        <Grid item container xs={12} spacing={3} mt={0.01} mb={3}>
          <Grid item xs={12}>
            <Typography variant="body1">
              ¿Está seguro que desea activar al cliente? De ser así seleccione
              un motivo.
            </Typography>
          </Grid>

          <CustomAutocomplete<MotivoRubroAdicional>
            label="Motivo"
            name="motivo"
            // options
            options={motivosRubroAdicionalPagingRes?.data?.items || []}
            valueKey="nombre"
            actualValueKey="id"
            defaultValue={form.getValues().motivo}
            isLoadingData={
              isLoadingMotivosRubroAdicional ||
              isRefetchingMotivosRubroAdicional
            }
            // vaidation
            control={form.control}
            error={errors.motivo}
            helperText={errors.motivo?.message}
            onChangeRawValue={e => {
              form.setValue('motivo_name', e.nombre);
            }}
          />

          {watchedMotivoName ===
          motivoBaseMantenedorActivacionBaseEnumChoice.PROMESA_DE_PAGO ? (
              <>
                <CustomTextArea
                  label="Observación"
                  name="observacion"
                  control={form.control}
                  defaultValue={form.getValues().observacion}
                  error={errors.observacion}
                  helperText={errors.observacion?.message}
                  required={false}
                />

                <CustomDatePicker
                  label="Fecha para promesa de pago"
                  name="fecha_promesa_pago"
                  control={form.control}
                  defaultValue={form.getValues().fecha_promesa_pago}
                  error={errors.fecha_promesa_pago}
                  helperText={errors.fecha_promesa_pago?.message}
                  size={gridSizeMdLg12}
                  minDate={dayjs()}
                  maxDate={
                    mantenedorActivacionesPagingRes?.data?.items?.[0]
                      ?.mantenedor_base_data?.tiempo_limite
                      ? dayjs()
                        .add(
                          mantenedorActivacionesPagingRes?.data?.items?.[0]
                            ?.mantenedor_base_data?.tiempo_limite!,
                          'day',
                        )
                        .format('YYYY-MM-DD')
                      : undefined
                  }
                />
              </>
            ) : (
              <></>
            )}
        </Grid>
      }
    />
  );
};

export default ConfirmActivacionClienteModal;
