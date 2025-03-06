import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetCausaTicketMasivo } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveCausaTicketMasivo } from '../../shared/components';
import { returnUrlCausaTicketMasivoPage } from '../tables/CausaTicketMasivoPage';

export type UpdateCausaTicketMasivoPageProps = {};

const UpdateCausaTicketMasivoPage: React.FC<
  UpdateCausaTicketMasivoPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_causaticketmasivo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCausaTicketMasivo(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlCausaTicketMasivoPage} />;

  return (
    <SaveCausaTicketMasivo
      title="Editar Causa del Ticket Masivo"
      causaTM={data.data}
    />
  );
};

export default UpdateCausaTicketMasivoPage;
