import { UseFormReturn } from 'react-hook-form';

import { InternetPlanPartSaveAgendaForm } from '@/app/comercial/agendamiento/shared/components/SaveAgendamiento/form';
import type { Agendamiento } from '@/shared';
import { CustomTextFieldNoForm } from '@/shared/components';
import type { SaveConfirmAgendaOperaciones } from '../SaveConfirmAgendaOperaciones';

export type ServiceCoordinationConfirmAgendaStepProps = {
  form: UseFormReturn<SaveConfirmAgendaOperaciones>;
  agendamiento: Agendamiento;
};

const ServiceCoordinationConfirmAgendaStep: React.FC<
  ServiceCoordinationConfirmAgendaStepProps
> = ({ agendamiento, form }) => {
  console.log('ServiceCoordinationConfirmAgendaStep', agendamiento);

  return (
    <>
      {/* ------------------ plan ------------------ */}
      <>
        <InternetPlanPartSaveAgendaForm form={form as any} />
        <CustomTextFieldNoForm
          label="Velocidad descarga máxima"
          value={
            agendamiento.preventa_data?.plan_internet_data
              ?.velocidad_descarga_maxima
          }
          endAdornment={
            <>
              {agendamiento.preventa_data?.plan_internet_data?.unidad_velocidad}
            </>
          }
          disabled
        />
        <CustomTextFieldNoForm
          label="Velocidad subida máxima"
          value={
            agendamiento.preventa_data?.plan_internet_data
              ?.velocidad_subida_maxima
          }
          endAdornment={
            <>
              {agendamiento.preventa_data?.plan_internet_data?.unidad_velocidad}
            </>
          }
          disabled
        />
      </>
    </>
  );
};

export default ServiceCoordinationConfirmAgendaStep;
