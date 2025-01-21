import {
  CustomTextAreaNoForm,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
export type AprobacionAsigTicketSolucionFormTabProps = {
  ticket: Ticket;
};
const AprobacionAsigTicketSolucionFormTab: React.FC<
  AprobacionAsigTicketSolucionFormTabProps
> = ({ ticket }) => {
  return (
    <>
      <>
        <CustomTypoLabel
          text="Datos generales ticket"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <CustomTextFieldNoForm
          label={'Solucion visitas'}
          value={ticket.solucion_tecnico || ''}
          disabled
        />

        <CustomTextAreaNoForm
          label={'Observacion extra solucion visita'}
          value={ticket.observacion_extra_solucion_visita || ''}
          disabled
        />
      </>
    </>
  );
};

export default AprobacionAsigTicketSolucionFormTab;
