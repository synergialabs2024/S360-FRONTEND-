import { LineaServicio } from '@/shared';
import ContractFibraClientPart from './ContractFibraClientPart';

export type CambioOnuClientSummaryFormPartProps = {
  serviceLine: LineaServicio;
};

const CambioOnuClientSummaryFormPart: React.FC<
  CambioOnuClientSummaryFormPartProps
> = ({ serviceLine }) => {
  return (
    <>
      <ContractFibraClientPart serviceLine={serviceLine!} />
    </>
  );
};

export default CambioOnuClientSummaryFormPart;
