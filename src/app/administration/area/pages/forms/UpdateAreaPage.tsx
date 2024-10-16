import { Navigate, useParams } from 'react-router-dom';

import { useGetArea } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlAreasPage } from '../tables/AreasPage';
import { SaveArea } from './../../shared/components';

export type UpdateAreaPageProps = {};

const UpdateAreaPage: React.FC<UpdateAreaPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_change_area);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetArea(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlAreasPage} />;

  return <SaveArea title="Editar Area" area={data.data} />;
};

export default UpdateAreaPage;
