import { Navigate, useParams } from 'react-router-dom';

import { useGetPrimaryNap } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePrimaryNap } from '../../shared/components';
import { returnUrlPrimaryNapsPage } from '../tables/PrimaryNapPage';

export type UpdatePrimaryNapPageProps = {};

const UpdatePrimaryNapPage: React.FC<UpdatePrimaryNapPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_change_napprimary);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetPrimaryNap(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlPrimaryNapsPage} />;

  return (
    <SavePrimaryNap title="Editar Caja Nap Primaria" primarynap={data.data} />
  );
};

export default UpdatePrimaryNapPage;
