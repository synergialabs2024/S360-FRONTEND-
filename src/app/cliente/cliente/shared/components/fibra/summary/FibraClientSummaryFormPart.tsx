import { LineaServicio } from '@/shared';
import ContractFibraClientPart from './ContractFibraClientPart';

export type FibraClientSummaryFormPartProps = {
  serviceLine: LineaServicio;
};

const FibraClientSummaryFormPart: React.FC<FibraClientSummaryFormPartProps> = ({
  serviceLine,
}) => {
  return (
    <>
      <ContractFibraClientPart serviceLine={serviceLine!} />
    </>
  );
};

export default FibraClientSummaryFormPart;
