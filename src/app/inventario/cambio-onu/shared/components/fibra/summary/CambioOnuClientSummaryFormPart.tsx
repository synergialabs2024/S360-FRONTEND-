import ContractFibraClientPart from '@/app/cliente/cliente/shared/components/fibra/summary/ContractFibraClientPart';
import { LineaServicio } from '@/shared';

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
