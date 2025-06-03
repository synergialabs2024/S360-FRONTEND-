import { UseFormReturn } from 'react-hook-form';
import {
  CustomTextArea,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SampleCheckbox,
  SelectArrayString,
} from '@/shared/components';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import { useFetchSolucionesTickets } from '@/actions/app/tickets';
import { InstallAsignTicketTecnicoSaveFormData } from '../SaveVisita/SaveVisita';
import { gridSizeMdLg6 } from '@/shared';
export type InstallAsigTicketSolucionFormTabProps = {
  form: UseFormReturn<InstallAsignTicketTecnicoSaveFormData>;
  ticket: Ticket;
};
const InstallAsigTicketSolucionFormTab: React.FC<
  InstallAsigTicketSolucionFormTabProps
> = ({ form }) => {
  ///* form ---------------------
  const { errors } = form.formState;
  const { data: solucionesPaginatedRes } = useFetchSolucionesTickets({
    params: {
      page_size: 200,
    },
  });

  return (
    <>
      <>
        <CustomTypoLabel
          text="Datos generales ticket"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <SelectArrayString
          label="Soluciones visitas"
          name="solucion_tecnico"
          control={form.control}
          defaultValue={form.getValues().solucion_tecnico}
          error={errors.solucion_tecnico}
          helperText={errors.solucion_tecnico?.message}
          options={solucionesPaginatedRes?.data?.items || []}
        />

        {/* <CustomAutocomplete<SolucionesTickets>
          label="Soluciones visitas"
          name="solucion_tecnico"
          // options
          options={solucionesPaginatedRes?.data || []}
          valueKey="name"
          actualValueKey="id"
          defaultValue={form.getValues().solucion_tecnico}
          isLoadingData={isLoadingSoluciones || isRefetchingSoluciones}
          // vaidation
          control={form.control}
          error={errors.solucion_tecnico}
          helperText={errors.solucion_tecnico?.message}
          required={false}
        /> */}

        <CustomTextArea
          label={'Observacion extra solucion visita'}
          name="observacion_extra_solucion_visita"
          control={form.control}
          defaultValue={form.getValues().observacion_extra_solucion_visita}
          error={errors.observacion_extra_solucion_visita}
          helperText={errors.observacion_extra_solucion_visita?.message}
        />

        <SampleCheckbox
          label="Cambio Onu"
          name="is_cambio_onu"
          control={form.control}
          defaultValue={form.getValues().is_cambio_onu ?? false}
          size={gridSizeMdLg6}
        />
      </>
    </>
  );
};

export default InstallAsigTicketSolucionFormTab;
