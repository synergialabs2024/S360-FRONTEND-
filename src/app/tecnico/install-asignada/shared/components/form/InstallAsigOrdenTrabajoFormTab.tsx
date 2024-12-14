import { UseFormReturn } from 'react-hook-form';

import { gridSize, gridSizeMdLg6, OrdenTrabajo } from '@/shared';
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

  onlyView?: boolean; // auditoria
  customCardNode?: React.ReactNode;
};

const InstallAsigOrdenTrabajoFormTab: React.FC<
  InstallAsigOrdenTrabajoFormTabProps
> = ({ form, ordenTrabajo, onlyView = false, customCardNode = null }) => {
  ///* form ---------------------
  const { errors } = form.formState;

  return (
    <>
      <CustomTypoLabel text="Detalle de la orden de trabajo" />
      <>{customCardNode}</>

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
        <CustomTextFieldNoForm
          label="Serial ONT"
          value={ordenTrabajo?.serie_ont || 'N/A'}
          disabled
        />

        <CustomNumberTextField
          label="Potencia ONT"
          name="potencia_ont"
          control={form.control}
          defaultValue={form.getValues().potencia_ont}
          error={errors.potencia_ont}
          helperText={errors.potencia_ont?.message}
          size={gridSizeMdLg6}
          disabled={onlyView}
        />
        <CustomTextArea
          label="Observaciones adicionales"
          name="observaciones_adicionales"
          control={form.control}
          defaultValue={form.getValues().observaciones_adicionales}
          error={errors.observaciones_adicionales}
          helperText={errors.observaciones_adicionales?.message}
          required={false}
          disabled={onlyView}
        />
      </>

      <NapPartInstallAsignFormTab
        form={form}
        ordenTrabajo={ordenTrabajo!}
        onlyView={onlyView}
      />
    </>
  );
};

export default InstallAsigOrdenTrabajoFormTab;
