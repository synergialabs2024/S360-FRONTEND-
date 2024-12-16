import { ActivacionInstallOTNodoIPsPPPPart } from '@/app/operaciones/activacion/instalaciones/shared/components';
import { LineaServicio } from '@/shared';
import {
  CustomTextAreaNoForm,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import FibraClientUbicacionNapPart from '../summary/FibraClientUbicacionNapPart';
import { Grid } from '@mui/material';

export type ClienteFibraOTPartProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraOTPart: React.FC<ClienteFibraOTPartProps> = ({
  serviceLine,
}) => {
  const ordenTrabajo = serviceLine?.orden_trabajo_data;

  return (
    <>
      <CustomTypoLabel text="Detalle de la orden de trabajo" />

      <ActivacionInstallOTNodoIPsPPPPart
        ordenTrabajo={
          {
            ...ordenTrabajo,
            nodo_data: serviceLine?.nodo_data,
            olt_data: serviceLine?.olt_data,
            nap_data: serviceLine?.nap_data,
            preventa_data: serviceLine?.preventa_data,
            agendamiento_data: serviceLine?.agendamiento_data,
            brass_data: serviceLine?.brass_data,
          } as any
        }
      />

      <CustomTextFieldNoForm
        label="Serial ONT"
        value={ordenTrabajo?.serie_ont || 'N/A'}
        disabled
      />
      <CustomTextFieldNoForm
        label="Potencia ONT"
        value={ordenTrabajo?.potencia_ont || 'N/A'}
        disabled
      />
      <CustomTextAreaNoForm
        label="Observaciones adicionales"
        value={ordenTrabajo?.observaciones_adicionales || ''}
        disabled
      />

      <>
        <CustomTypoLabel
          text="UBICACIÓN Y NAP"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <FibraClientUbicacionNapPart serviceLine={serviceLine} />

        <Grid item xs={12} mb={3}></Grid>
      </>
    </>
  );
};

export default ClienteFibraOTPart;
