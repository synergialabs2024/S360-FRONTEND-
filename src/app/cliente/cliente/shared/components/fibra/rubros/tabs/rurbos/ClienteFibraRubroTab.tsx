import { LineaServicio } from '@/shared';

export type ClienteFibraRubroTabProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibraRubroTab: React.FC<ClienteFibraRubroTabProps> = ({
  serviceLine,
}) => {
  console.log(serviceLine);

  return <>ClienteFibraRubroTab</>;
};

export default ClienteFibraRubroTab;
