import { ActivacionInstallOTNodoIPsPPPPart } from '@/app/operaciones/activacion/instalaciones/shared/components';
import { LineaServicio } from '@/shared';

export type ClienteFibraOTPartProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraOTPart: React.FC<ClienteFibraOTPartProps> = ({
  serviceLine,
}) => {
  const ordenTrabajo = serviceLine?.orden_trabajo_data;

  return (
    <>
      <ActivacionInstallOTNodoIPsPPPPart
        ordenTrabajo={
          {
            ...ordenTrabajo,
            nodo_data: serviceLine?.nodo_data,
            olt_data: serviceLine?.olt_data,
          } as any
        }
      />
    </>
  );
};

export default ClienteFibraOTPart;
