import { UseFormReturn } from 'react-hook-form';
import { IoMdClock } from 'react-icons/io';

import { formatDateWithTime, OrdenTrabajo } from '@/shared';
import {
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import type { InstallAsignOTSaveFormData } from '../SaveOrdenTrabajo/SaveOrdenTrabajo';
import DatosInstallOTFormTabPart from './general/DatosInstallOTFormTabPart';
import ServicioClienteInstallFormTabPart from './general/ServicioClienteInstallFormTabPart';

export type InstallAsigTecnicoOTFormTabProps = {
  form: UseFormReturn<InstallAsignOTSaveFormData>;
  ordenTrabajo: OrdenTrabajo;
};

const InstallAsigTecnicoOTFormTab: React.FC<
  InstallAsigTecnicoOTFormTabProps
> = ({ ordenTrabajo }) => {
  return (
    <>
      <DatosInstallOTFormTabPart ordenTrabajo={ordenTrabajo} />

      <ServicioClienteInstallFormTabPart ordenTrabajo={ordenTrabajo} />

      <>
        <CustomTypoLabel
          text="Hora de instalación"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <CustomTextFieldNoForm
          label="Hora de inicio"
          value={
            ordenTrabajo?.hora_inicio
              ? formatDateWithTime(ordenTrabajo.hora_inicio)
              : ''
          }
          disabled
          startAdornment={<IoMdClock />}
        />
        <CustomTextFieldNoForm
          label="Hora de fin"
          value={
            ordenTrabajo?.hora_fin
              ? formatDateWithTime(ordenTrabajo.hora_fin)
              : ''
          }
          disabled
          startAdornment={<IoMdClock />}
        />
      </>
    </>
  );
};

export default InstallAsigTecnicoOTFormTab;
