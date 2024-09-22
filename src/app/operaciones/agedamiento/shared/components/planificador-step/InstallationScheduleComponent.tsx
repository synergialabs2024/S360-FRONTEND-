import { UseFormReturn } from 'react-hook-form';

import type { SaveFormDataAgendaVentas } from '../SaveAgendamiento/SaveAgendamiento';
import HourInstallSchedulePaperAndCountdown from './HourInstallSchedulePaperAndCountdown';

export type InstallationScheduleComponentProps = {
  form: UseFormReturn<SaveFormDataAgendaVentas>;
};

const InstallationScheduleComponent: React.FC<
  InstallationScheduleComponentProps
> = ({ form }) => {
  return (
    <>
      <>Paninador de flotas x zona</>

      <HourInstallSchedulePaperAndCountdown form={form} />
    </>
  );
};

export default InstallationScheduleComponent;
