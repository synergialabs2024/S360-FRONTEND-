import { UseFormReturn } from 'react-hook-form';

import type { OrdenTrabajo } from '@/shared';
import type { InstallAsignOTSaveFormData } from '../SaveOrdenTrabajo/SaveOrdenTrabajo';
import EquiposUtilizadosInstallAsignFormPart from './equipos/EquiposUtilizadosInstallAsignFormPart';

export type InstallAsigOTMaterialesFormTabProps = {
  form: UseFormReturn<InstallAsignOTSaveFormData>;
  ordenTrabajo: OrdenTrabajo;
};

const InstallAsigOTMaterialesFormTab: React.FC<
  InstallAsigOTMaterialesFormTabProps
> = ({ ordenTrabajo }) => {
  return (
    <>
      <EquiposUtilizadosInstallAsignFormPart ordenTrabajo={ordenTrabajo} />
    </>
  );
};

export default InstallAsigOTMaterialesFormTab;
