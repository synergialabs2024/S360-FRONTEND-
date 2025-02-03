import { LineaServicio } from '@/shared';

export type ClienteFibraAlquileresPartProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraAlquileresPart: React.FC<ClienteFibraAlquileresPartProps> = ({
  serviceLine,
}) => {
  console.log(serviceLine);

  return <>ClienteFibraAlquileresPart</>;
};

export default ClienteFibraAlquileresPart;
