import { gridSize, gridSizeMdLg3, OrdenTrabajo } from '@/shared';
import { CustomTextFieldNoForm } from '@/shared/components';

export type ActivacionInstallOTNodoIPsPPPPartProps = {
  ordenTrabajo: OrdenTrabajo;
};

const ActivacionInstallOTNodoIPsPPPPart: React.FC<
  ActivacionInstallOTNodoIPsPPPPartProps
> = ({ ordenTrabajo }) => {
  return (
    <>
      <CustomTextFieldNoForm
        label="Brass"
        value={ordenTrabajo?.brass_data?.name || ''}
        disabled
        size={gridSize}
      />

      <CustomTextFieldNoForm
        label="Nodo"
        value={ordenTrabajo?.nodo_data?.name || ''}
        disabled
      />
      <CustomTextFieldNoForm
        label="OLT"
        value={ordenTrabajo?.olt_data?.name || ''}
        disabled
      />

      <>
        <CustomTextFieldNoForm
          label="NAP"
          value={ordenTrabajo?.nap_data?.name || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="Distancia NAP"
          value={ordenTrabajo?.agendamiento_data?.distancia_nap || ''}
          disabled
          size={gridSizeMdLg3}
          endAdornment="m"
        />
        <CustomTextFieldNoForm
          label="Puerto"
          value={ordenTrabajo?.preventa_data?.puerto_nap || ''}
          disabled
          size={gridSizeMdLg3}
        />

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
      </>
    </>
  );
};

export default ActivacionInstallOTNodoIPsPPPPart;
