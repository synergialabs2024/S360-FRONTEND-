import { UseFormReturn } from 'react-hook-form';
import { IoMdClock } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';

import { OrdenTrabajo } from '@/shared';
import { CustomTextFieldNoForm } from '@/shared/components';
import type { InstallAsignOTSaveFormData } from '../SaveOrdenTrabajo/SaveOrdenTrabajo';

export type InstallAsigTecnicoOTFormTabProps = {
  form: UseFormReturn<InstallAsignOTSaveFormData>;
  ordenTrabajo: OrdenTrabajo;
};

const InstallAsigTecnicoOTFormTab: React.FC<
  InstallAsigTecnicoOTFormTabProps
> = ({ ordenTrabajo }) => {
  return (
    <>
      <CustomTextFieldNoForm
        label="Flota"
        value={ordenTrabajo?.flota_data?.name}
        disabled
      />
      <CustomTextFieldNoForm
        label="Tipo de orden trabajo"
        value={ordenTrabajo?.tipo_orden_trabajo}
        disabled
      />
      <CustomTextFieldNoForm
        label="Fecha de instalación"
        value={ordenTrabajo?.agendamiento_data?.fecha_instalacion}
        disabled
        startAdornment={<MdDateRange />}
      />
      <CustomTextFieldNoForm
        label="Hora de instalación"
        value={ordenTrabajo?.agendamiento_data?.hora_instalacion}
        disabled
        startAdornment={<IoMdClock />}
      />
    </>
  );
};

export default InstallAsigTecnicoOTFormTab;
