import { FormHelperText, Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import { CacheBaseKeysPreventaEnum } from '@/actions/app';
import {
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import TicketVisitaScheduleComponent from '../../planificador-tickets-visitas/TicketVisitaScheduleComponent';
import { SaveFormDataAgendaTicketsVisita } from '../../SaveRecoordinacionTicketVisita';

export type TicketVisitaSaveAgendaProps = {
  form: UseFormReturn<SaveFormDataAgendaTicketsVisita>;
  ticket: Ticket;
};

const TicketVisitaSaveAgenda: React.FC<TicketVisitaSaveAgendaProps> = ({
  form,
  ticket,
}) => {
  return (
    <>
      <CustomTypoLabel text="Detalle Instalación" />

      <CustomTextFieldNoForm
        label="NAP"
        value={ticket?.linea_servicio_data?.nap_data?.name || 'N/A'}
        disabled
      />
      <CustomTextFieldNoForm
        label="Distancia"
        value={ticket?.linea_servicio_data?.distancia_nap || 'N/A'}
        disabled
        endAdornment="m"
      />
      <Grid item xs={12} m={0} p={0}>
        <FormHelperText
          sx={{
            textAlign: 'left',
          }}
        >
          *La distancia es un valor aproximado en metros, calculado entre las
          coordenadas del usuario y la NAP asignada.
        </FormHelperText>
      </Grid>

      {/* ============ planificador component ============ */}
      <>
        <CustomTypoLabel
          text="Horarios disponibles"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <TicketVisitaScheduleComponent
          form={form}
          ticket={ticket!}
          cacheKey={`${CacheBaseKeysPreventaEnum.HORARIO_VISITA_AGENDA_VENTAS}_${ticket?.uuid!}`}
          showFleetName
        />
      </>
    </>
  );
};

export default TicketVisitaSaveAgenda;
