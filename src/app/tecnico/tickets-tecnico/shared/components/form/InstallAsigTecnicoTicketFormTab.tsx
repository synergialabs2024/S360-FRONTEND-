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
import { SingleImageModal } from '@/shared/components/ui';

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

        <>
          <CustomTypoLabel
            text="Vivienda del cliente"
            pt={CustomTypoLabelEnum.ptMiddlePosition}
          />

          <SingleImageModal
            image={{
              id: 1,
              imgUrl: ticket?.url_foto_vivienda!,
              title: 'Foto de la vivienda',
            }}
            widthPercentage="70%"
          />
        </>

        <CustomTypoLabel
          text="Fecha y Flota de visita"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <CustomTextFieldNoForm
          label="Franja horaria"
          value={ticket?.franja_horaria}
          disabled
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
  );
};

export default InstallAsigTecnicoTicketFormTab;
