import { Navigate, useParams } from 'react-router';

import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetOLT } from '@/actions/app';
import { useLoaders } from '@/shared';
import { returnUrlOLTsPage } from '../tables/OLTsPage';
import { ConfigOLT } from '../../shared/components';

export type ConfigOLTPageProps = {};

const ConfigOLTPage: React.FC<ConfigOLTPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_change_olt);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetOLT(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlOLTsPage} />;

  return <ConfigOLT title="Configurar OLT" olt={data.data} />;
};

export default ConfigOLTPage;
