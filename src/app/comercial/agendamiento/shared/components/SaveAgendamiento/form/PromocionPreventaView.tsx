import { PromocionPreventaComponent } from '@/app/comercial/preventa/shared/components';
import type { Preventa, Promocion } from '@/shared';
import { CustomCardAlert } from '@/shared/components';

export type PromocionPreventaViewProps = {
  preventa: Preventa;
};

const PromocionPreventaView: React.FC<PromocionPreventaViewProps> = ({
  preventa,
}) => {
  if (preventa?.es_tercera_edad)
    return (
      <CustomCardAlert
        sizeType="small"
        alertMessage={'El cliente es de tercera edad, no aplica promociones.'}
        alertSeverity="info"
      />
    );

  if (preventa?.promociones_data?.length === 0)
    return (
      <CustomCardAlert
        sizeType="small"
        alertMessage={'No aplica promoicón para este cliente.'}
        alertSeverity="info"
      />
    );

  return (
    <PromocionPreventaComponent
      promocion={
        (preventa?.promociones_data?.at(0)! as unknown as Promocion) || {}
      }
    />
  );
};

export default PromocionPreventaView;
