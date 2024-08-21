import { Navigate, useParams } from 'react-router-dom';

import { useGetOLT } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveOLT } from '../../shared/components';
import { returnUrlOLTsPage } from '../tables/OLTsPage';

export type UpdateOLTPageProps = {};

const UpdateOLTPage: React.FC<UpdateOLTPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_change_olt);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetOLT(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlOLTsPage} />;

  return <SaveOLT title="Editar OLT" olt={data.data} />;
};

export default UpdateOLTPage;
