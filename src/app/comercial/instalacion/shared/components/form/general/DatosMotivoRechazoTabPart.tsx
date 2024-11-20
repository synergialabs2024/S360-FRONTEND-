import { gridSize, OrdenTrabajo } from '@/shared';
import {
  CustomTextAreaNoForm,
  CustomTextFieldNoForm,
  CustomTypoLabel,
} from '@/shared/components';

export type DatosMotivoRechazoTabPartProps = {
  ordenTrabajo: OrdenTrabajo;
};

const DatosMotivoRechazoTabPart: React.FC<DatosMotivoRechazoTabPartProps> = ({
  ordenTrabajo,
}) => {
  return (
    <>
      <CustomTypoLabel text="Motivo Rechazo" />

      <CustomTextFieldNoForm
        label="Motivo de pre-rechazo"
        value={ordenTrabajo?.motivo_prerechazo_data?.name}
        disabled
        size={gridSize}
      />

      <CustomTextAreaNoForm
        label="Observación"
        value={ordenTrabajo?.observacion_prerechazo ?? ''}
        disabled
        size={gridSize}
      />
    </>
  );
};

export default DatosMotivoRechazoTabPart;
