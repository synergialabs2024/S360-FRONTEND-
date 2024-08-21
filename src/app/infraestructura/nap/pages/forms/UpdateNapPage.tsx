import { Navigate, useParams } from 'react-router-dom';

import { useGetNap } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveNap } from '../../shared/components';
import { returnUrlNapsPage } from '../tables/NapsPage';

export type UpdateNapPageProps = {};

const UpdateNapPage: React.FC<UpdateNapPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_change_nap);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetNap(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlNapsPage} />;

  return <SaveNap title="Editar Caja Nap" nap={data.data} />;
};

export default UpdateNapPage;
