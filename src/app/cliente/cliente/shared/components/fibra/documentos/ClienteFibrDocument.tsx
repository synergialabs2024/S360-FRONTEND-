import { LineaServicio } from '@/shared';
import {
  ClienteFibrContrato,
  ClienteFibrInfoPreventa,
  ClienteFibrOrdenTrabajo,
} from './type';
import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';

export type ClienteFibrDocumentProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibrDocument: React.FC<ClienteFibrDocumentProps> = ({
  serviceLine,
}) => {
  console.log(serviceLine?.contrato_data);
  console.log(serviceLine?.preventa_data);
  console.log(serviceLine?.orden_trabajo_data);
  return (
    <>
      <CustomTypoLabel
        text="INFORMACION DEL CONTRATO"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <ClienteFibrContrato serviceLine={serviceLine} />

      <CustomTypoLabel
        text="INFORMACION DE LA PREVENTA"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <ClienteFibrInfoPreventa serviceLine={serviceLine} />

      <CustomTypoLabel
        text="INFORMACION DE LA ORDEN DE TRABAJO"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <ClienteFibrOrdenTrabajo serviceLine={serviceLine} />
    </>
  );
};

export default ClienteFibrDocument;
