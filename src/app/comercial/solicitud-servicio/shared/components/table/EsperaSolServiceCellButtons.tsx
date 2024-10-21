import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdCancel } from 'react-icons/md';

import {
  CancelSolServiceData,
  SolicitudServicioTSQEnum,
  useFetchMotivoRechazos,
} from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import {
  cancelSolServiceFormSchema,
  MotivoRechazo,
  MotivoRechazoModuloEnumChoice,
  SolicitudServicio,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomTextArea,
  ScrollableDialogProps,
  SingleIconButton,
} from '@/shared/components';
import { yupResolver } from '@hookform/resolvers/yup';

export type EsperaSolServiceCellButtonsProps = {
  solService: SolicitudServicio;
};

type SaveFormData = CancelSolServiceData & {};

const EsperaSolServiceCellButtons: React.FC<
  EsperaSolServiceCellButtonsProps
> = ({ solService }) => {
  ///* local state ------------------------
  const [openModal, setOpenModal] = useState<boolean>(false);

  ///* form ------------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(cancelSolServiceFormSchema) as any,
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
      modulo: MotivoRechazoModuloEnumChoice.SOLICITUD_SERVICIO,
      order_by: 'name',
      order_by_asc: true,
    },
  });

  ///* mutations ------------------------
  const cancelSolService = useGenericPATCH<
    CancelSolServiceData,
    SolicitudServicio
  >(
    `/solicitudservicio/cancel/${solService?.id!}/`,
    SolicitudServicioTSQEnum.SOLICITUDSERVICIOS,
    {
      customMessageToast: 'Solicitud de servicio cancelada correctamente',
      enableNavigate: false,
      customOnSuccess: () => {
        setOpenModal(false);
        form.reset();
        form.setValue('observacion_cancelacion', '');
      },
    },
  );

  ///* handlers ------------------------
  const onSave = (data: SaveFormData) => {
    cancelSolService.mutate({
      motivo_rechazo: data.motivo_rechazo,
      observacion_cancelacion: data.observacion_cancelacion,
    });
  };

  const customLoader = isLoadingMotivoRechazo || isRefetchingMotivoRechazo;
  useLoaders(customLoader);

  return (
    <>
      <SingleIconButton
        startIcon={<MdCancel />}
        label="Cancelar solicitud de servicio"
        color="error"
        onClick={() => {
          setOpenModal(true);
        }}
      />

      {/* ================ modals ================ */}
      <ScrollableDialogProps
        title="Cancelar solicitud de servicio"
        open={openModal}
        onClose={() => setOpenModal(false)}
        cancelTextBtn="Cerrar"
        contentNode={
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Para cancelar la solicitud de servicio{' '}
                <strong>{solService?.numero_referencia}</strong> del cliente{' '}
                <strong>{solService?.razon_social}</strong>, deberá ingresar el
                motivo de la cancelación y una observación. ¿Desea continuar?
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

export default EsperaSolServiceCellButtons;
