import { Cliente } from '@/shared';

export type SaveClienteProps = {
  title: string;
  cliente?: Cliente;
};

const SaveCliente: React.FC<SaveClienteProps> = ({ title }) => {
  return (
    <>
      SaveCliente
      {title}
    </>
  );
};

export default SaveCliente;
