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
          text="Datos cliente"
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
            label="Direccion"
            value={
              ticket?.linea_servicio_data?.solicitud_servicio_data?.direccion
            }
            disabled
          />

          <CustomTextFieldNoForm
            label="Caja"
            value={ticket?.linea_servicio_data?.nap_data?.name}
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
        </>
      </>
    </>
  );
};

export default RecoordinacionAsigTicketVisitaFormTab;
