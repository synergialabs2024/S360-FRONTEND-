import { UseFormReturn } from 'react-hook-form';

import { gridSize, OrdenTrabajo } from '@/shared';
import { CustomTextFieldNoForm, CustomTypoLabel } from '@/shared/components';
import type { InstallAsignOTSaveFormData } from '../SaveOrdenTrabajo/SaveOrdenTrabajo';
import NapPartInstallAsignFormTab from './ot/NapPartInstallAsignFormTab';

export type InstallAsigOrdenTrabajoFormTabProps = {
  form: UseFormReturn<InstallAsignOTSaveFormData>;
  ordenTrabajo: OrdenTrabajo;
};

const InstallAsigOrdenTrabajoFormTab: React.FC<
  InstallAsigOrdenTrabajoFormTabProps
> = ({ form, ordenTrabajo }) => {
  return (
    <>
      <CustomTypoLabel text="Detalle de la orden de trabajo" />
      <>
        <CustomTextFieldNoForm
          label="IPv4"
          value={ordenTrabajo?.ipv4}
          disabled
        />
        <CustomTextFieldNoForm
          label="IPv6"
          value={ordenTrabajo?.ipv6}
          disabled
        />

        <CustomTextFieldNoForm
          label="PPPoE"
          value={ordenTrabajo?.pppoe}
          disabled
        />
        <CustomTextFieldNoForm
          label="PPpassword"
          value={ordenTrabajo?.pppassword}
          disabled
        />

        <CustomTextFieldNoForm
          label="OLT"
          value={ordenTrabajo?.olt_data?.name}
          disabled
          size={gridSize}
        />
      </>

      <NapPartInstallAsignFormTab form={form} ordenTrabajo={ordenTrabajo!} />
    </>
  );
};

export default InstallAsigOrdenTrabajoFormTab;
