import { Agendamiento } from '@/shared';

export type RequestRecoordinacionAgendaTableBtnProps = {
  agendamiento: Agendamiento;
  open: boolean;
  onClose(): void;
};

const RequestRecoordinacionAgendaTableBtn: React.FC<
  RequestRecoordinacionAgendaTableBtnProps
> = () => {
  return <>RequestRecoordinacionAgendaTableBtn</>;
};

export default RequestRecoordinacionAgendaTableBtn;
