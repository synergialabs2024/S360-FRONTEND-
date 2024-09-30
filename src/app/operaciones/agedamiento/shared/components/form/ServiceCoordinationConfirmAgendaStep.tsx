import { UseFormReturn } from 'react-hook-form';

import { InternetPlanPartSaveAgendaForm } from '@/app/comercial/agendamiento/shared/components/SaveAgendamiento/form';
import type { Agendamiento } from '@/shared';
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
      <InternetPlanPartSaveAgendaForm form={form as any} />
    </>
  );
};

export default ServiceCoordinationConfirmAgendaStep;
