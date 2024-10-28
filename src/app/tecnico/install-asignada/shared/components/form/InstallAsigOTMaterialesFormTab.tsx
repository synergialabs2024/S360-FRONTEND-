import { UseFormReturn } from 'react-hook-form';

import type { OrdenTrabajo } from '@/shared';
import type { InstallAsignOTSaveFormData } from '../SaveOrdenTrabajo/SaveOrdenTrabajo';
import EquipoAdicionalInstallTectAsignFormPart from './equipos/EquipoAdicionalInstallTectAsignFormPart';
import EquiposUtilizadosInstallAsignFormPart from './equipos/EquiposUtilizadosInstallAsignFormPart';
import MaterialesUtilizadosInstallAsignFormPart from './materiales/MaterialesUtilizadosInstallAsignFormPart';

export type InstallAsigOTMaterialesFormTabProps = {
  form: UseFormReturn<InstallAsignOTSaveFormData>;
  ordenTrabajo: OrdenTrabajo;
};

const InstallAsigOTMaterialesFormTab: React.FC<
  InstallAsigOTMaterialesFormTabProps
> = ({ ordenTrabajo, form }) => {
  return (
    <>
      <EquipoAdicionalInstallTectAsignFormPart ordenTrabajo={ordenTrabajo} />

      <EquiposUtilizadosInstallAsignFormPart ordenTrabajo={ordenTrabajo} />

      <MaterialesUtilizadosInstallAsignFormPart
        ordenTrabajo={ordenTrabajo}
        form={form}
      />
    </>
  );
};

export default InstallAsigOTMaterialesFormTab;
