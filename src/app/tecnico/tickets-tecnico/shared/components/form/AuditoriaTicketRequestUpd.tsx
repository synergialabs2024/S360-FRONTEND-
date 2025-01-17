import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { OrdenTrabajoTSQEnum, useFetchMotivoRechazos } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import {
  getKeysFormErrorsMessage,
  MotivoRechazo,
  MotivoRechazoModuloEnumChoice,
  OrdenTrabajo,
  ToastWrapper,
} from '@/shared';
import { CustomAutocomplete, ScrollableDialogProps } from '@/shared/components';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import { returnUrlTicketVisitaTecnico } from '../SaveVisita/SaveVisita';
import { requestTicketAuditoriaFormSchema } from '@/shared/utils/validation-schemas/app/tickets/auditoria-ticket.schema';

export type AuditoriaTicketRequestUpdProps = {
  open: boolean;
  onClose: () => void;
  ticket: Ticket;
};

type SaveFormData = Pick<Ticket, 'motivo_rechazo'>;

const AuditoriaTicketRequestUpd: React.FC<AuditoriaTicketRequestUpdProps> = ({
  onClose,
  open,
  ticket,
}) => {
  ///* hooks ---------------------
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(requestTicketAuditoriaFormSchema) as any,
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  ///* mutations ---------------------

  const {
    data: motivosRechazoPagingRes,
    isLoading: isLoadingMotivoRechazo,
    isRefetching: isRefetchingMotivoRechazo,
  } = useFetchMotivoRechazos({
    params: {
      page_size: 1090,
      modulo: MotivoRechazoModuloEnumChoice.VISITAS,
      order_by: 'name',
      order_by_asc: true,
    },
  });

  const requestUpdTicketVisita = useGenericPATCH<SaveFormData, OrdenTrabajo>(
    `/ticket-tecnico/reject/${ticket?.id!}/`,
    OrdenTrabajoTSQEnum.ORDENTRABAJOS,
    {
      customMessageToast: 'Se ha rechazado la visita con éxito',
      navigate,
      returnUrl: returnUrlTicketVisitaTecnico,
      customOnSuccess() {
        handleClose();
      },
    },
  );

  ///* handlers -----------------
  const onSave = (data: SaveFormData) => {
    requestUpdTicketVisita.mutate({
      motivo_rechazo: data.motivo_rechazo,
    });
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  return (
    <ScrollableDialogProps
      open={open}
      title="Solicitar Corrección de información"
      width="60%"
      onClose={handleClose}
      onConfirm={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Faltan campos: ${keys}`);
      })}
      contentNode={
        <Grid item container xs={12} spacing={3} mt={0.01} mb={3}>
          <Grid item xs={12}>
            <Typography variant="body1">
              ¿Estás seguro que deseas solicitar la corrección de la
              información? De ser así, necesita seleccionar un motivo de
              corrección y adicionalmente puede agregar una observación.
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
            isLoadingData={isLoadingMotivoRechazo || isRefetchingMotivoRechazo}
            // vaidation
            control={form.control}
            error={errors.motivo_rechazo}
            helperText={errors.motivo_rechazo?.message}
          />
        </Grid>
      }
      confirmTextBtn="Rechazar visita"
      cancelTextBtn="Cerrar"
    />
  );
};

export default AuditoriaTicketRequestUpd;
