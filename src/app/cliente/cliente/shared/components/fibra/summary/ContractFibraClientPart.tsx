import { LineaServicio } from '@/shared';
import { CustomTextFieldNoForm, CustomTypoLabel } from '@/shared/components';
import LineStateFibraClient from './LineStateFibraClient';

export type ContractFibraClientPartProps = {
  serviceLine: LineaServicio;
};

const ContractFibraClientPart: React.FC<ContractFibraClientPartProps> = ({
  serviceLine,
}) => {
  return (
    <>
      <CustomTypoLabel text="Datos del contrato" />

      <CustomTextFieldNoForm
        label="Número de contrato"
        value={serviceLine?.contrato_data?.numero_contrato}
        disabled
      />
      <CustomTextFieldNoForm
        label="Identificación de pago"
        value={serviceLine?.contrato_data?.identificacion_pago}
        disabled
      />

      <LineStateFibraClient serviceLine={serviceLine} />
    </>
  );
};

export default ContractFibraClientPart;
