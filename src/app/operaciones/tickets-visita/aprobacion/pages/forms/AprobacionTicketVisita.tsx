import { useParams } from 'react-router-dom';

import { CustomTitleRefNumber } from '@/shared/components';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetTicket } from '@/actions/app/tickets';
import SaveRecoordinacionTicketVisita from '../../shared/components/SaveAprobacionTicketVisita';

export type AprobacionTicketVisitaProps = {};

const AprobacionTicketVisita: React.FC<AprobacionTicketVisitaProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_ordentrabajo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetTicket(uuid!);
  useLoaders(isLoading || isRefetching);

  return (
    <SaveRecoordinacionTicketVisita
      titleNode={
        <CustomTitleRefNumber
          initialText="Aprobacion visita tecnica"
          referenceNumber={data?.data?.uuid!}
        />
      }
      ticket={data?.data}
    />
  );
};

export default AprobacionTicketVisita;
