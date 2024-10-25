import { UseFormReturn } from 'react-hook-form';

import { gridSize, OrdenTrabajo } from '@/shared';
import {
  CustomNumberTextField,
  CustomTextArea,
  CustomTextFieldNoForm,
  CustomTypoLabel,
} from '@/shared/components';
import type { InstallAsignOTSaveFormData } from '../SaveOrdenTrabajo/SaveOrdenTrabajo';
import NapPartInstallAsignFormTab from './ot/NapPartInstallAsignFormTab';

export type InstallAsigOrdenTrabajoFormTabProps = {
  form: UseFormReturn<InstallAsignOTSaveFormData>;
  ordenTrabajo: OrdenTrabajo;
};

const InstallAsigOrdenTrabajoFormTab: React.FC<
  InstallAsigOrdenTrabajoFormTabProps
> = ({ form, ordenTrabajo }) => {
  ///* form ---------------------
  const { errors } = form.formState;

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

        {/* ------------ to complete ------------ */}
        <CustomNumberTextField
          label="Potencia ONT"
          name="potencia_ont"
          control={form.control}
          defaultValue={form.getValues().potencia_ont}
          error={errors.potencia_ont}
          helperText={errors.potencia_ont?.message}
        />
        <CustomTextArea
          label="Observaciones adicionales"
          name="observaciones_adicionales"
          control={form.control}
          defaultValue={form.getValues().observaciones_adicionales}
          error={errors.observaciones_adicionales}
          helperText={errors.observaciones_adicionales?.message}
          required={false}
        />
      </>

      <NapPartInstallAsignFormTab form={form} ordenTrabajo={ordenTrabajo!} />
    </>
  );
};

export default InstallAsigOrdenTrabajoFormTab;
