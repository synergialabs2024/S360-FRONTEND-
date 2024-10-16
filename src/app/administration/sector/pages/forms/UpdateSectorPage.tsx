import { Navigate, useParams } from 'react-router-dom';

import { useGetSector } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlSectoresPage } from '../tables/SectoresPage';
import { SaveSector } from '../../shared/components';

export type UpdateSectorPageProps = {};

const UpdateSectorPage: React.FC<UpdateSectorPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_change_sector);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetSector(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlSectoresPage} />;

  return <SaveSector title="Editar Sector" sector={data.data} />;
};

export default UpdateSectorPage;
