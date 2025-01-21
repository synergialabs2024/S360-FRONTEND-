/* eslint-disable indent */
import {
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';

export type RecoordinacionUbicacionTicketVisitaFormTabProps = {
  ticket: Ticket;
};

const RecoordinacionUbicacionTicketVisitaFormTab: React.FC<
  RecoordinacionUbicacionTicketVisitaFormTabProps
> = ({ ticket }) => {
  return (
    <>
      <CustomTypoLabel
        text="Plan de internet"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <>
        <CustomTextFieldNoForm
          label="Tipo de servicio"
          value={
            ticket?.linea_servicio_data?.contrato_data
              ?.plan_internet_actual_data?.tipo_servicio
          }
          disabled
        />
        <CustomTextFieldNoForm
          label="Tipo de plan"
          value={
            ticket?.linea_servicio_data?.contrato_data
              ?.plan_internet_actual_data?.tipo_plan
          }
          disabled
        />
        <CustomTextFieldNoForm
          label="Plan de Internet"
          value={
            ticket?.linea_servicio_data?.contrato_data
              ?.plan_internet_actual_data?.name
          }
          disabled
        />
      </>

      <CustomTypoLabel
        text="Ubicación"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <CustomTextFieldNoForm
        label="Coordenadas"
        value={
          ticket?.linea_servicio_data?.solicitud_servicio_data?.coordenadas
        }
        disabled
      />

      <>
        <CustomTextFieldNoForm
          label="Sector"
          value={ticket?.linea_servicio_data?.sector_data?.name}
          disabled
        />
        <CustomTextFieldNoForm
          label="Zona"
          value={ticket?.linea_servicio_data?.zona_data?.name}
          disabled
        />
        <CustomTextFieldNoForm
          label="Ciudad"
          value={ticket?.linea_servicio_data?.ciudad_data?.name}
          disabled
        />
        <CustomTextFieldNoForm
          label="Provincia"
          value={ticket?.linea_servicio_data?.provincia_data?.name}
          disabled
        />
      </>

      {/* <CustomTextArea
        label="Dirección"
        name="direccion_referencia"
        control={form.control}
        defaultValue={form.getValues().direccion_referencia}
        error={errors.direccion_referencia}
        helperText={errors.direccion_referencia?.message}
        disabled
      /> */}
    </>
  );
};

export default RecoordinacionUbicacionTicketVisitaFormTab;
