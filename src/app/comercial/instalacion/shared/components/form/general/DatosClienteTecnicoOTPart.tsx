import { MdCall, MdEmail } from 'react-icons/md';

import { gridSize, OrdenTrabajo } from '@/shared';
import {
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';

export type DatosClienteTecnicoOTPartProps = {
  ordenTrabajo: OrdenTrabajo;
};

const DatosClienteTecnicoOTPart: React.FC<DatosClienteTecnicoOTPartProps> = ({
  ordenTrabajo,
}) => {
  return (
    <>
      <CustomTypoLabel text="Datos cliente" />

      <CustomTextFieldNoForm
        label="Nombre cliente"
        value={ordenTrabajo?.solicitud_servicio_data?.razon_social}
        disabled
        size={gridSize}
      />
      <CustomTextFieldNoForm
        label="Tipo identificación"
        value={ordenTrabajo?.solicitud_servicio_data?.tipo_identificacion}
        disabled
      />
      <CustomTextFieldNoForm
        label="Identificación"
        value={ordenTrabajo?.solicitud_servicio_data?.identificacion}
        disabled
      />

      <CustomTextFieldNoForm
        label="Fecha nacimiento"
        value={ordenTrabajo?.solicitud_servicio_data?.fecha_nacimiento}
        disabled
      />

      <CustomTextFieldNoForm
        label="Edad"
        value={ordenTrabajo?.solicitud_servicio_data?.edad}
        disabled
      />

      <CustomTextFieldNoForm
        label="Email"
        value={ordenTrabajo?.solicitud_servicio_data?.email}
        disabled
        startAdornment={<MdEmail />}
      />

      <CustomTextFieldNoForm
        label="Celular"
        value={ordenTrabajo?.solicitud_servicio_data?.celular}
        disabled
        startAdornment={<MdCall />}
      />

      <CustomTypoLabel
        text="Persona referencia"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <CustomTextFieldNoForm
        label="Nombre Persona Referencia"
        value={ordenTrabajo?.preventa_data?.nombre_persona_referencia}
        disabled
        size={gridSize}
      />
      <CustomTextFieldNoForm
        label="Parentesco Referencia"
        value={ordenTrabajo?.preventa_data?.parentesco_referencia}
        disabled
      />
      <CustomTextFieldNoForm
        label="Teléfono Referencia"
        value={ordenTrabajo?.preventa_data?.celular_adicional}
        disabled
        startAdornment={<MdCall />}
      />
    </>
  );
};

export default DatosClienteTecnicoOTPart;
