/* eslint-disable indent */
import { UseFormReturn } from 'react-hook-form';

import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';

import { InstallAsignTicketTecnicoSaveFormData } from '../SaveVisita/SaveVisita';
import { useEffect } from 'react';

export type InstallAsigTicketSolucionFormTabProps = {
  form: UseFormReturn<InstallAsignTicketTecnicoSaveFormData>;
  ticket: Ticket;
};

const InstallAsigTicketSolucionFormTab: React.FC<
  InstallAsigTicketSolucionFormTabProps
> = ({ form, ticket }) => {
  useEffect(() => {
    console.log(form);
    console.log(ticket);
  });
  return (
    <>
      <>
        <CustomTypoLabel
          text="Datos generales ticket"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
      </>
    </>
  );
};

export default InstallAsigTicketSolucionFormTab;
