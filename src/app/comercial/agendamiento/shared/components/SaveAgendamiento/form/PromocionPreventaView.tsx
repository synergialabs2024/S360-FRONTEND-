import type { Preventa } from '@/shared';
import { CustomCardAlert } from '@/shared/components';

export type PromocionPreventaViewProps = {
  preventa: Preventa;
};

const PromocionPreventaView: React.FC<PromocionPreventaViewProps> = ({
  preventa,
}) => {
  if (preventa?.promociones_data?.length === 0)
    return (
      <CustomCardAlert
        sizeType="small"
        alertMessage={'No aplica promoicón para este cliente.'}
        alertSeverity="info"
      />
    );

  if (preventa?.es_tercera_edad)
    return (
      <CustomCardAlert
        sizeType="small"
        alertMessage={'El cliente es de tercera edad, no aplica promociones.'}
        alertSeverity="info"
      />
    );

  return <>PromocionPreventaView</>;
};

export default PromocionPreventaView;
