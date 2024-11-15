/* eslint-disable indent */
import { Grid, Typography } from '@mui/material';
import { HiDocumentPlus } from 'react-icons/hi2';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { returnUrlAgendamientoVentasPage } from '@/app/comercial/agendamiento/pages/tables/AgendamientoVentasMainPage';
import {
  cancelAgendaPreventaOTFormSchema,
  EstadoPagoEnumChoice,
  MotivoRechazo,
  MotivoRechazoModuloEnumChoice,
  PermissionsEnum,
  Preventa,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomTextArea,
  ScrollableDialogProps,
  SingleIconButton,
} from '@/shared/components';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CancelAgendaPreventaData,
  PreventaTSQEnum,
  useFetchMotivoRechazos,
} from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import { hasPermission } from '@/shared/utils/auth';

export type EsperaAgendaPreventaCustomButtonsProps = { preventa: Preventa };

type SaveFormData = CancelAgendaPreventaData & {};

const EsperaAgendaPreventaCustomButtons: React.FC<
  EsperaAgendaPreventaCustomButtonsProps
> = ({ preventa }) => {
  ///* local state ------------------------
  const [openModal, setOpenModal] = useState<boolean>(false);

  ///* form ------------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(cancelAgendaPreventaOTFormSchema) as any,
  });
  const { errors } = form.formState;

  ///* fetch data ------------------------
  const {
    data: motivosRechazoPagingRes,
    isLoading: isLoadingMotivoRechazo,
    isRefetching: isRefetchingMotivoRechazo,
  } = useFetchMotivoRechazos({
    params: {
      page_size: 1090,
      modulo: MotivoRechazoModuloEnumChoice.PREVENTA,
      order_by: 'name',
      order_by_asc: true,
    },
  });

  ///* mutations ------------------------
  const cancelAgendaPreventa = useGenericPATCH<
    CancelAgendaPreventaData,
    Preventa
  >(`/preventa/cancel/${preventa?.id!}/`, PreventaTSQEnum.PREVENTAS, {
    customMessageToast: 'Preventa cancelada correctamente',
    enableNavigate: false,
    customOnSuccess: () => {
      setOpenModal(false);
      form.reset();
      form.setValue('observacion_cancelacion', '');
    },
  });

  ///* handlers ------------------------
  const onSave = (data: SaveFormData) => {
    cancelAgendaPreventa.mutate({
      motivo_rechazo: data.motivo_rechazo,
      observacion_cancelacion: data.observacion_cancelacion,
    });
  };

  const customLoader = isLoadingMotivoRechazo || isRefetchingMotivoRechazo;
  useLoaders(customLoader);

  ///* hooks ------------------------
  const navigate = useNavigate();

  return (
    <>
      <Grid container item xs={12} spacing={4}>
        {(preventa?.requiere_pago_previo &&
          preventa?.estado_pago === EstadoPagoEnumChoice.PENDIENTE) ||
        preventa.contrato_aceptado ? null : (
          <Grid item xs={2}>
            <SingleIconButton
              startIcon={<HiDocumentPlus />}
              label="Crear agenda"
              color="inherit"
              onClick={() => {
                navigate(
                  `${returnUrlAgendamientoVentasPage}/crear/${preventa?.uuid}`,
                );
              }}
            />
          </Grid>
        )}

        {hasPermission(PermissionsEnum.comercial_change_preventa) ? (
          <Grid item xs={2}>
            <SingleIconButton
              startIcon={<MdCancel />}
              label="Cancelar preventa"
              color="error"
              onClick={() => {
                setOpenModal(true);
              }}
            />
          </Grid>
        ) : null}
      </Grid>

      {/* ================ modals ================ */}
      <ScrollableDialogProps
        title="Cancelar preventa"
        open={openModal}
        onClose={() => setOpenModal(false)}
        cancelTextBtn="Cerrar"
        contentNode={
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Para cancelar la preventa{' '}
                <strong>{preventa?.numero_referencia}</strong> del cliente{' '}
                <strong>
                  {preventa?.solicitud_servicio_data?.razon_social}
                </strong>
                , deberá ingresar el motivo de la cancelación y una observación.
                ¿Desea continuar?
              </Typography>
            </Grid>

            <CustomAutocomplete<MotivoRechazo>
              label="Motivo de rechazo"
              name="motivo_rechazo"
              // options
              options={motivosRechazoPagingRes?.data?.items || []}
              valueKey="name"
              actualValueKey="id"
              defaultValue={form.getValues().motivo_rechazo}
              isLoadingData={
                isLoadingMotivoRechazo || isRefetchingMotivoRechazo
              }
              // vaidation
              control={form.control}
              error={errors.motivo_rechazo}
              helperText={errors.motivo_rechazo?.message}
            />

            <CustomTextArea
              label="Observación"
              name="observacion_cancelacion"
              control={form.control}
              defaultValue={form.getValues().observacion_cancelacion}
              error={errors.observacion_cancelacion}
              helperText={errors.observacion_cancelacion?.message}
            />
          </Grid>
        }
        confirmTextBtn="Si, continuar"
        onConfirm={form.handleSubmit(onSave)}
      />
    </>
  );
};

export default EsperaAgendaPreventaCustomButtons;
