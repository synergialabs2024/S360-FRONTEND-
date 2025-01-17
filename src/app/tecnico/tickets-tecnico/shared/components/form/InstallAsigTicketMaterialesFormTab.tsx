import { UseFormReturn } from 'react-hook-form';

import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import MaterialesUtilizadosTicketAsignFormPart from './materiales/MaterialesUtilizadosTicketAsignFormPart';
import { InstallAsignTicketTecnicoSaveFormData } from '../SaveVisita/SaveVisita';
import EquiposUtilizadosTicketAsignFormPart from './EquiposUtilizadosTicketAsignFormPart';

export type InstallAsigTicketMaterialesFormTabProps = {
  form: UseFormReturn<InstallAsignTicketTecnicoSaveFormData>;
  ticket: Ticket;
};

const InstallAsigTicketMaterialesFormTab: React.FC<
  InstallAsigTicketMaterialesFormTabProps
> = ({ ticket, form }) => {
  return (
    <>
      <EquiposUtilizadosTicketAsignFormPart ticket={ticket} />
      <MaterialesUtilizadosTicketAsignFormPart ticket={ticket} form={form} />
    </>
  );
};

export default InstallAsigTicketMaterialesFormTab;
