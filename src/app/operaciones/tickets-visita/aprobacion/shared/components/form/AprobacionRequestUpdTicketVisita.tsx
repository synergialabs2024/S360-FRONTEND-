import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useGenericPATCH } from '@/actions/shared';
import {
  getKeysFormErrorsMessage,
  gridSize,
  MOTIVO_CORRECCION_OT_AUDITORIA_ARRAY_CHOICES,
  OrdenTrabajo,
  requestUpdOTAuditoriaFormSchema,
  ToastWrapper,
} from '@/shared';
import {
  CustomTextArea,
  ScrollableDialogProps,
  SelectArrayString,
} from '@/shared/components';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import { TicketTSQEnum } from '@/actions/app/tickets';
import { returnUrlTicketVisitaAprobacion } from '../SaveAprobacionTicketVisita';

export type AprobacionRequestUpdTicketVisitaProps = {
  open: boolean;
  onClose: () => void;
  ticket: Ticket;
};

type SaveFormData = Pick<
  Ticket,
  'motivo_correccion' | 'observacion_correccion'
>;

const AprobacionRequestUpdTicketVisita: React.FC<
  AprobacionRequestUpdTicketVisitaProps
> = ({ onClose, open, ticket }) => {
  ///* hooks ---------------------
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(requestUpdOTAuditoriaFormSchema) as any,
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  ///* mutations ---------------------
  const requestUpdOT = useGenericPATCH<SaveFormData, OrdenTrabajo>(
    `/ticket-tecnico/update-request/${ticket?.id!}/`,
    TicketTSQEnum.TICKETS,
    {
      customMessageToast: 'Solicitud de corrección enviada con éxito',
      navigate,
      returnUrl: returnUrlTicketVisitaAprobacion,
      customOnSuccess() {
        handleClose();
      },
    },
  );

  ///* handlers -----------------
  const onSave = (data: SaveFormData) => {
    requestUpdOT.mutate({
      motivo_correccion: data.motivo_correccion,
      observacion_correccion: data.observacion_correccion,
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

          <SelectArrayString
            label="Motivo de corrección"
            name="motivo_correccion"
            control={form.control}
            error={errors.motivo_correccion}
            helperText={errors.motivo_correccion?.message}
            defaultValue={form.getValues('motivo_correccion')}
            options={MOTIVO_CORRECCION_OT_AUDITORIA_ARRAY_CHOICES}
            gridSize={gridSize}
          />

          <CustomTextArea
            label="Observación adicional"
            name="observacion_correccion"
            control={form.control}
            defaultValue={form.getValues().observacion_correccion}
            error={errors.observacion_correccion}
            helperText={errors.observacion_correccion?.message}
            required={false}
          />
        </Grid>
      }
      confirmTextBtn="Solicitar Corrección"
      cancelTextBtn="Cerrar"
    />
  );
};

export default AprobacionRequestUpdTicketVisita;
