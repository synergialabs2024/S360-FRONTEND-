import { EstadoAgendamientoEnumChoice } from '@/shared';

export type AgendamientoByStatePageProps = {
  state: EstadoAgendamientoEnumChoice;
};

const AgendamientoByStatePage: React.FC<AgendamientoByStatePageProps> = ({
  state,
}) => {
  console.log(state);

  return <>AgendamientoByStatePage</>;
};

export default AgendamientoByStatePage;
