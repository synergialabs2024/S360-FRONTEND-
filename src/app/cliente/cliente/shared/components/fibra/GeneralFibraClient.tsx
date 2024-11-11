import { Cliente } from '@/shared';

export type GeneralFibraClientProps = {
  title: string;
  cliente?: Cliente;
};

const GeneralFibraClient: React.FC<GeneralFibraClientProps> = ({
  title,
  cliente,
}) => {
  return (
    <>
      SaveCliente
      {title}
      {cliente?.razon_social}
    </>
  );
};

export default GeneralFibraClient;
