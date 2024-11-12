import { LineaServicio } from '@/shared';

export type ClienteFibraOTFotosPartProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraOTFotosPart: React.FC<ClienteFibraOTFotosPartProps> = ({
  serviceLine,
}) => {
  console.log(serviceLine);
  return <>ClienteFibraOTFotosPart</>;
};

export default ClienteFibraOTFotosPart;
