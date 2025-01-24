import { formatDateWithTime } from '@/shared';
import { IoMdClock } from 'react-icons/io';
import {
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';

export type RecoordinacionAsigTicketVisitaFormTabProps = {
  ticket: Ticket;
};

const RecoordinacionAsigTicketVisitaFormTab: React.FC<
  RecoordinacionAsigTicketVisitaFormTabProps
> = ({ ticket }) => {
  return (
    <>
      <>
        <CustomTypoLabel
          text="Datos generales ticket"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <>
          <CustomTextFieldNoForm
            label="Asunto"
            value={ticket?.asunto_ticket_data?.name}
            disabled
          />

          <CustomTextFieldNoForm
            label="Valor a cobrar"
            value={ticket?.asunto_ticket_data?.valor_cobrar}
            disabled
          />

          <CustomTextFieldNoForm
            label="RAZON SOCIAL"
            value={
              ticket?.linea_servicio_data?.solicitud_servicio_data?.razon_social
            }
            disabled
          />

          <CustomTextFieldNoForm
            label="Cedula"
            value={
              ticket?.linea_servicio_data?.solicitud_servicio_data
                ?.identificacion
            }
            disabled
          />

          <CustomTextFieldNoForm
            label="Telefono"
            value={
              ticket?.linea_servicio_data?.solicitud_servicio_data?.celular
            }
            disabled
          />

          <CustomTextFieldNoForm
            label="Email"
            value={ticket?.linea_servicio_data?.solicitud_servicio_data?.email}
            disabled
          />

          <CustomTypoLabel
            text="Fecha y Flota de visita"
            pt={CustomTypoLabelEnum.ptMiddlePosition}
          />

          <CustomTextFieldNoForm
            label="Fecha y Hora de Visita"
            value={
              ticket?.fecha_hora_visita
                ? formatDateWithTime(ticket?.fecha_hora_visita)
                : ''
            }
            disabled
            startAdornment={<IoMdClock />}
          />

          <CustomTextFieldNoForm
            label="Flota"
            value={ticket?.flota_data?.name}
            disabled
          />

          <CustomTextFieldNoForm
            label="Tecnico responsable"
            value={ticket?.flota_data?.lider_data?.razon_social}
            disabled
          />

          <CustomTextFieldNoForm
            label="Servicio contratado"
            value={
              ticket?.linea_servicio_data?.contrato_data
                ?.plan_internet_actual_data?.name
            }
            disabled
          />
        </>
      </>
    </>
  );
};

export default RecoordinacionAsigTicketVisitaFormTab;
