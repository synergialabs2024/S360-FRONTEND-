import { LineaServicio } from '@/shared';
import ContractClientDataPart from './ContractClientDataPart';

export type ClientDataFormPartProps = {
  serviceLine: LineaServicio;
};

const ClientDataFormPart: React.FC<ClientDataFormPartProps> = ({
  serviceLine,
}) => {
  return (
    <>
      <ContractClientDataPart serviceLine={serviceLine!} />
    </>
  );
};

export default ClientDataFormPart;
