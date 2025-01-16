/* eslint-disable indent */
import { UseFormReturn } from 'react-hook-form';
import { IoMdClock } from 'react-icons/io';

import { formatDateWithTime } from '@/shared';
import {
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import { InstallAsignTicketTecnicoSaveFormData } from '../SaveVisita/SaveVisita';

export type InstallAsigTecnicoTicketFormTabProps = {
  form: UseFormReturn<InstallAsignTicketTecnicoSaveFormData>;
  ticket: Ticket;
};

const InstallAsigTecnicoTicketFormTab: React.FC<
  InstallAsigTecnicoTicketFormTabProps
> = ({ ticket }) => {
  return (
    <>
      <>
        <CustomTypoLabel
          text="Datos generales ticket"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
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
            ticket?.linea_servicio_data?.solicitud_servicio_data?.identificacion
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
          label="Coordenadas"
          value={
            ticket?.linea_servicio_data?.solicitud_servicio_data?.coordenadas
          }
          disabled
        />

        <CustomTextFieldNoForm
          label="Zona"
          value={ticket?.linea_servicio_data?.zona_data?.name}
          disabled
        />
        <CustomTextFieldNoForm
          label="Telefono"
          value={ticket?.linea_servicio_data?.solicitud_servicio_data?.celular}
          disabled
        />

        <CustomTextFieldNoForm
          label="Flota"
          value={ticket?.franja_horaria}
          disabled
        />
        <CustomTextFieldNoForm
          label="Hora de inicio"
          value={
            ticket?.fecha_sugerida_visita
              ? formatDateWithTime(ticket?.fecha_sugerida_visita)
              : ''
          }
          disabled
          startAdornment={<IoMdClock />}
        />

        <CustomTypoLabel
          text="Hora de instalación"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <CustomTextFieldNoForm
          label="Tecnico responsable"
          value={ticket?.flota_data?.lider_data?.razon_social}
          disabled
        />

        <CustomTextFieldNoForm
          label="Flota de instalacion"
          value={ticket?.flota_data?.name}
          disabled
        />

        <CustomTextFieldNoForm
          label="Servicio contratado"
          value={ticket?.flota_data?.name}
          disabled
        />
      </>
    </>
  );
};

export default InstallAsigTecnicoTicketFormTab;
