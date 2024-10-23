import { UseFormReturn } from 'react-hook-form';

import type { InstallAsignOTSaveFormData } from '../SaveOrdenTrabajo/SaveOrdenTrabajo';

export type InstallAsigOrdenTrabajoFormTabProps = {
  form: UseFormReturn<InstallAsignOTSaveFormData>;
};

const InstallAsigOrdenTrabajoFormTab: React.FC<
  InstallAsigOrdenTrabajoFormTabProps
> = () => {
  return <>InstallAsigOrdenTrabajoFormTab</>;
};

export default InstallAsigOrdenTrabajoFormTab;
