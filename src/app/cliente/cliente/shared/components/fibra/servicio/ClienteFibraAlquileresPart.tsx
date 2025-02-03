import { LineaServicio } from '@/shared';
import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';

export type ClienteFibraAlquileresPartProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraAlquileresPart: React.FC<ClienteFibraAlquileresPartProps> = ({
  serviceLine,
}) => {
  console.log(serviceLine);

  return (
    <>
      <CustomTypoLabel
        text="PRODUCTOS Y OTROS SERVICIOS RECURRENTES (CUOTAS Y MENSUAL)"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <>TU CUSTOM COMPONENT - TABLA 1</>

      <CustomTypoLabel
        text="PRODUCTOS Y OTROS SERVICIOS RECURRENTES (UN SOLO PAGO)"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <>TU CUSTOM COMPONENT - TABLA 2</>
    </>
  );
};

export default ClienteFibraAlquileresPart;
