import { IoMdClock } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';

import { OrdenTrabajo } from '@/shared';
import { CustomTextFieldNoForm, CustomTypoLabel } from '@/shared/components';

export type DatosInstallOTFormTabPartProps = {
  ordenTrabajo: OrdenTrabajo;
};

const DatosInstallOTFormTabPart: React.FC<DatosInstallOTFormTabPartProps> = ({
  ordenTrabajo,
}) => {
  return (
    <>
      <CustomTypoLabel text="Datos de instalación" />

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

export default DatosInstallOTFormTabPart;
