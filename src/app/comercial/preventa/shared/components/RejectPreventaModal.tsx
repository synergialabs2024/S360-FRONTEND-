import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  CancelAgendaPreventaData,
  PreventaTSQEnum,
  useFetchMotivoRechazos,
} from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import {
  cancelAgendaPreventaOTFormSchema,
  MotivoRechazo,
  MotivoRechazoModuloEnumChoice,
  useLoaders,
  type Preventa,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomTextArea,
  ScrollableDialogProps,
} from '@/shared/components';

export type RejectPreventaModalProps = {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  preventa: Preventa;
};

type SaveFormData = CancelAgendaPreventaData & {};

const RejectPreventaModal: React.FC<RejectPreventaModalProps> = ({
  openModal,
  preventa,
  setOpenModal,
}) => {
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
      // order_by: 'name',
      // order_by_asc: true,
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

  return (
    <>
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

export default RejectPreventaModal;
